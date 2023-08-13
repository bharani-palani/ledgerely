<?php
defined('BASEPATH') or exit('No direct script access allowed');
class sign extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('../controllers/auth');
    }
    public function signup()
    {
        $data['response'] = 'sign up success';
        $this->auth->response($data, [], 200);
    }
    public function signupEmailAction()
    {
        $data['response'] = 'email action success';
        $this->auth->response($data, [], 200);
    }

}