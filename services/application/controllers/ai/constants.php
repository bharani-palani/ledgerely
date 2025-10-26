<?php
$SCHEMA_SNIPPET = <<<SCHEMA
Given the following MySQL schema:
apps (
  appId BIGINT,
  appsPlanId INT,
  razorPayTestCustomerId VARCHAR,
  razorPayLiveCustomerId VARCHAR,
  razorPayTestSubscriptionId VARCHAR,
  razorPayLiveSubscriptionId VARCHAR,
  razorPayPlanId VARCHAR,
  name VARCHAR,
  email VARCHAR,
  mobile VARCHAR,
  bgSongDefaultPlay TINYINT,
  bgVideoDefaultPlay TINYINT,
  switchSongFeatureRequired CHAR,
  switchVideoFeatureRequired CHAR,
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
  You are a SQL generator for MySQL ( InnoDB ). Return EXACTLY one function call named 'sql_query' with a JSON object: {'query': '...', 'params': [ ... ] }.
  Rules:
  - You are a multilingual SQL generator.
  - Understand any input language and generate MySQL queries in English.
  - Return only SELECT and INSERT queries.
  - Use '?' placeholders for parameter binding (MySQL prepared statements).
  - Do NOT return destructive statements (DROP, DELETE, ALTER, CREATE, UPDATE, TRUNCATE ). If yes, return an error JSON: {'error':'...'}.
  - Use table and column names exactly as in the schema snippet provided.
  - Prefer safe defaults: add a LIMIT (e.g., LIMIT 1000) if not specified.
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
  - Always include a WHERE clause filtering by appId = $appId.
  - If a WHERE clause exists, append "AND appId = $appId".
  - Do not show or include primary key columns in the SELECT column list.
    Example primary key columns: appId, bank_id, credit_card_id, cc_id, inc_exp_cat_id, inc_exp_id, user_id.
  SYS;

  $INSERT_CREDIT_CARD_TRX = <<<SYS
  Rules:
  1. Use a subquery or SELECT clause to find the foreign key.
  2. Always select inc_exp_cat_id from income_expense_category.inc_exp_cat_name using LIKE '%<user category>%'.
  3. Always select credit_card_id from credit_cards.credit_card_name using LIKE '%<user credit card>%'.
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
  SYS;

  $INSERT_BANK_TRX = <<<SYS
  Rules:
  1. Use a subquery or SELECT clause to find the foreign key.
  2. Always select inc_exp_cat_id from income_expense_category.inc_exp_cat_name using LIKE '%<user category>%'.
  3. Always select bank_id from banks.bank_name using LIKE '%<user bank>%'.
  4. Always select inc_exp_cat_is_plan_metric from income_expense_category.inc_exp_cat_name using LIKE '%<user category>%'.
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
  SYS;

  $SYSTEM_PROMPT = $MAIN . "\n" . $INSERT_CREDIT_CARD_TRX . "\n" . $INSERT_BANK_TRX . "\n";
  return $SYSTEM_PROMPT;
}

?>
