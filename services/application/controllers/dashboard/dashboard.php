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
    public function index() {}
    public function topTrends()
    {
        $post = [
            'appId' => $this->input->post('appId'),
            'month' => $this->input->post('month'),
            'year' => $this->input->post('year')
        ];
        $data['response'] = [
            'trxCredits' => $this->dashboard_model->topTrends($post, 'Cr', 'TRX'),
            'trxDebits' => $this->dashboard_model->topTrends($post, 'Dr', 'TRX'),
            'categoryCredits' => $this->dashboard_model->topTrends($post, 'Cr', 'CAT'),
            'categoryDebits' => $this->dashboard_model->topTrends($post, 'Dr', 'CAT'),
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
    public function topCcTrends()
    {
        $post = [
            'appId' => $this->input->post('appId'),
            'month' => $this->input->post('month'),
            'year' => $this->input->post('year')
        ];
        $data['response'] = [
            'trxPayments' => $this->dashboard_model->topCcTrends($post, 1, 'TRX'),
            'trxPurchases' => $this->dashboard_model->topCcTrends($post, 0, 'TRX'),
            'categorizedPayments' => $this->dashboard_model->topCcTrends($post, 1, 'CAT'),
            'categorizedPurchases' => $this->dashboard_model->topCcTrends($post, 0, 'CAT'),
        ];
        $this->auth->response($data, [], 200);
    }
    public function searchTopics()
    {
        $appId = $this->input->post('appId');
        $searchString = $this->input->post('searchString');
        $data['response'] = $this->dashboard_model->searchTopics($searchString, $appId);
        $this->auth->response($data, [], 200);
    }
}
