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

  private function containsBlockedSql(string $value)
  {
    if (!is_string($value) || $value === "") {
      return false;
    }

    $blockedPatterns = [
      "/\bSELECT\b/i",
      "/\bINSERT\b/i",
      "/\bUPDATE\b/i",
      "/\bDELETE\b/i",
      "/\bDROP\b/i",
      "/\bALTER\b/i",
      "/\bCREATE\b/i",
      "/\bTRUNCATE\b/i",
      "/\bREPLACE\b/i",
      "/\bCALL\b/i",
      "/\bSET\b/i",

      "/\bINTO\s+OUTFILE\b/i",
      "/\bINTO\s+DUMPFILE\b/i",

      "/\bUNION\b/i",
      "/\bWITH\b/i",
      "/\bFROM\b/i",
      "/\bJOIN\b/i",

      // Subquery
      "/\(\s*SELECT\b/i",

      // Comments
      "/--/",
      "/\/\*/",
      "/\*\//",
      "/#/",

      // Multiple statements
      "/;/",

      // Expensive MySQL functions
      "/\bSLEEP\s*\(/i",
      "/\bBENCHMARK\s*\(/i",
    ];

    foreach ($blockedPatterns as $pattern) {
      if (preg_match($pattern, $value)) {
        return true;
      }
    }

    return false;
  }

  private function validateSqlValue(object $object, $type = "SQL")
  {
    if (!is_object($object)) {
      throw new Exception("Invalid {$type} expression.");
    }
    return true;
  }

  private function validateSqlLength(array $value, $maxLength = 8)
  {
    if (count($value) > $maxLength) {
      throw new Exception("SQL expression is too long.");
    }
  }

  private function validateAllowedTable(string $table)
  {
    $allowedTables = ["income_expense", "income_expense_category", "banks", "credit_cards", "credit_card_transactions"];
    if (!in_array($table, $allowedTables, true)) {
      throw new Exception("Table '{$table}' is not allowed.");
    }
    return true;
  }
  private function validateLimit(array $limit)
  {
    $MAX_LIMIT = 1000;
    $MAX_OFFSET = 1000;

    if (!is_array($limit)) {
      throw new Exception("Invalid limit format.");
    }

    if (empty($limit) || count($limit) !== 2) {
      throw new Exception("Empty or bad limit set.");
    }

    $requestedLimit = isset($limit[0]) ? $limit[0] : 100;
    $requestedOffset = isset($limit[1]) ? $limit[1] : 0;

    // Must be integers
    if (filter_var($requestedLimit, FILTER_VALIDATE_INT) === false || filter_var($requestedOffset, FILTER_VALIDATE_INT) === false) {
      throw new Exception("Limit and offset must be integers.");
    }

    $requestedLimit = (int) $requestedLimit;
    $requestedOffset = (int) $requestedOffset;

    // Limit cannot exceed 1000
    if ($requestedLimit < 1 || $requestedLimit > $MAX_LIMIT) {
      throw new Exception("Maximum allowed records is {$MAX_LIMIT}.");
    }

    // Prevent negative offset
    if ($requestedOffset < 0) {
      throw new Exception("Invalid offset.");
    }

    // Optional: prevent excessive offset
    if ($requestedOffset > $MAX_OFFSET) {
      throw new Exception("Maximum allowed offset is {$MAX_OFFSET}.");
    }

    if ($requestedOffset + $requestedLimit > 1000) {
      throw new Exception("You cannot fetch more than 1000 records.");
    }

    return true;
  }
  public function fetchDynamicQuery(string $query, string $tenantId, string $table, string $field)
  {
    $CI = &get_instance();
    $CI->load->model("home_model");
    try {
      $object = json_decode($query);
      $appId = $CI->home_model->getAppIdFromTenantId($tenantId);
      /**
       * Validate object, tenantid, table and fiels
       */
      if (json_last_error() !== JSON_ERROR_NONE || !$object) {
        throw new Exception("Invalid query.");
      }

      if (empty($tenantId)) {
        throw new Exception("Invalid tenant.");
      }

      if (empty($table) || empty($field)) {
        throw new Exception("Invalid tenant mapping.");
      }

      /**
       * Validate SQL length and sql type (json object as php object)
       */
      $this->validateSqlLength((array) $object);
      $this->validateSqlValue($object);

      /**
       * Validate select clause
       */
      $isSelectGood = [];
      foreach ($object->select as $select) {
        $isSelectGood[] = $this->containsBlockedSql($select);
      }
      if (in_array(true, $isSelectGood, true)) {
        throw new Exception("Invalid select clause used.");
      }

      /**
       * Validate where clause
       */
      $isWhereGood = [];
      foreach ($object->where as $where) {
        $isWhereGood[] = $this->containsBlockedSql($where);
      }
      if (in_array(true, $isWhereGood, true)) {
        throw new Exception("Invalid where clause used.");
      }

      /**
       * Validate from tables and join tables
       */
      if (!isset($object->from) || empty($object->from)) {
        throw new Exception("FROM table is required.");
      }
      $this->validateAllowedTable($object->from);
      if (isset($object->join) && count($object->join) > 0) {
        foreach ($object->join as $join) {
          $this->validateAllowedTable($join[0]);
        }
      }
      /**
       * Validate having
       */
      if (isset($object->having) && count($object->having) > 0) {
        $isHavingGood = [];
        foreach ($object->having as $having) {
          $isHavingGood[] = $this->containsBlockedSql($having);
        }
        if (in_array(true, $isHavingGood, true)) {
          throw new Exception("Invalid having clause used.");
        }
      }
      /**
       * Validate orderBy
       */
      if (isset($object->orderBy) && count($object->orderBy) > 0) {
        $isOrderByGood = [];
        foreach ($object->orderBy as $orderBy) {
          $isOrderByGood[] = $this->containsBlockedSql($orderBy);
        }
        if (in_array(true, $isOrderByGood, true)) {
          throw new Exception("Invalid order by clause used.");
        }
      }
      /**
       * Validate groupBy
       */
      if (isset($object->groupBy) && count($object->groupBy) > 0) {
        $isGroupByGood = [];
        foreach ($object->groupBy as $groupBy) {
          $isGroupByGood[] = $this->containsBlockedSql($groupBy);
        }
        if (in_array(true, $isGroupByGood, true)) {
          throw new Exception("Invalid group by clause used.");
        }
      }
      /**
       * Validate limit
       */
      $this->validateLimit($object->limit);

      $query = $this->db->select(isset($object->select) ? $object->select : "*")->from(isset($object->from) ? $object->from : null);
      if (isset($object->where) && count($object->where) > 0) {
        $query = $query->where(implode(" ", $object->where));
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
        $havingArray = [];
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
      $query = $query->where([$table . "." . $field => $appId]);
      $query = $query->get();
      if ($query) {
        return [
          "status" => true,
          // "query" => $this->db->last_query(),
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
          // "sqlError" => (array) $e,
        ],
      ];
    }
  }

  public function saveDatasource(mixed $file, string $tenantId)
  {
    $object = json_decode($file);
    if (is_null($object->id)) {
      $CI = &get_instance();
      $CI->load->model("home_model");
      $CI->load->model("quota_model");
      $appId = $CI->home_model->getAppIdFromTenantId($tenantId);
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

  public function saveWorkbook(mixed $file, string $tenantId)
  {
    $CI = &get_instance();
    $CI->load->model("home_model");
    $appId = $CI->home_model->getAppIdFromTenantId($tenantId);
    $object = json_decode($file);
    if (!is_null($object)) {
      if (is_null($object->id)) {
        $CI = &get_instance();
        $CI->load->model("quota_model");
        if (!$CI->quota_model->hasQuotaFor($appId, "WORKBOOK")) {
          return null;
        }
        $this->db->insert("workbook", [
          "wb_id" => null,
          "wb_appId" => $appId,
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
