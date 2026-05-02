<?php
defined("BASEPATH") or exit("No direct script access allowed");

class workbook extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model("workbook_model");
    $this->load->library("../controllers/auth");
    $this->auth->validateToken();
  }

  public function fetchDynamicQuery()
  {
    $query = $this->input->post("query");
    $tenantId = $this->input->post("tenantId");
    $table = $this->input->post("table");
    $field = $this->input->post("field");
    $data = $this->workbook_model->fetchDynamicQuery($query, $tenantId, $table, $field);
    $this->auth->response($data, [], 200);
  }

  public function saveDatasource()
  {
    $json = file_get_contents($_FILES["fileData"]["tmp_name"]);
    $data = $this->workbook_model->saveDatasource($json);
    $this->auth->response(["response" => $data], [], 200);
  }

  public function getSavedQueryLists()
  {
    $tenantId = $this->input->post("tenantId");
    $data = $this->workbook_model->getSavedQueryLists($tenantId);
    if (!$data) {
      $this->auth->response(["response" => false], [], 404);
    } else {
      $this->auth->response(["response" => $data], [], 200);
    }
  }

  public function fetchQueryObjectById()
  {
    $tenantId = $this->input->post("tenantId");
    $id = $this->input->post("id");
    $type = $this->input->post("type");
    $data = $this->workbook_model->fetchQueryObjectById($tenantId, $id, $type);
    if (!$data) {
      $this->auth->response(["response" => false], [], 404);
    } else {
      $this->auth->response(["response" => $data], [], 200);
    }
  }

  public function deleteSavedQuery()
  {
    $tenantId = $this->input->post("tenantId");
    $id = $this->input->post("id");
    $data = $this->workbook_model->deleteSavedQuery($tenantId, $id);
    $this->auth->response(["response" => $data], [], 200);
  }

  public function saveWorkbook()
  {
    $json = file_get_contents($_FILES["fileData"]["tmp_name"]);
    $data = $this->workbook_model->saveWorkbook($json);
    $this->auth->response(["response" => $data], [], 200);
  }

  public function getSavedWorkbooks()
  {
    $tenantId = $this->input->post("tenantId");
    $data = $this->workbook_model->getSavedWorkbooks($tenantId);
    $this->auth->response(["response" => $data], [], 200);
  }

  public function deleteWorkbook()
  {
    $tenantId = $this->input->post("tenantId");
    $id = $this->input->post("id");
    $data = $this->workbook_model->deleteWorkbook($tenantId, $id);
    $this->auth->response(["response" => $data], [], 200);
  }

  public function fetchWorkbookById()
  {
    $tenantId = $this->input->post("tenantId");
    $id = $this->input->post("id");
    $data = $this->workbook_model->fetchWorkbookById($tenantId, $id);
    if (!$data) {
      $this->auth->response(["response" => false], [], 404);
    } else {
      $this->auth->response(["response" => $data], [], 200);
    }
  }

  public function phpinfo()
  {
    header("Content-Type: text/html");
    echo phpinfo();
  }
}
