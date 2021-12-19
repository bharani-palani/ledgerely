<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
class account_planner_model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->db = $this->load->database('default', true);
		$this->db->_protect_identifiers = false;
	}
	public function vendor_list()
	{
		$query = $this->db->select(array("vendor_id as id", "vendor_name as value"))->order_by("vendor_name")->get('vendors');
		return get_all_rows($query);
	}
	public function inc_exp_list()
	{
		$query = $this->db->select(array("inc_exp_cat_id as id", "inc_exp_cat_name as value"))->order_by("inc_exp_cat_name")->get('income_expense_category');
		return get_all_rows($query);
	}
	public function bank_list()
	{
		$query = $this->db
			->select(array("bank_id as id", "bank_name as value"))
			->order_by("isPrimaryAccount desc")
			->get('banks');
		return get_all_rows($query);
	}
	public function credit_card_list()
	{
		$query = $this->db->select(array("credit_card_id as id", "credit_card_name as value"))->order_by("credit_card_name")->get('credit_cards');
		return get_all_rows($query);
	}
	public function year_list()
	{
		$query = $this->db->select(array("DISTINCT DATE_FORMAT(inc_exp_date, '%Y') as id", "DATE_FORMAT(inc_exp_date, '%Y') as value"), false)->order_by("id desc")->get('income_expense');
		return get_all_rows($query);
	}
	public function cc_year_list()
	{
		// $query = $this->db->select(array("DISTINCT DATE_FORMAT(cc_date, '%Y') + 1 as id", "DATE_FORMAT(cc_date, '%Y') + 1 as value"), false)->order_by("id desc")->get('credit_card_transactions');
		// return get_all_rows($query);
		$sql = "SELECT 
			DISTINCT DATE_FORMAT(cc_date, '%Y') - 1 as id, 
			DATE_FORMAT(cc_date, '%Y') - 1 as value
		FROM `credit_card_transactions`
		UNION
		SELECT 
			DISTINCT DATE_FORMAT(cc_date, '%Y') + 1 as id, 
			DATE_FORMAT(cc_date, '%Y') + 1 as value
		FROM `credit_card_transactions`
		order by id DESC";
		$query = $this->db->query($sql);
		return array("result" => get_all_rows($query));
	}
	public function credit_card_details($bank)
	{
		$this->db
			->select(
				array(
				"credit_card_id", 
				"credit_card_name", 
				"CONCAT(substring(credit_card_number, 1, 4), ' XXXX XXXX ',substring(credit_card_number, -4, 4)) as credit_card_number", 
				"credit_card_start_date", 
				"credit_card_end_date", 
				"credit_card_payment_date"
				), false
			)
			->from('credit_cards')
			->where(array("credit_card_id" => $bank));
		$query = $this->db->get();
		return get_all_rows($query);
	}
	function getIncExpTemplate()
	{
		$query = $this->db->get('income_expense_template');
		return get_all_rows($query);
	}
	function getIncExpChartData($post)
	{
		$startDate = $post['startDate'];
		$endDate = $post['endDate'];
		$bank = $post['bank'];
		$this->db
			->select(array(
				'DATE_FORMAT(a.inc_exp_date, "%b-%Y") as dated',
				'sum(a.inc_exp_amount) as total',
				'b.inc_exp_cat_name as category',
				'a.inc_exp_type as type'
			), false)
			->from('income_expense as a')
			->join('income_expense_category as b', 'a.inc_exp_category = b.inc_exp_cat_id', 'left')
			->where('a.inc_exp_date >=', $startDate)
			->where('a.inc_exp_date <=', $endDate)
			->where('a.inc_exp_bank', $bank)
			// ->where('a.inc_exp_type', "Dr")
			->group_by(array("dated", "category", "type"))
			->order_by("DATE_FORMAT(a.inc_exp_date, '%m-%Y')", "desc");
		$query = $this->db->get();
		return array("query" => $this->db->last_query(), "result" => get_all_rows($query));
	}

	function getCreditCardChartData($post)
	{
		$startDate = $post['startDate'];
		$endDate = $post['endDate'];
		$bank = $post['bank'];
		$this->db
			->select(array(
				'a.cc_date as month',
				'a.cc_opening_balance as ob',
				'a.cc_payment_credits as paid',
				'a.cc_purchases as purchases',
				'a.cc_taxes_interest as taxesInterest',
				'a.cc_expected_balance as balance',
			), false)
			->from('credit_card_transactions as a')
			->where('a.cc_date >=', $startDate)
			->where('a.cc_date <=', $endDate)
			->where('a.cc_for_card', $bank)
			// ->group_by(array("dated"))
			->order_by("month", "desc");
		$query = $this->db->get();
		return array("query" => $this->db->last_query(), "result" => get_all_rows($query));
	}
	public function runQuery($command)
	{
		$query = $this->db->query($command);
		return array("result" => get_all_rows($query));
	}
	function getTotalHoldings()
	{
		$this->db
			->select(array(
				'b.bank_name as Bank',
				'sum(if(a.inc_exp_type = "Cr", a.inc_exp_amount,0)) as Credit',
				'sum(if(a.inc_exp_type = "Dr", a.inc_exp_amount,0)) as Debit',
				'sum(if(a.inc_exp_type = "Cr", a.inc_exp_amount,0)) - sum(if(a.inc_exp_type = "Dr", a.inc_exp_amount,0)) as Balance',
			), false)
			->from('income_expense as a')
			->join('banks as b', 'a.inc_exp_bank = b.bank_id')
			->group_by(array("b.bank_id"));
		$query = $this->db->get();
		return array("query" => $this->db->last_query(), "result" => get_all_rows($query));
	}
	function getPlanDetails($post)
	{
		$startDate = $post['startDate'];
		$endDate = $post['endDate'];
		$bankSelected = $post['bankSelected'];
		$criteria = $post['criteria'];
		$this->db
			->select(array(
				'a.inc_exp_name',
				'a.inc_exp_amount',
				'a.inc_exp_plan_amount',
				'c.vendor_name',
				'c.vendor_limit'
			), false)
			->from('income_expense as a')
			->join('income_expense_category as b', 'a.inc_exp_category = b.inc_exp_cat_id', 'left')
			->join('vendors as c', 'b.inc_exp_cat_vendor = c.vendor_id ', 'left')
			->where('a.inc_exp_date >=', $startDate)
			->where('a.inc_exp_date <=', $endDate)
			->where('a.inc_exp_bank', $bankSelected);
		switch ($criteria) {
			case "G100":
				$this->db->where("IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 >", 100);
				break;
			case "E100":
				$this->db->where("IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 =", 100);
				break;
			case "0TO100":
				$this->db
					->where("IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 >", "0")
					->where("IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 <", "100");
				break;
			case "E0":
				$this->db->where("IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 =", 0);
				break;
			default;
	}
	$this->db->order_by('inc_exp_name');
	$query = $this->db->get();
	return array("query" => $this->db->last_query(), "result" => get_all_rows($query));
}

function getAccountPlanner($post)
{
	$Table = $post["Table"];
	$where = $post["WhereClause"];
	$this->db->select($post["TableRows"]);
	switch ($Table) {
		case "banks":
			$query = $this->db->order_by("bank_name", "asc")->get('banks');
			break;
		case "income_expense_category":
			$query = $this->db->order_by("inc_exp_cat_name", "asc")->get('income_expense_category');
			break;
		case "credit_cards":
			$query = $this->db->order_by("credit_card_name", "asc")->get('credit_cards');
			break;
		case "vendors":
			$query = $this->db->order_by("vendor_name", "asc")->get('vendors');
			break;
		case "income_expense":
			$query = $this->db->where($where)->order_by("inc_exp_date", "asc")->get('income_expense');
			break;
		case "credit_card_transactions":
			$query = $this->db->where($where)->order_by("cc_date", "asc")->get('credit_card_transactions');
			break;
		case "income_expense_template":
			$query = $this->db->order_by("temp_inc_exp_name", "asc")->get('income_expense_template');
			break;
		default:
			return false;
	}
	return get_all_rows($query);
}

public function postAccountPlanner($post)
{
	$postData = json_decode($post['postData']);
	$Table = $postData->Table;
	switch ($Table) {
		case "banks":
			return $this->onTransaction($postData, 'banks', 'bank_id');
			break;
		case "income_expense_category":
			return $this->onTransaction($postData, 'income_expense_category', 'inc_exp_cat_id');
			break;
		case "credit_cards":
			return $this->onTransaction($postData, 'credit_cards', 'credit_card_id');
			break;
		case "vendors":
			return $this->onTransaction($postData, 'vendors', 'vendor_id');
			break;
		case "income_expense":
			return $this->onTransaction($postData, 'income_expense', 'inc_exp_id');
			break;
		case "credit_card_transactions":
			return $this->onTransaction($postData, 'credit_card_transactions', 'cc_id');
			break;
		case "income_expense_template":
			return $this->onTransaction($postData, 'income_expense_template', 'template_id');
			break;
		default:
			return false;
	}
}
public function onTransaction($postData, $table, $primary_field)
{
	$this->db->trans_start();
	if (isset($postData->updateData) && count($postData->updateData) > 0) {
		$array = json_decode(json_encode($postData->updateData), true);
		$this->db->update_batch($table, $array, $primary_field);
	}
	if (isset($postData->insertData) && count($postData->insertData) > 0) {
		$array = json_decode(json_encode($postData->insertData), true);
		$this->db->insert_batch($table, $array);
	}
	if (isset($postData->deleteData) && count($postData->deleteData) > 0) {
		$array = json_decode(json_encode($postData->deleteData), true);
		$this->db->where_in($primary_field, $array);
		$this->db->delete($table);
	}
	$this->db->trans_complete();
	return ($this->db->trans_status() === false) ? false : true;
}

}