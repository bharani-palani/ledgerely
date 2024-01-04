<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
class workbook_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        @$this->db = $this->load->database('default', true);
    }
    public function fetchDynamicQuery($query)
    {
        return json_decode($query, true);
    }
}
