<?php
defined('BASEPATH') or exit('No direct script access allowed');
class dashboard extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('home_model');
        $this->load->library('../controllers/auth');
    }
    public function index()
    {
    }
}
