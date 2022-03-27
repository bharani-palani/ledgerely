<?php
defined('BASEPATH') or exit('No direct script access allowed');
class cms extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('cms_model');
        $this->load->library('../controllers/auth');
    }
    public function getPages()
    {
        $validate = $this->auth->validateAll();
		if ($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if ($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if ($validate === 1) {
            $data = $this->cms_model->getPages();
            $this->auth->response(json_decode($data), [], 200);
        }
    }
}
