<?php
defined("BASEPATH") or exit("No direct script access allowed");

class ledgerelyAi extends CI_Controller
{
  private $openAiSecret;
  private $SCHEMA_SNIPPET;
  public function __construct()
  {
    require_once "tableSchema.php";
    parent::__construct();
    $this->openAiSecret = $_ENV["OPENAI_API_KEY"];
    $this->SCHEMA_SNIPPET = $SCHEMA_SNIPPET;
    $this->load->library("../controllers/auth");
    $this->auth->validateToken();
  }

  public function successResponse()
  {
    // remove below sample and implement query on OpenAI sql which is available in arguments->query and arguments->params:[10001] using prepared statements
    $jsonString = file_get_contents(
      APPPATH . "/controllers/ai/sampleSuccessResponse.json",
    );
    $data = json_decode($jsonString, true);
    $data["id"] = rand(100, 10000000000) / 10;
    $data["choices"][0]["message"]["functionCall"]["arguments"] = json_decode(
      $data["choices"][0]["message"]["functionCall"]["arguments"],
      true,
    );
    $this->auth->response(["response" => $data], [], 200);
  }

  public function errorResponse()
  {
    $jsonString = file_get_contents(
      APPPATH . "/controllers/ai/sampleErrorResponse.json",
    );
    $data = json_decode($jsonString, true);
    $data["id"] = rand(100, 10000000000) / 10;

    $data["choices"][0]["message"]["functionCall"]["arguments"] = json_decode(
      $data["choices"][0]["message"]["functionCall"]["arguments"],
      true,
    );
    $this->auth->response(["response" => $data], [], 400);
  }

  public function runPrompt()
  {
    if ($this->input->post("appId") && $this->input->post("prompt")) {
      $appId = $this->input->post("appId");
      $prompt = $this->input->post("prompt");
      // $this->naturalPromptToSql($appId, $prompt); // uncomment this to enable real OpenAI call

      // error response
      $this->errorResponse();

      // success response
      // $this->successResponse();
    } else {
      $error = [
        "choices" => [
          [
            "message" => [
              "functionCall" => [
                "arguments" => ["error" => "Missing prompt or AppId"],
              ],
            ],
          ],
        ],
      ];
      $this->auth->response($error, [], 400);
    }
  }

  public function naturalPromptToSql($appId, $prompt)
  {
    if (!$this->openAiSecret) {
      $this->auth->response(["response" => "Open AI key not found"], [], 400);
    }
    $model = "gpt-4o";

    $SYSTEM_PROMPT = <<<SYS
    You are a SQL generator for MySQL ( InnoDB ). Return EXACTLY one function call named 'sql_query' with a JSON object: {'query': '...', 'params': [ ... ] }.
    Rules:
    - Return only SELECT queries ( read-only ).
    - Use '?' placeholders for parameter binding ( MySQL prepared statements ).
    - Do NOT return destructive statements ( DROP, DELETE, ALTER, CREATE, UPDATE, TRUNCATE ). If yes, return an error JSON: {'error':'...'}.
    - Use table and column names exactly as in the schema snippet provided.
    - Prefer safe defaults: add a LIMIT ( e.g., LIMIT 1000 ) if not specified.
    - If the user gives specific date ranges or values, place them into the params array in order.
    - Transaction insert is allowed only for credit_card_transactions and income_expenses tables prompting transaction description, category and amount.
    - If the user query is not related to the schema, return an error JSON: {'error':'Redundant topic: ...'}.
    - Assume the user is authenticated and authorized to access data.
    - Assume the user has access only to data associated with their appId.
    - If the user's request is ambiguous or incomplete, ask clarifying questions before generating the SQL.
    - Once you have enough context, generate the SQL with clear formatting.
    - In income_expense table, inc_exp_type can be 'Cr' for income and 'Dr' for expense.
    - Add where clauses on column ending with appId = $appId.
    SYS;

    if (trim($prompt) === "") {
      exit(0);
    }

    // ---------- Prepare OpenAI client ----------
    $client = OpenAI::client($this->openAiSecret);

    // Define functions schema to force structured response
    $functions = [
      [
        "name" => "sql_query",
        "description" =>
          "Return a MySQL SELECT query and parameters as JSON: {\"query\":\"...\",\"params\":[...]}. Use ? placeholders for params.",
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

    $data["response"] = $response;
    $this->auth->response($data, [], 200);
  }
}
