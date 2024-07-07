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
    public function test()
    {
        try {
            $out = $this->razorPayApi->plan->all()->toArray();
            $this->auth->response(['response' => $out], [], 200);
        } catch (Exception $e) {
            $this->auth->response(['response' => $e], [], 500);
        }
    }
    public function createOrder()
    {
        $custId = $this->input->post('custId');
        $planId = $this->input->post('planId');
        $count = $this->input->post('count');
        if (isset($custId) && isset($planId) && isset($count)) {
            try {
                $create = $this->razorPayApi->subscription->create([
                    'plan_id' => $planId,
                    'total_count' => $count,
                    'customer_notify' => 1,
                    'customer_id' => $custId
                ])->toArray();
                $this->auth->response(['response' => $create], [], 200);
            } catch (Errors\Error $e) {
                $this->auth->response(['response' => $e], [], 500);
            }
        } else {
            $this->auth->response(['response' => 'Customer Id or Plan Id or Count parameter missing'], [], 500);
        }
    }
    public function checkoutSession()
    {
        try {
            $appId = $this->input->post('appId');
            $sessionId = $this->input->post('sessionId'); // alias payment Id
            // todo: razorpay payment API
            $checkoutData = [
                'id' => null,
                'customer' => null,
                'subscription' => null,
                'invoice' => null,
                'discountAmount' => null,
                'total' => null,
                'currency' => null,
                'customerName' => null,
                'customerEmail' => null,
                'paymentStatus' => null,
            ];
            // todo: razorpay invoice API
            $invoice = ['invoiceId' => "", 'invoiceNumber' => "", 'invoiceUrl' => '', 'paidAt' => ''];
            $subscription = ['current_period_start' => null, 'current_period_end' => null];

            $insert = array(
                'orderId' => null,
                'checkoutSessionId' => $checkoutData['id'],
                'customerId' => $checkoutData['customer'],
                'subscriptionId' => $checkoutData['subscription'],
                'invoiceId' => $invoice['invoiceId'],
                'invoiceNumber' => $invoice['invoiceNumber'],
                'discountAmount' => $checkoutData['discountAmount'],
                'taxId' => '', // todo: razorpay tax API
                'taxAmount' => '', // todo: razorpay tax API
                'total' => $checkoutData['total'],
                'currency' => $checkoutData['currency'],
                'customerName' => $checkoutData['customerName'],
                'customerEmail' => $checkoutData['customerEmail'],
                'cycleStart' => date("Y-m-d H:i:s", $subscription['current_period_start']),
                'cycleEnd' => date("Y-m-d H:i:s", $subscription['current_period_end']),
                'paymentStatus' => $checkoutData['paymentStatus'],
                'invoiceUrl' => $invoice['invoiceUrl'],
                'paidAt' => date("Y-m-d H:i:s", $invoice['paidAt'])
            );
            $expiryDate = date("Y-m-d H:i:s", $subscription['current_period_end']);
            $this->db->trans_start();
            // insert / update orders
            $query = $this->db->get_where('stripeOrders', ['checkoutSessionId' => $sessionId]);
            if ($query->num_rows() > 0) {
                $this->db->where('checkoutSessionId', $sessionId);
                $this->db->update('stripeOrders', array_slice($insert, 2));
            } else {
                $this->db->insert('stripeOrders', $insert);
            }
            // update expiry time for new subscription if amount paid
            if ($checkoutData['payment_status'] === 'paid') { // todo: check API data from payment
                $update = [
                    'expiryDateTime' => $expiryDate,
                    'isActive' => 1
                ];
                $this->db->where('appId', $appId);
                $this->db->update('apps', $update);
            }
            $this->db->trans_complete();
            if ($this->db->trans_status()) {
                $data['response'] = [
                    'status' => true,
                    'newExpiry' => $expiryDate
                ];
                $this->auth->response($data, [], 200);
            } else {
                $data['response'] = [
                    'status' => false,
                    'newExpiry' => false,
                    'sessionId' => $sessionId
                ];
                $this->auth->response($data, [], 200);
            }
        } catch (Exception $e) {
            $data['response'] = [
                'status' => false,
                'newExpiry' => false,
                'sessionId' => $sessionId,
                'message' => 'Unable to connect razorpay'
            ];
            $this->auth->response($data, [], 200);
        }
    }
    public function checkoutSubscription()
    {
        // try {
        //     $summary = json_decode($this->input->post('summary'));
        //     $taxes = $this->stripe->taxRates->all(['limit' => 1]);
        //     $YOUR_DOMAIN = $this->config->item('app_domain') . 'billing';
        //     $billingCycle = $summary->cycle === "month" ? strtotime("+1 month") : strtotime("+1 year");
        //     // subscription
        //     $subscription = [
        //         'customer' => $summary->stripeCustomerId,
        //         'ui_mode' => 'embedded',
        //         'line_items' => [[
        //             'price' => $summary->stripePriceId,
        //             'quantity' => 1,
        //         ]],
        //         'mode' => 'subscription',
        //         'subscription_data' => [
        //             'billing_cycle_anchor' => $billingCycle
        //         ],
        //         'return_url' => $YOUR_DOMAIN . '?session_id={CHECKOUT_SESSION_ID}',
        //     ];
        //     // todo: taxes are still pending to do from stripe as they confirm
        //     // "automatic_tax" => true
        //     // discounts
        //     if ($this->plan_model->checkIsNewCustomer($summary->stripeCustomerId)) {
        //         $discounts = $this->stripe->coupons->all(['limit' => 1]);
        //         if (isset($discounts['data']) && count($discounts['data'])) {
        //             $subscription['discounts'] = [['coupon' => $discounts['data'][0]['id']]];
        //         }
        //     }
        //     // taxes
        //     // todo: taxes need to get activated from stripe, else below code wont work
        //     // if (isset($taxes['data']) && count($taxes['data'])) {
        //     //     $subscription['line_items'][0]['tax_rates'] = [$taxes['data'][0]['id']];
        //     // }
        //     $checkout_session = $this->stripe->checkout->sessions->create($subscription);
        //     $data['response'] = $checkout_session;
        //     $this->auth->response($data, [], 200);
        // } catch (Error $e) {
        //     show_error('Error in stripe connection', 400);
        // }
    }
}
