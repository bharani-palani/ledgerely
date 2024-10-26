<?php
defined('BASEPATH') or exit('No direct script access allowed');
class cronJobs extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->library('../controllers/auth');
        $this->email->initialize([
            'protocol' => $this->config->item('protocol'),
            'smtp_host' => $this->config->item('smtp_host'),
            'smtp_user' => $this->config->item('smtp_user'),
            'smtp_pass' => $this->config->item('smtp_pass'),
            'mailtype' => $this->config->item('mailtype'),
            'charset' => $this->config->item('charset')
        ]);
    }
    public function throwException($e)
    {
        $errors = [
            'CODE' => $e->getCode(),
            'MESSAGE' => $e->getMessage(),
            'FILE' => $e->getFile(),
            'LINE' => $e->getLine(),
            'STRING_TRACE' => $e->getTraceAsString(),
        ];
        $this->auth->response(['response' => $errors], [], 500);
    }

    public function quotaBatchUpdate()
    {
        try {
            $batchSize = 10;
            $apps = $this->home_model->getAllAppAccounts();
            for ($i = 0; $i < count($apps); $i += $batchSize) {
                $batch = array_slice($apps, $i, $batchSize);
                $data = [];
                foreach ($batch as $key => $item) {
                    $banks = $this->home_model->getTableCount('banks', 'bank_appId', $item['appId']);
                    $creditCards = $this->home_model->getTableCount('credit_cards', 'credit_card_appId', $item['appId']);
                    $users = $this->home_model->getTableCount('users', 'user_appId', $item['appId']);
                    $incomeExpenseTransactionSize = $this->home_model->getTableCount('income_expense', 'inc_exp_appId', $item['appId']);
                    $creditCardTransactionSize = $this->home_model->getTableCount('credit_card_transactions', 'cc_appId', $item['appId']);
                    $templateSize = $this->home_model->getTableCount('income_expense_template', 'temp_appId', $item['appId']);
                    $categoriesSize = $this->home_model->getTableCount('income_expense_category', 'inc_exp_cat_appId', $item['appId']);
                    $dataSourceSize = $this->home_model->getTableSize('datasourceQuery', 'dsq_object', 'dsq_appId', $item['appId']);
                    $workbookSize = $this->home_model->getTableSize('workbook', 'wb_object', 'wb_appId', $item['appId']);
                    $data[$key] = [
                        'appId' => $item['appId'],
                        'bankAccountsSize' => $banks,
                        'creditCardsSize' => $creditCards,
                        'usersSize' => $users,
                        'incomeExpenseTransactionSize' => $incomeExpenseTransactionSize,
                        'creditCardTransactionSize' => $creditCardTransactionSize,
                        'storageSize' => 0,
                        'templateSize' => $templateSize,
                        'categoriesSize' => $categoriesSize,
                        'dataSourceSize' => $dataSourceSize,
                        'workbookSize' => $workbookSize,
                    ];
                }
                $this->home_model->updateQuotaBatch('apps', $data, 'appId');
                sleep(5);
            }
            $config = $this->home_model->getGlobalConfig();
            $appName = $config[0]['appName'];
            $email = $config[0]['appSupportEmail'];
            $adminEmail = $config[0]['appAdminEmail'];

            $this->email->from($email, $appName . ' - Automated Cron Job');
            $this->email->to($adminEmail);
            $this->email->subject($appName . ' cron job successfully completed for ' . $_ENV['APP_ENV'] . ' environment!');
            $emailData['globalConfig'] = $config;
            $emailData['appName'] = $appName;
            $emailData['saluation'] = 'Dear Admin,';
            $emailData['matter'] = [
                'Total ' . count($apps) . ' app users have been updated with their quota usage.',
                'Please note, this auto update process is only for active users.',
                'This is an auto generated cron mail.',
            ];
            $emailData['signature'] = 'Regards,';
            $emailData['signatureCompany'] = $appName;
            $mesg = $this->load->view('emailTemplate', $emailData, true);
            $this->email->message($mesg);
            if ($this->email->send()) {
                $this->auth->response(['response' => 'Success!'], [], 200);
            }
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }
}
