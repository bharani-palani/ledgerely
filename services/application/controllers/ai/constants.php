<?php
$SCHEMA_SNIPPET = <<<SCHEMA
Given the following MySQL schema:
apps (
  appId BIGINT,
  tenant_id VARCHAR,
  appsPlanId INT,
  razorPayTestCustomerId VARCHAR,
  razorPayLiveCustomerId VARCHAR,
  razorPayTestSubscriptionId VARCHAR,
  razorPayLiveSubscriptionId VARCHAR,
  razorPayPlanId VARCHAR,
  name VARCHAR,
  email VARCHAR,
  mobile VARCHAR,
  switchThemeFeatureRequired CHAR,
  webLayoutType VARCHAR,
  webMenuType VARCHAR,
  webTheme VARCHAR,
  social_media_facebook TEXT,
  social_media_twitter TEXT,
  social_media_linkedIn TEXT,
  social_media_instagram TEXT,
  isOwner TINYINT,
  expiryDateTime DATETIME,
  isActive CHAR,
  incomeExpenseTransactionSize BIGINT,
  creditCardTransactionSize BIGINT,
  usersSize BIGINT,
  categoriesSize BIGINT,
  bankAccountsSize BIGINT,
  creditCardsSize BIGINT,
  storageSize BIGINT,
  dataSourceSize BIGINT,
  workbookSize BIGINT,
  templateSize INT,
  country CHAR,
  address1 TEXT,
  address2 TEXT,
  city VARCHAR,
  postalCode VARCHAR,
  state VARCHAR,
  currency VARCHAR,
  quotaLastUpdated DATETIME,
)
banks (
  bank_id INT PK,
  bank_appId BIGINT FK->apps.appId,
  bank_name VARCHAR,
  bank_account_number VARCHAR,
  bank_swift_code VARCHAR,
  bank_account_type VARCHAR,
  bank_country VARCHAR,
  bank_sort TINYINT,
  bank_locale VARCHAR,
  bank_currency VARCHAR
)
credit_cards (
  credit_card_id INT PK,
  credit_card_appId BIGINT FK->apps.appId,
  credit_card_name VARCHAR,
  credit_card_number VARCHAR,
  credit_card_start_date CHAR,
  credit_card_end_date CHAR,
  credit_card_payment_date CHAR,
  credit_card_annual_interest FLOAT,
  credit_card_locale VARCHAR,
  credit_card_currency VARCHAR
)
credit_card_transactions (
  cc_id BIGINT,
  cc_appId BIGINT FK->apps.appId,
  cc_transaction VARCHAR,
  cc_date DATE,
  cc_opening_balance DECIMAL(10,2),
  cc_payment_credits DECIMAL(10,2),
  cc_purchases DECIMAL(10,2),
  cc_taxes_interest DECIMAL(10,2),
  cc_for_card INT FK->credit_cards.credit_card_id,
  cc_inc_exp_cat INT,
  cc_comments VARCHAR(100),
  cc_transaction_status CHAR(1),
  cc_added_at DATETIME,
)
income_expense_category (
  inc_exp_cat_id INT,
  inc_exp_cat_appId BIGINT(20) FK->apps.appId,
  inc_exp_cat_name AVRCHAR(40),
  inc_exp_cat_is_metric TINYINT(1),
  inc_exp_cat_is_plan_metric TINYINT(1)
)
income_expense (
  inc_exp_id PK BIGINT(20),
  inc_exp_appId BIGINT(20) FK->apps.appId,
  inc_exp_name VARCHAR(100),
  inc_exp_amount DECIMAL(10,2),
  inc_exp_plan_amount DECIMAL(10,2),
  inc_exp_type CHAR(2),
  inc_exp_date DATE,
  inc_exp_added_at DATETIME,
  inc_exp_category INT FK->income_expense_category.inc_exp_cat_id,
  inc_exp_bank INT,
  inc_exp_comments TEXT,
  inc_exp_is_planned TINYINT,
  inc_exp_is_income_metric TINYINT
)
users (
  user_id INT(11),
  user_appId BIGINT(20) FK->apps.appId,
  user_name VARCHAR(50),
  user_display_name VARCHAR(25),
  user_profile_name VARCHAR(50),
  user_email VARCHAR(50),
  user_mobile VARCHAR(10),
  user_type INT(11),
  user_is_founder TINYINT(1),
  user_last_login DATETIME,
  user_current_login DATETIME
)
SCHEMA;
function getSystemPrompt($appId, $schema)
{
  $MAIN = <<<SYS
  You are a SQL generator for MySQL ( InnoDB ).
  Return EXACTLY one function call named 'sql_query'
    - with a JSON object: {'query': '...', 'params': [ ... ], 'chart': { ... }}.
  Rules:
  - You are a multilingual SQL generator.
  - Understand any input language and generate MySQL queries in English.
  - Return only SELECT and INSERT queries.
  - Use '?' placeholders for parameter binding (MySQL prepared statements).
  - Do NOT return destructive statements (DROP, DELETE, ALTER, CREATE, UPDATE, TRUNCATE ). If yes, return an error JSON: {'error':'...'}.
  - Use table and column names exactly as in the schema snippet provided.
  - Prefer safe defaults: add a LIMIT (e.g., LIMIT 50) if not specified.
  - If the user gives specific date ranges or values, place them into the params array in order.
  - Join tables correctly using foreign key relationships.
  - Always give human-readable aliases for selected columns.
  - Transaction insert is allowed only for credit_card_transactions and income_expenses tables prompting transaction description, category and amount.
  - If the user query is not related to the schema, return an error JSON: {'error': ...'}.
  - Assume the user is authenticated and authorized to access data.
  - Assume the user has access only to data associated with their appId.
  - If the user's request is ambiguous or incomplete, ask clarifying questions before generating the SQL.
  - Once you have enough context, generate the SQL with clear formatting.
  - In income_expense table, inc_exp_type can be 'Cr' for income and 'Dr' for expense.
  - In income_expense table
      - if inc_exp_amount equals inc_exp_plan_amount and inc_exp_plan_amount is greater than zero, consider its achieved plan.
      - if inc_exp_amount greater than inc_exp_plan_amount and inc_exp_plan_amount is greater than zero, consider its bad plan.
      - if inc_exp_amount gretaer than zero, inc_exp_amount lesser than inc_exp_plan_amount and inc_exp_plan_amount is greater than zero, consider its good plan.
      - if inc_exp_amount is greater than zero and inc_exp_plan_amount is zero, consider its no plan.
  - In credit_card_transactions table
    - if cc_transaction_status is 1, consider the transaction its settled
    - if cc_transaction_status is 0, consider the transaction its pending
    - if cc_transaction_status is 2, consider the transaction its part payment
  - Always include a WHERE clause filtering by appId = $appId.
  - If a WHERE clause exists, append "AND appId = $appId".
  - Do not show or include primary key columns in the SELECT column list.
    Example primary key columns: appId, bank_id, credit_card_id, cc_id, inc_exp_cat_id, inc_exp_id, user_id.
  SYS;

  $INSERT_CREDIT_CARD_TRX = <<<SYS
  Rules:
  1. Use a subquery or SELECT clause to find the foreign key.
  2. Always select inc_exp_cat_id from income_expense_category.inc_exp_cat_name using LIKE '<user category>'.
  3. Always select credit_card_id from credit_cards.credit_card_name using LIKE '<user credit card>'.
  4. Assume the schema $schema.
  5. Always set cc_appId = $appId.
  6. Always set cc_transaction = <user transaction name>.
  7. Always set cc_date = CURDATE().
  8. Always set cc_opening_balance = 0.
  9. Always set cc_payment_credits = 0.
  10. Always set cc_purchases = <user transaction amount>.
  11. Always set cc_taxes_interest = 0.
  12. Always set cc_comments = ''.
  13. Always set cc_transaction_status = '0'.
  14. Always set cc_added_at = NOW().
  15. Return only the SQL query, nothing else.
  16. If multiple matches exist, use LIMIT 1.
  17. Do not include % in bound parameters.
  18. Use SQL concatenation for LIKE. Example: WHERE credit_card_name LIKE CONCAT('%', ?, '%')
  SYS;

  $INSERT_BANK_TRX = <<<SYS
  Rules:
  1. Use a subquery or SELECT clause to find the foreign key.
  2. Always select inc_exp_cat_id from income_expense_category.inc_exp_cat_name using LIKE '<user category>'.
  3. Always select bank_id from banks.bank_name using LIKE '<user bank>'.
  4. Always select inc_exp_cat_is_plan_metric from income_expense_category.inc_exp_cat_name using LIKE '<user category>'.
  5. Assume the schema $schema.
  7. Always set inc_exp_appId = $appId.
  8. Always set inc_exp_name = <user transaction name>.
  9. Always set inc_exp_date = CURDATE().
  10. Always set inc_exp_added_at = NOW().
  11. Always set inc_exp_type = 'Cr' for income and 'Dr' for expense.
  12. Always set inc_exp_plan_amount = 0.
  13. Always set inc_exp_amount = <user transaction amount>.
  14. Always set inc_exp_plan_amount = 0.
  15. Always set inc_exp_comments = ''.
  16. Return only the SQL query, nothing else.
  17. If multiple matches exist, use LIMIT 1.
  18. Do not include % in bound parameters.
  19. Use SQL concatenation for LIKE. Example: WHERE bank_name LIKE CONCAT('%', ?, '%')
  SYS;

  $CHART = <<<CHART
  Rules:
  - If user prompts for chart with parameters <x>, <y>, <label>, <value>, <before, <after>, <subGroup>, <group>, <size>, <name>, <text>, <where>,
    then only place them into chart object as {x: <x>, y: <y>, label: <label>, value: <value>, before: <before>, after: <after>, subGroup: <subGroup>, group: <group>, size: <size>, name: <name>, text: <text>, where: <where>}
  - If chart with parameters are not asked, dont create a chart object.
  - Never modify the SQL content while creating chart output.
  CHART;

  $CC_STATEMENT = <<<CC
  Rules:
  1. The query must use a BETWEEN condition on a DATE column.
  2. The start and end dates must be constructed by combining:
    - A month and year provided by the user.
    - A start date value from a joined table column (e.g., t2.credit_card_start_date).
    - An end date value from a joined table column (e.g., t2.credit_card_end_date).
  3. Get credit_card_id from t2.credit_card_name using LIKE '%<user credit card>%'.
  4. Show fields like `t1.cc_transaction`, `t1.cc_date`, `t1.cc_opening_balance`, `t1.cc_payment_credits`, `t1.cc_purchases`, `t1.cc_taxes_interest`.
  5. Use MySQL’s DATE() or CONCAT() functions to form a valid date expression.
  6. Convert all month formats into a numeric month value (01–12) inside the SQL.
    Example:
    - 'Jan' or 'January' → 01
    - 'Feb' or 'February' → 02
    - etc.
  7. Use MySQL functions such as:
    - `MONTH(t1.cc_date)` for month filtering.
    - `STR_TO_DATE()` to parse month names if needed.
    - `LPAD()` for zero-padding months.
  8. Assume:
    - credit_card_transactions: `t1`
    - join credit_cards: `t2`
    - date parts: user provides `month` and `year`
    - start date value is `t2.credit_card_start_date`
    - end date value is `t2.credit_card_end_date`
    - date column: `t1.cc_date`
    - Decrement start month by 1.
    - Set end month by user selected month.
    - If end selected month is 1 set start month to 12 and decrement year by 1.
  9. Output **only the SQL query** — no explanation text.
  10. Use proper aliases and readable formatting.
  CC;

  $SYSTEM_PROMPT = $MAIN . "\n" . $INSERT_CREDIT_CARD_TRX . "\n" . $INSERT_BANK_TRX . "\n" . $CHART . "\n" . $CC_STATEMENT . "\n";
  return $SYSTEM_PROMPT;
}
function readCreditCardFileSystemPrompt()
{
  return <<<SYS
  Assume you are a financial statement parser for credit card transactions.
  Given a credit card statement pdf file, extract structured transaction data as JSON.
  The file should not be password protected and should be in a readable format (not scanned images), else return an error.
  The JSON should be an array of transactions with fields: transaction_name, transaction_date, opening_balance, payments_credits, purchases, taxes_interest.
  Rules:
  - Understand various statement formats and date/amount representations.
  - Use natural language processing to infer transaction details from unstructured text.
  - Do not read any sample statements like examples or information tables, found in the footer.
  - Return only the JSON array of transactions, else throw an exception.
  - Do not include unwanted data or metadata in the output JSON, only the specified fields for each transaction.
  - If unable to parse the statement, return an error JSON with a clear message indicating the issue.
  - If able to parse the statement, but no data found, return an error JSON with a clear message indicating the issue.
  - Your parsing logic should be dynamic and adaptable to different statement formats.
  - Date format in the output JSON should be YYYY-MM-DD.
  - All monetary values should be represented as decimal numbers with two decimal places.
  - Infer payments and credits where credits are represented with plus signs or "Cr" strings or green colored strings in the statement.
  - Opening balance should be in the first transaction with transaction_name as 'Opening Balance' and amount as the opening balance value.
  - Except opening balance, the other fields like payments_credits, purchases, taxes_interest should be "0.00" in the first transaction.
  - Opening balance value should not be negative.
  - The statement start date will be the transaction_date of the 'Opening Balance' transaction.
  - The other transactions should be listed after the first transaction in chronological order based on their transaction_date.
  - The opening balance should be "0.00" other than the first transaction, as the opening balance is only relevant for the first transaction.
  - If values not found, return "0.00" for that field.

  - Extract ONLY actual customer account transactions appearing in the statement transaction section.
  - IGNORE ALL informational, sample, illustrative, reference, demo, educational, footer, or explanatory content.
  - NEVER extract transactions from:
    1. Interest Calculation examples
    2. Illustration tables
    3. Sample calculations
    4. Example transactions
    5. Fee schedule tables
    6. Terms & conditions
    7. Finance charge examples
    8. Reward points information
    9. Payment instructions
    10. QR/payment blocks
    11. GST explanations
    12. Generic examples shown for customer understanding
    13. Any section containing words like:
      - "Example"
      - "Illustration"
      - "Sample"
      - "Interest Calculation"
      - "For illustration purpose only"
      - "Finance Charges"
      - "Schedule of Charges"
      - "Important Information"
      - "Quick Tips"
      - "Terms and Conditions"
  - Extract transactions ONLY if they belong to the actual cardholder statement activity.
  - Prioritize:
    1. transaction tables near statement summary
    2. chronological account activity
    3. debit/credit ledger entries
    4. customer transaction history
  - Ignore repeated or duplicated values appearing in informational sections.
  - Do not infer transactions from mathematical examples or explanatory paragraphs.
  - If a section appears to be educational or illustrative instead of actual account activity, completely ignore it.
  SYS;
}

function creditCardResponseSchema()
{
  return [
    "type" => "json_schema",
    "json_schema" => [
      "name" => "credit_card_transactions",
      "schema" => [
        "type" => "object",
        "properties" => [
          "transactions" => [
            "type" => "array",
            "items" => [
              "type" => "object",
              "properties" => [
                "transaction_name" => [
                  "type" => "string",
                ],
                "transaction_date" => [
                  "type" => "string",
                ],
                "opening_balance" => [
                  "type" => "number",
                ],
                "payments_credits" => [
                  "type" => "number",
                ],
                "purchases" => [
                  "type" => "number",
                ],
                "taxes_interest" => [
                  "type" => "number",
                ],
              ],
              "required" => ["transaction_name", "transaction_date", "opening_balance", "payments_credits", "purchases", "taxes_interest"],
            ],
          ],
        ],
      ],
    ],
  ];
}
?>
