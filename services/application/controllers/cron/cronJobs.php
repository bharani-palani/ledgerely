<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Razorpay\Api\Api;
use Razorpay\Api\Errors;

class cronJobs extends CI_Controller
{
    public $razorPayApi;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->library('../controllers/auth');
        $this->load->library('email');
        $this->email->initialize([
            'protocol' => $this->config->item('protocol'),
            'smtp_host' => $this->config->item('smtp_host'),
            'smtp_user' => $this->config->item('smtp_user'),
            'smtp_pass' => $this->config->item('smtp_pass'),
            'mailtype' => $this->config->item('mailtype'),
            'charset' => $this->config->item('charset')
        ]);
        $this->razorPayApi =
            $_ENV['APP_ENV'] === 'production' ?
            new Api($this->config->item('razorpay_live_key_id'), $this->config->item('razorpay_live_key_secret')) :
            new Api($this->config->item('razorpay_test_key_id'), $this->config->item('razorpay_test_key_secret'));
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
            $apps = $this->home_model->getActiveAppAccounts();
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
            $date = new DateTime();
            $timezoneOffset = $date->format('O');
            $this->db->insert('logs', [
                'log_id' => NULL,
                'log_name' => 'Cron Job',
                'log_email' => $config[0]['appSupportEmail'],
                'log_source' => 'Cron',
                'log_type' => 'UpdateQuota',
                'log_description' => count($apps) . ' app accounts quota updated',
                'log_user_id' => 'XXX',
                'log_time' => $date->format("D M d Y H:i:s") . " GMT" . $timezoneOffset,
                'log_ip' => $_SERVER['SERVER_ADDR'],
            ]);
            $this->auth->response(['response' => 'Success!'], [], 200);
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }
    public function expiryBatchNotification()
    {
        try {
            $batchSize = 10;
            $data = $this->home_model->getActiveExpiredAppAccounts();
            $config = $this->home_model->getGlobalConfig();
            $appName = $config[0]['appName'];
            $email = $config[0]['appSupportEmail'];

            for ($i = 0; $i < count($data); $i += $batchSize) {
                $batch = array_slice($data, $i, $batchSize);
                $data = [];
                foreach ($batch as $key => $item) {
                    $this->email->from($email, $appName . ' Support Team');
                    $this->email->to($item['email']);
                    $this->email->subject($appName . ' trial period or subscription has expired!');
                    $emailData['globalConfig'] = $config;
                    $emailData['appName'] = $appName;
                    $emailData['saluation'] = 'Hello ' . $item['name'] . ',';
                    $emailData['matter'] = [
                        'Your ' . $appName . ' account trial period or subscription has expired past ' . $item['expiredDaysPast'] . ' day(s). Your last active day was ' . date('Y-m-d', strtotime($item['expiryDateTime'])) . '.',
                        'Please <a href="' . $_ENV['DOMAIN_URL'] . '/billing">Subscribe</a> immediately and choose any of your aptable plans.',
                        'You can upgrade or downgrade your plan any time. Appreciate your immediate attention to this.',
                    ];
                    $emailData['signature'] = 'Regards,';
                    $emailData['signatureCompany'] = $appName;
                    $mesg = $this->load->view('emailTemplate', $emailData, true);
                    $this->email->message($mesg);
                    $this->email->send();
                }
                sleep(5);
            }
            $date = new DateTime();
            $timezoneOffset = $date->format('O');
            $this->db->insert('logs', [
                'log_id' => NULL,
                'log_name' => 'Cron Job',
                'log_email' => $config[0]['appSupportEmail'],
                'log_source' => 'Cron',
                'log_type' => 'ExpiryNotification',
                'log_description' => count($data) . ' app accounts expiry notifications sent',
                'log_user_id' => 'XXX',
                'log_time' => $date->format("D M d Y H:i:s") . " GMT" . $timezoneOffset,
                'log_ip' => $_SERVER['SERVER_ADDR'],
            ]);
            $this->auth->response(['response' => 'Success!'], [], 200);
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }
    public function deleteAccountsBatch()
    {
        try {
            $batchSize = 10;
            $apps = $this->home_model->getInActiveAppAccounts();
            $config = $this->home_model->getGlobalConfig();
            $date = new DateTime();
            $timezoneOffset = $date->format('O');
            $appName = $config[0]['appName'];
            $email = $config[0]['appSupportEmail'];

            for ($i = 0; $i < count($apps); $i += $batchSize) {
                $batch = array_slice($apps, $i, $batchSize);
                foreach ($batch as $key => $item) {
                    // delete account data
                    $this->db->delete('workbook', array('wb_appId' => $item['closeAppId']));
                    $this->db->delete('datasourceQuery', array('dsq_appId' => $item['closeAppId']));
                    $this->db->delete('income_expense_template', array('temp_appId' => $item['closeAppId']));
                    $this->db->delete('income_expense', array('inc_exp_appId' => $item['closeAppId']));
                    $this->db->delete('banks', array('bank_appId' => $item['closeAppId']));
                    $this->db->delete('credit_card_transactions', array('cc_appId' => $item['closeAppId']));
                    $this->db->delete('credit_cards', array('credit_card_appId' => $item['closeAppId']));
                    $this->db->delete('income_expense_category', array('inc_exp_cat_appId' => $item['closeAppId']));
                    $this->db->delete('users', array('user_appId' => $item['closeAppId']));
                    $this->db->delete('apps', array('appId' => $item['closeAppId']));

                    //delete razorpay subscription
                    $rpSubId = $_ENV['APP_ENV'] === "production" ? 'razorPayLiveSubscriptionId' : 'razorPayTestSubscriptionId';
                    $this->razorPayApi->subscription->fetch($rpSubId)->cancel([
                        'cancel_at_cycle_end' => 0
                    ]);

                    //send mail to owner on deletion
                    $this->email->from($email, $appName . ' Support Team');
                    $this->email->to($item['email']);
                    $this->email->subject($appName . ' account deleted!');
                    $emailData['globalConfig'] = $config;
                    $emailData['appName'] = $appName;
                    $emailData['saluation'] = 'Dear User,';
                    $emailData['matter'] = [
                        'As per your closure request, your account is deleted and you are no more a user of ' . $appName . '.',
                        'If you changed your mind, you can always create a new account.',
                        'Wish you all the best and thank you for using ' . $appName . ' and giving us an opportunity to serve you.',
                        'We are sorry to see you go. If you have any feedback or suggestions, please let us know.',
                    ];
                    $emailData['signature'] = 'Regards,';
                    $emailData['signatureCompany'] = $appName;
                    $mesg = $this->load->view('emailTemplate', $emailData, true);
                    $this->email->message($mesg);

                    // add to logs
                    $this->db->insert('logs', [
                        'log_id' => NULL,
                        'log_name' => 'Cron Job',
                        'log_email' => $config[0]['appSupportEmail'],
                        'log_source' => 'Cron',
                        'log_type' => 'deleteAppData',
                        'log_description' => 'App Id: ' . $item['closeAppId'] . ' account data deleted',
                        'log_user_id' => 'XXX',
                        'log_time' => $date->format("D M d Y H:i:s") . " GMT" . $timezoneOffset,
                        'log_ip' => $_SERVER['SERVER_ADDR'],
                    ]);
                }
                sleep(5);
            }
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }

    function test()
    {
        $config = $this->home_model->getGlobalConfig();
        $appName = $config[0]['appName'];

        $emailData['globalConfig'] = $config;
        $emailData['appName'] = $appName;
        $emailData['saluation'] = 'Dear Admin,';
        $emailData['matter'] = [
            'Please note, this auto update process is only for active users.',
            'This is an auto generated cron mail.',
        ];
        $emailData['signature'] = 'Regards,';
        $emailData['signatureCompany'] = $appName;

        $this->load->view('emailTemplate', $emailData);
    }
}
