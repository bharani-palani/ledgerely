<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class contacts extends CI_Controller {
	public function __construct()
	{
		parent::__construct();
		$this->load->model('contact_model');
		$this->load->library("../controllers/auth");
	}
	public function get_all_contacts()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->contact_model->get_all_contacts();
			$this->auth->response($data,array(),200);
		}
	}
}
