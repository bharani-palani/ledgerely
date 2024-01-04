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
        // limit pieces pending
        $query = $this->db
            ->select($object->select)
            ->from($object->from)
            // ->where(implode(" ", $object->where))
            // ->order_by(implode(", ", $object->orderBy))
            // ->limit(implode(", ", $object->limit))
            ->get();
        if ($query->num_rows() > 0) {
            return ["status" => true, "response" => get_all_rows($query)];
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
