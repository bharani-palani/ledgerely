<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class technologies_model extends CI_Model
{
	public function get_all_techs()
	{
		$this->db = $this->load->database('default', TRUE);  
		$query = $this->db->from("technologies")->order_by("tech_sort", "asc")->get();
		if($query->num_rows() > 0){
			$array = array();
			foreach ($query->list_fields() as $field)
			{
				$i=0;
				foreach($query->result_array() as $row)
				{
					$array[$i][$field] = $row[$field];
					$i++;
				}

			} 
			return $array;
		} else {
			return array();	
		}
	}
	public function get_all_ides()
	{
		$this->db = $this->load->database('default', TRUE);  
		$query = $this->db->from("ide")->order_by("ide_sort", "asc")->get();
		if($query->num_rows() > 0){
			$array = array();
			foreach ($query->list_fields() as $field)
			{
				$i=0;
				foreach($query->result_array() as $row)
				{
					$array[$i][$field] = $row[$field];
					$i++;
				}

			} 
			return $array;
		} else {
			return array();	
		}
	}
	public function get_all_oss()
	{
		$this->db = $this->load->database('default', TRUE);  
		$query = $this->db->from("operating_system")->order_by("os_sort", "asc")->get();
		if($query->num_rows() > 0){
			$array = array();
			foreach ($query->list_fields() as $field)
			{
				$i=0;
				foreach($query->result_array() as $row)
				{
					$array[$i][$field] = $row[$field];
					$i++;
				}

			} 
			return $array;
		} else {
			return array();	
		}
	}
}