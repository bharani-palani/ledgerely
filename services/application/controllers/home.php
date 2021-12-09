<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class home extends CI_Controller {
	public function __construct()
    {
		parent::__construct();
		$this->load->model('home_model');
		$this->load->library("../controllers/auth");
	}
	public function index()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->home_model->get_home();
			$this->auth->response($data,array(),200);
		}
	}
	public function getImages()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->home_model->get_images();
			$this->auth->response($data,array(),200);
		}
	}
	public function getBackend() {
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$post = array(
				"TableRows" => $this->input->post("TableRows"),
				"Table" => $this->input->post("Table")
			);
			$data["response"] = $this->home_model->getBackend($post);
			$this->auth->response($data,array(),200);
		}
	}
	public function postBackend() {
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$post = array(
				"postData" => $this->input->post("postData")
			);
			$data["response"] = $this->home_model->postBackend($post);
			$this->auth->response($data,array(),200);
		}
	}
	public function validateUser() {
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$post = array(
				'username'=>$this->input->post('username'),
				'password'=>$this->input->post('password'),
			);
			$data["response"] = $this->home_model->validateUser($post);
			$this->auth->response($data,array(),200);
		}

	}
	public function changePassword() {
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$post = array(
				'currentPass'=>$this->input->post('currentPass'),
				'newPass'=>$this->input->post('newPass'),
				'repeatPass'=>$this->input->post('repeatPass'),
			);
			$data["response"] = $this->home_model->changePassword($post);
			$this->auth->response($data,array(),200);
		}
	}
}
