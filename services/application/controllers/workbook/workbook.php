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
            $this->auth->response($data, [], 200); // $data['query']
        }
    }
    public function saveDatasource()
    {
        $file = $this->input->post('fileData');
        $data = $this->workbook_model->saveDatasource($file);
        $this->auth->response(["response" => $data], [], 200);
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
    public function fetchQueryObjectById()
    {
        $appId = $this->input->post('appId');
        $id = $this->input->post('id');
        $type = $this->input->post('type');
        $data = $this->workbook_model->fetchQueryObjectById($appId, $id, $type);
        if (!$data) {
            $this->auth->response(["response" => false], [], 500);
        } else {
            $this->auth->response(["response" => $data], [], 200);
        }
    }
    public function deleteSavedQuery()
    {
        $appId = $this->input->post('appId');
        $id = $this->input->post('id');
        $data = $this->workbook_model->deleteSavedQuery($appId, $id);
        $this->auth->response(["response" => $data], [], 200);
    }
    public function saveWorkbook()
    {
        $id = $this->input->post('id');
        $name = $this->input->post('name');
        $sheets = $this->input->post('sheets');
        $appId = $this->input->post('appId');
        $data = $this->workbook_model->saveWorkbook($id, $name, $sheets, $appId);
        $this->auth->response(["response" => $data], [], 200);
    }
    public function getSavedWorkbooks()
    {
        $appId = $this->input->post('appId');
        $data = $this->workbook_model->getSavedWorkbooks($appId);
        $this->auth->response(["response" => $data], [], 200);
    }
    public function deleteWorkbook()
    {
        $appId = $this->input->post('appId');
        $id = $this->input->post('id');
        $data = $this->workbook_model->deleteWorkbook($appId, $id);
        $this->auth->response(["response" => $data], [], 200);
    }
    public function fetchWorkbookById()
    {
        $appId = $this->input->post('appId');
        $id = $this->input->post('id');
        $data = $this->workbook_model->fetchWorkbookById($appId, $id);
        if (!$data) {
            $this->auth->response(["response" => false], [], 500);
        } else {
            $this->auth->response(["response" => $data], [], 200);
        }
    }
}
