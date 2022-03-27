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
        // $validate = $this->auth->validateAll();
		// if ($validate === 2) {
		// 	$this->auth->invalidTokenResponse();
		// }
		// if ($validate === 3) {
		// 	$this->auth->invalidDomainResponse();
		// }
		// if ($validate === 1) {
            $data = $this->cms_model->getPages();
            $newData = array();
            foreach($data as $row) {
                for($i=0; $i<count($row); $i++) {
                    $newData[$i][$row->page_id] = $row->page_id;
                    $newData[$i][$row->page_label] = $row->page_label;
                    $newData[$i][$row->page_route] = $row->page_route;
                    $newData[$i][$row->page_object] = json_decode($row->page_id);
                    $newData[$i][$row->hasAccessTo] = $row->hasAccessTo;
                }
            }
            print_r($newData);
            // $this->auth->response($data, [], 200);
        // }
    }
}
