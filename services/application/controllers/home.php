<?php
defined('BASEPATH') or exit('No direct script access allowed');
class home extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->model('quota_model');
        $this->load->library('../controllers/auth');
        $this->load->library('email');
        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'mail.bharani.tech';
        $config['smtp_user'] = '_mainaccount@bharani.tech';
        $config['smtp_pass'] = 'Bniwin@!123';
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';

        $this->email->initialize($config);
    }
    public function index()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->home_model->getGlobalConfig();
            $this->auth->response($data, [], 200);
        }
    }
    public function getUserConfig()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $appId = $this->input->post('appId');
            $data['response'] = $this->home_model->getUserConfig($appId);
            $this->auth->response($data, [], 200);
        }
    }

    public function getBackend()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'TableRows' => $this->input->post('TableRows'),
                'Table' => $this->input->post('Table'),
                'appId' => $this->input->post('appId'),
            ];
            $data['response'] = $this->home_model->getBackend($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function postBackend()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'postData' => $this->input->post('postData'),
            ];
            $data['response'] = $this->home_model->postBackend($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function validateUser()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'username' => $this->input->post('username'),
                'password' => $this->input->post('password', TRUE),
            ];
            $data['response'] = $this->home_model->validateUser($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function fetchAccessLevels()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->home_model->fetchAccessLevels();
            $this->auth->response($data, [], 200);
        }
    }
    public function fetchUsers()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->home_model->fetchUsers($this->input->post('appId'));
            $this->auth->response($data, [], 200);
        }
    }
    public function checkUserExists()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'username' => $this->input->post('username'),
                'email' => $this->input->post('email'),
                'userId' => $this->input->post('userId'),
            ];
            $data['response'] = $this->home_model->checkUserExists($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function changePassword()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'userName' => $this->input->post('userName'),
                'currentPass' => $this->input->post('currentPass'),
                'newPass' => $this->input->post('newPass'),
                'repeatPass' => $this->input->post('repeatPass'),
            ];
            $data['response'] = $this->home_model->changePassword($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function random_otp()
    {
        $alphabet = '1234567890';
        $password = [];
        $alpha_length = strlen($alphabet) - 1;
        for ($i = 0; $i < 6; $i++) {
            $n = rand(0, $alpha_length);
            $password[] = $alphabet[$n];
        }
        return implode($password);
    }

    function random_password()
    {
        $password = '';
        $passwordSets = ['1234567890', '!@#$%^&*_', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'];

        foreach ($passwordSets as $passwordSet) {
            $password .= $passwordSet[array_rand(str_split($passwordSet))];
        }

        while (strlen($password) < 8) {
            $randomSet = $passwordSets[array_rand($passwordSets)];
            $password .= $randomSet[array_rand(str_split($randomSet))];
        }
        return $password;
    }

    public function resetPassword()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'otp' => $this->input->post('otp'),
                'id' => $this->input->post('id'),
                'email' => $this->input->post('email'),
            ];
            $validateOtpTime = $this->home_model->validateOtpTime($post);
            if ($validateOtpTime) {
                $config = $this->home_model->getGlobalConfig();
                $appName = $config[0]['appName'];
                $email = $config[0]['appSupportEmail'];

                $resetPassword = $this->random_password();
                $update = $this->home_model->resetUpdate(
                    $post['id'],
                    $resetPassword
                );
                if ($update) {
                    $this->email->from($email, $appName . ' Support Team');
                    $this->email->to($post['email']);
                    $this->email->subject($appName . ' Your new password!');
                    $emailData['globalConfig'] = $config;
                    $emailData['appName'] = $appName;
                    $emailData['saluation'] = 'Dear User,';
                    $emailData['matter'] = [
                        $resetPassword . ' is your new password.',
                        'Please change them periodically.'
                    ];
                    $emailData['signature'] = 'Regards,';
                    $emailData['signatureCompany'] = $appName;
                    $mesg = $this->load->view('emailTemplate', $emailData, true);
                    $this->email->message($mesg);
                    if ($this->email->send()) {
                        $data['response'] = true;
                    } else {
                        $data['response'] = false;
                    }
                } else {
                    $data['response'] = false;
                }
            } else {
                $data['response'] = false;
            }
            $this->auth->response($data, [], 200);
        }
    }

    public function sendUserInfo()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'email' => $this->input->post('email'),
                'userName' => $this->input->post('userName'),
                'password' => $this->input->post('password'),
            ];
            if (
                isset($post['userName']) &&
                isset($post['password']) &&
                isset($post['email'])
            ) {
                $config = $this->home_model->getGlobalConfig();
                $appName = $config[0]['appName'];
                $email = $config[0]['appSupportEmail'];
                $appWeb = $config[0]['appWeb'];

                $this->email->from($email, $appName);
                $this->email->to($post['email']);
                $this->email->subject('Your new ' . $appWeb . ' credentials!');
                $emailData['globalConfig'] = $config;
                $emailData['appName'] = $appName;
                $emailData['saluation'] = 'Dear User,';
                $emailData['matter'] = [
                    'You have been added to ' . $appName . " app as user.",
                    $post['userName'] . ' is your user name and ' . $post['password'] . ' is your password.',
                    'Login with these credentials on ' . $appWeb,
                    'Please do not reply to this mail, as it is autogenerated.'
                ];
                $emailData['signature'] = 'Regards,';
                $emailData['signatureCompany'] = $appName;
                $mesg = $this->load->view('emailTemplate', $emailData, true);
                $this->email->message($mesg);
                if ($this->email->send()) {
                    $data['response'] = true;
                } else {
                    $data['response'] = false;
                }
            }
        }
    }
    public function sendOtp()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = [
                'email' => $this->input->post('email'),
            ];
            $userId = $this->home_model->checkValidEmail($post);
            if ($userId !== false) {
                $config = $this->home_model->getGlobalConfig();
                $appName = $config[0]['appName'];
                $email = $config[0]['appSupportEmail'];

                $otp = $this->random_otp();
                $otpAction = $this->home_model->otpUpdate($userId, $otp);

                if ($otpAction) {
                    $this->email->from($email, $appName . ' Support Team');
                    $this->email->to($post['email']);
                    $this->email->subject('OTP for password reset');

                    $emailData['globalConfig'] = $config;
                    $emailData['appName'] = $appName;
                    $emailData['saluation'] = 'Dear User,';
                    $emailData['matter'] = [
                        '<big>' . $otp . '</big>',
                        'Is your OTP (One Time Password) to reset your account. This is valid only for next 5 minutes.',
                        'Please do not share with anyone.',
                        'If this mail was not sent on your consent, change your password immediately.'
                    ];
                    $emailData['signature'] = 'Regards,';
                    $emailData['signatureCompany'] = $appName;

                    $mesg = $this->load->view('emailTemplate', $emailData, true);
                    $this->email->message($mesg);
                    if ($this->email->send()) {
                        $fetchUserId = $this->home_model->checkValidEmail($post);
                        $data['response'] = $fetchUserId;
                    } else {
                        $data['response'] = false;
                    }
                } else {
                    $data['response'] = false;
                }
            } else {
                $data['response'] = false;
            }
            $this->auth->response($data, [], 200);
        }
    }
    public function viewEmailTemplate()
    {
        $config = $this->home_model->getGlobalConfig();
        $appName = $config[0]['appName'];
        $email = $config[0]['appSupportEmail'];
        $appWeb = $config[0]['appWeb'];

        $emailData['globalConfig'] = $config;
        $emailData['appName'] = $appName;
        $emailData['saluation'] = 'Dear User,';
        $emailData['matter'] = ['Sample content'];
        $emailData['signature'] = 'Regards,';
        $emailData['signatureCompany'] = $appName;

        echo $this->load->view('emailTemplate', $emailData, true);
        $this->output->set_content_type('application/html');
    }
    public function getLocale()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->home_model->getLocale($this->input->post('localeCode'));
            $this->auth->response($data, [], 200);
        }
    }
    public function getUniqueLocales()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->home_model->getUniqueLocales();
            $this->auth->response($data, [], 200);
        }
    }
    public function saveLog()
    {
        $post = json_decode($this->input->post('log'));
        $this->home_model->saveLog($post);
    }
}
