<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
class quota_model extends CI_Model
{
    public $settings;
    public function __construct()
    {
        parent::__construct();
        @$this->db = $this->load->database('default', true);
        $this->settings = [
            'INCEXPTRX' => ['quotaLimit' => 'a.planTrxLimit', 'consumptionUsed' => 'b.incomeExpenseTransactionSize'],
            'CREDITCARDTRX' => ['quotaLimit' => 'a.planCreditCardTrxLimit', 'consumptionUsed' => 'b.creditCardTransactionSize'],
            'USERS' => ['quotaLimit' => 'a.planUsersLimit', 'consumptionUsed' => 'b.usersSize'],
            'CATEGORIES' => ['quotaLimit' => 'a.planCategoriesLimit', 'consumptionUsed' => 'b.categoriesSize'],
            'BANKS' => ['quotaLimit' => 'a.planBankAccountsLimit', 'consumptionUsed' => 'b.bankAccountsSize'],
            'CREDITCARDS' => ['quotaLimit' => 'a.planCreditCardAccounts', 'consumptionUsed' => 'b.creditCardsSize'],
            'STORAGE' => ['quotaLimit' => 'a.planStorageLimit', 'consumptionUsed' => 'b.storageSize'],
            'DATASOURCE' => ['quotaLimit' => 'a.planDatasourceLimit', 'consumptionUsed' => 'b.dataSourceSize'],
            'WORKBOOK' => ['quotaLimit' => 'a.planWorkbookLimit', 'consumptionUsed' => 'b.workbookSize'],
            'TEMPLATE' => ['quotaLimit' => 'a.planTemplateLimit', 'consumptionUsed' => 'b.templateSize'],
        ];
    }

    public function hasQuotaFor($appId, $service = null)
    {
        if (!isset($appId) || !array_key_exists($service, $this->settings)) {
            return false;
        }
        $quotaLimit = $this->settings[$service]['quotaLimit'];
        $consumptionUsed = $this->settings[$service]['consumptionUsed'];
        $this->db
            ->select($quotaLimit . ' AS quotaLimit', FALSE)
            ->select($consumptionUsed . ' AS consumptionUsed', FALSE)
            ->from('plans as a')
            ->join('apps as b', 'a.planId = b.appsPlanId')
            ->where('b.appId', $appId);
        $query = $this->db->get();
        $row = $query->row();
        $quota = is_null($row->quotaLimit) ? INF : (int)$row->quotaLimit;
        $consumption = (int)$row->consumptionUsed;
        return $quota > $consumption;
    }
}
