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
    public function upload()
    {
        /*
        ** Parameters required
        ** 1. $this->input->post('folder')
        ** 2. $_FILES['file']
        */
        $folder = $this->input->post('folder');
        $name = 'file';
        $config['allowed_types'] = '*';
        $config['upload_path'] = './application/upload/'.$folder;
        $config['file_name'] = isset($_FILES[$name]['name']) ? $_FILES[$name]['name'] : false;
        $this->upload->initialize($config);

        if(!is_dir($config['upload_path'])) {
            mkdir($config['upload_path'], 0777, true);
        }
        
        if($config['file_name']) {
            if (!$this->upload->do_upload($name)) {
                $op = array('error' => strip_tags($this->upload->display_errors()));
            } else {
                $op = array('success' => $this->upload->data());
            }        
        } else {
            $op = array('error' => 'File not found');
        }
        $data['response'] = $op;
        $this->auth->response($data, [], 200);
    }
    public function render() {
        $fileURL = $this->input->post('fileURL');
        $this->auth->renderFile($fileURL);
    }
}
?>