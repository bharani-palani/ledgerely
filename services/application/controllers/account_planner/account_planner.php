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
    public function getBankDetails()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $data['response'] = $this->account_planner_model->getBankDetails(
                $this->input->post('bank')
            );
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
            $data['response'] = $this->account_planner_model->credit_card_list();
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
            $data['response'] = $this->account_planner_model->credit_card_details(
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
            $data['response'] = $this->account_planner_model->getIncExpTemplate();
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
            $data['response'] = $this->account_planner_model->postAccountPlanner($post);
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
            $data['response'] = $this->account_planner_model->getTotalHoldings();
            $this->auth->response($data, [], 200);
        }
    }
    public function runQuery()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $postData = $this->input->post('postData');
            $postData = str_replace('{%}', '%', $postData);
            $data['response'] = $this->account_planner_model->runQuery(
                $postData
            );
            $this->auth->response($data, ['query' => $postData], 200);
        }
    }
    public function postFundTransfer()
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
                'amount' => $this->input->post('amount'),
                'source' => $this->input->post('source'),
                'dest' => $this->input->post('dest'),
                'description' => $this->input->post('description'),
                'category' => $this->input->post('category'),
                'date' => $this->input->post('date'),
                'dateTime' => $this->input->post('dateTime'),
            ];
            $data['response'] = $this->account_planner_model->postFundTransfer($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function getFundDetails()
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
                'id' => $this->input->post('id'),
            ];
            $data['response'] = $this->account_planner_model->getFundDetails($post);
            $this->auth->response($data, [], 200);
        }
    }
    public function searchString($array, $value) {
        $result = null;
        foreach ($array as $object) {
            if ($object['value'] === $value) {
                $result = $object;
                break;
            }
        }
        unset($object);
        return $result['id'] ?? false;
    }
    public function bulkExport()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $post = $this->input->post('data');
            $post = json_decode($post, true);
            $categories = $this->account_planner_model->inc_exp_list();
            $banks = $this->account_planner_model->bank_list();
            foreach($post as $key => $value) {
                if (array_key_exists("inc_exp_id", $post[$key])) {
                    $post[$key]['inc_exp_id'] = null;
                }
                if (array_key_exists("inc_exp_category", $post[$key])) {
                    $searchValue = $post[$key]['inc_exp_category'];
                    $post[$key]['inc_exp_category'] = $this->searchString($categories, $searchValue);
                }
                if (array_key_exists("inc_exp_bank", $post[$key])) {
                    $searchValue = $post[$key]['inc_exp_bank'];
                    $post[$key]['inc_exp_bank'] = $this->searchString($banks, $searchValue);
                }
            }
            $filteredArray = array_filter(
                $post, fn($val) => (
                 $val['inc_exp_bank'] !== false && $val['inc_exp_category'] !== false
            ));
            if(count($filteredArray) > 0) {
                $data['response'] = $this->account_planner_model->bulkExport($filteredArray);
                $this->auth->response($data, [], 200);
            } else {
                $data['response'] = false;
                $this->auth->response($data, [], 404);
            }
            // print_r($filteredArray);
        }
    }
}
