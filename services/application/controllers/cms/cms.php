<?php
defined('BASEPATH') or exit('No direct script access allowed');
class cms extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Cms_model');
        $this->load->library('../controllers/auth');
    }
    public function getPages()
    {
        $data['response'] = $this->Cms_model->getPages();
        $this->auth->response($data, [], 200);
    }
}
