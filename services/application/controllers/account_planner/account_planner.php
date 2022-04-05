<?php
defined('BASEPATH') or exit('No direct script access allowed');
class account_planner extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('account_planner_model');
        $this->load->library('../controllers/auth');
    }
    public function vendor_list()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->account_planner_model->vendor_list();
            $this->auth->response($data, [], 200);
        }
    }
    public function inc_exp_list()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->account_planner_model->inc_exp_list();
            $this->auth->response($data, [], 200);
        }
    }
    public function bank_list()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->account_planner_model->bank_list();
            $this->auth->response($data, [], 200);
        }
    }
    public function credit_card_list()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data[
                'response'
            ] = $this->account_planner_model->credit_card_list();
            $this->auth->response($data, [], 200);
        }
    }
    public function year_list()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->account_planner_model->year_list();
            $this->auth->response($data, [], 200);
        }
    }
    public function cc_year_list()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->account_planner_model->cc_year_list();
            $this->auth->response($data, [], 200);
        }
    }
    public function credit_card_details()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data[
                'response'
            ] = $this->account_planner_model->credit_card_details(
                $this->input->post('bank')
            );
            $this->auth->response($data, [], 200);
        }
    }
    public function getIncExpTemplate()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data[
                'response'
            ] = $this->account_planner_model->getIncExpTemplate();
            $this->auth->response($data, [], 200);
        }
    }
    public function getCreditCardChartData()
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
                'startDate' => $this->input->post('startDate'),
                'endDate' => $this->input->post('endDate'),
                'bank' => $this->input->post('bank'),
            ];
            $data = $this->account_planner_model->getCreditCardChartData($post);
            $op['response'] = $data['result'];
            $this->auth->response($op, ['query' => $data['query']], 200);
        }
    }

    public function getIncExpChartData()
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
                'startDate' => $this->input->post('startDate'),
                'endDate' => $this->input->post('endDate'),
                'bank' => $this->input->post('bank'),
            ];
            $data = $this->account_planner_model->getIncExpChartData($post);
            $op['response'] = $data['result'];
            $this->auth->response($op, ['query' => $data['query']], 200);
        }
    }
    public function getPlanDetails()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        // if ($validate === 3) {
        // 	$this->auth->invalidDomainResponse();
        // }
        if ($validate === 1) {
            $post = [
                'startDate' => $this->input->post('startDate'),
                'endDate' => $this->input->post('endDate'),
                'bankSelected' => $this->input->post('bankSelected'),
                'criteria' => $this->input->post('criteria'),
            ];
            $data = $this->account_planner_model->getPlanDetails($post);
            $op['response'] = $data['result'];
            $this->auth->response($op, ['query' => $data['query']], 200);
        }
    }

    public function getAccountPlanner()
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
                'WhereClause' => $this->input->post('WhereClause'),
            ];
            $data['response'] = $this->account_planner_model->getAccountPlanner(
                $post
            );
            $this->auth->response($data, [], 200);
        }
    }

    public function postAccountPlanner()
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
            $data[
                'response'
            ] = $this->account_planner_model->postAccountPlanner($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function getTotalHoldings()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data[
                'response'
            ] = $this->account_planner_model->getTotalHoldings();
            $this->auth->response($data, [], 200);
        }
    }
    public function runQuery()
    {
        // $validate = $this->auth->validateAll();
        // if ($validate === 2) {
        //     $this->auth->invalidTokenResponse();
        // }
        // if ($validate === 3) {
        //     $this->auth->invalidDomainResponse();
        // }
        // if ($validate === 1) {
        $postData = $this->input->post('postData');
        $postData = str_replace('{%}', '%', $postData);
        $data['response'] = $this->account_planner_model->runQuery($postData);
        print_r($data);
        // $this->auth->response($data, ['query' => $postData], 200);
        // }
    }
}
