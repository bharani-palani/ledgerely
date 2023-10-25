<?php
defined('BASEPATH') or exit('No direct script access allowed');
class dashboard extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('dashboard_model');
        $this->load->library('../controllers/auth');
    }
    public function index()
    {
    }
    public function topTrends()
    {
        $post = [
            'appId' => $this->input->post('appId'),
            'month' => $this->input->post('month'),
            'year' => $this->input->post('year')
        ];
        $data['response'] = [
            'topCategoryCredits' => $this->dashboard_model->topTrends($post, 'Cr', 'CAT'),
            'topCategoryDebits' => $this->dashboard_model->topTrends($post, 'Dr', 'CAT'),
            'topTrxCredits' => $this->dashboard_model->topTrends($post, 'Cr', 'TRX'),
            'topTrxDebits' => $this->dashboard_model->topTrends($post, 'Dr', 'TRX'),
        ];
        $this->auth->response($data, [], 200);
    }
    public function recentTransactions()
    {
        $post = [
            'appId' => $this->input->post('appId'),
            'month' => $this->input->post('month'),
            'year' => $this->input->post('year')
        ];
        $data['response'] = $this->dashboard_model->recentTransactions($post);
        $this->auth->response($data, [], 200);
    }
}
