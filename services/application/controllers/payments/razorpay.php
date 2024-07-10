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
    public function onPostPayment()
    {
        try {
            $appId = $this->input->post('appId');
            $paymentId = $this->input->post('paymentId');
            $subscriptionId = $this->input->post('subscriptionId');
            $planId = $this->input->post('planId');
            $payment = $this->razorPayApi->payment->fetch($paymentId)->toArray();
            //  todo :subscription API fails intermittently.
            $subscription = $this->razorPayApi->subscription->fetch($subscriptionId)->toArray();
            $invoice = $this->razorPayApi->invoice->fetch($payment['invoice_id'])->toArray();

            $insert = array(
                'orderId' => null,
                'paymentId' => $paymentId,
                'customerId' => $payment['customer_id'],
                'subscriptionId' => $subscriptionId,
                'invoiceId' => $payment['invoice_id'],
                'invoiceNumber' => "",
                'discountAmount' => 0,
                'taxId' => "",
                'taxAmount' => 0,
                'total' => $payment['amount'] / 100,
                'currency' => $payment['currency'],
                'customerName' => $payment['notes']['name'],
                'customerEmail' => $payment['notes']['email'],
                'cycleStart' => date("Y-m-d H:i:s", $subscription['current_start']),
                'cycleEnd' => date("Y-m-d H:i:s", $subscription['current_end']),
                'paymentStatus' => $payment['status'],
                'invoiceUrl' => $invoice['short_url'],
                'paidAt' => date("Y-m-d H:i:s", $payment['created_at'])
            );
            $expiryDate = date("Y-m-d H:i:s", $subscription['current_end']);
            // insert / update orders
            $this->db->trans_start();
            $query = $this->db->get_where('orders', ['paymentId' => $paymentId]);
            if ($query->num_rows() > 0) {
                $this->db->where('paymentId', $paymentId);
                $this->db->update('orders', array_slice($insert, 2));
            } else {
                $this->db->insert('orders', $insert);
            }
            // update expiry time and plan for new subscription if amount paid
            if ($payment['status'] === 'authorized' || $payment['status'] === 'captured') {
                $column = ENVIRONMENT === 'development' ? "priceRazorPayTestId" : "priceRazorPayLiveId";
                $query = $this->db->get_where('prices', [$column => $planId]);
                $plan = $query->row();
                $update = [
                    'expiryDateTime' => $expiryDate,
                    'isActive' => 1,
                    'appsPlanId' => $plan->pricePlanId
                ];
                $this->db->where('appId', $appId);
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
        } catch (Errors\Error $e) {
            $this->throwException($e);
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
