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
    public function fetchDynamicQuery($query, $appIdWhere)
    {
        sleep(2);
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
        $query = $query->where($appIdWhere, NULL, FALSE);
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
    public function saveDatasource($file)
    {
        $object = json_decode($file);
        if (is_null($object->id)) {
            $this->db->insert('datasourceQuery', [
                'dsq_id' => NULL,
                'dsq_appId' => $object->appId,
                'dsq_name' => $object->name,
                'dsq_object' => json_encode($object->query),
            ]);
            return $this->db->insert_id();
        } else {
            $this->db->where('dsq_id', $object->id);
            $this->db->update('datasourceQuery', [
                'dsq_name' => $object->name,
                'dsq_object' => json_encode($object->query),
            ]);
            return $this->db->affected_rows() > 0 ? $object->id : false;
        }
    }
    public function getSavedQueryLists($appId)
    {
        $query = $this->db->get_where('datasourceQuery', ['dsq_appId' => $appId]);
        return $query->num_rows() > 0 ? get_all_rows($query) : false;
    }
}
