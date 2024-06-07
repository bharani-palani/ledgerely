<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
class account_planner_model extends CI_Model
{
    public $appIdSettings;
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
        $this->db->_protect_identifiers = false;
        $this->appIdSettings = [
            'INCEXPTRX' => 'inc_exp_appId',
            'CREDITCARDTRX' => 'cc_appId',
            'USERS' => 'user_appId',
            'CATEGORIES' => 'inc_exp_cat_appId',
            'BANKS' => 'bank_appId',
            'CREDITCARDS' => 'credit_card_appId',
        ];
    }
    public function inc_exp_list($appId)
    {
        $query = $this->db
            ->select(['inc_exp_cat_id as id', 'inc_exp_cat_name as value', 'inc_exp_cat_is_metric as isIncomeMetric', 'inc_exp_cat_is_plan_metric as isPlanMetric'])
            ->order_by('inc_exp_cat_name')
            ->get_where('income_expense_category', array('inc_exp_cat_appId' => $appId));
        return get_all_rows($query);
    }
    public function active_category_income_list($appId)
    {
        $query = $this->db
            ->select(['inc_exp_cat_id as id'])
            ->get_where('income_expense_category', array('inc_exp_cat_appId' => $appId, 'inc_exp_cat_is_metric' => '1'));
        foreach ($query->result() as $row) {
            $array[] = $row->id;
        }
        return $array;
    }
    public function bank_list($appId)
    {
        $query = $this->db
            ->select(['bank_id as id', 'bank_name as value'])
            ->order_by('bank_sort')
            ->get_where('banks', array('bank_appId' => $appId));
        return get_all_rows($query);
    }
    public function getBankDetails($bankId, $appId)
    {
        $query = $this->db
            ->select('*')
            ->get_where('banks', array('bank_id' => $bankId, 'bank_appId' => $appId));
        return get_all_rows($query);
    }
    public function credit_card_list($appId)
    {
        $query = $this->db
            ->select(['credit_card_id as id', 'credit_card_name as value'])
            ->order_by('credit_card_name')
            ->get_where('credit_cards', array('credit_card_appId' => $appId));
        return get_all_rows($query);
    }
    public function year_list($appId)
    {
        $query = $this->db
            ->select(
                [
                    "DISTINCT DATE_FORMAT(inc_exp_date, '%Y') as id",
                    "DATE_FORMAT(inc_exp_date, '%Y') as value",
                ],
                false
            )
            ->order_by('id desc')
            ->get_where('income_expense', array('inc_exp_appId' => $appId));
        return get_all_rows($query);
    }
    public function cc_year_list($appId)
    {
        $sql = "SELECT 
			DISTINCT DATE_FORMAT(cc_date, '%Y') - 1 as id, 
			DATE_FORMAT(cc_date, '%Y') - 1 as value
		FROM `credit_card_transactions` WHERE `cc_appId` = $appId
		UNION
		SELECT 
			DISTINCT DATE_FORMAT(cc_date, '%Y') + 1 as id, 
			DATE_FORMAT(cc_date, '%Y') + 1 as value
		FROM `credit_card_transactions` WHERE `cc_appId` = $appId
		order by id DESC";
        $query = $this->db->query($sql);
        return get_all_rows($query);
    }
    public function credit_card_details($bank, $appId)
    {
        $this->db
            ->select(
                [
                    'credit_card_id',
                    'credit_card_name',
                    "CONCAT('XXXX XXXX XXXX ',substring(credit_card_number, -4, 4)) as credit_card_number",
                    'credit_card_start_date',
                    'credit_card_end_date',
                    'credit_card_payment_date',
                    'credit_card_locale',
                    'credit_card_currency'
                ],
                false
            )
            ->from('credit_cards')
            ->where(['credit_card_id' => $bank, 'credit_card_appId' => $appId]);
        $query = $this->db->get();
        return get_all_rows($query);
    }
    function getIncExpTemplate($appId)
    {
        $query = $this->db->get_where('income_expense_template', array('temp_appId' => $appId));
        return get_all_rows($query);
    }
    function getIncExpChartData($post)
    {
        $startDate = $post['startDate'];
        $endDate = $post['endDate'];
        $bank = $post['bank'];
        $appId = $post['appId'];
        $this->db
            ->select(
                [
                    'DATE_FORMAT(a.inc_exp_date, "%b-%Y") as dated',
                    'sum(a.inc_exp_amount) as total',
                    'b.inc_exp_cat_name as category',
                    'a.inc_exp_type as type',
                    'a.inc_exp_is_income_metric as isIncomeMetric',
                ],
                false
            )
            ->from('income_expense as a')
            ->join(
                'income_expense_category as b',
                'a.inc_exp_category = b.inc_exp_cat_id',
                'left'
            )
            ->where('a.inc_exp_date >=', $startDate)
            ->where('a.inc_exp_date <=', $endDate)
            ->where('a.inc_exp_bank', $bank)
            ->where('a.inc_exp_appId', $appId)
            // ->where('a.inc_exp_type', "Dr")
            ->group_by(['dated', 'category', 'type'])
            ->order_by("DATE_FORMAT(a.inc_exp_date, '%m-%Y')", 'desc');
        $query = $this->db->get();
        return [
            'query' => $this->db->last_query(),
            'result' => get_all_rows($query),
        ];
    }

    function getCreditCardChartData($post)
    {
        $startDate = $post['startDate'];
        $endDate = $post['endDate'];
        $bank = $post['bank'];
        $appId = $post['appId'];
        $this->db
            ->select(
                [
                    'a.cc_date as month',
                    'a.cc_opening_balance as ob',
                    'a.cc_payment_credits as paid',
                    'a.cc_purchases as purchases',
                    'a.cc_taxes_interest as taxesInterest',
                    'a.cc_expected_balance as balance',
                ],
                false
            )
            ->from('credit_card_transactions as a')
            ->where('a.cc_date >=', $startDate)
            ->where('a.cc_date <=', $endDate)
            ->where('a.cc_for_card', $bank)
            ->where('a.cc_appId', $appId)
            // ->group_by(array("dated"))
            ->order_by('month', 'desc');
        $query = $this->db->get();
        return [
            'query' => $this->db->last_query(),
            'result' => get_all_rows($query),
        ];
    }
    public function runQuery($command)
    {
        $query = $this->db->query($command);
        return ['result' => get_all_rows($query)];
    }
    function getCreditBalance($appId)
    {
        $this->db
            ->select([
                'b.credit_card_name as cardName',
                'abs(sum(if(a.cc_transaction_status = 0, a.cc_expected_balance,0))) - abs(sum(if(a.cc_transaction_status = 2, a.cc_expected_balance,0))) as total',
                'b.credit_card_locale as Locale',
                'b.credit_card_currency as Currency'
            ])
            ->from('credit_card_transactions as a')
            ->join('credit_cards as b', 'b.credit_card_id = a.cc_for_card')
            ->where('b.credit_card_appId', $appId)
            ->group_by(['a.cc_for_card'])
            ->having('total > 0');
        $query = $this->db->get();
        return $query;
    }
    function getTotalHoldings($appId)
    {
        $this->db
            ->select(
                [
                    'b.bank_name as Bank',
                    'b.bank_account_number as BankAccountNumber',
                    'sum(if(a.inc_exp_type = "Cr", a.inc_exp_amount,0)) as Credit',
                    'sum(if(a.inc_exp_type = "Dr", a.inc_exp_amount,0)) as Debit',
                    'sum(if(a.inc_exp_type = "Cr", a.inc_exp_amount,0)) - sum(if(a.inc_exp_type = "Dr", a.inc_exp_amount,0)) as Balance',
                    'b.bank_locale as Locale',
                    'b.bank_currency as Currency'
                ],
                false
            )
            ->from('income_expense as a')
            ->join('banks as b', 'a.inc_exp_bank = b.bank_id')
            ->where('inc_exp_appId', $appId)
            ->order_by('b.bank_sort')
            ->group_by(['b.bank_id']);
        $query1 = $this->db->get();
        return [
            'result' => ['bankBalance' => get_all_rows($query1), 'creditBalance' => get_all_rows($this->getCreditBalance($appId))],
            // 'query' => $this->db->last_query()
        ];
    }
    function getPlanDetails($post)
    {
        $startDate = $post['startDate'];
        $endDate = $post['endDate'];
        $bankSelected = $post['bankSelected'];
        $criteria = $post['criteria'];
        $appId = $post['appId'];
        $this->db
            ->select(
                ['a.inc_exp_name', 'a.inc_exp_amount', 'a.inc_exp_plan_amount'],
                false
            )
            ->from('income_expense as a')
            ->join(
                'income_expense_category as b',
                'a.inc_exp_category = b.inc_exp_cat_id',
                'left'
            )
            ->where('a.inc_exp_date >=', $startDate)
            ->where('a.inc_exp_date <=', $endDate)
            ->where('a.inc_exp_bank', $bankSelected)
            ->where('a.inc_exp_is_planned', "1");
        switch ($criteria) {
            case 'G100':
                $this->db->where(
                    'IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 >',
                    100
                );
                break;
            case 'E100':
                $this->db->where(
                    'IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 =',
                    100
                );
                break;
            case '0TO100':
                $this->db
                    ->where(
                        'IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 >',
                        '0'
                    )
                    ->where(
                        'IFNULL(`a`.`inc_exp_plan_amount` / `a`.`inc_exp_amount`, 0) * 100 <',
                        '100'
                    );
                break;
            case 'E0':
                $this->db->where('IFNULL(`a`.`inc_exp_plan_amount`, 0) =', '0');
                break;
            default:
        }
        $this->db->where('a.inc_exp_appId', $appId);
        $this->db->order_by('a.inc_exp_date desc');
        $query = $this->db->get();
        return [
            'query' => $this->db->last_query(),
            'result' => get_all_rows($query),
        ];
    }

    function getAccountPlanner($post)
    {
        $Table = $post['Table'];
        $where = $post['WhereClause'];
        $appId = $post['appId'];
        $this->db->select($post['TableRows']);
        switch ($Table) {
            case 'banks':
                $query = $this->db->order_by('bank_sort', 'asc')->get_where('banks', array('bank_appId' => $appId));
                break;
            case 'income_expense_category':
                $query = $this->db
                    ->order_by('inc_exp_cat_name', 'asc')
                    ->get_where('income_expense_category', array('inc_exp_cat_appId' => $appId));
                break;
            case 'credit_cards':
                $query = $this->db
                    ->order_by('credit_card_name', 'asc')
                    ->get_where('credit_cards', array('credit_card_appId' => $appId));
                break;
            case 'income_expense':
                $query = $this->db
                    ->where($where)
                    ->order_by('inc_exp_date asc, inc_exp_added_at asc')
                    ->get_where('income_expense', array('inc_exp_appId' => $appId));
                break;
            case 'credit_card_transactions':
                $query = $this->db
                    ->where($where)
                    ->order_by('cc_date', 'asc')
                    ->get_where('credit_card_transactions', array('cc_appId' => $appId));
                break;
            case 'income_expense_template':
                $query = $this->db
                    ->order_by('temp_inc_exp_name', 'asc')
                    ->get_where('income_expense_template', array('temp_appId' => $appId));
                break;
            case 'locale_master':
                $query = $this->db
                    ->order_by('locale_sort', 'asc')
                    ->get('locale_master');
                break;
            case 'locale_child':
                $query = $this->db
                    ->where($where)
                    ->order_by('locale_ref_id', 'asc')
                    ->get('locale_child');
                break;
            case 'categorizedBankTrx':
                $query = $this->db
                    ->from('income_expense as a')
                    ->join(
                        'income_expense_category as b',
                        'a.inc_exp_category = b.inc_exp_cat_id',
                        'left'
                    )
                    ->join(
                        'apps as c',
                        'a.inc_exp_appId = c.appId',
                        'left'
                    )
                    ->join(
                        'banks as d',
                        'a.inc_exp_bank = d.bank_id',
                        'left'
                    )
                    ->where($where)
                    ->order_by('a.inc_exp_added_at desc')
                    ->get();
                break;
            default:
                return false;
        }
        return get_all_rows($query);
    }
    function findById($array, $searchValue, $searchKey, $returnKey)
    {
        foreach ($array as $element) {
            if ($searchValue == $element[$searchKey]) {
                return $element[$returnKey];
            }
        }
        return false;
    }
    public function postAccountPlanner($post)
    {
        $postData = json_decode($post['postData']);
        $Table = $postData->Table;
        switch ($Table) {
            case 'banks':
                return $this->onTransaction($postData, 'banks', 'bank_id', 'BANKS');
                break;
            case 'income_expense_category':
                return $this->onTransaction(
                    $postData,
                    'income_expense_category',
                    'inc_exp_cat_id',
                    'CATEGORIES'
                );
                break;
            case 'credit_cards':
                return $this->onTransaction(
                    $postData,
                    'credit_cards',
                    'credit_card_id',
                    'CREDITCARDS'
                );
                break;
            case 'income_expense':
                if (isset($postData->updateData)) {
                    $catList = $this->inc_exp_list($postData->updateData[0]->inc_exp_appId);
                    $activeIncomeList = $this->active_category_income_list($postData->updateData[0]->inc_exp_appId);
                    for ($i = 0; $i < count($postData->updateData); $i++) {
                        $postData->updateData[$i]->inc_exp_added_at = date('Y-m-d H:i:s');
                        $isPlanMetric = $this->findById($catList, $postData->updateData[$i]->inc_exp_category, 'id', 'isPlanMetric');
                        $postData->updateData[$i]->inc_exp_is_planned = $isPlanMetric;
                        if (!$isPlanMetric) {
                            $postData->updateData[$i]->inc_exp_plan_amount = 0;
                        }
                        $postData->updateData[$i]->inc_exp_is_income_metric = in_array(
                            $postData->updateData[$i]->inc_exp_category,
                            $activeIncomeList
                        ) ? "1" : NULL;
                    }
                }
                if (isset($postData->insertData)) {
                    $catList = $this->inc_exp_list($postData->insertData[0]->inc_exp_appId);
                    $activeIncomeList = $this->active_category_income_list($postData->insertData[0]->inc_exp_appId);
                    for ($i = 0; $i < count($postData->insertData); $i++) {
                        $postData->insertData[$i]->inc_exp_added_at = date('Y-m-d H:i:s');
                        $isPlanMetric = $this->findById($catList, $postData->insertData[$i]->inc_exp_category, 'id', 'isPlanMetric');
                        $postData->insertData[$i]->inc_exp_is_planned = $isPlanMetric;
                        if (!$isPlanMetric) {
                            $postData->insertData[$i]->inc_exp_plan_amount = 0;
                        }
                        $postData->insertData[$i]->inc_exp_is_income_metric = in_array(
                            $postData->insertData[$i]->inc_exp_category,
                            $activeIncomeList
                        ) ? "1" : NULL;
                    }
                }
                return $this->onTransaction(
                    $postData,
                    'income_expense',
                    'inc_exp_id',
                    'INCEXPTRX',
                );
                break;
            case 'credit_card_transactions':
                if (isset($postData->updateData)) {
                    for ($i = 0; $i < count($postData->updateData); $i++) {
                        $postData->updateData[$i]->cc_added_at = date(
                            'Y-m-d H:i:s'
                        );
                    }
                }
                if (isset($postData->insertData)) {
                    for ($i = 0; $i < count($postData->insertData); $i++) {
                        $postData->insertData[$i]->cc_added_at = date(
                            'Y-m-d H:i:s'
                        );
                    }
                }
                return $this->onTransaction(
                    $postData,
                    'credit_card_transactions',
                    'cc_id',
                    'CREDITCARDTRX'
                );
                break;
            case 'income_expense_template':
                return $this->onTransaction(
                    $postData,
                    'income_expense_template',
                    'template_id',
                    'TEMPLATE'
                );
                break;
            case 'locale_master':
                return $this->onTransaction(
                    $postData,
                    'locale_master',
                    'locale_id'
                );
                break;
            case 'locale_child':
                return $this->onTransaction(
                    $postData,
                    'locale_child',
                    'loc_id'
                );
                break;
            default:
                return false;
        }
    }
    public function onTransaction($postData, $table, $primary_field, $service = '')
    {
        $this->db->trans_start();
        if (isset($postData->updateData) && count($postData->updateData) > 0) {
            $array = json_decode(json_encode($postData->updateData), true);
            $this->db->update_batch($table, $array, $primary_field);
        }
        if (isset($postData->insertData) && count($postData->insertData) > 0) {
            $array = json_decode(json_encode($postData->insertData), true);
            if (!empty($service)) {
                $CI = &get_instance();
                $CI->load->model('quota_model');
                $appId = $array[0][$this->appIdSettings[$service]];
                if (!$CI->quota_model->hasQuotaFor($appId, $service)) {
                    return null;
                }
            }
            $this->db->insert_batch($table, $array);
        }
        if (isset($postData->deleteData) && count($postData->deleteData) > 0) {
            $array = json_decode(json_encode($postData->deleteData), true);
            $this->db->where_in($primary_field, $array);
            $this->db->delete($table);
        }
        $this->db->trans_complete();
        return $this->db->trans_status() === false ? false : true;
    }
    public function postFundTransfer($post)
    {
        $data = array(
            array(
                'inc_exp_id' => null,
                'inc_exp_appId' => $post['appId'],
                'inc_exp_name' => $post['description'],
                'inc_exp_amount' => $post['amount'],
                'inc_exp_plan_amount' => '0',
                'inc_exp_type' => 'Dr',
                'inc_exp_date' => $post['date'],
                'inc_exp_added_at' => $post['dateTime'],
                'inc_exp_category' => $post['category'],
                'inc_exp_bank' => $post['source'],
                'inc_exp_comments' => '',
            ),
            array(
                'inc_exp_id' => null,
                'inc_exp_appId' => $post['appId'],
                'inc_exp_name' => $post['description'],
                'inc_exp_amount' => $post['amount'],
                'inc_exp_plan_amount' => '0',
                'inc_exp_type' => 'Cr',
                'inc_exp_date' => $post['date'],
                'inc_exp_added_at' => $post['dateTime'],
                'inc_exp_category' => $post['category'],
                'inc_exp_bank' => $post['dest'],
                'inc_exp_comments' => '',
            ),
        );
        if ($this->db->insert_batch('income_expense', $data)) {
            return true;
        } else {
            return false;
        }
    }
    public function getFundDetails($post)
    {
        $this->db
            ->select(
                [
                    'sum(if(inc_exp_type = "Cr", inc_exp_amount,0)) - sum(if(inc_exp_type = "Dr", inc_exp_amount,0)) as availableFunds',
                ],
                false
            )
            ->from('income_expense as a')
            ->where('inc_exp_bank', $post['id'])
            ->where('inc_exp_appId', $post['appId']);
        $query = $this->db->get();
        return get_all_rows($query);
    }
    public function bulkImport($data)
    {
        $this->db->trans_start();
        $this->db->insert_batch('income_expense', $data);
        $this->db->trans_complete();
        return $this->db->trans_status() === false ? false : true;
    }
    public function categoryCreditCardReport($appId, $catId, $startDate, $endDate)
    {
        $query = $this->db
            ->select([
                'a.cc_transaction',
                'a.cc_date',
                'd.credit_card_name',
                'a.cc_opening_balance',
                'a.cc_payment_credits',
                'a.cc_purchases',
                'a.cc_taxes_interest',
                'a.cc_comments'
            ])
            ->from('credit_card_transactions as a')
            ->join(
                'income_expense_category as b',
                'a.cc_inc_exp_cat = b.inc_exp_cat_id',
                'left'
            )
            ->join(
                'apps as c',
                'a.cc_appId = c.appId',
                'left'
            )
            ->join(
                'credit_cards as d',
                'a.cc_for_card = d.credit_card_id',
                'left'
            )
            ->where('a.cc_appId', $appId)
            ->where('b.inc_exp_cat_id', $catId)
            ->where('d.credit_card_appId', $appId)
            ->where('a.cc_date >=', $startDate)
            ->where('a.cc_date <=', $endDate)
            ->order_by('a.cc_added_at desc')
            ->get();
        return get_all_rows($query);
    }
}
