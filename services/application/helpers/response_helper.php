<?php
defined('BASEPATH') or exit('No direct script access allowed');
if (!function_exists('get_all_rows')) {
	function get_all_rows($query_object)
	{
		if ($query_object->num_rows() > 0) {
			$array = array();
			foreach ($query_object->list_fields() as $field) {
				$i = 0;
				foreach ($query_object->result_array() as $row) {
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

if (!function_exists('errorResponse')) {
	function errorResponse()
	{
		$error = error_get_last();
		header('Content-Type: application/json');
		echo json_encode($error);
	}
}
