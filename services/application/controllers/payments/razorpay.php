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
        $this->load->model('home_model');
        $this->load->library('email');
        $this->load->library('../controllers/auth');
        $this->email->initialize([
            'protocol' => $this->config->item('protocol'),
            'smtp_host' => $this->config->item('smtp_host'),
            'smtp_user' => $this->config->item('smtp_user'),
            'smtp_pass' => $this->config->item('smtp_pass'),
            'mailtype' => $this->config->item('mailtype'),
            'charset' => $this->config->item('charset')
        ]);
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
            $this->saveLog($object);
        }
        $this->auth->response(['response' => $errors], [], 500);
    }
    public function saveLog($post)
    {
        $this->db->insert('logs', [
            'log_id' => NULL,
            'log_name' => $post->name,
            'log_email' => $post->email,
            'log_source' => $post->source,
            'log_type' => $post->type,
            'log_description' => $post->description,
            'log_user_id' => $post->userId,
            'log_time' => $post->time,
            'log_ip' => $post->ip,
        ]);
        return $this->db->affected_rows() > 0;
    }
    public function createSubscription()
    {
        $custId = $this->input->post('custId');
        $planId = $this->input->post('planId');
        $count = $this->input->post('count');
        $subscriptionId = $this->input->post('subscriptionId');
        try {
            $existing = $this->razorPayApi->subscription->fetch($subscriptionId)->toArray();
            if (is_array($existing) && array_key_exists('status', $existing) && $existing['status'] == "active") {
                // update
                $subscription = $this->razorPayApi->subscription->fetch($subscriptionId)->update([
                    'plan_id' => $planId,
                    'remaining_count' => $count,
                ]);
            } else {
                // create
                $subscription = $this->razorPayApi->subscription->create([
                    'plan_id' => $planId,
                    'total_count' => $count,
                    'customer_notify' => 1,
                    'customer_id' => $custId,
                    'expire_by' => time() + 3600 // 1 hour expiry
                ]);
            }
            $this->auth->response(['response' => $subscription], [], 200);
        } catch (Errors\Error $e) {
            // send email to ledgerely support team
            $config = $this->home_model->getGlobalConfig();
            $appName = $config[0]['appName'];
            $email = $config[0]['appSupportEmail'];        
            $this->email->from($email, $appName . ' - Support team');
            $this->email->to($email);
            $this->email->subject($appName . ' - Customer transaction failed');
            $emailData['globalConfig'] = $config;
            $emailData['appName'] = $appName;
            $emailData['saluation'] = 'Hello ' . $appName . ' team,';
            $emailData['matter'] = [
                '<p></p>',
                '<div><b>Subscription payment failed for customer ' . $custId . '</b></div>',
                '<div>Please check the DB logs for more details.</div>',
                '<p></p>',
                'Subscription ID: ' . $subscriptionId,
                '<p></p>',
                'Plan Id: ' . $planId,
                '<p></p>',
                'Error Code: ' . $e->getCode(),
                '<p></p>',
                'Error Message: ' . $e->getMessage(),
            ];
            $emailData['signature'] = 'Regards,';
            $emailData['signatureCompany'] = $appName;
            $mesg = $this->load->view('emailTemplate', $emailData, true);
            $this->email->message($mesg);
            $this->email->send();
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
         * subscription.charged is the only hook required, which is triggered every month/year or first payment.
         * Sample webhook payload is available in sampleWebhookPayload.json for testing.
         */
        $post = file_get_contents('php://input');
        // $post = $this->input->post('request'); // for checking in localhost
        $data = json_decode($post, true);
        $headers = getallheaders();
        $headers = json_encode($headers);
        $headerData = json_decode($headers, true);
        // validate signature: Comment below line to skip signature validation in localhost
        if (isset($headerData['X-Razorpay-Signature'])) {
            try {
                $this->razorPayApi->utility->verifyWebhookSignature(
                    $post,
                    $headerData['X-Razorpay-Signature'],
                    $this->config->item('razorpay_webhook_secret')
                );
                $subscription = $data['payload']['subscription']['entity'] ?? [];
                $payment = $data['payload']['payment']['entity'] ?? [];

                // insert / update orders
                $insert = array(
                    'orderId' => $payment['order_id'] ?? '',
                    'paymentId' => $payment['id'] ?? '',
                    'customerId' => $payment['customer_id'] ?? '',
                    'subscriptionId' => $subscription['id'] ?? '',
                    'invoiceId' => $payment['invoice_id'] ?? '',
                    'commissionFee' => $payment['fee'] / 100 ?? 0,
                    'discountAmount' => 0,
                    'planId' => $subscription['plan_id'] ?? '',
                    'taxAmount' => ($payment['tax'] ?? 0) / 100,
                    'total' => ($payment['amount'] ?? 0) / 100,
                    'currency' => $payment['currency'] ?? '',
                    'customerName' => $payment['card']['name'] ?? '',
                    'customerEmail' => $payment['email'] ?? '',
                    'cycleStart' => date("Y-m-d H:i:s", $subscription['current_start'] ?? time()),
                    'cycleEnd' => date("Y-m-d H:i:s", $subscription['current_end'] ?? time()),
                    'paymentStatus' => $payment['status'] ?? '',
                    'rest' => $post,
                    'paidAt' => date("Y-m-d H:i:s", $payment['created_at'] ?? time())
                );

                $expiryDate = date("Y-m-d H:i:s", $subscription['current_end'] ?? time());
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
                $this->db->where($rpCustId, $payment['customer_id']);
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
                    $object = (object) [
                        'name' => 'Webhook',
                        'email' => 'webhook@ledgerely.com',
                        'source' => 'BE',
                        'type' => 'subscriptionTransactionFailed',
                        'description' => $post,
                        'userId' => $payment['customer_id'] ?? 'notFound',
                        'time' => date("Y-m-d\TH:i:s", time()),
                        'ip' => $_SERVER['REMOTE_ADDR'],
                    ];
                    $this->saveLog($object);
                    $this->auth->response(['response' => false], ['message' => 'Transaction insert failed'], 500);
                }
            } catch (Errors\SignatureVerificationError $e) {
                $this->throwException($e);
            }
        } else {
            $object = (object) [
                'name' => 'Webhook',
                'email' => 'webhook@ledgerely.com',
                'source' => 'BE',
                'type' => 'subscriptionSignatureFailed',
                'description' => $post,
                'userId' => $payment['customer_id'] ?? 'notFound',
                'time' => date("Y-m-d\TH:i:s", time()),
                'ip' => $_SERVER['REMOTE_ADDR'],
            ];
            $this->saveLog($object);
            $this->auth->response(['response' => 'Razorpay signature header not found'], [], 500);
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
        $subscriptionId = $this->input->post('subscriptionId');
        $custId = $this->input->post('custId');
        $plan_id = $this->input->post('planId');
        $count = $this->input->post('count');
        try {
            $existing = $this->razorPayApi->subscription->fetch($subscriptionId)->toArray();
            if ($existing['status'] == "active") {
                // update
                $subscription = $this->razorPayApi->subscription->fetch($subscriptionId)->update([
                    'plan_id' => $plan_id,
                ]);
            } else {
                // create
                $subscription = $this->razorPayApi->subscription->create([
                    'plan_id' => $plan_id,
                    'total_count' => $count,
                    'customer_notify' => 1,
                    'customer_id' => $custId,
                ]);
            }
            $this->auth->response(['response' => $subscription], [], 200);
        } catch (Errors\Error $e) {
            $this->throwException($e);
        }
    }
}
