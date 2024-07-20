<?php
defined('BASEPATH') or exit('No direct script access allowed');
include('./vendor/autoload.php');

use Razorpay\Api\Api;
use Razorpay\Api\Errors;

class razorpay extends CI_Controller
{
    public $razorPayApi;
    public function __construct()
    {
        parent::__construct();
        $this->load->library('../controllers/auth');
        $this->razorPayApi = new Api($this->config->item('razorpay_key_id'), $this->config->item('razorpay_key_secret'));
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
        $this->auth->response(['response' => $errors], [], 500);
    }
    public function createSubscription()
    {
        $custId = $this->input->post('custId');
        $planId = $this->input->post('planId');
        $count = $this->input->post('count');
        try {
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
        $post = file_get_contents('php://input');
        $data = json_decode($post);
        $headers = getallheaders();
        $headers = json_encode($headers);

        $eventArray = ["subscription.activated", "subscription.charged"];
        if (isset($data['event']) && !empty($data['event']) && in_array($data['event'], $eventArray)) {
            if (isset($_SERVER['HTTP_X_RAZORPAY_SIGNATURE'])) {
                try {
                    $this->razorPayApi->utility->verifyWebhookSignature(
                        $post,
                        $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'],
                        $this->config->item('razorpay_webhook_secret')
                    );
                } catch (Errors\SignatureVerificationError $e) {
                    $this->throwException($e);
                }
            }
            $status = $data['payload']['subscription']['entity']['status'];
            if ($status === 'active') {
                $insert = array(
                    'orderId' => $data['payload']['payment']['entity']['order_id'],
                    'paymentId' => $data['payload']['payment']['entity']['id'],
                    'customerId' => $data['payload']['subscription']['entity']['customer_id'],
                    'subscriptionId' => $data['payload']['subscription']['entity']['id'],
                    'invoiceId' => $data['payload']['payment']['entity']['invoice_id'],
                    'invoiceNumber' => "",
                    'discountAmount' => 0,
                    'taxId' => "",
                    'taxAmount' => 0,
                    'total' => $data['payload']['payment']['entity']['amount'],
                    'currency' => $data['payload']['payment']['entity']['currency'],
                    'customerName' => $data['payload']['payment']['entity']['card']['name'],
                    'customerEmail' => $data['payload']['payment']['entity']['email'],
                    'cycleStart' => date("Y-m-d H:i:s", $data['payload']['subscription']['entity']['start_at']),
                    'cycleEnd' => date("Y-m-d H:i:s", $data['payload']['subscription']['entity']['end_at']),
                    'paymentStatus' => $data['payload']['payment']['entity']['status'],
                    'invoiceUrl' => "",
                    'paidAt' => date("Y-m-d H:i:s", $data['payload']['payment']['entity']['created_at'])
                );
                $expiryDate = date("Y-m-d H:i:s", $data['payload']['subscription']['entity']['end_at']);
                // insert / update orders
                $this->db->trans_start();
                $query = $this->db->get_where('orders', ['orderId' => $data['payload']['payment']['entity']['order_id']]);
                if ($query->num_rows() > 0) {
                    $this->db->where('orderId', $data['payload']['payment']['entity']['order_id']);
                    $this->db->update('orders', array_slice($insert, 1));
                } else {
                    $this->db->insert('orders', $insert);
                }
                // update new expiry time and plan for new subscription if amount paid
                if ($data['payload']['payment']['entity']['status'] === 'captured') {
                    $column = ENVIRONMENT === 'development' ? "priceRazorPayTestId" : "priceRazorPayLiveId";
                    $query = $this->db->get_where('prices', [$column => $data['payload']['subscription']['plan_id']]);
                    $plan = $query->row();
                    $update = [
                        'expiryDateTime' => $expiryDate,
                        'isActive' => 1,
                        'appsPlanId' => $plan->pricePlanId
                    ];
                    $this->db->where('razorPayCustomerId', $data['payload']['subscription']['entity']['customer_id']);
                    $this->db->update('apps', $update);
                }
                $this->db->trans_complete();
                if ($this->db->trans_status()) {
                    $data['response'] = [
                        'status' => true,
                    ];
                    $this->auth->response($data, [], 200);
                } else {
                    $data['response'] = [
                        'status' => false,
                    ];
                    $this->auth->response($data, [], 200);
                }
            }
        }
    }
    public function test()
    {
        $subscriptionId = $this->input->post('subscriptionId');
        try {
            $subscription = $this->razorPayApi->subscription->fetch($subscriptionId)->toArray();
            $this->auth->response(['response' => $subscription], [], 200);
        } catch (Exception $e) {
            $this->auth->response(['response' => $e], [], 500);
        }
    }
}
