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

            $config = $this->home_model->getGlobalConfig();
            $appName = $config[0]['appName'];
            $email = $config[0]['appSupportEmail'];

            $this->email->from($email, $appName . ' Support Team');
            $this->email->to('tp.bharani@gmail.com');
            $this->email->subject($appName . ' Your new password!');
            $emailData['globalConfig'] = $config;
            $emailData['appName'] = $appName;
            $emailData['saluation'] = 'Dear User,';
            $emailData['matter'] = [
                'This is an auto generated cron mail',
                'Please do not reply to this mail.'
            ];
            $emailData['signature'] = 'Regards,';
            $emailData['signatureCompany'] = $appName;
            $mesg = $this->load->view('emailTemplate', $emailData, true);
            $this->email->message($mesg);
            $this->email->send();
            $this->auth->response(['response' => 'Success!'], [], 200);
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }
}
