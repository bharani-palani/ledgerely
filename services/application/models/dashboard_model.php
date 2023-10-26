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
                    ['sum(a.inc_exp_amount) as total', 'a.inc_exp_name as name'],
                false
            )
            ->from('income_expense as a')
            ->join('income_expense_category as b', 'a.inc_exp_category = b.inc_exp_cat_id')
            ->where('a.inc_exp_type', $type)
            ->where('MONTH(a.inc_exp_date)', $post['month'])
            ->where('YEAR(a.inc_exp_date)', $post['year'])
            ->where('a.inc_exp_appId', $post['appId'])
            ->group_by('a.inc_exp_category')
            ->limit(10)
            ->order_by('total', 'desc')
            ->get();
        return get_all_rows($query);
    }

    public function recentTransactions($post)
    {
        $query = $this->db
            ->select(['inc_exp_date as label', 'sum(inc_exp_amount) as value'])
            ->limit(50)
            ->having('sum(inc_exp_amount) >', 0)
            ->order_by('label', 'desc')
            ->group_by(['label', 'inc_exp_type'])
            ->get_where('income_expense', [
                'inc_exp_appId' => $post['appId'],
            ]);
        return get_all_rows($query);
    }
}
