<?php
defined('BASEPATH') or exit('No direct script access allowed');
class workbook extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('workbook_model');
        $this->load->library('../controllers/auth');
        $this->auth->validateToken();
    }
    public function fetchDynamicQuery()
    {

        $query = $this->input->post('query');
        $appIdWhere = $this->input->post('appIdWhere');
        $data = $this->workbook_model->fetchDynamicQuery($query, $appIdWhere);
        $this->auth->response($data, [], 200); // $data['query']
    }
    public function saveDatasource()
    {
        $json = file_get_contents($_FILES['fileData']['tmp_name']);
        $data = $this->workbook_model->saveDatasource($json);
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
        $json = file_get_contents($_FILES['fileData']['tmp_name']);
        $data = $this->workbook_model->saveWorkbook($json);
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
    public function phpinfo()
    {
        echo phpinfo();
    }
}
