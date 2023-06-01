<?php
defined('BASEPATH') or exit('No direct script access allowed');
class mediaController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->library('../controllers/auth');
        $appConfig = $this->home_model->get_config();
        $this->fileStorageType = $appConfig[0]['fileStorageType'];
        $this->fileStorageAccessKey = $appConfig[0]['fileStorageAccessKey'];

    }
    public function uploadImage()
    {
        $name = 'file';
        $config['allowed_types'] = 'jpg|png|jpeg|gif';
        $config['upload_path'] = './media/';
        $config['file_name'] = isset($_FILES[$name]['name']) ? $_FILES[$name]['name'] : false;
        $this->load->library('upload', $config);

        if(!is_dir($config['upload_path'])) {
            @mkdir($config['upload_path'], 0755, true);
        }
        
        if($config['file_name']) {
            if (!$this->upload->do_upload($name)) {
                $op = array('error' => $this->upload->display_errors());
            } else {
                $op = array('upload_data' => $this->upload->data());
            }        
        } else {
            $op = array('error' => 'File not found');
        }
        $data['response'] = $op;
        $this->auth->response($data, [], 200);
    }
}
?>