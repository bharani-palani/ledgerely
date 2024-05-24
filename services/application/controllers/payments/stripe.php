<?php
defined('BASEPATH') or exit('No direct script access allowed');
include('./vendor/autoload.php');

class stripe extends CI_Controller
{
    public $stripeConfig;
    public $stripe;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('plan_model');
        $this->load->library('../controllers/auth');

        $this->stripeConfig = ([
            "secret_key" => $this->config->item('stripe_secret_key'),
            "public_key" => $this->config->item('stripe_publishable_key')
        ]);
        $this->stripe = new \Stripe\StripeClient($this->stripeConfig['secret_key']);;
    }
    public function createUpdatePlans()
    {
        $data = $this->plan_model->planList();
        $i = 0;
        $j = 0;
        foreach ($data as $key => $obj) {
            $product = [
                'id' => $obj['planId'],
                'name' => $obj['planName'] . " | " . $obj['planCode'],
                'active' => true,
                'description' => $obj['planDescription'],
                'metadata' => $obj
            ];
            try {
                $checkProduct = $this->stripe->products->retrieve($obj['planId'], []);
                if (isset($checkProduct['id'])) {
                    unset($product['id']);
                    $this->stripe->products->update($obj['planId'], $product);
                }
                $i++;
            } catch (Exception $e) {
                $this->stripe->products->create($product);
                $j++;
            }
        }
        foreach ($data as $obj) {
            try {
                $priceMonthly = [
                    'currency' => 'inr',
                    'active' => true,
                    'metadata' => $obj,
                    'product' => $obj['planId'],
                    'recurring' => ['interval' => 'month'],
                    'unit_amount' => (float)$obj['planPriceMonthly'] * 100,
                    'tax_behavior' => 'inclusive'
                ];
                $priceYearly = [
                    'currency' => 'inr',
                    'active' => true,
                    'metadata' => $obj,
                    'product' => $obj['planId'],
                    'recurring' => ['interval' => 'year'],
                    'unit_amount' => (float)$obj['planPriceYearly'] * 100,
                    'tax_behavior' => 'inclusive'
                ];
                /**
                 * Note: 
                 * 1. Updating prices dynamically to product not available in stripe. 
                 * 2. You have to create a new price for the new amount, switch to the new price's ID, then update the old price to be inactive
                 * 3. Only this can be done - Cumbersome :(
                 */
                $priceList = $this->stripe->prices->all(['limit' => count($data)]);
                if (count($priceList['data']) > 0) {
                    foreach ($priceList['data'] as $priceRow) {
                        $this->stripe->prices->update($priceRow['id'], ['active' => false]);
                        $this->stripe->prices->update($priceRow['id'], ['active' => false]);
                    }
                }
                $this->stripe->prices->create($priceMonthly);
                $this->stripe->prices->create($priceYearly);
            } catch (Exception $e) {
                // echo '<pre>';
                echo ($e);
            }
        }

        $this->auth->response([
            'response' =>
            [
                'insert' => $j,
                'update' => $i
            ]
        ], [], 200);
    }
    public function checkoutSubscription()
    {
        try {
            $summary = json_decode($this->input->post('summary'));
            $discounts = $this->stripe->coupons->all(['limit' => 1]);
            $taxes = $this->stripe->taxRates->all(['limit' => 1]);
            $YOUR_DOMAIN = $this->config->item('app_domain') . 'billing';
            $billingCycle = $summary->cycle === "month" ? strtotime("+1 month") : strtotime("+1 year");
            // subscription
            $subscription = [
                'customer' => $summary->stripeCustomerId,
                'ui_mode' => 'embedded',
                'line_items' => [[
                    'price' => $summary->stripePriceId,
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'subscription_data' => [
                    'billing_cycle_anchor' => $billingCycle
                ],
                'return_url' => $YOUR_DOMAIN . '?session_id={CHECKOUT_SESSION_ID}',
            ];
            // discounts
            // "automatic_tax" => true
            if (isset($discounts['data']) && count($discounts['data'])) {
                $subscription['discounts'] = [['coupon' => $discounts['data'][0]['id']]];
            }
            // taxes
            // todo: taxes need to get activated from stripe, else below code wont work
            // if (isset($taxes['data']) && count($taxes['data'])) {
            //     $subscription['line_items'][0]['tax_rates'] = [$taxes['data'][0]['id']];
            // }
            $checkout_session = $this->stripe->checkout->sessions->create($subscription);
            $data['response'] = $checkout_session;
            $this->auth->response($data, [], 200);
        } catch (Exception $e) {
            // $this->auth->response([
            //     'response' => ['error' => error_get_last(), 'message' => 'Error in stripe connection']
            // ], [], 400);
            register_shutdown_function('errorResponse');
        }
    }
    public function checkoutSession()
    {
        try {
            $appId = $this->input->post('appId');
            $sessionId = $this->input->post('sessionId');
            $checkoutData = $this->stripe->checkout->sessions->retrieve($sessionId);
            $invoice = $this->stripe->invoices->retrieve($checkoutData['invoice'], []);
            $subscription = $this->stripe->subscriptions->retrieve($checkoutData['subscription'], []);

            $insert = array(
                'orderId' => null,
                'checkoutSessionId' => $checkoutData['id'],
                'customerId' => $checkoutData['customer'],
                'subscriptionId' => $checkoutData['subscription'],
                'invoiceId' => $checkoutData['invoice'],
                'invoiceNumber' => $invoice['number'],
                'discountAmount' => $checkoutData['total_details']['amount_discount'] / 100,
                'taxId' => '', // todo
                'taxAmount' => $checkoutData['total_details']['amount_tax'] / 100,
                'total' => $checkoutData['amount_total'] / 100,
                'currency' => $checkoutData['currency'],
                'customerName' => $checkoutData['customer_details']['name'],
                'customerEmail' => $checkoutData['customer_details']['email'],
                'cycleStart' => date("Y-m-d H:i:s", $subscription['current_period_start']),
                'cycleEnd' => date("Y-m-d H:i:s", $subscription['current_period_end']),
                'paymentStatus' => $checkoutData['payment_status'],
                'invoiceUrl' => $invoice['hosted_invoice_url'],
                'paidAt' => date("Y-m-d H:i:s", $invoice['status_transitions']['paid_at'])
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
            if ($checkoutData['payment_status'] === 'paid') {
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
                'message' => 'Unable to connect stripe'
            ];
            $this->auth->response($data, [], 200);
        }
    }
    public function test()
    {
        // print_r($_ENV);
        $sub = $this->stripe->subscriptions->retrieve('sub_1PG2UTSG6hEpjfQnb8l3wOVW', []);
        $inv = $this->stripe->invoices->retrieve('in_1PG2UTSG6hEpjfQn58AOpvwq', []);
        $data['response'] = ['subscription' => $sub, 'invoice' => $inv];
        $this->auth->response($data, [], 200);
    }
}
