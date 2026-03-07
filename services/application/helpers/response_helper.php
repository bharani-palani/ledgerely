<?php
defined("BASEPATH") or exit("No direct script access allowed");
if (!function_exists("get_all_rows")) {
  function get_all_rows($query_object)
  {
    if ($query_object->num_rows() > 0) {
      $array = [];
      foreach ($query_object->list_fields() as $field) {
        $i = 0;
        foreach ($query_object->result_array() as $row) {
          $array[$i][$field] = $row[$field];
          $i++;
        }
      }
      return $array;
    } else {
      return [];
    }
  }

  function get_single_row_object($query_object)
  {
    if ($query_object->num_rows() > 0 && $query_object->num_rows() === 1) {
      return (object) $query_object->row_array();
    } elseif ($query_object->num_rows() > 1) {
      return (object) ["error" => "Multiple rows found"];
    } else {
      return (object) [];
    }
  }
}
