<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
class plan_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        @$this->db = $this->load->database('default', true);
    }
    public function availableBillingPlans($appId)
    {
        $query = $this->db
            ->select(array(
                'a.planId',
                'a.planName',
                'a.planCode',
                'a.planTitle',
                'a.planDescription',
                'a.planPriceMonthly',
                'a.planPriceYearly',
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
                from apps where appId = "' . $appId . '") as isPlanOptable'
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
                        'planStorageLimit', 'planDatasourceLimit', 'planWorkbookLimit', 'planTemplateLimit', 'visualizationLimit'
                    ])) {
                        $output = is_null($row[$field]) ? null : (float)$row[$field];
                    }
                    // check string
                    if (in_array($field, ['planId', 'planName', 'planCode', 'planTitle', 'planDescription'])) {
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

    public function checkDiscounts($planId)
    {
        $query = $this->db
            ->select(['discPercent', 'discName'])
            ->where('NOW() BETWEEN discStartDate AND discEndDate')
            ->get_where('discounts', ['discPlan' => $planId, 'isActive' => '1']);
        if ($query->num_rows() > 0) {
            $result = $query->row();
            return ['name' => $result->discName, 'value' => (float)$result->discPercent];
        } else {
            return ['name' => '', 'value' => 0];
        }
    }
    public function checkTaxes()
    {
        $query = $this->db
            ->select(['taxPercent', 'taxName'])
            ->where('NOW() BETWEEN taxStartDate AND taxEndDate')
            ->get_where('taxes', ['isActive' => '1']);
        if ($query->num_rows() > 0) {
            $result = $query->row();
            return ['name' => $result->taxName, 'value' => (float)$result->taxPercent];
        } else {
            return ['name' => '', 'value' => 0];
        }
    }
    public function deductExhaustedUsage($appId)
    {
        $query = $this->db
            ->select(['allocationStartTime', 'expiryDateTime', 'lastPaidAmount', 'paidForDays'])
            ->get_where('apps', ['appId' => $appId]);
        if ($query->num_rows() > 0) {
            $result = $query->row();
            $startDate = $result->allocationStartTime; // Y:m:d h:i:s
            $endDate = $result->expiryDateTime; // Y:m:d h:i:s
            $amount = (float)$result->lastPaidAmount; // float $1234.56
            $paidForDays = (int)$result->paidForDays; // 30 / 365

            $exhaustedDays = round((time() - strtotime($startDate)) / 86400, 2);
            $balanceDays = round((strtotime($endDate) - time()) / 86400, 2);
            $perDayCost = round($amount / $paidForDays, 2);
            $adjustmentCredit = round($balanceDays * $perDayCost, 2);
            $adjustmentCredit = $adjustmentCredit > 0 ? $adjustmentCredit : 0;
            return [
                'exhaustedDays' => $exhaustedDays, 'balanceDays' => $balanceDays,
                "perDayCost" => $perDayCost, 'adjustmentCredit' => $adjustmentCredit
            ];
        } else {
            return [
                'exhaustedDays' => 0, 'balanceDays' => 0, "perDayCost" => 0, 'adjustmentCredit' => 0
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
