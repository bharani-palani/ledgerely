<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
include('./vendor/autoload.php');

class plan_model extends CI_Model
{
    public $stripeConfig;
    public function __construct()
    {
        parent::__construct();
        @$this->db = $this->load->database('default', true);
        $this->stripeConfig = ([
            "secret_key" => $this->config->item('stripe_secret_key'),
            "public_key" => $this->config->item('stripe_publishable_key')
        ]);
        $this->stripe = new \Stripe\StripeClient($this->stripeConfig['secret_key']);;
    }
    public function planList()
    {
        $query = $this->db
            ->order_by(
                'planSortOrder asc'
            )->get_where('plans', ['planIsActive' => '1', 'planPriceMonthly >' => 0, 'planPriceYearly >' => 0]);
        return get_all_rows($query);
    }
    public function getPricingCurrencies()
    {
        $query = $this->db
            ->select(array('DISTINCT priceCurrency as currency'), false)
            ->from('prices')
            ->get();
        return get_all_rows($query);
    }
    public function availableBillingPlans($appId, $currency, $env)
    {
        $stripeFieldName = $env === "development" ? 'priceStripeTestId' : 'priceStripeLiveId';
        $query = $this->db
            ->select(array(
                'a.planId',
                'a.planName',
                'a.planCode',
                'a.planTitle',
                'a.planDescription',
                'IFNULL((SELECT priceCurrencySymbol FROM prices WHERE priceCurrency = "' . $currency . '" limit 1),(SELECT priceCurrencySymbol FROM prices WHERE priceCurrency = "INR" limit 1)) AS planPriceCurrencySymbol',
                'IFNULL((SELECT priceAmount FROM prices WHERE priceFrequency = "month" AND pricePlanId = a.planId AND priceCurrency = "' . $currency . '"),(SELECT priceAmount FROM prices WHERE priceFrequency = "month" AND pricePlanId = a.planId AND priceCurrency = "INR")) AS planPriceMonthly',
                'IFNULL((SELECT priceAmount FROM prices WHERE priceFrequency = "year" AND pricePlanId = a.planId AND priceCurrency = "' . $currency . '"),(SELECT priceAmount FROM prices WHERE priceFrequency = "year" AND pricePlanId = a.planId AND priceCurrency = "INR")) AS planPriceYearly',
                'a.planTrxLimit',
                'a.planCreditCardTrxLimit',
                'a.planUsersLimit',
                'a.planCategoriesLimit',
                'a.planIsBulkImport',
                'a.planBankAccountsLimit',
                'a.planCreditCardAccounts',
                'a.planStorageLimit',
                'a.planDatasourceLimit',
                'a.planWorkbookLimit',
                'a.planTemplateLimit',
                'a.planIsPredictions',
                'a.planIsEmailAlerts',
                'a.planIsTransactionSearch',
                'count(b.chartKey) as visualizationLimit',
                '(select 
                    CASE 
                    WHEN 
                        (usersSize < a.planUsersLimit IS NULL OR usersSize < a.planUsersLimit IS TRUE) AND
                        (incomeExpenseTransactionSize < a.planTrxLimit IS NULL OR incomeExpenseTransactionSize < a.planTrxLimit IS TRUE) AND
                        (creditCardTransactionSize < a.planCreditCardTrxLimit IS NULL OR creditCardTransactionSize < a.planCreditCardTrxLimit IS TRUE) AND
                        (categoriesSize < a.planCategoriesLimit IS NULL OR categoriesSize < a.planCategoriesLimit IS TRUE) AND
                        (bankAccountsSize < a.planBankAccountsLimit IS NULL OR bankAccountsSize < a.planBankAccountsLimit IS TRUE) AND
                        (creditCardsSize < a.planCreditCardAccounts IS NULL OR creditCardsSize < a.planCreditCardAccounts IS TRUE) AND
                        (storageSize < a.planStorageLimit IS NULL OR storageSize < a.planStorageLimit IS TRUE) AND
                        (dataSourceSize < a.planDatasourceLimit IS NULL OR dataSourceSize < a.planDatasourceLimit IS TRUE) AND
                        (workbookSize < a.planWorkbookLimit IS NULL OR workbookSize < a.planWorkbookLimit IS TRUE) AND
                        (templateSize < a.planTemplateLimit IS NULL OR templateSize < a.planTemplateLimit IS TRUE)
                    THEN 1 ELSE 0 END
                from apps where appId = "' . $appId . '") as isPlanOptable',
                '(SELECT ' . $stripeFieldName . ' from prices where priceFrequency = "month" AND pricePlanId = a.planId AND priceCurrency = "' . $currency . '") as pricingMonthStripeId',
                '(SELECT ' . $stripeFieldName . ' from prices where priceFrequency = "year" AND pricePlanId = a.planId AND priceCurrency = "' . $currency . '") as pricingYearStripeId'
            ), false)
            ->from('plans as a')
            ->join('planBasedCharts as b', 'b.planId = a.planId', 'LEFT')
            ->join('apps as c', 'c.appsPlanId = a.planId', 'LEFT')
            ->where(array('a.planIsActive' => '1'))
            ->order_by('a.planSortOrder asc')
            ->group_by(['a.planId'])
            ->get();

        if ($query->num_rows() > 0) {
            $array = array();
            foreach ($query->list_fields() as $field) {
                $i = 0;
                foreach ($query->result_array() as $row) {
                    // check boolean
                    if (in_array($field, ['planIsBulkImport', 'planIsPredictions', 'planIsEmailAlerts', 'planIsTransactionSearch', 'isPlanOptable'])) {
                        $output = $row[$field] === '1';
                    }
                    // check null or number
                    if (in_array($field, [
                        'planPriceMonthly', 'planPriceYearly', 'planTrxLimit', 'planCreditCardTrxLimit', 'planUsersLimit',
                        'planCategoriesLimit', 'planBankAccountsLimit', 'planCreditCardAccounts',
                        'planStorageLimit', 'planDatasourceLimit', 'planWorkbookLimit', 'planTemplateLimit', 'visualizationLimit',
                    ])) {
                        $output = is_null($row[$field]) ? null : (float)$row[$field];
                    }
                    // check string
                    if (in_array($field, ['planId', 'planName', 'planCode', 'planTitle', 'planDescription', 'planPriceCurrencySymbol', 'pricingMonthStripeId', 'pricingYearStripeId'])) {
                        $output = $row[$field];
                    }
                    $array[$i][$field] = $output;
                    $i++;
                }
            }
            return $array;
        } else {
            return array();
        }
    }
    public function checkIsNewCustomer($stripeCustId)
    {
        $query = $this->db->get_where("stripeOrders", ['customerId' => $stripeCustId, 'paymentStatus' => 'paid']);
        return $query->num_rows() < 1;
    }
    public function checkDiscounts($stripeCustId)
    {
        try {
            if ($this->checkIsNewCustomer($stripeCustId)) {
                $discounts = $this->stripe->coupons->all(['limit' => 1]);
                if (isset($discounts['data']) && count($discounts['data']) > 0) {
                    return ['name' => $discounts['data'][0]['name'], 'value' => $discounts['data'][0]['percent_off'], 'all' => $discounts['data']];
                } else {
                    return ['name' => '', 'value' => 0, 'all' => []];
                }
            } else {
                return ['name' => '', 'value' => 0, 'all' => []];
            }
        } catch (Exception $e) {
            return ['name' => '', 'value' => 0, 'all' => []];
        }
    }
    public function checkTaxes()
    {
        try {
            $taxes = $this->stripe->taxRates->all(['limit' => 1]);
            if (isset($taxes['data']) && count($taxes['data']) > 0) {
                return ['name' => $taxes['data'][0]['description'], 'value' => $taxes['data'][0]['percentage'], 'all' => $taxes['data']];
            } else {
                return ['name' => '', 'value' => 0];
            }
        } catch (Exception $e) {
            return ['name' => '', 'value' => 0];
        }
    }
    public function deductExhaustedUsage($stripeCustomerId, $stripePriceId)
    {
        try {
            \Stripe\Stripe::setApiKey($this->stripeConfig['secret_key']);
            $search = $this->stripe->subscriptions->all(['price' => $stripePriceId, 'status' => 'active', 'limit' => 1]);
            if (isset($search['data']) && isset($search['data'][0]['items']['data'][0])) {
                $subscriptionId = $search['data'][0]['id'];
                $invoiceId = $search['data'][0]['items']['data'][0]['id'];

                $items = [
                    [
                        'id' => $invoiceId,
                        'price' => $stripePriceId,
                    ],
                ];

                $proration_date = time();
                $invoice = \Stripe\Invoice::upcoming([
                    'customer' => $stripeCustomerId,
                    'subscription' => $subscriptionId,
                    'subscription_items' => $items,
                    'subscription_proration_date' => $proration_date,
                ]);
                $invoiceData = $invoice->lines->data;
                $adjustmentCredit = array_key_exists(0, $invoiceData) ? $invoiceData[0]['amount'] / 100 : 0;
                $utilized = array_key_exists(1, $invoiceData) ? $invoiceData[1][0]['amount'] / 100 : 0;

                return [
                    'adjustmentCredit' => $adjustmentCredit < 0 ? $adjustmentCredit : 0,
                    'utilized' => $utilized
                ];
            } else {
                return [
                    'adjustmentCredit' => 0,
                    'utilized' => 0,
                ];
            }
        } catch (Exception $e) {
            return [
                'adjustmentCredit' => 0,
                'utilized' => 0,
            ];
        }
    }
    public function accountClosure($post)
    {
        $this->db->trans_start();
        $this->db->insert('closure', [
            'closeId' => NULL,
            'closeAppId' => $post['appId'],
            'closeSelections' => $post['selections'],
            'closeComments' => $post['comments'],
            'closeRequestedDate' => $post['dateTime'],
        ]);
        $this->db->trans_complete();
        return $this->db->trans_status() === false ? false : true;
    }
    public function checkClosure($appId)
    {
        $query = $this->db
            ->select('count(*) as count', false)
            ->get_where('closure', ['closeAppId' => $appId]);
        if ($query->num_rows() > 0) {
            $result = $query->row();
            return (int)$result->count > 0;
        } else {
            return false;
        }
    }
    public function revokeAccount($appId)
    {
        $query = $this->db->delete('closure', ['closeAppId' => $appId]);
        return $this->db->affected_rows() > 0;
    }
}
