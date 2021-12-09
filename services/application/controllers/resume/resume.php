<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class resume extends CI_Controller {
	public function __construct()
    {
		parent::__construct();
		$this->load->model('resume_model');
		$this->load->library("../controllers/auth");
    }
	public function get_header()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->get_header();
			$this->auth->response($data,array(),200);
		}
    }
    public function getCareerObjective()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->getCareerObjective();
			$this->auth->response($data,array(),200);
		}
    }
    public function getCareerExpYears()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->getCareerExpYears();
			$this->auth->response($data,array(),200);
		}
    }
    public function workSummary()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->workSummary();
			$this->auth->response($data,array(),200);
		}
    }
    public function proHighLights()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->proHighLights();
			$this->auth->response($data,array(),200);
		}
    }
    public function techSkills()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->techSkills();
			$this->auth->response($data,array(),200);
        }
	}
	public function projExperienceModal() {
		$rows = $this->resume_model->projectExperience();
		foreach($rows as $row) {
			$array[] = array(
				'work_company' => ucwords(strtolower($row['work_company'])),
				'working_duration' => $row['working_duration'],
				'project_id' => $row['project_id'],
				'project_role' => $row['project_role'],
				'project_name' => $row['project_name'],
				'project_introduction' => $row['project_introduction'],
				'role_label' => isset($row['role_label']) ? explode("<---->", $row['role_label']) : array()
			);
		}
		return $array;
	}
    public function projectExperience()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$array = $this->projExperienceModal();
			$this->auth->response(array('response' => $array),array(),200);
        }
    }
    public function education()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->education();
			$this->auth->response($data,array(),200);
        }
    }
    public function extraAct()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->extraAct();
			$this->auth->response($data,array(),200);
        }
    }
    public function personalInfo()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->personalInfo();
			$this->auth->response($data,array(),200);
        }
    }
    public function footer()
	{
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->footer();
			$this->auth->response($data,array('now' => date('Y-M-d')),200);
        }
	}
	public function getCompanyList() {
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->getCompanyList();
			$this->auth->response($data,array(),200);
		}
	}
	public function getProjectList() {
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$data["response"] = $this->resume_model->getProjectList();
			$this->auth->response($data,array(),200);
		}
	}
	public function getResume() {
		$validate = $this->auth->validateAll();
		if($validate === 2) {
			$this->auth->invalidTokenResponse();
		}
		if($validate === 3) {
			$this->auth->invalidDomainResponse();
		}
		if($validate === 1) {
			$this->db->trans_start();
			$result = array_merge(
				array('header' => $this->resume_model->get_header()),
				array('careerExpYears' => $this->resume_model->getCareerExpYears()),
				array('careerObjective' => $this->resume_model->getCareerObjective()),
				array('workSummary' => $this->resume_model->workSummary()),
				array('professionalHighlights' => $this->resume_model->proHighLights()),
				array('techSkills' => $this->resume_model->techSkills()),
				array('projectExperience' => $this->projExperienceModal()),
				array('education' => $this->resume_model->education()),
				array('extraAct' => $this->resume_model->extraAct()),
				array('personalInfo' => $this->resume_model->personalInfo()),
				array('footer' => $this->resume_model->footer())
			);
			$this->db->trans_complete();
			if($this->db->trans_status() === FALSE){
				$this->auth->response(array('response' => array()),array(),200);
			} else {
				$this->auth->response(array('response' => $result),array(),200);
			}
			
		}

	}

}