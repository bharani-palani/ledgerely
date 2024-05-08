<?php
defined('BASEPATH') or exit('No direct script access allowed');
include('./vendor/autoload.php');

class stripe extends CI_Controller
{
    public $stripeConfig;
    public $stripe;
    public function __construct()
    {
        parent::__construct();
        $this->load->model('plan_model');
        $this->load->library('../controllers/auth');
    }
}
