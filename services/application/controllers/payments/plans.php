<?php
defined('BASEPATH') or exit('No direct script access allowed');
class plans extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('plan_model');
        $this->load->library('../controllers/auth');
    }
    public function availableBillingPlans()
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
            $data['response'] = $this->plan_model->availableBillingPlans($appId);
            $this->auth->response($data, [], 200);
        }
    }
    public function checkDiscounts()
    {
        $planId = $this->input->post('planId');
        $data['response'] = $this->plan_model->checkDiscounts($planId);
        $this->auth->response($data, [], 200);
    }
    public function checkTaxes()
    {
        $data['response'] = $this->plan_model->checkTaxes();
        $this->auth->response($data, [], 200);
    }
}
