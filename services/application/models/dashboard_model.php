<?php
if (!defined("BASEPATH")) {
  exit("No direct script access allowed");
}

class dashboard_model extends CI_Model
{
  public function __construct()
  {
    parent::__construct();
    $this->db = $this->load->database("default", true);
    $this->db->_protect_identifiers = false;
  }

  public function topTrends($post, $type, $area)
  {
    $query = $this->db
      ->select(
        $area === "CAT"
          ? ["sum(a.inc_exp_amount) as total", "b.inc_exp_cat_name as name", "c.bank_currency as currency"]
          : ["a.inc_exp_amount as total", "a.inc_exp_name as name", "c.bank_currency as currency"],
        false,
      )
      ->from("income_expense as a")
      ->join("income_expense_category as b", "a.inc_exp_category = b.inc_exp_cat_id")
      ->join("banks as c", "a.inc_exp_bank = c.bank_id")
      ->join("apps as d", "d.appId = a.inc_exp_appId")
      ->having("total >", 0)
      ->where("a.inc_exp_type", $type)
      ->where("MONTH(a.inc_exp_date)", $post["month"])
      ->where("YEAR(a.inc_exp_date)", $post["year"])
      ->where("d.tenant_id", $post["tenantId"])
      ->group_by("a.inc_exp_category")
      ->limit(10)
      ->get();
    return $query->num_rows() > 0 ? get_all_rows($query) : [["total" => "0.001", "name" => "Empty", "currency" => null]];
  }

  public function recentTransactions($post)
  {
    $query = $this->db
      ->select([
        'CONCAT(
                    a.inc_exp_date, 
                    if(a.inc_exp_type = "Cr", "<span class=""text-success ps-1"">&#8601;</span>", "<span class=""text-danger ps-1"">&#8599;</span>"),
                    "<sup class=""ps-1"">",
                    b.bank_currency,
                    "</sup>"
                ) as label',
        "sum(a.inc_exp_amount) as value",
      ])
      ->from("income_expense as a")
      ->join("banks as b", "a.inc_exp_bank = b.bank_id")
      ->join("apps as c", "c.appId = a.inc_exp_appId")
      ->limit(20)
      ->having("sum(a.inc_exp_amount) >", 0)
      ->order_by("label", "desc")
      ->group_by(["a.inc_exp_date", "a.inc_exp_type", "b.bank_currency"])
      ->where([
        "c.tenant_id" => $post["tenantId"],
      ])
      ->get();
    return get_all_rows($query);
  }

  public function topCcTrends($post, $type, $area)
  {
    $query = $this->db
      ->select(
        $area === "CAT"
          ? [
            $type === 0 ? "sum(a.cc_purchases) as total" : "sum(a.cc_payment_credits) as total",
            "b.inc_exp_cat_name as name",
            "c.credit_card_currency as currency",
          ]
          : [
            $type === 0 ? "a.cc_purchases as total" : "a.cc_payment_credits as total",
            "a.cc_transaction as name",
            "c.credit_card_currency as currency",
          ],
        false,
      )
      ->from("credit_card_transactions as a")
      ->join("income_expense_category as b", "a.cc_inc_exp_cat = b.inc_exp_cat_id")
      ->join("credit_cards as c", "a.cc_for_card = c.credit_card_id")
      ->join("apps as d", "d.appId = c.credit_card_appId")
      ->having($type === 0 ? "sum(a.cc_purchases) >" : "sum(a.cc_payment_credits) >", 0)
      ->where("MONTH(a.cc_date)", $post["month"])
      ->where("YEAR(a.cc_date)", $post["year"])
      ->where("d.tenant_id", $post["tenantId"])
      ->group_by("a.cc_inc_exp_cat")
      ->limit(10)
      ->get();
    return $query->num_rows() > 0 ? get_all_rows($query) : [["total" => "0.001", "name" => "Empty", "currency" => null]];
  }

  public function searchTopics($searchString, $tenantId)
  {
    $search = htmlentities($searchString);
    $limit = 3;
    $query = $this->db->query(
      '
            SELECT * from (
                (SELECT 
                    concat("cat_",inc_exp_cat_id) as id,
                    inc_exp_cat_name as name,
                    "category" as type,
                    CONCAT("/category?fetch=category", "&categoryId=", inc_exp_cat_id, "&startDate=", DATE_FORMAT(NOW() ,"%Y-%m-01"), "&endDate=", LAST_DAY(DATE_FORMAT(NOW() ,"%Y-%m-01"))) as target,
                    b.tenant_id as tenantId
                FROM income_expense_category as a
                JOIN apps as b ON b.appId = a.inc_exp_cat_appId
                WHERE inc_exp_cat_name LIKE "%' .
        $search .
        '%" AND inc_exp_cat_appId = (select appId from apps where tenant_id = "' .
        $tenantId .
        '")
        GROUP BY name LIMIT ' .
        $limit .
        '
                )
                UNION DISTINCT
                (SELECT 
                    concat("bank_",bank_id) as id,
                    bank_name as name,
                    "bank" as type,
                    CONCAT("/bank?fetch=bank", "&bankId=", bank_id, "&startDate=", DATE_FORMAT(NOW() ,"%Y-%m-01"), "&endDate=", LAST_DAY(DATE_FORMAT(NOW() ,"%Y-%m-01"))) as target,
                    b.tenant_id as tenantId
                FROM banks as a
                JOIN apps as b ON b.appId = a.bank_appId
                WHERE bank_name LIKE "%' .
        $search .
        '%" AND bank_appId = (select appId from apps where tenant_id = "' .
        $tenantId .
        '") GROUP BY name LIMIT ' .
        $limit .
        '
                )
                UNION DISTINCT
                (SELECT 
                    concat("inc_exp_",inc_exp_id) as id,
                    inc_exp_name as name,
                    "bankTransactions" as type,
                    CONCAT("/moneyPlanner?fetch=bankTransactions","&date=", inc_exp_date, "&bank=", inc_exp_bank, "&search=", inc_exp_name) as target,
                    b.tenant_id as tenantId
                FROM income_expense as a
                JOIN apps as b ON b.appId = a.inc_exp_appId
                WHERE (inc_exp_name LIKE "%' .
        $search .
        '%" OR inc_exp_comments LIKE "%' .
        $search .
        '%") AND inc_exp_appId = (select appId from apps where tenant_id = "' .
        $tenantId .
        '") GROUP BY name LIMIT ' .
        $limit .
        '
                )
                UNION DISTINCT
                (SELECT 
                    concat("card_",credit_card_id) as id,
                    credit_card_name as name,
                    "creditCard" as type,
                    CONCAT("/creditCard?fetch=creditCard", "&creditCardId=", credit_card_id, "&startDate=", DATE_FORMAT(NOW() ,"%Y-%m-01"), "&endDate=", LAST_DAY(DATE_FORMAT(NOW() ,"%Y-%m-01"))) as target,
                    b.tenant_id as tenantId
                FROM credit_cards as a
                JOIN apps as b ON b.appId = a.credit_card_appId
                WHERE credit_card_name LIKE "%' .
        $search .
        '%" AND credit_card_appId = (select appId from apps where tenant_id = "' .
        $tenantId .
        '") GROUP BY name LIMIT ' .
        $limit .
        '
                )
                UNION DISTINCT
                (SELECT 
                    concat("cc_trx_",cc_id) as id,
                    cc_transaction as name,
                    "ccTransactions" as type,
                    CONCAT("/moneyPlanner?fetch=ccTransactions&date=", cc_date, "&card=", cc_for_card, "&search=", cc_transaction) as target,
                    b.tenant_id as tenantId
                FROM credit_card_transactions as a
                JOIN apps as b ON b.appId = a.cc_appId
                WHERE (cc_transaction LIKE "%' .
        $search .
        '%" OR cc_comments LIKE "%' .
        $search .
        '%") AND cc_appId = (select appId from apps where tenant_id = "' .
        $tenantId .
        '") GROUP BY name LIMIT ' .
        $limit .
        '
                )
                UNION DISTINCT
                (SELECT 
                    concat("wb_",wb_id) as id,
                    wb_name as name,
                    "workbook" as type,
                    CONCAT("/workbook?fetch=workbook&wbId=", wb_id) as target,
                    b.tenant_id as tenantId
                FROM workbook as a
                JOIN apps as b ON b.appId = a.wb_appId
                WHERE wb_name LIKE "%' .
        $search .
        '%" AND wb_appId = (select appId from apps where tenant_id = "' .
        $tenantId .
        '") GROUP BY name LIMIT ' .
        $limit .
        '
                )
            ) AS DATA WHERE DATA.tenantId = "' .
        $tenantId .
        '"
        ',
    );
    // echo $this->db->last_query();
    if ($query->num_rows() > 0) {
      $array = [];
      foreach ($query->result_array() as $row) {
        $array[$row["type"]][] = $row;
      }
      return $array;
    } else {
      return [];
    }
  }
}
