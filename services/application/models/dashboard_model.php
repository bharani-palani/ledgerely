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
            ->limit(15)
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
    public function searchTopics($searchString, $appId)
    {
        $search = htmlentities($searchString);
        $limit = 3;
        $query = $this->db->query('
            SELECT * from (
                (SELECT 
                    concat("cat_",inc_exp_cat_id) as id,
                    inc_exp_cat_name as name,
                    "category" as type,
                    CONCAT("/category?fetch=category", "&categoryId=", inc_exp_cat_id, "&startDate=", DATE_FORMAT(NOW() ,"%Y-%m-01"), "&endDate=", LAST_DAY(DATE_FORMAT(NOW() ,"%Y-%m-01"))) as target,
                    inc_exp_cat_appId as appId
                FROM income_expense_category WHERE inc_exp_cat_name LIKE "%' . $search . '%" GROUP BY name LIMIT ' . $limit . '
                )
                UNION DISTINCT
                (SELECT 
                    concat("bank_",bank_id) as id,
                    bank_name as name,
                    "bank" as type,
                    CONCAT("/bank?fetch=bank", "&bankId=", bank_id, "&startDate=", DATE_FORMAT(NOW() ,"%Y-%m-01"), "&endDate=", LAST_DAY(DATE_FORMAT(NOW() ,"%Y-%m-01"))) as target,
                    bank_appId as appId
                FROM banks WHERE bank_name LIKE "%' . $search . '%" GROUP BY name LIMIT ' . $limit . '
                )
                UNION DISTINCT
                (SELECT 
                    concat("inc_exp_",inc_exp_id) as id,
                    inc_exp_name as name,
                    "bankTransactions" as type,
                    CONCAT("/moneyPlanner?fetch=bankTransactions","&date=", inc_exp_date, "&bank=", inc_exp_bank) as target,
                    inc_exp_appId as appId
                FROM income_expense WHERE inc_exp_name LIKE "%' . $search . '%" OR inc_exp_comments LIKE "%' . $search . '%" GROUP BY name LIMIT ' . $limit . '
                )
                UNION DISTINCT
                (SELECT 
                    concat("card_",credit_card_id) as id,
                    credit_card_name as name,
                    "creditCard" as type,
                    "/moneyPlanner?fetch=creditCard" as target,
                    credit_card_appId as appId
                FROM credit_cards WHERE credit_card_name LIKE "%' . $search . '%" GROUP BY name LIMIT ' . $limit . '
                )
                UNION DISTINCT
                (SELECT 
                    concat("cc_trx_",cc_id) as id,
                    cc_transaction as name,
                    "ccTransactions" as type,
                    CONCAT("/moneyPlanner?fetch=ccTransactions&date=", cc_date, "&card=", cc_for_card) as target,
                    cc_appId as appId
                FROM credit_card_transactions WHERE cc_transaction LIKE "%' . $search . '%" OR cc_comments LIKE "%' . $search . '%" GROUP BY name LIMIT ' . $limit . '
                )
                UNION DISTINCT
                (SELECT 
                    concat("wb_",wb_id) as id,
                    wb_name as name,
                    "workbook" as type,
                    CONCAT("/workbook?fetch=workbook&wbName=",wb_name) as target,
                    wb_appId as appId
                FROM workbook WHERE wb_name LIKE "%' . $search . '%" GROUP BY name LIMIT ' . $limit . '
                )
            ) AS DATA WHERE DATA.appId = "' . $appId . '";
        ');
        // echo $this->db->last_query();
        if ($query->num_rows() > 0) {
            $array = array();
            foreach ($query->result_array() as $row) {
                $array[$row['type']][] = $row;
            }
            return $array;
        } else {
            return array();
        }
    }
}
