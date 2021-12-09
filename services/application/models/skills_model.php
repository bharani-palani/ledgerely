<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class skills_model extends CI_Model
{
	public function get_all_skills()
	{
		$this->db = $this->load->database('default', TRUE);  
		$query = $this->db->from("skills")->order_by("skill_sort", "asc")->get();
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