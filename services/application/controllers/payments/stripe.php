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
    public function createSubscription()
    {
        try {
            $stripe = new \Stripe\StripeClient($this->stripeConfig['secret_key']);
            // create customer
            // $cust = $stripe->customers->create([
            //     'name' => 'Dheeraj B',
            //     'email' => 'dheeraj@bharani.tech',
            // ]);
            // create product
            // create subscription
            // $price = $stripe->prices->create([
            //     'product' => $product['id'],
            //     'recurring' => ['interval' => 'month'],
            //     'unit_amount' => 2000,
            //     'currency' => 'inr',
            //     'tax_behavior' => 'inclusive'
            // ]);
            // $stripe->subscriptions->create([
            //     'customer' => $cust['id'],
            //     'items' => [['price' => $price['id']]],
            // ]);
            print_r(['success']);
        } catch (Exception $e) {
            $m = $e->getMessage();
        }
    }
}
