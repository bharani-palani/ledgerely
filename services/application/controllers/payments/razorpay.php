<?php
defined('BASEPATH') or exit('No direct script access allowed');
include('./vendor/autoload.php');

use Razorpay\Api\Api;
use Razorpay\Api\Errors;

class razorpay extends CI_Controller
{
    public $razorPayTestApi;
    public $razorPayLiveApi;
    public $razorPayApi;
    public function __construct()
    {
        parent::__construct();
        $this->load->library('../controllers/auth');
        $this->load->model('home_model');
        $this->razorPayTestApi = new Api($this->config->item('razorpay_test_key_id'), $this->config->item('razorpay_test_key_secret'));
        $this->razorPayLiveApi = new Api($this->config->item('razorpay_live_key_id'), $this->config->item('razorpay_live_key_secret'));
        $this->razorPayApi =
            $_ENV['APP_ENV'] === 'production' ?
            new Api($this->config->item('razorpay_live_key_id'), $this->config->item('razorpay_live_key_secret')) :
            new Api($this->config->item('razorpay_test_key_id'), $this->config->item('razorpay_test_key_secret'));
    }
    public function throwException($e)
    {
        $errors = [
            'CODE' => $e->getCode(),
            'MESSAGE' => $e->getMessage(),
            'FILE' => $e->getFile(),
            'LINE' => $e->getLine(),
            'STRING_TRACE' => $e->getTraceAsString(),
        ];
        if ($_ENV['APP_ENV'] !== 'local') {
            $object = (object) [
                'name' => 'ErrorHandler',
                'email' => 'errorHandler@ledgerely.com',
                'source' => 'BE',
                'type' => 'PhpError',
                'description' => json_encode($errors),
                'userId' => 'XXX',
                'time' => date("Y-m-d\TH:i:s"),
                'ip' => $_SERVER['REMOTE_ADDR'],
            ];
            $this->home_model->saveLog($object);
        }
        $this->auth->response(['response' => $errors], [], 500);
    }
    public function createSubscription()
    {
        $custId = $this->input->post('custId');
        $planId = $this->input->post('planId');
        $count = $this->input->post('count');
        $subscriptionId = $this->input->post('subscriptionId');
        try {
            if (strlen($subscriptionId) > 0) {
                $this->razorPayApi->subscription->fetch($subscriptionId)->cancel([
                    'cancel_at_cycle_end' => 0
                ]);
            }
            $subscription = $this->razorPayApi->subscription->create([
                'plan_id' => $planId,
                'total_count' => $count,
                'customer_notify' => 1,
                'customer_id' => $custId,
            ])->toArray();
            $this->auth->response(['response' => $subscription], [], 200);
        } catch (Errors\Error $e) {
            $this->throwException($e);
        }
    }
    public function onPayment()
    {
        $paymentId = $this->input->post('paymentId');
        try {
            $payment = $this->razorPayApi->payment->fetch($paymentId)->toArray();
            $this->auth->response(['response' => $payment], [], 200);
        } catch (Errors\Error $e) {
            $this->throwException($e);
        }
    }
    public function onPostPaymentAutomation()
    {
        /**
         * Webhook events:
         * Important: Webhook will not working, if all 3 below options are not configured in webhook setup.
         * payment.authorized
         * payment.captured
         * subscription.activated
         */
        $post = file_get_contents('php://input');
        // $post = $this->input->post('request'); // for checking in localhost
        $data = json_decode($post, true);
        $headers = getallheaders();
        $headers = json_encode($headers);
        $headerData = json_decode($headers, true);
        // validate signature
        if (isset($headerData['X-Razorpay-Signature'])) {
            try {
                $this->razorPayApi->utility->verifyWebhookSignature(
                    $post,
                    $headerData['X-Razorpay-Signature'],
                    $this->config->item('razorpay_webhook_secret')
                );
                $subscription = $data['payload']['subscription']['entity'];
                $payment = $data['payload']['payment']['entity'];

                // insert / update orders
                $insert = array(
                    'orderId' => $payment['order_id'],
                    'paymentId' => $payment['id'],
                    'customerId' => $subscription['customer_id'],
                    'subscriptionId' => $subscription['id'],
                    'invoiceId' => $payment['invoice_id'],
                    'commissionFee' => $payment['fee'] / 100,
                    'discountAmount' => $payment['offer']['discounted_amount'] / 100,
                    'planId' => $subscription['plan_id'],
                    'taxAmount' => 0,
                    'total' => $payment['amount'] / 100,
                    'currency' => $payment['currency'],
                    'customerName' => $payment['card']['name'],
                    'customerEmail' => $payment['email'],
                    'cycleStart' => date("Y-m-d H:i:s", $subscription['current_start']),
                    'cycleEnd' => date("Y-m-d H:i:s", $subscription['current_end']),
                    'paymentStatus' => $payment['status'],
                    'rest' => $post,
                    'paidAt' => date("Y-m-d H:i:s", $payment['created_at'])
                );

                $expiryDate = date("Y-m-d H:i:s", $subscription['current_end']);
                $this->db->trans_start();
                $query = $this->db->get_where('orders', ['orderId' => $payment['order_id']]);
                if ($query->num_rows() > 0) {
                    $this->db->where('orderId', $payment['order_id']);
                    $this->db->update('orders', array_slice($insert, 1));
                } else {
                    $this->db->insert('orders', $insert);
                }

                // update new expiry time and plan for new subscription if amount paid
                $column = $_ENV['APP_ENV'] === 'production' ? "priceRazorPayLiveId" : "priceRazorPayTestId";
                $rpCustId = $_ENV['APP_ENV'] === "production" ? 'razorPayLiveCustomerId' : 'razorPayTestCustomerId';
                $rpSubId = $_ENV['APP_ENV'] === "production" ? 'razorPayLiveSubscriptionId' : 'razorPayTestSubscriptionId';
                $query = $this->db->get_where('prices', [$column => $subscription['plan_id']]);
                $plan = $query->row();
                $update = [
                    'expiryDateTime' => date('Y-m-d H:i:s', strtotime($expiryDate)),
                    'isActive' => 1,
                    'appsPlanId' => $plan->pricePlanId,
                    $rpSubId => $subscription['id']
                ];
                $this->db->where($rpCustId, $data['payload']['subscription']['entity']['customer_id']);
                $this->db->update('apps', $update);

                $this->db->trans_complete();
                if ($this->db->trans_status()) {
                    $this->auth->response(['response' => [
                        'env' => $_ENV['APP_ENV'],
                        'paymentData' => $payment,
                        'subscriptionData' => $subscription,
                        'column' => $column,
                        'rpCustId' => $rpCustId
                    ]], [], 200);
                } else {
                    $this->auth->response(['response' => false], ['message' => 'Transaction insert failed'], 500);
                }
            } catch (Errors\SignatureVerificationError $e) {
                $this->throwException($e);
            }
        } else {
            $this->auth->response(['response' => 'Razorpay signature header not found'], [], 200);
        }
    }
    public function getSubscriptionDetails()
    {
        $subId = $this->input->post('subscriptionId');
        try {
            $payment = $this->razorPayApi->subscription->fetch($subId)->toArray();
            $this->auth->response(['response' => $payment], [], 200);
        } catch (Errors\Error $e) {
            $this->throwException($e);
        }
    }
    public function cancelSubscription()
    {
        $subId = $this->input->post('subscriptionId');
        $appId = $this->input->post('appId');
        try {
            $payment = $this->razorPayApi->subscription->fetch($subId)->cancel()->toArray();
            $rpSubId = $_ENV['APP_ENV'] === "production" ? 'razorPayLiveSubscriptionId' : 'razorPayTestSubscriptionId';
            $this->db->where('appId', $appId);
            $this->db->update('apps', [$rpSubId => NULL]);
            $this->auth->response(['response' => $payment], [], 200);
        } catch (Errors\Error $e) {
            $this->throwException($e);
        }
    }
    public function getTransactions()
    {
        $count = $this->input->get('count');
        $skip = $this->input->get('skip');
        $razorPayCustomerId = $this->input->get('razorPayCustomerId');
        $options = ["count" => $count, "skip" => $skip];
        try {
            $payment = $this->razorPayApi->subscription->all($options)->toArray();
            $filter = array_filter($payment['items'], function ($item) use ($razorPayCustomerId) {
                return $item['customer_id'] == $razorPayCustomerId;
            });
            $return = [
                'items' => array_values($filter),
                'count' => count($filter),
            ];
            $this->auth->response(['response' => $return], [], 200);
        } catch (Errors\Error $e) {
            $this->throwException($e);
        }
    }
    public function test()
    {
        $subId = $this->input->post('subscriptionId');
        try {
            $payment = $this->razorPayApi->subscription->fetch($subId)->toArray();
            $this->auth->response(['response' => $payment], [], 200);
        } catch (Errors\Error $e) {
            $this->throwException($e);
        }
    }
}
