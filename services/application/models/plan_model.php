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
            ), false)
            ->from('plans as a')
            ->join('planBasedCharts as b', 'b.planId = a.planId', 'LEFT')
            ->join('apps as c', 'c.appsPlanId = a.planId', 'LEFT')
            ->where(array('a.planIsActive' => '1'))
            ->order_by('planSortOrder asc')
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
                    if (!is_null($row[$field]) && !is_numeric($row[$field])) {
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
}
