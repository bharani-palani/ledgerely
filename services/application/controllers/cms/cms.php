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
            $newData = array();
            for($i=0; $i<count($data); $i++) {
                for($j=0; $j<count($data[$i]); $j++) {
                    $newData[$j]['page_id'] = $data[$i]['page_id'];
                    $newData[$j]['page_label'] = $data[$i]['page_label'];
                    $newData[$j]['page_route'] = $data[$i]['page_route'];
                    $newData[$j]['page_object'] = json_decode($data[$i]['page_object']);
                    $newData[$j]['hasAccessTo'] = $data[$i]['hasAccessTo'];
                }
            }
            // print_r($newData);
            $this->auth->response($newData, [], 200);
        }
    }
}
