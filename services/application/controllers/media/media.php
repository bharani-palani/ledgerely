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
        ** 3. X-Access-Key
        */
        $accessKey = $this->input->post('X-Access-Key');
        if(isset($accessKey) && !empty($accessKey)) {
            if($this->validateAccessKey($accessKey)) {
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
                        $this->auth->response(array('response' => $op), [], 400);
                    } else {
                        $op = array('success' => $this->upload->data());
                        $this->auth->response(array('response' => $op), [], 200);
                    }        
                } else {
                    $op = array('error' => 'File not added');
                    $this->auth->response(array('response' => $op), [], 404);
                }
            } else {
                exit('Token mismatch!');
            }
        } else {
            exit('Token illegal or not found!');
        }
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
        if(is_file($dir)) {
            $uploadPos = (int)array_search('upload', explode("/", $dir)) + 1;
            $results[] = array(
                // 'filePath' => $dir, // remove this later
                'Key' => implode('/', array_slice(explode('/', $dir), $uploadPos)),
                'Size' => filesize($dir),
                'LastModified' => date ("Y-m-d\TH:i:s", filemtime($dir)),
                'ETag' => md5($dir)
            );
        }
        if(is_dir($dir)) {
            $files = preg_grep('/^([^.])/', scandir($dir));
            foreach ($files as $key => $value) {
                $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
                if (!is_dir($path)) {
                    $uploadPos = (int)array_search('upload', explode("/", $path)) + 1;
                    $results[] = array(
                        // 'filePath' => $path, // remove this later
                        'Key' => implode('/', array_slice(explode('/', $path), $uploadPos)),
                        'Size' => filesize($path),
                        'LastModified' => date ("Y-m-d\TH:i:s", filemtime($path)),
                        'ETag' => md5($path)
                    );
                } else if ($value !== "." && $value !== "..") {
                    $this->getDirContents($path, $results);
                }
            }
        }
        return $results;
    }
    public function getOnlyDirectoryContent($dir, $filter = '', &$results = array()) {
        if(is_file($dir)) {
            $uploadPos = (int)array_search('upload', explode("/", $dir)) + 1;
            $results[] = array(
                // 'filePath' => $dir, // remove this later
                'Key' => implode('/', array_slice(explode('/', $dir), $uploadPos)),
                'Size' => filesize($dir),
                'LastModified' => date ("Y-m-d\TH:i:s", filemtime($dir)),
                'ETag' => md5($dir)
            );
        } else {

            $files = preg_grep('/^([^.])/', scandir($dir));
            foreach($files as $key => $value){
                $path = realpath($dir.DIRECTORY_SEPARATOR.$value); 
                if(!is_dir($path)) {
                    if(empty($filter) || preg_match($filter, $path)) {
                        $uploadPos = (int)array_search('upload', explode("/", $path)) + 1;
                        $results[] = array(
                            // 'filePath' => $path, // remove this later
                            'Key' => implode('/', array_slice(explode('/', $path), $uploadPos)),
                            'Size' => filesize($path),
                            'LastModified' => date ("Y-m-d\TH:i:s", filemtime($path)),
                            'ETag' => md5($path)
                        );
                    }
                } elseif($value != "." && $value != "..") {
                    $uploadPos = (int)array_search('upload', explode("/", $path)) + 1;
                    $results[] = array(
                        // 'filePath' => $path, // remove this later
                        'Key' => implode('/', array_slice(explode('/', $path), $uploadPos)),
                        'Size' => filesize($path),
                        'LastModified' => date ("Y-m-d\TH:i:s", filemtime($path)),
                        'ETag' => md5($path)
                    );
                }
            }
        }
        return $results;
    } 
    public function getList() {
        $accessKey = $this->input->get('X-Access-Key');
        $Prefix = $this->input->get('Prefix');
        if(isset($accessKey) && !empty($accessKey)) {
            if($this->validateAccessKey($accessKey)) {
                $uploadFolder = !empty($Prefix) ? dirname(__DIR__, 2)."/upload/".$Prefix : dirname(__DIR__, 2)."/upload";
                $data['response'] = $Prefix === "" ? $this->getDirContents($uploadFolder) : $this->getOnlyDirectoryContent($uploadFolder);
                $this->auth->response($data, [], 200);
            } else {
                exit('Token mismatch!');
            }
        } else {
            exit('Token illegal or not found!');
        }
    }
    public function deleteFile() {
        $fileURL = $this->input->get('fileURL');
        $accessKey = $this->input->get('X-Access-Key');
        if(isset($accessKey) && !empty($accessKey)) {
            if($this->validateAccessKey($accessKey)) {
                $folder = 'application/upload';
                $fileLoc = $folder.'/'.$fileURL;
                if(is_file($fileLoc) || is_dir($fileLoc)) {
                    $this->load->helper("file");
                    if(delete_files($fileLoc) || unlink($fileLoc)) {
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
                if(is_file($fromFileURL) || is_dir($fromFileURL)) {
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
        // $a = "/home4/bharabgn/apps.bharani.tech/services/application/upload/one/two/three/512.png";
        $a = "/Applications/MAMP/htdocs/moneyPlanner/services/application/upload/one/two/three/512.png";
        $b = explode("/", $a);
        $c = (int)array_search('upload', $b) + 1;
        $c1 = $b[$c - 2];
        $d = array_slice(explode('/', $a), $c);
        echo '<pre>';
        print_r([$a, $c, $c1, $d]);
    }
}
?>