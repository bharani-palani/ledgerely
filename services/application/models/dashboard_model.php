<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
class dashboard_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
        $this->db->_protect_identifiers = false;
    }
    public function topTrends($post, $type, $area)
    {
        $query = $this->db
            ->select(
                $area === "CAT" ?
                    ['sum(a.inc_exp_amount) as total', 'b.inc_exp_cat_name as name'] :
                    ['a.inc_exp_amount as total', 'a.inc_exp_name as name'],
                false
            )
            ->from('income_expense as a')
            ->join('income_expense_category as b', 'a.inc_exp_category = b.inc_exp_cat_id')
            ->having('total >', 0)
            ->where('a.inc_exp_type', $type)
            ->where('MONTH(a.inc_exp_date)', $post['month'])
            ->where('YEAR(a.inc_exp_date)', $post['year'])
            ->where('a.inc_exp_appId', $post['appId'])
            ->group_by('a.inc_exp_category')
            ->limit(10)
            ->get();
        return $query->num_rows() > 0 ? get_all_rows($query) : array(['total' => "0.001", 'name' => '&empty;']);
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
                'sum(a.inc_exp_amount) as value'
            ])
            ->from('income_expense as a')
            ->join('banks as b', 'a.inc_exp_bank = b.bank_id')
            ->limit(50)
            ->having('sum(a.inc_exp_amount) >', 0)
            ->order_by('label', 'desc')
            ->group_by(['a.inc_exp_date', 'a.inc_exp_type', 'b.bank_currency'])
            ->where([
                'a.inc_exp_appId' => $post['appId'],
            ])
            ->get();
        return get_all_rows($query);
    }

    public function topCcTrends($post, $type, $area)
    {
        $query = $this->db
            ->select(
                $area === "CAT" ?
                    [$type === 0 ? 'sum(a.cc_purchases) as total' : 'sum(a.cc_payment_credits) as total', 'b.inc_exp_cat_name as name'] :
                    [$type === 0 ? 'a.cc_purchases as total' : 'a.cc_payment_credits as total', 'a.cc_transaction as name'],
                false
            )
            ->from('credit_card_transactions as a')
            ->join('income_expense_category as b', 'a.cc_inc_exp_cat = b.inc_exp_cat_id')
            ->having($type === 0 ? 'sum(a.cc_purchases) >' : 'sum(a.cc_payment_credits) >', 0)
            ->where('MONTH(a.cc_date)', $post['month'])
            ->where('YEAR(a.cc_date)', $post['year'])
            ->where('a.cc_appId', $post['appId'])
            ->group_by('a.cc_inc_exp_cat')
            ->limit(10)
            ->get();
        return $query->num_rows() > 0 ? get_all_rows($query) : array(['total' => "0.001", 'name' => '&empty;']);
    }
}
