<?php
if (!defined("BASEPATH")) {
  exit("No direct script access allowed");
}
include "./vendor/autoload.php";

use Razorpay\Api\Api;
use Razorpay\Api\Errors;

class plan_model extends CI_Model
{
  public $razorPayTestApi;
  public $razorPayLiveApi;
  public $razorPayApi;
  public function __construct()
  {
    parent::__construct();
    @$this->db = $this->load->database("default", true);
    $this->razorPayTestApi = new Api($this->config->item("razorpay_test_key_id"), $this->config->item("razorpay_test_key_secret"));
    $this->razorPayLiveApi = new Api($this->config->item("razorpay_live_key_id"), $this->config->item("razorpay_live_key_secret"));
    $this->razorPayApi =
      $_ENV["APP_ENV"] === "production"
        ? new Api($this->config->item("razorpay_live_key_id"), $this->config->item("razorpay_live_key_secret"))
        : new Api($this->config->item("razorpay_test_key_id"), $this->config->item("razorpay_test_key_secret"));
  }
  public function throwException($e)
  {
    $errors = [
      "CODE" => $e->getCode(),
      "MESSAGE" => $e->getMessage(),
      "FILE" => $e->getFile(),
      "LINE" => $e->getLine(),
      "STRING_TRACE" => $e->getTraceAsString(),
    ];

    if ($_ENV["APP_ENV"] !== "local") {
      $object = (object) [
        "name" => "ErrorHandler",
        "email" => "errorHandler@ledgerely.com",
        "source" => "BE",
        "type" => "PhpError",
        "description" => json_encode($errors),
        "userId" => "XXX",
        "time" => date("Y-m-d\TH:i:s"),
        "ip" => $_SERVER["REMOTE_ADDR"],
      ];
      $this->saveLog($object);
    }
    return $errors;
  }
  public function planList()
  {
    $query = $this->db
      ->order_by("planSortOrder asc")
      ->get_where("plans", ["planIsActive" => "1", "planPriceMonthly >" => 0, "planPriceYearly >" => 0]);
    return get_all_rows($query);
  }
  public function getPricingCurrencies()
  {
    $query = $this->db
      ->select(["DISTINCT priceCurrency as currency"], false)
      ->from("prices")
      ->get();
    return get_all_rows($query);
  }
  public function getPrice($field)
  {
    $ip = gethostbyname("api.razorpay.com");
    if (!filter_var($ip, FILTER_VALIDATE_IP) === false) {
      return $this->razorPayApi->plan->fetch($field)->toArray()["item"]["amount"] / 100;
    }
    return null;
  }
  public function availableBillingPlans($appId, $currency)
  {
    try {
      $razorPayFieldName = $_ENV["APP_ENV"] === "production" ? "priceRazorPayLiveId" : "priceRazorPayTestId";
      $query = $this->db
        ->select(
          [
            "a.planId",
            "a.planName",
            "a.planCode",
            "a.planTitle",
            "a.planDescription",
            'IFNULL((SELECT priceCurrencySymbol FROM prices WHERE priceCurrency = "' .
            $currency .
            '" limit 1),(SELECT priceCurrencySymbol FROM prices WHERE priceCurrency = "INR" limit 1)) AS planPriceCurrencySymbol',
            "0 AS planPriceMonthly",
            "0 AS planPriceYearly",
            "a.planTrxLimit",
            "a.planCreditCardTrxLimit",
            "a.planUsersLimit",
            "a.planCategoriesLimit",
            "a.planIsBulkImport",
            "a.planBankAccountsLimit",
            "a.planCreditCardAccounts",
            "a.planStorageLimit",
            "a.planDatasourceLimit",
            "a.planWorkbookLimit",
            "a.planTemplateLimit",
            "a.planIsPredictions",
            "a.planIsEmailAlerts",
            "a.planIsTransactionSearch",
            "(select count(*) from planBasedCharts where planId = a.planId) as visualizationLimit",
            '(select 
                CASE 
                WHEN 
                    (usersSize <= a.planUsersLimit IS NULL OR usersSize <= a.planUsersLimit IS TRUE) AND
                    (incomeExpenseTransactionSize <= a.planTrxLimit IS NULL OR incomeExpenseTransactionSize <= a.planTrxLimit IS TRUE) AND
                    (creditCardTransactionSize <= a.planCreditCardTrxLimit IS NULL OR creditCardTransactionSize <= a.planCreditCardTrxLimit IS TRUE) AND
                    (categoriesSize <= a.planCategoriesLimit IS NULL OR categoriesSize <= a.planCategoriesLimit IS TRUE) AND
                    (bankAccountsSize <= a.planBankAccountsLimit IS NULL OR bankAccountsSize <= a.planBankAccountsLimit IS TRUE) AND
                    (creditCardsSize <= a.planCreditCardAccounts IS NULL OR creditCardsSize <= a.planCreditCardAccounts IS TRUE) AND
                    (storageSize <= a.planStorageLimit IS NULL OR storageSize <= a.planStorageLimit IS TRUE) AND
                    (dataSourceSize <= a.planDatasourceLimit IS NULL OR dataSourceSize <= a.planDatasourceLimit IS TRUE) AND
                    (workbookSize <= a.planWorkbookLimit IS NULL OR workbookSize <= a.planWorkbookLimit IS TRUE) AND
                    (templateSize <= a.planTemplateLimit IS NULL OR templateSize <= a.planTemplateLimit IS TRUE)
                THEN 1 ELSE 0 END
            from apps where appId = "' .
            $appId .
            '") as isPlanOptable',
            "(SELECT " .
            $razorPayFieldName .
            ' from prices where priceFrequency = "month" AND pricePlanId = a.planId AND priceCurrency = "' .
            $currency .
            '") as pricingMonthId',
            "(SELECT " .
            $razorPayFieldName .
            ' from prices where priceFrequency = "year" AND pricePlanId = a.planId AND priceCurrency = "' .
            $currency .
            '") as pricingYearId',
          ],
          false,
        )
        ->from("plans as a")
        ->join("planBasedCharts as b", "b.planId = a.planId", "LEFT")
        ->join("apps as c", "c.appsPlanId = a.planId", "LEFT")
        ->where(["a.planIsActive" => "1"])
        ->order_by("a.planSortOrder asc")
        ->group_by(["a.planId"])
        ->get();

      if ($query->num_rows() > 0) {
        $array = [];
        foreach ($query->list_fields() as $field) {
          $i = 0;
          foreach ($query->result_array() as $row) {
            // check boolean
            if (in_array($field, ["planIsBulkImport", "planIsPredictions", "planIsEmailAlerts", "planIsTransactionSearch", "isPlanOptable"])) {
              $output = $row[$field] === "1";
            }
            if (in_array($field, ["planPriceMonthly", "planPriceYearly"])) {
              $key = [
                "planPriceMonthly" => "pricingMonthId",
                "planPriceYearly" => "pricingYearId",
              ];
              $output = is_null($row[$key[$field]]) ? null : $this->getPrice($row[$key[$field]]);
            }
            // check null or number
            if (
              in_array($field, [
                "planTrxLimit",
                "planCreditCardTrxLimit",
                "planUsersLimit",
                "planCategoriesLimit",
                "planBankAccountsLimit",
                "planCreditCardAccounts",
                "planStorageLimit",
                "planDatasourceLimit",
                "planWorkbookLimit",
                "planTemplateLimit",
                "visualizationLimit",
              ])
            ) {
              $output = is_null($row[$field]) ? null : (float) $row[$field];
            }
            // check string
            if (
              in_array($field, [
                "planId",
                "planName",
                "planCode",
                "planTitle",
                "planDescription",
                "planPriceCurrencySymbol",
                "pricingMonthId",
                "pricingYearId",
              ])
            ) {
              $output = $row[$field];
            }
            $array[$i][$field] = $output;
            $i++;
          }
        }
        return $array;
      } else {
        return [];
      }
    } catch (Errors\Error $e) {
      return [null, $this->throwException($e)];
    }
  }
  public function checkIsNewCustomer($custId)
  {
    $query = $this->db->get_where("orders", ["customerId" => $custId, "paymentStatus" => "paid"]);
    return $query->num_rows() < 1;
  }
  public function checkDiscounts($custId)
  {
    try {
      if ($this->checkIsNewCustomer($custId)) {
        return [
          "name" => "",
          "value" => 0,
          "all" => ["percentOff" => 0, "name" => ""],
        ];
      } else {
        return ["name" => "", "value" => 0, "all" => []];
      }
    } catch (Error $e) {
      return ["name" => "", "value" => 0, "error" => $e];
    }
  }
  public function checkTaxes()
  {
    try {
      // Note: taxes is disabled for now. Later once company registered as firm, please add
      $taxes = false;
      if ($taxes) {
        return ["name" => "", "value" => 0, "all" => []];
      } else {
        return ["name" => "", "value" => 0];
      }
    } catch (Exception $e) {
      return ["name" => "", "value" => 0];
    }
  }
  public function deductExhaustedUsage($razorPayCustomerId, $razorPayPlanId)
  {
    try {
      $search = 100;
      if ($search) {
        return [
          "adjustmentCredit" => 0,
          "utilized" => 0,
        ];
      } else {
        return [
          "adjustmentCredit" => 0,
          "utilized" => 0,
        ];
      }
    } catch (Exception $e) {
      return [
        "adjustmentCredit" => 0,
        "utilized" => 0,
      ];
    }
  }
  public function accountClosure($post)
  {
    $this->db->trans_start();
    $this->db->insert("closure", [
      "closeId" => null,
      "closeAppId" => $post["appId"],
      "closeSelections" => $post["selections"],
      "closeComments" => $post["comments"],
      "closeRequestedDate" => $post["dateTime"],
    ]);
    $this->db->trans_complete();
    return $this->db->trans_status() === false ? false : true;
  }
  public function checkClosure($appId)
  {
    $query = $this->db->select("count(*) as count", false)->get_where("closure", ["closeAppId" => $appId]);
    if ($query->num_rows() > 0) {
      $result = $query->row();
      return (int) $result->count > 0;
    } else {
      return false;
    }
  }
  public function revokeAccount($appId)
  {
    $query = $this->db->delete("closure", ["closeAppId" => $appId]);
    return $this->db->affected_rows() > 0;
  }
}
