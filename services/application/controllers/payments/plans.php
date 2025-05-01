<?php
defined('BASEPATH') or exit('No direct script access allowed');
class plans extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('plan_model');
        $this->load->library('../controllers/auth');
        $this->auth->validateToken();
    }
    public function availableBillingPlans()
    {
        $appId = $this->input->post('appId');
        $currency = $this->input->post('currency');
        $data['response'] = $this->plan_model->availableBillingPlans($appId, $currency);
        $this->auth->response($data, [], 200);
    }
    public function checkDiscounts()
    {
        $razorPayCustomerId = $this->input->post('razorPayCustomerId');
        $data['response'] = $this->plan_model->checkDiscounts($razorPayCustomerId);
        $this->auth->response($data, [], 200);
    }
    public function checkTaxes()
    {
        $country = $this->input->post('country');
        $data['response'] = $this->plan_model->checkTaxes($country);
        $this->auth->response($data, [], 200);
    }
    public function deductExhaustedUsage()
    {
        $razorPayCustomerId = $this->input->post('razorPayCustomerId');
        $razorPayPlanId = $this->input->post('razorPayPlanId');
        $data['response'] = $this->plan_model->deductExhaustedUsage($razorPayCustomerId, $razorPayPlanId);
        $this->auth->response($data, [], 200);
    }
    public function accountClosure()
    {
        $post = [
            'appId' => $this->input->post('appId'),
            'selections' => $this->input->post('selections'),
            'comments' => $this->input->post('comments'),
            'dateTime' => date('Y-m-d H:i:s', strtotime('+1 year'))
        ];
        $data['response'] = $this->plan_model->accountClosure($post);
        $this->auth->response($data, [], 200);
    }
    public function checkClosure()
    {
        $appId = $this->input->post('appId');
        $data['response'] = $this->plan_model->checkClosure($appId);
        $this->auth->response($data, [], 200);
    }
    public function revokeAccount()
    {
        $appId = $this->input->post('appId');
        $data['response'] = $this->plan_model->revokeAccount($appId);
        $this->auth->response($data, [], 200);
    }
    public function getPricingCurrencies()
    {
        $data['response'] = $this->plan_model->getPricingCurrencies();
        $this->auth->response($data, [], 200);
    }
}
