<?php
defined("BASEPATH") or exit("No direct script access allowed");

class ledgerelyAi extends CI_Controller
{
  private string $openAiSecret;
  private string $openAiModel;
  private string $SCHEMA_SNIPPET;
  public function __construct()
  {
    require_once "constants.php";
    parent::__construct();
    $this->load->model("home_model");
    $this->load->model("plan_model");
    $this->openAiSecret = $_ENV["OPENAI_API_KEY"] ?? "";
    $this->openAiModel = trim((string) ($_ENV["OPENAI_MODEL"] ?? "")) ?: "gpt-6-luna";
    $this->SCHEMA_SNIPPET = $SCHEMA_SNIPPET;
    $this->load->library("../controllers/auth");
    $this->auth->validateToken();
  }

  public function promptResponseToSql($id, $args)
  {
    $arguments = json_decode($args, true);
    $result = null;
    $type = null;
    if (!is_array($arguments)) {
      $this->auth->response(["response" => ["id" => $id, "error" => "Invalid response format. Please try again."]], [], 400);
      return;
    }
    if (isset($arguments["error"])) {
      $this->auth->response(["response" => ["id" => $id, "error" => $arguments["error"]]], [], 400);
      return;
    } else {
      if (array_key_exists("query", $arguments)) {
        try {
          if (!is_string($arguments["query"]) || !is_array($arguments["params"] ?? [])) {
            $this->auth->response(["response" => ["id" => $id, "error" => "Invalid query response. Please try again."]], [], 400);
            return;
          }
          $sql = $arguments["query"];
          $params = array_key_exists("params", $arguments) ? $arguments["params"] : [];
          $chart = $arguments["chart"] ?? null;
          $query = $this->db->query($sql, $params);

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
                  // "sql" => $sql, // comment this line to hide SQL in response
                  // "params" => $params, // comment this line to hide params in response
                ],
                !is_null($chart) ? ["chart" => $chart] : [],
              ),
            ],
            [],
            200,
          );
        } catch (Throwable $e) {
          $this->auth->response(["response" => ["id" => $id, "error" => "Unable to run the generated query. Please try again."]], [], 400);
          return;
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
        return;
      }
    }
  }

  private function getResponseValue(mixed $response, array $keys)
  {
    $value = $response;

    foreach ($keys as $key) {
      if (is_array($value) && array_key_exists($key, $value)) {
        $value = $value[$key];
        continue;
      }

      if ($value instanceof ArrayAccess && $value->offsetExists($key)) {
        $value = $value[$key];
        continue;
      }

      if (is_object($value) && property_exists($value, $key)) {
        $value = $value->$key;
        continue;
      }

      return null;
    }

    return $value;
  }

  public function successResponse($res = "")
  {
    if ($res === "") {
      $res = file_get_contents(APPPATH . "/controllers/ai/sampleSuccessResponse.json");
      $res = json_decode($res, true);
    }

    $args = $this->getSqlFunctionArguments($res);
    $id = $this->getResponseValue($res, ["id"]);

    if (!is_null($args)) {
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

  private function getSqlFunctionArguments(mixed $response): ?string
  {
    $toolName = $this->getResponseValue($response, ["choices", 0, "message", "tool_calls", 0, "function", "name"]);
    if (is_null($toolName)) {
      $toolName = $this->getResponseValue($response, ["choices", 0, "message", "toolCalls", 0, "function", "name"]);
    }
    if (!is_null($toolName)) {
      if ($toolName !== "sql_query") {
        return null;
      }

      $arguments = $this->getResponseValue($response, ["choices", 0, "message", "tool_calls", 0, "function", "arguments"]);
      if (is_null($arguments)) {
        $arguments = $this->getResponseValue($response, ["choices", 0, "message", "toolCalls", 0, "function", "arguments"]);
      }
      return is_string($arguments) ? $arguments : null;
    }

    $functionName = $this->getResponseValue($response, ["choices", 0, "message", "function_call", "name"]);
    if (is_null($functionName)) {
      $functionName = $this->getResponseValue($response, ["choices", 0, "message", "functionCall", "name"]);
    }
    if ($functionName !== "sql_query") {
      return null;
    }

    $arguments = $this->getResponseValue($response, ["choices", 0, "message", "function_call", "arguments"]);
    if (is_null($arguments)) {
      $arguments = $this->getResponseValue($response, ["choices", 0, "message", "functionCall", "arguments"]);
    }
    return is_string($arguments) ? $arguments : null;
  }
  public function sampleSuccessResponse($res = "")
  {
    // sleep(5);
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
    if ($this->input->post("tenantId") && $this->input->post("prompt")) {
      $tenantId = $this->input->post("tenantId");
      $prompt = $this->input->post("prompt");
      $appId = $this->home_model->getAppIdFromTenantId($tenantId);
      if ($this->plan_model->hasAiTokenQuota($appId)) {
        $openAiResponse = $this->naturalPromptToSql($appId, $prompt);
        if (is_null($openAiResponse)) {
          return;
        }
        $tokenData = $this->getResponseValue($openAiResponse, ["usage", "total_tokens"]);
        if (!is_null($tokenData)) {
          $this->plan_model->updateAiTokenSize($appId, $tokenData);
        }
        $this->successResponse($openAiResponse);
      } else {
        $this->auth->response(["response" => ["id" => time(), "error" => "Ledgerely AI tokens quota exhausted."]], [], 400);
      }
    } else {
      $this->auth->response(["response" => ["id" => time(), "error" => "Missing prompt or Tenant Id"]], [], 400);
    }
  }

  public function naturalPromptToSql(string $appId, string $prompt)
  {
    try {
      if (!$this->openAiSecret) {
        $this->auth->response(["response" => ["id" => time(), "error" => "OpenAI API key is not configured."]], [], 500);
        return null;
      }

      $SYSTEM_PROMPT = getSystemPrompt((string) (int) $appId, $this->SCHEMA_SNIPPET);

      if (trim($prompt) === "") {
        $this->auth->response(["response" => ["id" => time(), "error" => "Prompt cannot be empty."]], [], 400);
        return null;
      }

      $client = OpenAI::client($this->openAiSecret);

      $tools = [
        [
          "type" => "function",
          "function" => [
            "name" => "sql_query",
            "description" => "Return a MySQL query and parameters as JSON. Use ? placeholders for user-provided values.",
            "parameters" => [
              "type" => "object",
              "properties" => [
                "query" => ["type" => "string"],
                "params" => [
                  "type" => "array",
                  "items" => ["type" => ["string", "number", "boolean", "null"]],
                ],
                "chart" => ["type" => "object"],
                "error" => ["type" => "string"],
              ],
              "additionalProperties" => false,
            ],
          ],
        ],
      ];

      $messages = [
        [
          "role" => "system",
          "content" => $SYSTEM_PROMPT,
        ],
        ["role" => "user", "content" => $prompt],
      ];

      $response = $client->chat()->create([
        "model" => $this->openAiModel,
        "messages" => $messages,
        "tools" => $tools,
        "tool_choice" => ["type" => "function", "function" => ["name" => "sql_query"]],
        "max_completion_tokens" => 600,
      ]);
      return $response;
    } catch (Throwable $e) {
      $message = $e instanceof \OpenAI\Exceptions\ErrorException ? $e->getMessage() : "Unable to generate a query right now. Please try again.";
      $this->auth->response(["response" => ["id" => time(), "error" => $message]], [], 502);
      return null;
    }
  }
  public function scanStatement()
  {
    try {
      $tenantId = $this->input->post("tenantId");
      if ($tenantId && isset($_FILES["statement"]["tmp_name"]) && $_FILES["statement"]["error"] == UPLOAD_ERR_OK) {
        if ($_FILES["statement"]["size"] <= 1 * 1024 * 1024) {
          $appId = $this->home_model->getAppIdFromTenantId($tenantId);
          if ($this->plan_model->hasAiTokenQuota($appId)) {
            if (!$this->openAiSecret) {
              $this->auth->response(["response" => ["id" => time(), "error" => "OpenAI API key is not configured."]], [], 500);
              return;
            }
            $SYSTEM_PROMPT = readCreditCardFileSystemPrompt();
            $client = OpenAI::client($this->openAiSecret);

            $filePath = $_FILES["statement"]["tmp_name"];
            $fileType = mime_content_type($filePath);
            $fileContent = "";
            // Extract text from the uploaded file
            if (in_array($fileType, ["text/plain", "text/csv"])) {
              $fileContent = file_get_contents($filePath);
            } elseif ($fileType === "application/pdf") {
              // Try to extract text from PDF using smalot/pdfparser if available
              if (class_exists("Smalot\\PdfParser\\Parser")) {
                $parser = new Smalot\PdfParser\Parser();
                $pdf = $parser->parseFile($filePath);
                $fileContent = $pdf->getText();
              } else {
                $this->auth->response(
                  [
                    "response" => [
                      "id" => time(),
                      "error" => "PDF parsing library not installed. Please upload a text or CSV file, or install smalot/pdfparser.",
                    ],
                  ],
                  [],
                  400,
                );
                return;
              }
            } else {
              $this->auth->response(
                ["response" => ["id" => time(), "error" => "Unsupported file type. Please upload a PDF, text, or CSV file."]],
                [],
                400,
              );
              return;
            }
            if (trim($fileContent) === "") {
              $this->auth->response(["response" => ["id" => time(), "error" => "No text could be extracted from the file."]], [], 400);
              return;
            }
            $response = $client->chat()->create([
              "model" => $this->openAiModel,
              "messages" => [
                ["role" => "system", "content" => $SYSTEM_PROMPT],
                ["role" => "user", "content" => "Please analyze the following credit card statement text:\n" . $fileContent],
              ],
              "response_format" => creditCardResponseSchema(),
              "max_completion_tokens" => 5000,
            ]);
            $decodedContent = null;
            $jsonString = $this->getResponseValue($response, ["choices", 0, "message", "content"]);
            if (!is_null($jsonString)) {
              $decodedContent = json_decode($jsonString, false);
              if (json_last_error() !== JSON_ERROR_NONE) {
                $decodedContent = (object) [
                  "error" => "The extracted data was too large or incomplete. Please try with a smaller file or split your statement.",
                ];
              }
            }
            $tokenData = $this->getResponseValue($response, ["usage", "total_tokens"]);
            if (!is_null($tokenData)) {
              $this->plan_model->updateAiTokenSize($appId, $tokenData);
            }
            $data = [
              "response" => [
                "id" => $this->getResponseValue($response, ["id"]),
                "created" => $this->getResponseValue($response, ["created"]),
                "result" => $decodedContent,
              ],
            ];
            $this->auth->response($data, [], 200);
          } else {
            $this->auth->response(
              ["response" => ["id" => time(), "error" => "Ledgerely AI quota exhausted. Please recharge or move to paid plan."]],
              [],
              400,
            );
            return;
          }
        } else {
          $this->auth->response(["response" => ["id" => time(), "error" => "File size exceeds the 1MB limit."]], [], 400);
          return;
        }
      } else {
        $this->auth->response(["response" => ["id" => time(), "error" => "Missing Tenant Id or no file uploaded or upload error."]], [], 400);
        return;
      }
    } catch (Throwable $e) {
      $message = $e instanceof \OpenAI\Exceptions\ErrorException ? $e->getMessage() : "Unable to process the statement right now. Please try again.";
      $this->auth->response(["response" => ["id" => time(), "error" => $message]], [], 502);
    }
  }
  public function getTokenUsage()
  {
    try {
      $tenantId = $this->input->post("tenantId");
      if (empty($tenantId)) {
        $this->auth->response(["response" => ["error" => "Tenant id not found"]], [], 400);
        return;
      }
      $appId = $this->home_model->getAppIdFromTenantId($tenantId);
      $row = $this->plan_model->getTokenUsage($appId);
      $data = ["response" => $row];
      $this->auth->response($data, [], 200);
    } catch (Throwable $e) {
      $this->auth->response(["response" => ["id" => time(), "error" => $e->getMessage()]], [], 400);
    }
  }
}
