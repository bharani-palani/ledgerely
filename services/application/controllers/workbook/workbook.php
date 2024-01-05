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
        // $validate = $this->auth->validateAll();
        // if ($validate === 2) {
        //     $this->auth->invalidTokenResponse();
        // }
        // if ($validate === 3) {
        //     $this->auth->invalidDomainResponse();
        // }
        // if ($validate === 1) {
        $query = $this->input->post('query');
        $data = $this->workbook_model->fetchDynamicQuery($query);
        if ($data['status']) {
            $this->auth->response($data, [$data['query']], 200);
        } else {
            $this->auth->response($data, [], 500);
        }
        // }
    }
}
