<?php
defined('BASEPATH') or exit('No direct script access allowed');
class media extends CI_Controller
{
    public $fileStorageType;
    public $fileStorageAccessKey;
    public $salt;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->library('../controllers/auth');
        $appConfig = $this->home_model->get_config();
        $this->fileStorageType = $appConfig[0]['fileStorageType'];
        $this->fileStorageAccessKey = $appConfig[0]['fileStorageAccessKey'];
        $this->salt = $appConfig[0]['web'];
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
            $op = array('error' => 'File not added');
        }
        $data['response'] = $op;
        $this->auth->response($data, [], 200);
    }
    public function validateAccessKey($accessKey) {
        $ci = &get_instance();
        $ci->load->library('../libraries/clientserverencryption');
        $store = $ci->clientserverencryption->decrypt($this->fileStorageAccessKey, $this->salt);
        $request = $ci->clientserverencryption->decrypt($accessKey, $this->salt);
        return $store === $request;
    }
    public function render() {
        $fileURL = $this->input->get('fileURL');
        $accessKey = $this->input->get('X-Access-Key');

        if(isset($accessKey) && !empty($accessKey)) {
            if($this->validateAccessKey($accessKey)) {
                $folder = 'application/upload';
                $fileLoc = $folder.'/'.$fileURL;
                $this->auth->renderFile($fileLoc);
            } else {
                exit('Token mismatch!');
            }
        } else {
            exit('Token illegal or not found!');
        }
    }
    function getDirContents($dir, &$results = array()) {
        if(is_dir($dir)) {
            $files = preg_grep('/^([^.])/', scandir($dir));
        
            foreach ($files as $key => $value) {
                $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
                if (!is_dir($path)) {
                    $results[] = array(
                        'filePath' => $path, // remove this later
                        'path' => implode('/', array_slice(explode('/', $path), $_SERVER['HTTP_HOST'] === 'localhost:8888' ? 8 : 7)),
                        'size' => filesize($path),
                        'lastModified' => date ("Y-m-d\TH:i:s", filemtime($path))
                    );
                } else if ($value !== "." && $value !== "..") {
                    $this->getDirContents($path, $results);
                }
            }
            return $results;
        } else {
            return array();
        }
    }
    public function getList() {
        $uploadFolder = dirname(__DIR__, 2)."/upload";
        $data['response'] = $this->getDirContents($uploadFolder);
        $this->auth->response($data, [], 200);
    }
    public function deleteFile() {
        $fileURL = $this->input->get('fileURL');
        $accessKey = $this->input->get('X-Access-Key');

        if(isset($accessKey) && !empty($accessKey)) {
            if($this->validateAccessKey($accessKey)) {
                $folder = 'application/upload';
                $fileLoc = $folder.'/'.$fileURL;
                if(is_file($fileLoc)) {
                    if(unlink($fileLoc)) {
                        $data['response'] = array('staus' => 'success');
                        $this->auth->response($data, [], 200);
                    } else {
                        $data['response'] = array('staus' => 'fail');
                        $this->auth->response($data, [], 204);
                    }
                } else {
                    $data['response'] = array('staus' => 'notFound');
                    $this->auth->response($data, [], 404);
                }
            } else {
                exit('Token mismatch!');
            }
        } else {
            exit('Token illegal or not found!');
        }
    }
    public function renameFile() {
        $fromFileURL = $this->input->get('fromFileURL');
        $toFileURL = $this->input->get('toFileURL');
        $accessKey = $this->input->get('X-Access-Key');

        if(isset($accessKey) && !empty($accessKey)) {
            if($this->validateAccessKey($accessKey)) {
                $folder = 'application/upload/';
                $fromFileURL = $folder.$fromFileURL;
                $toFileURL = $folder.$toFileURL;
                if(is_file($fromFileURL)) {
                    if(rename($fromFileURL, $toFileURL)) {
                        $data['response'] = array('staus' => 'success');
                        $this->auth->response($data, [], 200);
                    } else {
                        $data['response'] = array('staus' => 'fail');
                        $this->auth->response($data, [], 204);
                    }
                } else {
                    $data['response'] = array('staus' => 'notFound');
                    $this->auth->response($data, [], 404);
                }
            } else {
                exit('Token mismatch!');
            }
        } else {
            exit('Token illegal or not found!');
        }

    }
    function dummy() {

    }
}
?>