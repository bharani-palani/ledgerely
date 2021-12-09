<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class write_model extends CI_Model
{
	public function __construct()
    {
		parent::__construct();
    }	
	public function post_write($post)
	{
		$this->db = $this->load->database('default', TRUE);  
		$this->db->insert('public_comments',$post);

		$json_data = array("status" => "success");
		return $json_data;
	}

}