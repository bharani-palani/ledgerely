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
        $object = json_decode($query);
        $query = $this->db
            ->select(isset($object->select) ? $object->select : '*')
            ->from(isset($object->from) ? $object->from : null);
        if (isset($object->where) && count($object->where) > 0) {
            $query = $query->where(implode(" ", $object->where), NULL, FALSE);
        }
        if (isset($object->join) && count($object->join) > 0) {
            foreach ($object->join as &$joinArray) {
                $query = $query->join($joinArray[0], $joinArray[1], $joinArray[2]);
            }
        }
        if (isset($object->groupBy) && count($object->groupBy) > 0) {
            $query = $query->group_by($object->groupBy);
        }
        if (isset($object->orderBy) && count($object->orderBy) > 0) {
            $query = $query->order_by(implode(", ", $object->orderBy));
        }
        if (isset($object->limit) && count($object->limit) > 0) {
            $query = $query->limit($object->limit[0], $object->limit[1]);
        }
        $query = $query->get();
        if ($query) {
            return ["status" => true, 'query' => $this->db->last_query(), "response" => get_all_rows($query)];
        } else {
            return [
                "status" => false,
                "response" =>
                [
                    "message" => $this->db->_error_message(),
                    "errorNo" => $this->db->_error_number()
                ]
            ];
        }
    }
}
