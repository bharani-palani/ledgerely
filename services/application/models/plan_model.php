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
                    if (in_array($field, ['planName', 'planCode', 'planTitle', 'planDescription'])) {
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
