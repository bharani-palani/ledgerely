<?php
defined('BASEPATH') or exit('No direct script access allowed');
class home extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->library('../controllers/auth');
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
            $data['response'] = $this->home_model->get_config();
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
                'password' => $this->input->post('password'),
            ];
            $data['response'] = $this->home_model->validateUser($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function fetchUsers()
    {
        // $validate = $this->auth->validateAll();
        // if ($validate === 2) {
        //     $this->auth->invalidTokenResponse();
        // }
        // if ($validate === 3) {
        //     $this->auth->invalidDomainResponse();
        // }
        // if ($validate === 1) {
            $data['response'] = $this->home_model->fetchUsers();
            print_r($data);
            // $this->auth->response($data, [], 200);
        // }
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
        $alphabet =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $password = [];
        $alpha_length = strlen($alphabet) - 1;
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alpha_length);
            $password[] = $alphabet[$n];
        }
        return implode($password);
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
                $config = $this->home_model->get_config();
                $web = $config[0]['web'];
                $email = $config[0]['email'];

                $resetPassword = $this->random_password();
                $update = $this->home_model->resetUpdate(
                    $post['id'],
                    $resetPassword
                );
                if ($update) {
                    $this->email->from(
                        'do-not-reply@' . explode('@', $email)[1],
                        'Support Team'
                    );
                    $this->email->to($post['email']);
                    $this->email->subject($web . ' Your new password!');
                    $this->email->message(
                        $resetPassword .
                            ' is your new password. Please change them periodically.'
                    );
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
                $config = $this->home_model->get_config();
                $web = $config[0]['web'];
                $email = $config[0]['email'];

                $otp = $this->random_otp();
                $otpAction = $this->home_model->otpUpdate($userId, $otp);
                if ($otpAction) {
                    $this->email->from(
                        'do-not-reply@' . explode('@', $email)[1],
                        'Support Team'
                    );
                    $this->email->to($post['email']);
                    $this->email->subject($web . ' OTP for password reset');
                    $this->email->message(
                        $otp .' is your OTP (One Time Password) to reset password. This is valid only for next 5 minutes. Please do not share with anyone. If this mail was not sent on your consent, report this to your admin immediately.'
                    );
                    if ($this->email->send()) {
                        $data['response'] = $userId;
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
}
