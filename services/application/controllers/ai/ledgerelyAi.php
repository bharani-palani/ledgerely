<?php
defined("BASEPATH") or exit("No direct script access allowed");

class ledgerelyAi extends CI_Controller
{
  private $openAiSecret;
  private $SCHEMA_SNIPPET;
  public function __construct()
  {
    require_once "constants.php";
    parent::__construct();
    $this->openAiSecret = $_ENV["OPENAI_API_KEY"];
    $this->SCHEMA_SNIPPET = $SCHEMA_SNIPPET;
    $this->load->library("../controllers/auth");
    $this->auth->validateToken();
  }

  public function promptResponseToSql($id, $args)
  {
    $arguments = json_decode($args, true);
    $result = null;
    $type = null;
    if (isset($arguments["error"])) {
      $this->auth->response(["response" => ["id" => $id, "error" => $arguments["error"]]], [], 400);
    } else {
      if (isset($arguments["query"]) && isset($arguments["params"])) {
        try {
          $sql = $arguments["query"];
          $values = $arguments["params"];
          $chart = $arguments["chart"] ?? null;
          $query = $this->db->query($sql, $values);

          if (is_bool($query)) {
            $result = "Transaction successfully inserted.";
            $type = "string";
          }
          if (!is_bool($query) && method_exists($query, "num_rows") && $query->num_rows() > 0) {
            $result = get_all_rows($query);
            $type = "array";
          }
          $this->auth->response(
            [
              "response" => array_merge(
                [
                  "id" => $id,
                  "result" => $result,
                  "type" => $type,
                  "sql" => $sql, // comment this line to hide SQL in response
                  "params" => $values, // comment this line to hide params in response
                ],
                !is_null($chart) ? ["chart" => $chart] : [],
              ),
            ],
            [],
            200,
          );
        } catch (Exception $e) {
          $this->auth->response(
            [
              "response" => [
                "id" => $id,
                "error" => $e->getMessage(),
                "source" => (array) $e,
                "arguments" => $arguments,
              ],
            ],
            [],
            400,
          );
        }
      } else {
        $this->auth->response(
          [
            "response" => [
              "id" => time(),
              "error" => "Invalid response format. Please try again.",
            ],
          ],
          [],
          400,
        );
      }
    }
  }

  public function successResponse($res = "")
  {
    if ($res === "") {
      $res = file_get_contents(APPPATH . "/controllers/ai/sampleSuccessResponse.json");
      $data = json_decode($res, true);
    }
    if (!is_null($res) && isset($res["choices"][0]["message"]["function_call"]["arguments"])) {
      $args = $res["choices"][0]["message"]["function_call"]["arguments"];
      $id = $res["id"];
      $this->promptResponseToSql($id, $args);
    } else {
      $this->auth->response(
        [
          "response" => [
            "id" => time(),
            "error" => "Invalid response format. Please try again.",
          ],
        ],
        [],
        400,
      );
    }
  }
  public function sampleSuccessResponse($res = "")
  {
    if ($res === "") {
      $res = file_get_contents(APPPATH . "/controllers/ai/sampleSuccessResponse.json");
    }
    $data = json_decode($res, true);
    $data["id"] = rand(100, 10000000000) / 10;
    $data["choices"][0]["message"]["functionCall"]["arguments"] = json_decode($data["choices"][0]["message"]["functionCall"]["arguments"], true);
    $args = json_encode($data["choices"][0]["message"]["functionCall"]["arguments"]);
    $id = $data["id"];
    $this->promptResponseToSql($id, $args);
  }

  public function sampleErrorResponse($json = "")
  {
    if ($json === "") {
      $json = file_get_contents(APPPATH . "/controllers/ai/sampleErrorResponse.json");
    }
    $data = json_decode($json, true);
    $data["id"] = rand(100, 10000000000) / 10;

    $data["choices"][0]["message"]["functionCall"]["arguments"] = json_decode($data["choices"][0]["message"]["functionCall"]["arguments"], true);
    $result = $data["choices"][0]["message"]["functionCall"]["arguments"]["error"];
    $this->auth->response(["response" => ["error" => $result]], [], 400);
  }

  public function runPrompt()
  {
    if ($this->input->post("appId") && $this->input->post("prompt")) {
      $appId = $this->input->post("appId");
      $prompt = $this->input->post("prompt");

      // error sample response
      // $this->sampleErrorResponse();

      // success open ai response
      $openAiResponse = $this->naturalPromptToSql($appId, $prompt); // uncomment this to enable real OpenAI call
      $this->successResponse($openAiResponse);

      // success sample response
      // $this->sampleSuccessResponse();
    } else {
      $this->auth->response(["response" => ["id" => time(), "error" => "Missing prompt or AppId"]], [], 400);
    }
  }

  public function naturalPromptToSql($appId, $prompt)
  {
    try {
      if (!$this->openAiSecret) {
        $this->auth->response(["response" => "Open AI key not found"], [], 400);
      }
      $model = "gpt-4o";

      $SYSTEM_PROMPT = getSystemPrompt($appId, $this->SCHEMA_SNIPPET);

      if (trim($prompt) === "") {
        exit(0);
      }

      // ---------- Prepare OpenAI client ----------
      $client = OpenAI::client($this->openAiSecret);

      // Define functions schema to force structured response
      $functions = [
        [
          "name" => "sql_query",
          "description" => "Return a MySQL SELECT query and parameters as JSON: {\"query\":\"...\",\"params\":[...]}. Use ? placeholders for params.",
          "parameters" => [
            "type" => "object",
            "properties" => [
              "query" => ["type" => "string"],
              "params" => [
                "type" => "array",
                "items" => ["type" => ["string", "number", "boolean", "null"]],
              ],
              "error" => ["type" => "string"],
            ],
            "required" => ["query"],
          ],
        ],
      ];

      $messages = [
        [
          "role" => "system",
          "content" => $SYSTEM_PROMPT . "\n\n" . $this->SCHEMA_SNIPPET,
        ],
        ["role" => "user", "content" => $prompt],
      ];

      $response = $client->chat()->create([
        "model" => $model,
        "messages" => $messages,
        "functions" => $functions,
        "function_call" => ["name" => "sql_query"],
        "temperature" => 0.0,
        "max_tokens" => 600,
      ]);

      return $response;
    } catch (Exception $e) {
      $this->auth->response(["response" => ["id" => time(), "error" => $e->getMessage()]], [], 400);
    }
  }
}
