<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class technologies extends CI_Controller {
	public function __construct()
    {
		parent::__construct();
		$this->load->model('technologies_model');
		$this->load->library("../controllers/auth");
    }
	public function get_all_techs()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->technologies_model->get_all_techs();
			$this->auth->response($data,array(),200);
		}
	}
	public function get_all_ides()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->technologies_model->get_all_ides();
			$this->auth->response($data,array(),200);
		}
	}
	public function get_all_oss()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->technologies_model->get_all_oss();
			$this->auth->response($data,array(),200);
		}
	}
}
