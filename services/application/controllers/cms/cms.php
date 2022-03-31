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
            $newData = [];
            for ($i = 0; $i < count($data); $i++) {
                for ($j = 0; $j < count($data[$i]); $j++) {
                    $newData[$i]['page_id'] = $data[$i]['page_id'];
                    $newData[$i]['label'] = $data[$i]['label'];
                    $newData[$i]['href'] = $data[$i]['href'];
                    $newData[$i]['page_object'] = json_decode(
                        $data[$i]['page_object']
                    );
                    $newData[$i]['hasAccessTo'] = json_decode(
                        json_encode(explode(',', $data[$i]['hasAccessTo']))
                    );
                }
            }
            $massagedData['response'] = $newData;
            $this->auth->response($massagedData, [], 200);
        }
    }
    public function getConfigPages()
    {
        $data = $this->cms_model->getConfigPages();
        print_r($data);
        // $this->auth->response($data, [], 200);
    }
}
