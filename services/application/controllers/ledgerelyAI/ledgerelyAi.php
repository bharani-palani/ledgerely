<?php
defined('BASEPATH') or exit('No direct script access allowed');

if(!function_exists("readline")) {
    function readline($prompt = null){
        if($prompt){
            echo $prompt;
        }
        $fp = fopen("php://stdin","r");
        $line = rtrim(fgets($fp, 1024));
        return $line;
    }
}

class ledgerelyAi extends CI_Controller
{
    private $openAiSecret;
    public function __construct()
    {
        parent::__construct();
        $this->load->library('../controllers/auth');
        $this->openAiSecret = $_ENV['OPENAI_API_KEY'];
    }
    public function runPrompt(){
        if (!$this->openAiSecret) {
            $this->auth->response(['response' => 'Open AI key not found'], [], 400);
            exit(1);
        }
        $model = 'gpt-4o';
        $SCHEMA_SNIPPET = <<<SCHEMA
        Given the following MySQL schema:
        CREATE TABLE `banks` (
        `bank_id` int(11) NOT NULL,
        `bank_appId` bigint(20) NOT NULL,
        `bank_name` varchar(40) CHARACTER SET utf8 NOT NULL,
        `bank_account_number` varchar(20) NOT NULL,
        `bank_swift_code` varchar(15) NOT NULL,
        `bank_account_type` varchar(20) NOT NULL,
        `bank_country` varchar(3) NOT NULL,
        `bank_sort` tinyint(3) NOT NULL,
        `bank_locale` varchar(10) NOT NULL,
        `bank_currency` varchar(3) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        SCHEMA;

        $appId = $this->input->post('appId');
        $SYSTEM_PROMPT = <<<SYS
        You are a SQL generator for MySQL (InnoDB). Return EXACTLY one function call named "sql_query" with a JSON object: {"query": "...", "params": [...] }.

        Rules:
        - Return only SELECT queries (read-only).
        - Use "?" placeholders for parameter binding (MySQL prepared statements).
        - Do NOT return destructive statements (DROP, DELETE, ALTER, CREATE, UPDATE, TRUNCATE). If yes, return an error JSON: {"error":"..."}.
        - Use table and column names exactly as in the schema snippet provided.
        - Prefer safe defaults: add a LIMIT (e.g., LIMIT 1000) if not specified.
        - If the user gives specific date ranges or values, place them into the params array in order.
        - Transaction insert is allowed only for credit_card_transactions and income_expenses tables prompting transaction description, category and amount.
        - If the user query is not related to the schema, return an error JSON: {"error":"Redundant topic: ..."}.
        - Assume the user is authenticated and authorized to access data.
        - Assume the user has access only to data associated with their appId.
        - If the user's request is ambiguous or incomplete, ask clarifying questions before generating the SQL. 
        - Once you have enough context, generate the SQL with clear formatting.
        - Add where clauses on column ending with appId = $appId.
        SYS;

        // $prompt = readline("Enter natural-language request (blank to exit): ");
        $prompt = $this->input->post('prompt');

        if (trim($prompt) === '') exit(0);

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
                            "items" => ["type" => ["string","number","boolean","null"]]
                        ],
                        "error" => ["type" => "string"]
                    ],
                    "required" => ["query"]
                ]
            ]
        ];

        $messages = [
            ["role" => "system", "content" => $SYSTEM_PROMPT . "\n\n" . $SCHEMA_SNIPPET],
            ["role" => "user", "content" => $prompt]
        ];

        $response = $client->chat()->create([
            'model' => $model,
            'messages' => $messages,
            'functions' => $functions,
            'function_call' => ['name' => 'sql_query'],
            'temperature' => 0.0,
            'max_tokens' => 600
        ]);

        $data['response'] = $response;
        $this->auth->response($data, [], 200);
    }
}