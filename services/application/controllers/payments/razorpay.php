<?php
defined('BASEPATH') or exit('No direct script access allowed');
include('./vendor/autoload.php');

use Razorpay\Api\Api;

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
            } catch (Exception $e) {
                $this->auth->response(['response' => $e], [], 500);
            }
        } else {
            $this->auth->response(['response' => 'Customer Id or Plan Id or Count parameter missing'], [], 500);
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
