<?php
if (!defined("BASEPATH")) {
  exit("No direct script access allowed");
}

class workbook_model extends CI_Model
{
  public function __construct()
  {
    parent::__construct();
    @$this->db = $this->load->database("default", true);
    $this->db->db_debug = false;
  }

  public function fetchDynamicQuery($query, $tenantId, $table, $field)
  {
    $object = json_decode($query);
    $CI = &get_instance();
    $CI->load->model("home_model");
    $appId = $CI->home_model->getAppIdFromTenantId($tenantId);
    try {
      $query = $this->db->select(isset($object->select) ? $object->select : "*")->from(isset($object->from) ? $object->from : null);
      if (isset($object->where) && count($object->where) > 0) {
        $query = $query->where(implode(" ", $object->where), null, false);
      }
      if (isset($object->join) && count($object->join) > 0) {
        foreach ($object->join as &$joinArray) {
          $query = $query->join($joinArray[0], $joinArray[1], $joinArray[2]);
        }
      }
      if (isset($object->groupBy) && count($object->groupBy) > 0) {
        $query = $query->group_by($object->groupBy);
      }
      if (isset($object->having) && count($object->having) > 0) {
        foreach ($object->having as &$having) {
          $pieces = explode(",", $having);
          $havingArray[$pieces[0] . " " . $pieces[1]] = $pieces[2];
        }
        $query = $query->having($havingArray);
      }
      if (isset($object->orderBy) && count($object->orderBy) > 0) {
        $query = $query->order_by(implode(", ", $object->orderBy));
      }
      if (isset($object->limit) && count($object->limit) > 0) {
        $query = $query->limit($object->limit[0], $object->limit[1]);
      }
      $query = $query->where([$table . "." . $field => $appId], null, false);
      $query = $query->get();
      if ($query) {
        return [
          "status" => true,
          "query" => $this->db->last_query(),
          "response" => get_all_rows($query),
        ];
      } else {
        return [
          "status" => false,
          "response" => [
            "errorMessage" => $this->db->_error_message(),
            "errorNo" => $this->db->_error_number(),
          ],
        ];
      }
    } catch (Exception $e) {
      return [
        "status" => false,
        "response" => [
          "errorMessage" => $e->getMessage(),
          "errorNo" => $e->getCode(),
          "sqlError" => (array) $e,
        ],
      ];
    }
  }

  public function saveDatasource($file)
  {
    $object = json_decode($file);
    if (is_null($object->id)) {
      $CI = &get_instance();
      $CI->load->model("quota_model");
      $appId = $CI->home_model->getAppIdFromTenantId($post["tenantId"]);
      if (!$CI->quota_model->hasQuotaFor($appId, "DATASOURCE")) {
        return null;
      }
      $this->db->insert("datasourceQuery", [
        "dsq_id" => null,
        "dsq_appId" => $appId,
        "dsq_name" => $object->name,
        "dsq_object" => json_encode($object->query),
      ]);
      return $this->db->insert_id();
    } else {
      $this->db->where("dsq_id", $object->id);
      $this->db->update("datasourceQuery", [
        "dsq_name" => $object->name,
        "dsq_object" => json_encode($object->query),
      ]);
      return $this->db->affected_rows() > 0 ? $object->id : false;
    }
  }

  public function getSavedQueryLists($tenantId)
  {
    $this->db->trans_start();
    $query1 = $this->db
      ->select(["a.dsq_id", "a.dsq_name"])
      ->from("datasourceQuery as a")
      ->join("apps as b", "a.dsq_appId = b.appId", "left")
      ->where(["b.tenant_id =" => $tenantId])
      ->get();

    $query2 = $this->db->select(["dsIbq_id", "dsIbq_name"])->get("datasourceInbuiltQuery");
    $this->db->trans_complete();
    if ($this->db->trans_status()) {
      return $query1->num_rows() > 0 || $query2->num_rows() > 0
        ? (object) [
          "saved" => get_all_rows($query1),
          "inbuilt" => get_all_rows($query2),
        ]
        : false;
    } else {
      return false;
    }
  }

  public function fetchQueryObjectById($tenantId, $id, $type)
  {
    $query = $this->db->select(["a.*"]);
    if ($type === "saved") {
      $query = $query
        ->from("datasourceQuery as a")
        ->join("apps as b", "a.dsq_appId = b.appId")
        ->where(["b.tenant_id =" => $tenantId, "a.dsq_id" => $id])
        ->get();
    } else {
      $query = $query->get_where("datasourceInbuiltQuery as a", ["a.dsIbq_id" => $id]);
    }
    $row = $query->row();
    return $query->num_rows() > 0 ? $row : false;
  }

  public function deleteSavedQuery($tenantId, $id)
  {
    $CI = &get_instance();
    $CI->load->model("home_model");
    $appId = $CI->home_model->getAppIdFromTenantId($tenantId);
    $this->db->delete("datasourceQuery", ["dsq_id" => $id, "dsq_appId" => $appId]);
    return $this->db->affected_rows() > 0;
  }

  public function saveWorkbook($file)
  {
    $object = json_decode($file);
    if (!is_null($object)) {
      if (is_null($object->id)) {
        $CI = &get_instance();
        $CI->load->model("quota_model");
        if (!$CI->quota_model->hasQuotaFor($object->appId, "WORKBOOK")) {
          return null;
        }
        $this->db->insert("workbook", [
          "wb_id" => null,
          "wb_appId" => $object->appId,
          "wb_name" => $object->name,
          "wb_object" => json_encode($object->sheets),
        ]);
        return $this->db->insert_id();
      } else {
        $this->db->where("wb_id", $object->id);
        $this->db->update("workbook", [
          "wb_name" => $object->name,
          "wb_object" => json_encode($object->sheets),
        ]);
        return $this->db->affected_rows() > 0 ? $object->id : false;
      }
    } else {
      return false;
    }
  }

  public function getSavedWorkbooks($tenantId)
  {
    $this->db->trans_start();
    $query = $this->db
      ->select(["a.wb_id", "a.wb_name"])
      ->from("workbook as a")
      ->join("apps as b", "a.wb_appId = b.appId", "left")
      ->where(["b.tenant_id =" => $tenantId])
      ->get();
    $this->db->trans_complete();
    if ($this->db->trans_status()) {
      return get_all_rows($query);
    } else {
      return false;
    }
  }

  public function fetchWorkbookById($tenantId, $id)
  {
    $CI = &get_instance();
    $CI->load->model("home_model");
    $appId = $CI->home_model->getAppIdFromTenantId($tenantId);
    $query = $this->db
      ->select(["a.*"])
      ->from("workbook as a")
      ->join("apps as b", "a.wb_appId = b.appId")
      ->where(["b.tenant_id =" => $tenantId, "a.wb_id" => $id])
      ->get();
    $row = $query->row();
    return $query->num_rows() > 0 ? $row : false;
  }

  public function deleteWorkbook($tenantId, $id)
  {
    $CI = &get_instance();
    $CI->load->model("home_model");
    $appId = $CI->home_model->getAppIdFromTenantId($tenantId);
    $this->db->delete("workbook", ["wb_id" => $id, "wb_appId" => $appId]);
    return $this->db->affected_rows() > 0;
  }
}
