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
?>
