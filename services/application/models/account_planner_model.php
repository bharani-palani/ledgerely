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
            "TEMPLATE" => 'temp_appId'
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
			DISTINCT DATE_FORMAT(cc_date, '%Y') as id, 
			DATE_FORMAT(cc_date, '%Y') as value
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
    public function getIncExpChartData($post)
    {
        $startDate = $post['startDate'];
        $endDate = $post['endDate'];
        $bank = $post['bank'];
        $appId = $post['appId'];
        $this->db
            ->select(
                [
                    'DATE_FORMAT(inc_exp_date, "%b-%Y") as month',
                    'DATE_FORMAT(inc_exp_date, "%Y-%m-01") as monthStart',
                    'LAST_DAY(DATE_FORMAT(inc_exp_date, "%Y-%m-01")) as monthEnd',
                    'DATE_FORMAT(inc_exp_date, "%Y-%m-01T%TZ") as measureDate',
                    'sum(
                        if(inc_exp_type = "Cr" && inc_exp_is_income_metric = 1, inc_exp_amount,0)
                    ) as metricIncome',
                    'sum(
                        if(inc_exp_type = "Cr", inc_exp_amount,0)
                    ) as totalIncome',
                ],
                false,
            )
            ->from('income_expense')
            ->where('inc_exp_date >=', $startDate)
            ->where('inc_exp_date <=', $endDate)
            ->where('inc_exp_bank', $bank)
            ->where('inc_exp_appId', $appId)
            ->group_by(['month'])
            ->order_by("DATE_FORMAT(inc_exp_date, '%m-%Y')", 'desc');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            $array = array();
            foreach ($query->result_array() as $row) {
                $array['income'][] = [
                    'month' => $row['month'],
                    'measureDate' => $row['measureDate'],
                    'totalIncome' => (float)$row['totalIncome'],
                    'metricIncome' => (float)$row['metricIncome'],
                    'monthStart' => $row['monthStart'],
                    'monthEnd' => $row['monthEnd']
                ];
                $array['category'][] = [
                    'month' => $row['month'],
                    'data' => $this->getCategoryChartData($row['monthStart'], $row['monthEnd'], $bank, $appId)
                ];
            }
            return $array;
        } else {
            return array();
        }
    }
    public function getCategoryChartData($startDate, $endDate, $bank, $appId)
    {
        $this->db
            ->select([
                'b.inc_exp_cat_name as category',
                'sum(a.inc_exp_amount) as total',
                'a.inc_exp_type as type',
            ])
            ->from('income_expense as a')
            ->join(
                'income_expense_category as b',
                'a.inc_exp_category = b.inc_exp_cat_id',
            )
            ->where('a.inc_exp_date BETWEEN "' . $startDate . '" and "' . $endDate . '"')
            ->where('a.inc_exp_bank', $bank)
            ->where('a.inc_exp_appId', $appId)
            ->group_by(['b.inc_exp_cat_id', 'a.inc_exp_type'])
            ->order_by("category", 'asc')
            ->having('total > 0');
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            $array = array();
            foreach ($query->result_array() as $row) {
                $array[$row['type'] === 'Cr' ? 'income' : 'expense'][] = [
                    'category' => $row['category'],
                    'total' => (float)$row['total'],
                ];
            }
            return $array;
        } else {
            return array();
        }
    }

    public function monthWiseCreditCardReport($startDate, $endDate, $card, $appId)
    {
        $query = $this->db
            ->select([
                'ifnull(SUM(cc_opening_balance), 0) as ob',
                'ifnull(SUM(cc_payment_credits), 0) as paid',
                'ifnull(SUM(cc_purchases), 0) as purchases',
                'ifnull(SUM(cc_taxes_interest), 0) as taxesInterest',
                'ifnull(SUM(cc_opening_balance), 0) + ifnull(SUM(cc_payment_credits), 0) - ifnull(SUM(cc_purchases), 0) - ifnull(SUM(cc_taxes_interest), 0) as balance'
            ])
            ->from('credit_card_transactions')
            ->where('cc_date >=', $startDate)
            ->where('cc_date <=', $endDate)
            ->where('cc_for_card', $card)
            ->where('cc_appId', $appId)
            ->get();
        $row = $query->row_array();
        $row['ob'] = (float)$row['ob'];
        $row['paid'] = (float)$row['paid'];
        $row['purchases'] = (float)$row['purchases'];
        $row['taxesInterest'] = (float)$row['taxesInterest'];
        $row['balance'] = (float)$row['balance'];
        return $query->num_rows() > 0 ? $row : [];
    }
    public function getCreditCardChartData($post)
    {
        $startDate = $post['startDate'];
        $endDate = $post['endDate'];
        $card = $post['card'];
        $appId = $post['appId'];
        $q = $this->db->select(['credit_card_start_date', 'credit_card_end_date'])
            ->from('credit_cards')
            ->where('credit_card_appId', $appId)
            ->where('credit_card_id', $card)
            ->get();
        $cycleDates = $q->row_array();
        $stYear = explode("-", $startDate);
        $enYear = explode("-", $endDate);
        $year = $stYear[0] === $enYear[0] ? $stYear[0] : date('Y');
        for ($i = 12; $i >= 1; $i--) {
            $st = date(
                'Y-m-d',
                strtotime(
                    "-1 month",
                    mktime(0, 0, 0, $i, $cycleDates['credit_card_start_date'], $year)
                )
            );
            $en = date('Y-m-d', mktime(0, 0, 0, $i, $cycleDates['credit_card_end_date'], $year));
            $array[] = [
                'month' => date('M-Y', mktime(0, 0, 0, $i, 1, $year)),
                'startDate' => $st,
                'endDate' => $en,
                'data' => $this->monthWiseCreditCardReport($st, $en, $card, $appId)
            ];
        }
        return $array;
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
                'abs(sum(
                    if(a.cc_transaction_status = 0, a.cc_opening_balance - a.cc_payment_credits + a.cc_purchases + a.cc_taxes_interest,0)
                )) - 
                abs(sum(if(a.cc_transaction_status = 2, a.cc_opening_balance - a.cc_payment_credits + a.cc_purchases + a.cc_taxes_interest,0))) 
                as total',
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
            ->having('Balance !=', 0)
            ->order_by('b.bank_sort')
            ->group_by(['b.bank_id']);
        $query1 = $this->db->get();
        return [
            'result' => ['bankBalance' => get_all_rows($query1), 'creditBalance' => get_all_rows($this->getCreditBalance($appId))],
            // 'query' => $this->db->last_query()
        ];
    }
    function getPlanSum($post)
    {
        $startDate = $post['startDate'];
        $endDate = $post['endDate'];
        $bank = $post['bank'];
        $appId = $post['appId'];
        $query = $this->db
            ->select(
                [
                    'DATE_FORMAT(inc_exp_date, "%b-%Y") as dated',
                    'sum(if(
                        ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) > 100 , 
                        (a.inc_exp_plan_amount - a.inc_exp_amount), 
                    0)) as goodPlans',
                    'sum(if(
                        ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) > 100 , 
                        1, 
                    0)) as goodPlanCount',
                    'sum(if(
                        ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) = 100 , 
                        (a.inc_exp_plan_amount), 
                    0)) as achievedPlans',
                    'sum(if(
                        ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) = 100 , 
                        1, 
                    0)) as achievedPlanCount',
                    'sum(if(
                        ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) > 0 and ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) < 100, 
                        (a.inc_exp_amount - a.inc_exp_plan_amount), 
                    0)) as badPlans',
                    'sum(if(
                        ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) > 0 and ((a.inc_exp_plan_amount / a.inc_exp_amount) * 100) < 100, 
                        1, 
                    0)) as badPlanCount',
                    'sum(if(
                        a.inc_exp_plan_amount = 0,
                        a.inc_exp_amount, 
                    0)) as noPlans',
                    'sum(if(
                        a.inc_exp_plan_amount = 0, 
                        1, 
                    0)) as noPlanCount',
                ],
                false
            )
            ->from('income_expense as a')
            ->where('a.inc_exp_date >=', $startDate)
            ->where('a.inc_exp_date <=', $endDate)
            ->where('a.inc_exp_bank', $bank)
            ->where('a.inc_exp_is_planned', "1")
            ->where('a.inc_exp_appId', $appId)
            ->group_by(['dated'])
            ->get();
        $row = $query->row_array();
        return [
            'goodPlans' => (float)$row['goodPlans'],
            'goodPlanCount' => (float)$row['goodPlanCount'],
            'achievedPlans' => (float)$row['achievedPlans'],
            'achievedPlanCount' => (float)$row['achievedPlanCount'],
            'badPlans' => (float)$row['badPlans'],
            'badPlanCount' => (float)$row['badPlanCount'],
            'noPlans' => (float)$row['noPlans'],
            'noPlanCount' => (float)$row['noPlanCount'],
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
    function getTotal($Table, $where, $TableRows, $searchString)
    {
        $return = [];
        switch ($Table) {
            case 'income_expense':
                $query = $this->db
                    ->select([
                        'sum(case when inc_exp_type = "Cr" then inc_exp_amount else 0 end) as credit',
                        'sum(case when inc_exp_type = "Dr" then inc_exp_amount else 0 end) as debit',
                        '(
                            sum(case when inc_exp_type = "Cr" then inc_exp_amount else 0 end) - 
                            sum(case when inc_exp_type = "Dr" then inc_exp_amount else 0 end)
                        ) as balance',
                        'sum(case when inc_exp_type = "Cr" then inc_exp_plan_amount else 0 end) as planCredit',
                        'sum(case when inc_exp_type = "Dr" then inc_exp_plan_amount else 0 end) as planDebit',
                        '(
                            sum(case when inc_exp_type = "Cr" then inc_exp_plan_amount else 0 end) -
                            sum(case when inc_exp_type = "Dr" then inc_exp_plan_amount else 0 end)
                        ) as planBalance'
                    ], false)
                    ->where($where)
                    ->from('income_expense');
                $likeRows = explode(',', $TableRows);
                if ($searchString && count($likeRows) > 0) {
                    $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
                    $query = $query->where('(' . $likeClause . ')');
                }
                $query = $query->get();
                $row = $query->row_array();
                $return = [
                    "inc_exp_amount" => [
                        ['value' => (float)$row['credit'], 'prefix' => '', 'suffix' => '(+)'],
                        ['value' => (float)$row['debit'], 'prefix' => '', 'suffix' => '(-)'],
                        ['value' => (float)$row['balance'], 'prefix' => '', 'suffix' => '(=)', 'className' => 'rounded bni-bg text-dark p-1'],
                    ],
                    "inc_exp_plan_amount" => [
                        ['value' => (float)$row['planCredit'], 'prefix' => '', 'suffix' => '(+)'],
                        ['value' => (float)$row['planDebit'], 'prefix' => '', 'suffix' => '(-)'],
                        ['value' => (float)$row['planBalance'], 'prefix' => '', 'suffix' => '(=)', 'className' => 'rounded bni-bg text-dark p-1'],
                    ]
                ];
                break;
            case 'credit_card_transactions':
                $query = $this->db
                    ->select([
                        'sum(cc_opening_balance) as ob',
                        'sum(cc_payment_credits) as payments',
                        'sum(cc_purchases) as purchases',
                        'sum(cc_taxes_interest) as taxesAndInterest',
                    ], false)
                    ->where($where)
                    ->from('credit_card_transactions');
                $likeRows = explode(',', $TableRows);
                if ($searchString && count($likeRows) > 0) {
                    $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
                    $query = $query->where('(' . $likeClause . ')');
                }
                $query = $query->get();
                $row = $query->row_array();
                $return = [
                    "cc_opening_balance" => [['value' => (float)$row['ob'], 'prefix' => '', 'suffix' => '']],
                    "cc_payment_credits" => [['value' => (float)$row['payments'], 'prefix' => '', 'suffix' => '']],
                    "cc_purchases" => [['value' => (float)$row['purchases'], 'prefix' => '', 'suffix' => '']],
                    "cc_taxes_interest" => [['value' => (float)$row['taxesAndInterest'], 'prefix' => '', 'suffix' => '']],
                    "cc_expected_balance" => [
                        [
                            'value' => (float)($row['ob'] - $row['payments'] + $row['purchases'] + $row['taxesAndInterest']),
                            'prefix' => '',
                            'suffix' => ''
                        ]
                    ],
                ];
                break;
            case 'creditCardTrx';
                $query = $this->db
                    ->select([
                        'sum(a.cc_payment_credits) as cc_payment_credits',
                        'sum(a.cc_purchases) as cc_purchases',
                        'sum(a.cc_taxes_interest) as cc_taxes_interest',
                    ], false)
                    ->where($where)
                    ->from('credit_card_transactions as a')
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
                    ->where($where);
                $likeRows = explode(',', $TableRows);
                if ($searchString && count($likeRows) > 0) {
                    $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
                    $query = $query->where('(' . $likeClause . ')');
                }
                $query = $query->get();
                $row = $query->row_array();
                $return = [
                    "cc_payment_credits" => [['value' => (float)$row['cc_payment_credits'], 'prefix' => '', 'suffix' => '']],
                    "cc_purchases" => [['value' => (float)$row['cc_purchases'], 'prefix' => '', 'suffix' => '']],
                    "cc_taxes_interest" => [['value' => (float)$row['cc_taxes_interest'], 'prefix' => '', 'suffix' => '']],
                ];
                break;
            case 'bankTrx':
                $query = $this->db
                    ->select([
                        'sum(case when inc_exp_type = "Cr" then a.inc_exp_amount else 0 end) as credit',
                        'sum(case when inc_exp_type = "Dr" then a.inc_exp_amount else 0 end) as debit',
                    ], false)
                    ->from('income_expense as a')
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
                    ->where($where);
                $likeRows = explode(',', $TableRows);
                if ($searchString && count($likeRows) > 0) {
                    $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
                    $query = $query->where('(' . $likeClause . ')');
                }
                $query = $query->get();
                $row = $query->row_array();
                $return = [
                    "inc_exp_amount" => [
                        ['value' => (float)$row['credit'], 'prefix' => '', 'suffix' => '(+)'],
                        ['value' => (float)$row['debit'], 'prefix' => '', 'suffix' => '(-)'],
                        ['value' => round($row['credit'] - $row['debit'], 2), 'prefix' => '', 'suffix' => '(=)', 'className' => 'rounded bni-bg text-dark p-1'],
                    ],
                ];
                break;
            case 'categorizedBankTrx':
                $query = $this->db
                    ->select([
                        'sum(case when inc_exp_type = "Cr" then a.inc_exp_amount else 0 end) as credit',
                        'sum(case when inc_exp_type = "Dr" then a.inc_exp_amount else 0 end) as debit',
                    ], false)
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
                    ->where($where);
                $likeRows = explode(',', $TableRows);
                if ($searchString && count($likeRows) > 0) {
                    $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
                    $query = $query->where('(' . $likeClause . ')');
                }
                $query = $query->get();
                $row = $query->row_array();
                $return = [
                    "inc_exp_amount" => [
                        ['value' => (float)$row['credit'], 'prefix' => '', 'suffix' => '(+)'],
                        ['value' => (float)$row['debit'], 'prefix' => '', 'suffix' => '(-)'],
                        ['value' => round($row['credit'] - $row['debit'], 2), 'prefix' => '', 'suffix' => '(=)', 'className' => 'rounded bni-bg text-dark p-1'],
                    ],
                ];
                break;
            case 'categorizedCreditCardTrx':
                $query = $this->db
                    ->select([
                        'sum(a.cc_payment_credits) as cc_payment_credits',
                        'sum(a.cc_purchases) as cc_purchases',
                        'sum(a.cc_taxes_interest) as cc_taxes_interest',
                    ], false)
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
                    ->where($where);
                $likeRows = explode(',', $TableRows);
                if ($searchString && count($likeRows) > 0) {
                    $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
                    $query = $query->where('(' . $likeClause . ')');
                }
                $query = $query->get();
                $row = $query->row_array();
                $return = [
                    "cc_payment_credits" => [['value' => (float)$row['cc_payment_credits'], 'prefix' => '', 'suffix' => '']],
                    "cc_purchases" => [['value' => (float)$row['cc_purchases'], 'prefix' => '', 'suffix' => '']],
                    "cc_taxes_interest" => [['value' => (float)$row['cc_taxes_interest'], 'prefix' => '', 'suffix' => '']],
                ];
                break;
            case 'income_expense_template':
                $query = $this->db
                    ->select([
                        'sum(case when temp_inc_exp_type = "Cr" then temp_amount else 0 end) as credit',
                        'sum(case when temp_inc_exp_type = "Dr" then temp_amount else 0 end) as debit',
                    ], false)
                    ->order_by('temp_inc_exp_name', 'asc')
                    ->from('income_expense_template')
                    ->where($where);
                $likeRows = explode(',', $TableRows);
                if ($searchString && count($likeRows) > 0) {
                    $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
                    $query = $query->where('(' . $likeClause . ')');
                }
                $query = $query->get();
                $row = $query->row_array();
                $return = [
                    "temp_amount" => [
                        ['value' => $row['credit'], 'prefix' => '', 'suffix' => '(+)'],
                        ['value' => $row['debit'], 'prefix' => '', 'suffix' => '(-)'],
                        ['value' => round($row['credit'] - $row['debit'], 2), 'prefix' => '', 'suffix' => '(=)', 'className' => 'rounded bni-bg text-dark p-1'],
                    ],
                ];
                break;
        }
        return count($return) > 0 ? $return : false;
    }
    function getAccountPlanner($post)
    {
        $Table = $post['Table'];
        $where = $post['WhereClause'];
        $searchString = $post['searchString'];
        $limit = $post['limit'];
        $start = $post['start'];
        $appId = $post['appId'];
        $TableRows = $post['TableRows'];
        $queryAll = $this->getParamWiseQuery($Table, $where, $appId, false, false, $searchString, $TableRows)->get();
        $numRows = $queryAll->num_rows();
        $queryByParam = $this->getParamWiseQuery($Table, $where, $appId, $limit, $start, $searchString, $TableRows)->get();
        $rangeStart = $start + 1 <= $numRows ? $start + 1 : 0;
        $rangeEnd = $start + $limit <= $numRows ?  $start + $limit : $numRows;
        $rangeEnd = $rangeEnd > $start ? $rangeEnd : 0;
        $page = ($rangeStart > 0 && $rangeEnd > 0) ? (int)($start / $limit) + 1 : 0;
        $total = $this->getTotal($Table, $where, $TableRows, $searchString);
        $array = [
            'page' => $page,
            'rangeStart' => $rangeStart,
            'rangeEnd' => $rangeEnd,
            'numRows' => $numRows,
            'total' => $total,
            'table' => get_all_rows($queryByParam),
            // 'q' => $this->db->last_query()
        ];
        return array_filter($array, fn($v) => $v !== false);
    }
    function getParamWiseQuery($Table, $where, $appId, $limit = false, $start = false, $searchString = false, $TableRows = false)
    {
        switch ($Table) {
            case 'banks':
                $query = $this->db
                    ->order_by('bank_sort', 'asc')
                    ->from('banks')
                    ->where(array('bank_appId' => $appId));
                break;
            case 'income_expense_category':
                $query = $this->db
                    ->order_by('inc_exp_cat_name', 'asc')
                    ->from('income_expense_category')
                    ->where(array('inc_exp_cat_appId' => $appId));
                break;
            case 'credit_cards':
                $query = $this->db
                    ->order_by('credit_card_name', 'asc')
                    ->from('credit_cards')
                    ->where(array('credit_card_appId' => $appId));
                break;
            case 'income_expense':
                $query = $this->db
                    ->where($where)
                    ->order_by('inc_exp_date asc, inc_exp_added_at asc')
                    ->from('income_expense');
                break;
            case 'credit_card_transactions':
                $query = $this->db
                    ->select([
                        'cc_id',
                        'cc_transaction',
                        'cc_date',
                        'cc_opening_balance',
                        'cc_payment_credits',
                        'cc_purchases',
                        'cc_taxes_interest',
                        '((cc_opening_balance + cc_purchases + cc_taxes_interest) - cc_payment_credits) as cc_expected_balance',
                        'cc_for_card',
                        'cc_inc_exp_cat',
                        'cc_transaction_status',
                        'cc_comments',
                        'cc_added_at'
                    ], false)
                    ->where($where)
                    ->order_by('cc_date', 'asc')
                    ->from('credit_card_transactions')
                    ->where(array('cc_appId' => $appId));
                break;
            case 'income_expense_template':
                $query = $this->db
                    ->order_by('temp_inc_exp_name', 'asc')
                    ->from('income_expense_template')
                    ->where($where);
                break;
            case 'locale_master':
                $query = $this->db
                    ->order_by('locale_sort', 'asc')
                    ->from('locale_master');
                break;
            case 'locale_child':
                $query = $this->db
                    ->where($where)
                    ->order_by('locale_ref_id', 'asc')
                    ->from('locale_child');
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
                    ->order_by('a.inc_exp_added_at desc');
                break;
            case 'bankTrx':
                $query = $this->db
                    ->from('income_expense as a')
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
                    ->order_by('a.inc_exp_added_at desc');
                break;
            case 'creditCardTrx':
                $query = $this->db
                    ->from('credit_card_transactions as a')
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
                    ->where($where)
                    ->order_by('a.cc_added_at desc');
                break;
            case 'categorizedCreditCardTrx':
                $query = $this->db
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
                    ->where($where)
                    ->order_by('a.cc_added_at desc');
                break;
            default:
                return false;
        }
        // incase select is handled in BE, add the table name in below array
        $BESelects = ["credit_card_transactions"];
        $query = in_array("credit_card_transactions", $BESelects) ?  $query : $query->select($TableRows);
        $likeRows = explode(',', $TableRows);
        if ($searchString && count($likeRows) > 0) {
            $likeClause = implode(' LIKE "%' . $searchString . '%" OR ', $likeRows) . ' LIKE "%' . $searchString . '%"';
            $query->where('(' . $likeClause . ')');
        }
        if (is_numeric($limit) && is_numeric($start)) {
            $query = $query->limit($limit, $start);
        }
        return $query;
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
        if (property_exists($postData, 'Table')) {
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
                            // if not planned category, then set inc_exp_plan_amount to zero feature is suppressed
                            // if (!$isPlanMetric) {
                            //     $postData->updateData[$i]->inc_exp_plan_amount = 0;
                            // }
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
                            unset($postData->updateData[$i]->cc_expected_balance);
                            $postData->updateData[$i]->cc_added_at = date(
                                'Y-m-d H:i:s'
                            );
                        }
                    }
                    if (isset($postData->insertData)) {
                        for ($i = 0; $i < count($postData->insertData); $i++) {
                            unset($postData->insertData[$i]->cc_expected_balance);
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
        } else {
            return false;
        }
    }
    public function onTransaction($postData, $table, $primary_field, $service = '')
    {
        $db_debug = $this->db->db_debug;
        $this->db->db_debug = FALSE;
        $error = ['number' => null, 'message' => null];
        $this->db->trans_start();
        if (isset($postData->updateData) && count($postData->updateData) > 0) {
            $array = json_decode(json_encode($postData->updateData), true);
            $this->db->update_batch($table, $array, $primary_field);
            if ($this->db->_error_message()) {
                $error = ['number' => $this->db->_error_number(), 'message' => $this->db->_error_message()];
            }
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
            if ($this->db->_error_message()) {
                $error = ['number' => $this->db->_error_number(), 'message' => $this->db->_error_message()];
            }
        }
        if (isset($postData->deleteData) && count($postData->deleteData) > 0) {
            $array = json_decode(json_encode($postData->deleteData), true);
            $this->db->where_in($primary_field, $array);
            $this->db->delete($table);
            if ($this->db->_error_message()) {
                $error = ['number' => $this->db->_error_number(), 'message' => $this->db->_error_message()];
            }
        }
        $this->db->trans_complete();
        $this->db->db_debug = $db_debug;
        if ($this->db->trans_status() === TRUE) {
            return true;
        } else {
            $this->db->trans_rollback();
            return $error['number'] && $error['message'] ? $error : false;
        }
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
    public function bulkImport($appId, $data)
    {
        $this->db->trans_start();
        $CI = &get_instance();
        $CI->load->model('quota_model');
        if (!$CI->quota_model->hasQuotaFor($appId, 'INCEXPTRX')) {
            return null;
        }
        $this->db->insert_batch('income_expense', $data);
        $this->db->trans_complete();
        return $this->db->trans_status() === false ? false : true;
    }
}
