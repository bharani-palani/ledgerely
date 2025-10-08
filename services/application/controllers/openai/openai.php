<?php
defined('BASEPATH') or exit('No direct script access allowed');
class openai extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('../controllers/auth');
    }
    public function runPrompt(){
        $data['response'] = "Working...";
        $this->auth->response($data, [], 200);
    }
}