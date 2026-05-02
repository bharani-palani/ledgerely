<?php
defined("BASEPATH") or exit("No direct script access allowed");
class account_planner extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model("account_planner_model");
    $this->load->library("../controllers/auth");
    $this->auth->validateToken();
  }
  public function inc_exp_list()
  {
    $data["response"] = $this->account_planner_model->inc_exp_list($this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function bank_list()
  {
    $data["response"] = $this->account_planner_model->bank_list($this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function getBankDetails()
  {
    $data["response"] = $this->account_planner_model->getBankDetails($this->input->post("bank"), $this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function credit_card_list()
  {
    $data["response"] = $this->account_planner_model->credit_card_list($this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function year_list()
  {
    $data["response"] = $this->account_planner_model->year_list($this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function cc_year_list()
  {
    $data["response"] = $this->account_planner_model->cc_year_list($this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function credit_card_details()
  {
    $data["response"] = $this->account_planner_model->credit_card_details($this->input->post("bank"), $this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function getIncExpTemplate()
  {
    $data["response"] = $this->account_planner_model->getIncExpTemplate($this->input->post("tenantId"), $this->input->post("monthYear"));
    $this->auth->response($data, [], 200);
  }
  public function getScheduleTotals()
  {
    $data["response"] = $this->account_planner_model->getScheduleTotals($this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function getCreditCardChartData()
  {
    $post = [
      "startDate" => $this->input->post("startDate"),
      "endDate" => $this->input->post("endDate"),
      "card" => $this->input->post("card"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data["response"] = $this->account_planner_model->getCreditCardChartData($post);
    $this->auth->response($data, [], 200);
  }
  public function getIncExpChartData()
  {
    $post = [
      "startDate" => $this->input->post("startDate"),
      "endDate" => $this->input->post("endDate"),
      "bank" => $this->input->post("bank"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data["response"] = $this->account_planner_model->getIncExpChartData($post);
    $this->auth->response($data, [], 200);
  }
  public function getPlanDetails()
  {
    $post = [
      "startDate" => $this->input->post("startDate"),
      "endDate" => $this->input->post("endDate"),
      "bankSelected" => $this->input->post("bankSelected"),
      "criteria" => $this->input->post("criteria"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data = $this->account_planner_model->getPlanDetails($post);
    $op["response"] = $data["result"];
    $this->auth->response($op, ["query" => $data["query"]], 200);
  }
  public function getPlanSum()
  {
    $post = [
      "startDate" => $this->input->post("startDate"),
      "endDate" => $this->input->post("endDate"),
      "bank" => $this->input->post("bank"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data["response"] = $this->account_planner_model->getPlanSum($post);
    $this->auth->response($data, [], 200);
  }
  public function getAccountPlanner()
  {
    $post = [
      "TableRows" => $this->input->post("TableRows"),
      "Table" => $this->input->post("Table"),
      "searchString" => $this->input->post("searchString"),
      "limit" => $this->input->post("limit"),
      "start" => $this->input->post("start"),
      "WhereClause" => $this->input->post("WhereClause"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data["response"] = $this->account_planner_model->getAccountPlanner($post);
    $this->auth->response($data, [], 200);
  }

  public function postAccountPlanner()
  {
    $post = [
      "postData" => $this->input->post("postData"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data["response"] = $this->account_planner_model->postAccountPlanner($post);
    $this->auth->response($data, [], 200);
  }
  public function getTotalHoldings()
  {
    $data["response"] = $this->account_planner_model->getTotalHoldings($this->input->post("tenantId"));
    $this->auth->response($data, [], 200);
  }
  public function runQuery()
  {
    $postData = $this->input->post("postData");
    $postData = str_replace("{%}", "%", $postData);
    $data["response"] = $this->account_planner_model->runQuery($postData);
    $this->auth->response($data, ["query" => $postData], 200);
  }
  public function postFundTransfer()
  {
    $post = [
      "amount" => $this->input->post("amount"),
      "source" => $this->input->post("source"),
      "dest" => $this->input->post("dest"),
      "description" => $this->input->post("description"),
      "category" => $this->input->post("category"),
      "date" => $this->input->post("date"),
      "dateTime" => $this->input->post("dateTime"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data["response"] = $this->account_planner_model->postFundTransfer($post);
    $this->auth->response($data, [], 200);
  }
  public function getFundDetails()
  {
    $post = [
      "id" => $this->input->post("id"),
      "tenantId" => $this->input->post("tenantId"),
    ];
    $data["response"] = $this->account_planner_model->getFundDetails($post);
    $this->auth->response($data, [], 200);
  }
  public function searchString($array, $value)
  {
    $result = null;
    foreach ($array as $object) {
      if ($object["value"] === $value) {
        $result = $object;
        break;
      }
    }
    unset($object);
    return $result["id"] ?? false;
  }
  public function bulkImport()
  {
    $tenantId = $this->input->post("tenantId");
    $post = $this->input->post("data");
    $post = json_decode($post, true);
    $categories = $this->account_planner_model->inc_exp_list($tenantId);
    $banks = $this->account_planner_model->bank_list($tenantId);
    $activeIncomeList = $this->account_planner_model->active_category_income_list($tenantId);

    $CI = &get_instance();
    $CI->load->model("home_model");
    $appId = $CI->home_model->getAppIdFromTenantId($tenantId);

    foreach ($post as $key => $value) {
      $post[$key]["inc_exp_appId"] = $appId;
      $post[$key]["inc_exp_added_at"] = date("Y-m-d H:i:s");
      if (array_key_exists("inc_exp_id", $post[$key])) {
        $post[$key]["inc_exp_id"] = null;
      }
      if (array_key_exists("inc_exp_category", $post[$key])) {
        $searchValue = $post[$key]["inc_exp_category"];
        $post[$key]["inc_exp_category"] = $this->searchString($categories, $searchValue);
      }
      if (array_key_exists("inc_exp_bank", $post[$key])) {
        $searchValue = $post[$key]["inc_exp_bank"];
        $post[$key]["inc_exp_bank"] = $this->searchString($banks, $searchValue);
      }
      $post[$key]["inc_exp_is_income_metric"] = in_array($post[$key]["inc_exp_category"], $activeIncomeList) ? "1" : null;
      $isPlanMetric = $this->account_planner_model->findById($categories, $post[$key]["inc_exp_category"], "id", "isPlanMetric") ?: 0;
      $post[$key]["inc_exp_is_planned"] = $isPlanMetric;
    }
    $filteredArray = array_filter($post, function ($val) {
      return $val["inc_exp_bank"] !== false && $val["inc_exp_category"] !== false;
    });
    if (count($filteredArray) > 0) {
      $data["response"] = $this->account_planner_model->bulkImport($appId, $filteredArray);
      $this->auth->response($data, [], 200);
    } else {
      $data["response"] = false;
      $this->auth->response($data, [], 404);
    }
  }
  public function createHash($minLength = 20, $maxLength = 36)
  {
    if ($minLength > $maxLength) {
      return "Invalid length parameters, minLength should be less than or equal to maxLength";
    }
    $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    $length = random_int($minLength, $maxLength);
    $randomString = "";
    for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[random_int(0, strlen($characters) - 1)];
    }
    return "tenant_" . $randomString;
  }
  private function _genTenantIdRecursive($minLength = 20, $maxLength = 36, $depth = 0, $maxDepth = 100)
  {
    if ($depth > $maxDepth) {
      for ($i = 0; $i < $maxDepth; $i++) {
        $tenantId = $this->createHash($minLength, $maxLength);
        $query = $this->db->select("tenant_id")->from("apps")->where("tenant_id", $tenantId)->limit(1)->get();
        if ($query && $query->num_rows() === 0) {
          return $tenantId;
        }
      }
      return "Could not generate unique tenant id after recursion and depth attempts";
    }
    $tenantId = $this->createHash($minLength, $maxLength);
    $query = $this->db->select("tenant_id")->from("apps")->where("tenant_id", "tenant_Oxrkuar1sOQlXLT6lclngQSxODYdvy7cn")->limit(1)->get();
    if ($query && $query->num_rows() === 0) {
      return $tenantId;
    } else {
      return $this->_genTenantIdRecursive($minLength, $maxLength, $depth + 1, $maxDepth);
    }
  }
  // usage $this->_genTenantIdRecursive(36)
}
