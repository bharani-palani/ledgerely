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
        $this->email->initialize([
            'protocol' => $this->config->item('protocol'),
            'smtp_host' => $this->config->item('smtp_host'),
            'smtp_user' => $this->config->item('smtp_user'),
            'smtp_pass' => $this->config->item('smtp_pass'),
            'mailtype' => $this->config->item('mailtype'),
            'charset' => $this->config->item('charset')
        ]);
        $this->auth->validateToken();
    }
    public function index()
    {
        $data['response'] = $this->home_model->getGlobalConfig();
        $this->auth->response($data, [], 200);
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
        if ($_ENV['APP_ENV'] !== 'local') {
            $object = (object) [
                'name' => 'ErrorHandler',
                'email' => 'errorHandler@ledgerely.com',
                'source' => 'BE',
                'type' => 'PhpError',
                'description' => json_encode($errors),
                'userId' => 'XXX',
                'time' => date("Y-m-d\TH:i:s"),
                'ip' => $_SERVER['REMOTE_ADDR'],
            ];
            $this->home_model->saveLog($object);
        }
        return $errors;
    }
    public function getUserConfig()
    {
        $appId = $this->input->post('appId');
        $data['response'] = $this->home_model->getUserConfig($appId);
        $this->auth->response($data, [], 200);
    }

    public function getBackend()
    {
        $post = [
            'TableRows' => $this->input->post('TableRows'),
            'Table' => $this->input->post('Table'),
            'appId' => $this->input->post('appId'),
        ];
        $data['response'] = $this->home_model->getBackend($post);
        $this->auth->response($data, [], 200);
    }
    public function postBackend()
    {
        $post = [
            'postData' => $this->input->post('postData'),
        ];
        $data['response'] = $this->home_model->postBackend($post);
        $this->auth->response($data, [], 200);
    }
    public function validateUser()
    {
        $post = [
            'username' => $this->input->post('username'),
            'password' => $this->input->post('password', TRUE),
        ];
        $data['response'] = $this->home_model->validateUser($post);
        $this->auth->response($data, ['token' => $this->auth->getTokens()], 200);
    }
    public function validateGoogleUser()
    {
        $post = [
            'username' => $this->input->post('username'),
            'email' => $this->input->post('email'),
        ];
        $data['response'] = $this->home_model->validateGoogleUser($post);
        $this->auth->response($data, ['token' => $this->auth->getTokens()], 200);
    }
    public function fetchAccessLevels()
    {
        $data['response'] = $this->home_model->fetchAccessLevels();
        $this->auth->response($data, [], 200);
    }
    public function fetchUsers()
    {
            $data['response'] = $this->home_model->fetchUsers($this->input->post('appId'));
            $this->auth->response($data, [], 200);
    }
    public function checkAppUserExists()
    {
        $post = [
            'accountUserName' => $this->input->post('accountUserName'),
        ];
        $data['response'] = $this->home_model->checkAppUserExists($post);
        $this->auth->response($data, [], 200);
    }
    public function checkUserExists()
    {
        $post = [
            'appId' => $this->input->post('appId'),
            'username' => $this->input->post('username'),
            'email' => $this->input->post('email'),
            'userId' => $this->input->post('userId'),
        ];
        $data['response'] = $this->home_model->checkUserExists($post);
        $this->auth->response($data, [], 200);
    }
    public function changePassword()
    {
        $post = [
            'userId' => $this->input->post('userId'),
            'currentPass' => $this->input->post('currentPass'),
            'newPass' => $this->input->post('newPass'),
            'repeatPass' => $this->input->post('repeatPass'),
            'appId' => $this->input->post('appId'),
        ];
        $data['response'] = $this->home_model->changePassword($post);
        $this->auth->response($data, [], 200);
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
        $post = [
            'otp' => $this->input->post('otp'),
            'id' => $this->input->post('id'),
            'email' => $this->input->post('email'),
            'appId' => $this->input->post('appId'),
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
                    '<p></p>',
                    $resetPassword . ' is your new password.',
                    'Please change them periodically.',
                    '<p></p>'
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

    public function sendUserInfo()
    {
        $post = [
            'email' => $this->input->post('email'),
            'userName' => $this->input->post('userName'),
            'password' => $this->input->post('password'),
            'displayName' => $this->input->post('displayName'),
            'profileName' => $this->input->post('profileName'),
            'type' => $this->input->post('type'),
            'mobile' => $this->input->post('mobile'),
        ];
        if (
            isset($post['userName']) &&
            isset($post['email']) &&
            isset($post['displayName']) &&
            isset($post['profileName']) &&
            isset($post['type']) &&
            isset($post['mobile'])
        ) {
            $accessLevels = $this->home_model->fetchAccessLevels();
            $selectedAccess = array_filter(
                $accessLevels,
                function ($val) use ($post) {
                    return $val['access_id'] === $post['type'];
                }
            );
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
            $matterArray = array_filter([
                '<p></p>',
                'You have been added to ' . $appName . " app with `" . $selectedAccess[0]['access_label'] . "` role. ",
                '`' . $post['userName'] . '` will be your user name ',
                (bool)($post['password']) ? 'and `' . $post['password'] . '` is your password' : false,
                'with profile name as `' . $post['profileName'] . '` and display name as `' . $post['displayName'] . '`. ',
                '<p></p>',
                'Login with user name / email and password on ' . $appWeb,
                'Happy exploring..',
                '<p></p>',
            ]);
            $emailData['matter'] = $matterArray;
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
        $this->auth->response($data, [], 200);
    }
    public function getSingleOrMutliAccountDetails()
    {
        $post = [
            'email' => $this->input->post('email'),
        ];
        $data['response'] = $this->home_model->getSingleOrMutliAccountDetails($post);
        $this->auth->response($data, [], 200);
    }
    public function sendOtp()
    {
        $post = [
            'email' => $this->input->post('email'),
            'appId' => $this->input->post('appId'),
        ];
        $userId = $this->home_model->checkValidEmail($post);
        if ($userId !== false) {
            $config = $this->home_model->getGlobalConfig();
            $appName = $config[0]['appName'];
            $email = $config[0]['appSupportEmail'];

            $otp = $this->random_otp();
            $otpAction = $this->home_model->otpUpdate($userId, $post['appId'], $otp);

            if ($otpAction) {
                $this->email->from($email, $appName . ' Support Team');
                $this->email->to($post['email']);
                $this->email->subject('OTP for password reset');

                $emailData['globalConfig'] = $config;
                $emailData['appName'] = $appName;
                $emailData['saluation'] = 'Dear User,';
                $emailData['matter'] = [
                    '<p></p>',
                    '<big>' . $otp . '</big>',
                    'Is your OTP (One Time Password) to reset your account. This is valid only for next 5 minutes.',
                    '<p></p>',
                    'Please do not share with anyone.',
                    'If this mail was not sent with your consent, change your password immediately.',
                    '<p></p>',
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
        $data['response'] = $this->home_model->getLocale($this->input->post('localeCode'));
        $this->auth->response($data, [], 200);
    }
    public function getUniqueLocales()
    {
        $data['response'] = $this->home_model->getUniqueLocales();
        $this->auth->response($data, [], 200);
    }
    public function saveLog()
    {
        $post = json_decode($this->input->post('log'));
        $this->home_model->saveLog($post);
    }
    public function signUp()
    {
        $post = [
            "accountUserName" => $this->input->post('accountUserName'),
            "accountEmail" => $this->input->post('accountEmail'),
            "accountPassword" => $this->input->post('accountPassword'),
            'accountName' => $this->input->post('accountName'),
            'accountAddress1' => $this->input->post('accountAddress1'),
            'accountAddress2' => $this->input->post('accountAddress2'),
            'accountCity' => $this->input->post('accountCity'),
            'accountState' => $this->input->post('accountState'),
            'accountPostalCode' => $this->input->post('accountPostalCode'),
            'accountCountry' => $this->input->post('accountCountry'),
        ];
        try {
            $bool = $this->home_model->signUp($post);
            if ($bool) {
                $config = $this->home_model->getGlobalConfig();
                $appName = $config[0]['appName'];
                $email = $config[0]['appSupportEmail'];

                $this->email->from($email, $appName . ' Support Team');
                $this->email->to($post['accountEmail']);
                $this->email->subject('Welcome to ' . $appName . '!');
                $emailData['globalConfig'] = $config;
                $emailData['appName'] = $appName;
                $emailData['saluation'] = 'Hello ' . $post['accountName'] . ',';
                $emailData['matter'] = [
                    '<p></p>',
                    'Welcome to ' . $appName,
                    'Thanks for opting ' . $appName . ' as your preferred domain to maintain your credit / debit card accounts.',
                    '<p></p>',
                    'Please login with your credentials to explore more on your financial transactions and vizualized reports.',
                    'For any queries, please dont hesitate to reach our support team (' . $email . ').',
                    'Happy exploring..',
                    '<p></p>',
                ];
                $emailData['signature'] = 'Sincerely,';
                $emailData['signatureCompany'] = $appName;
                $mesg = $this->load->view('emailTemplate', $emailData, true);
                $this->email->message($mesg);
                $data['response'] = true;
                $this->auth->response($data, [], 200);
            }
        } catch (Exception $e) {
            $this->auth->response(['response' => $this->throwException($e)], [], 400);
        }
    }
    public function multipleAccountsList()
    {
        $appIdList = explode(",", $this->input->post('appIdList'));
        $data['response'] = $this->home_model->multipleAccountsList($appIdList);
        $this->auth->response($data, [], 200);
    }
    public function getMultiUserRoles()
    {
        $post = [
            'appId' => $this->input->post('appId'),
            'username' => $this->input->post('username'),
        ];
        $data['response'] = $this->home_model->getMultiUserRoles($post);
        $this->auth->response($data, [], 200);
    }
}
