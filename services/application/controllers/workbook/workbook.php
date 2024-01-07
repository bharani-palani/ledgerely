<?php
defined('BASEPATH') or exit('No direct script access allowed');
class workbook extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('workbook_model');
        $this->load->library('../controllers/auth');
    }
    public function fetchDynamicQuery()
    {
        $validate = $this->auth->validateAll();
        if ($validate === 2) {
            $this->auth->invalidTokenResponse();
        }
        if ($validate === 3) {
            $this->auth->invalidDomainResponse();
        }
        if ($validate === 1) {
            $query = $this->input->post('query');
            $appIdWhere = $this->input->post('appIdWhere');
            $data = $this->workbook_model->fetchDynamicQuery($query, $appIdWhere);
            if ($data['status']) {
                $this->auth->response($data, [$data['query']], 200);
            } else {
                $this->auth->response($data, [], 500);
            }
        }
    }
    public function saveDatasource()
    {
        $file = $this->input->post('fileData');
        $data = $this->workbook_model->saveDatasource($file);
        if (!$data) {
            $this->auth->response(["response" => false], [], 500);
        } else {
            $this->auth->response(["response" => $data], [], 200);
        }
    }
    public function getSavedQueryLists()
    {
        $appId = $this->input->post('appId');
        $data = $this->workbook_model->getSavedQueryLists($appId);
        if (!$data) {
            $this->auth->response(["response" => false], [], 500);
        } else {
            $this->auth->response(["response" => $data], [], 200);
        }
    }
}
