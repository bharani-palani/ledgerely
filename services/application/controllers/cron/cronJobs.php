<?php
defined("BASEPATH") or exit("No direct script access allowed");

use Razorpay\Api\Api;
use Razorpay\Api\Errors;

class cronJobs extends CI_Controller
{
  public $razorPayApi;
  public function __construct()
  {
    parent::__construct();
    $this->load->model("home_model");
    $this->load->library("../controllers/auth");
    $this->load->library("email");
    $this->email->initialize([
      "protocol" => $this->config->item("protocol"),
      "smtp_host" => $this->config->item("smtp_host"),
      "smtp_user" => $this->config->item("smtp_user"),
      "smtp_pass" => $this->config->item("smtp_pass"),
      "mailtype" => $this->config->item("mailtype"),
      "charset" => $this->config->item("charset"),
    ]);
    $this->razorPayApi =
      $_ENV["APP_ENV"] === "production"
        ? new Api($this->config->item("razorpay_live_key_id"), $this->config->item("razorpay_live_key_secret"))
        : new Api($this->config->item("razorpay_test_key_id"), $this->config->item("razorpay_test_key_secret"));
  }
  public function throwException($e)
  {
    $errors = [
      "CODE" => $e->getCode(),
      "MESSAGE" => $e->getMessage(),
      "FILE" => $e->getFile(),
      "LINE" => $e->getLine(),
      "STRING_TRACE" => $e->getTraceAsString(),
    ];
    if ($_ENV["APP_ENV"] !== "local") {
      $object = (object) [
        "name" => "ErrorHandler",
        "email" => "errorHandler@ledgerely.com",
        "source" => "BE",
        "type" => "PhpError",
        "description" => json_encode($errors),
        "userId" => "XXX",
        "time" => date("Y-m-d\TH:i:s"),
        "ip" => $_SERVER["REMOTE_ADDR"],
      ];
      $this->home_model->saveLog($object);
    }
    $this->auth->response(["response" => $errors], ["data" => $object], 500);
  }
  /**
   * todo: refactor this approach, because if there are 10,000 apps with 9 queries, it will take 90,000 queries. Which is very costly.
   * Instead try all these in single aggregate query
   * */
  public function quotaBatchUpdate()
  {
    try {
      $batchSize = 10;
      $apps = $this->home_model->getActiveAppAccounts();
      for ($i = 0; $i < count($apps); $i += $batchSize) {
        $batch = array_slice($apps, $i, $batchSize);
        $data = [];
        foreach ($batch as $key => $item) {
          $time = new DateTime("now", new DateTimeZone("Asia/Kolkata"));
          $banks = $this->home_model->getTableCount("banks", "bank_appId", $item["appId"]);
          $creditCards = $this->home_model->getTableCount("credit_cards", "credit_card_appId", $item["appId"]);
          $users = $this->home_model->getTableCount("users", "user_appId", $item["appId"]);
          $incomeExpenseTransactionSize = $this->home_model->getTableCount("income_expense", "inc_exp_appId", $item["appId"]);
          $creditCardTransactionSize = $this->home_model->getTableCount("credit_card_transactions", "cc_appId", $item["appId"]);
          $templateSize = $this->home_model->getTableCount("income_expense_template", "temp_appId", $item["appId"]);
          $categoriesSize = $this->home_model->getTableCount("income_expense_category", "inc_exp_cat_appId", $item["appId"]);
          $dataSourceSize = $this->home_model->getTableSize("datasourceQuery", "dsq_object", "dsq_appId", $item["appId"]);
          $workbookSize = $this->home_model->getTableSize("workbook", "wb_object", "wb_appId", $item["appId"]);
          $data[$key] = [
            "appId" => $item["appId"],
            "bankAccountsSize" => $banks,
            "creditCardsSize" => $creditCards,
            "usersSize" => $users,
            "incomeExpenseTransactionSize" => $incomeExpenseTransactionSize,
            "creditCardTransactionSize" => $creditCardTransactionSize,
            "storageSize" => 0,
            "templateSize" => $templateSize,
            "categoriesSize" => $categoriesSize,
            "dataSourceSize" => $dataSourceSize,
            "workbookSize" => $workbookSize,
            "quotaLastUpdated" => $time->format("Y-m-d H:i:s"),
          ];
        }
        $this->home_model->updateQuotaBatch("apps", $data, "appId");
      }
      $config = $this->home_model->getGlobalConfig();
      $date = new DateTime();
      $timezoneOffset = $date->format("O");
      $this->db->insert("logs", [
        "log_id" => null,
        "log_name" => "Cron Job",
        "log_email" => $config["appSupportEmail"],
        "log_source" => "Cron",
        "log_type" => "UpdateQuota",
        "log_description" => count($apps) . " app accounts quota updated",
        "log_user_id" => "XXX",
        "log_time" => $date->format("D M d Y H:i:s") . " GMT" . $timezoneOffset,
        "log_ip" => $_SERVER["SERVER_ADDR"],
      ]);
      $this->auth->response(["response" => "Success!"], [], 200);
    } catch (Exception $e) {
      $this->throwException($e);
    }
  }
  public function expiryBatchNotification()
  {
    try {
      $batchSize = 10;
      $data = $this->home_model->getActiveExpiredAppAccounts();
      $config = $this->home_model->getGlobalConfig();
      $appName = $config["appName"];
      $email = $config["appSupportEmail"];

      for ($i = 0; $i < count($data); $i += $batchSize) {
        $batch = array_slice($data, $i, $batchSize);
        $data = [];
        foreach ($batch as $key => $item) {
          $this->email->from($email, $appName . " Support Team");
          $this->email->to($item["email"]);
          $this->email->subject($appName . " trial period or subscription has expired!");
          $emailData["globalConfig"] = $config;
          $emailData["appName"] = $appName;
          $emailData["saluation"] = "Hello " . $item["name"] . ",";
          $emailData["matter"] = [
            "<p></p>",
            "Your " .
            $appName .
            " account trial period or subscription has expired past " .
            $item["expiredDaysPast"] .
            " day(s). Your last active day was " .
            date("Y-m-d", strtotime($item["expiryDateTime"])) .
            ".",
            'Please <a href="' . $_ENV["DOMAIN_URL"] . '/billing">Subscribe</a> immediately and choose any of your aptable plans.',
            "<p></p>",
            "You can upgrade or downgrade your plan any time. Appreciate your immediate attention to this.",
          ];
          $emailData["signature"] = "Regards,";
          $emailData["signatureCompany"] = $appName;
          $mesg = $this->load->view("emailTemplate", $emailData, true);
          $this->email->message($mesg);
          $this->email->send();
        }
      }
      $date = new DateTime();
      $timezoneOffset = $date->format("O");
      $this->db->insert("logs", [
        "log_id" => null,
        "log_name" => "Cron Job",
        "log_email" => $config["appSupportEmail"],
        "log_source" => "Cron",
        "log_type" => "ExpiryNotification",
        "log_description" => count($data) . " app accounts expiry notifications sent",
        "log_user_id" => "XXX",
        "log_time" => $date->format("D M d Y H:i:s") . " GMT" . $timezoneOffset,
        "log_ip" => $_SERVER["SERVER_ADDR"],
      ]);
      $this->auth->response(["response" => "Success!"], [], 200);
    } catch (Exception $e) {
      $this->throwException($e);
    }
  }
  public function deleteAccountsBatch()
  {
    try {
      $batchSize = 10;
      $apps = $this->home_model->getInActiveAppAccounts(365);
      $config = $this->home_model->getGlobalConfig();
      $date = new DateTime();
      $timezoneOffset = $date->format("O");
      $appName = $config["appName"];
      $email = $config["appSupportEmail"];

      for ($i = 0; $i < count($apps); $i += $batchSize) {
        $batch = array_slice($apps, $i, $batchSize);
        foreach ($batch as $key => $item) {
          // delete account data
          $this->db->delete("workbook", ["wb_appId" => $item["closeAppId"]]);
          $this->db->delete("datasourceQuery", ["dsq_appId" => $item["closeAppId"]]);
          $this->db->delete("income_expense_template", ["temp_appId" => $item["closeAppId"]]);
          $this->db->delete("income_expense", ["inc_exp_appId" => $item["closeAppId"]]);
          $this->db->delete("banks", ["bank_appId" => $item["closeAppId"]]);
          $this->db->delete("credit_card_transactions", ["cc_appId" => $item["closeAppId"]]);
          $this->db->delete("credit_cards", ["credit_card_appId" => $item["closeAppId"]]);
          $this->db->delete("income_expense_category", ["inc_exp_cat_appId" => $item["closeAppId"]]);
          $this->db->delete("users", ["user_appId" => $item["closeAppId"]]);
          $this->db->delete("apps", ["appId" => $item["closeAppId"]]);

          //delete razorpay subscription
          $rpSubId = $_ENV["APP_ENV"] === "production" ? "razorPayLiveSubscriptionId" : "razorPayTestSubscriptionId";
          $this->razorPayApi->subscription->fetch($rpSubId)->cancel([
            "cancel_at_cycle_end" => 0,
          ]);

          //send mail to owner on deletion
          $this->email->from($email, $appName . " Support Team");
          $this->email->to($item["email"]);
          $this->email->subject($appName . " account deleted!");
          $emailData["globalConfig"] = $config;
          $emailData["appName"] = $appName;
          $emailData["saluation"] = "Dear User,";
          $emailData["matter"] = [
            "<p></p>",
            "We are sorry to see you go.",
            "<p></p>",
            "As per your account closure request, and several remiders, your account is deleted and you are no more a subscriber of " .
            $appName .
            ".",
            "Thank you for using " . $appName . " and giving us an opportunity to serve you.",
            "<p></p>",
            "If you have any feedback or suggestions, please let us know.",
            "If you changed your mind, you can always create a new account.",
            "<p></p>",
            "Wish you all the best.",
          ];
          $emailData["signature"] = "Regards,";
          $emailData["signatureCompany"] = $appName;
          $mesg = $this->load->view("emailTemplate", $emailData, true);
          $this->email->message($mesg);
          $this->email->send();

          // add to logs
          $this->db->insert("logs", [
            "log_id" => null,
            "log_name" => "Cron Job",
            "log_email" => $config["appSupportEmail"],
            "log_source" => "Cron",
            "log_type" => "deleteAppData",
            "log_description" => "App Id: " . $item["closeAppId"] . " account data deleted",
            "log_user_id" => "XXX",
            "log_time" => $date->format("D M d Y H:i:s") . " GMT" . $timezoneOffset,
            "log_ip" => $_SERVER["SERVER_ADDR"],
          ]);
        }
      }
    } catch (Exception $e) {
      $this->throwException($e);
    }
  }
  public function dynamicDeleteAccountReminder(int $limitDays)
  {
    try {
      $batchSize = 10;
      $apps = $this->home_model->getInActiveAppAccounts($limitDays);
      $config = $this->home_model->getGlobalConfig();
      $date = new DateTime();
      $timezoneOffset = $date->format("O");
      $appName = $config["appName"];
      $email = $config["appSupportEmail"];
      for ($i = 0; $i < count($apps); $i += $batchSize) {
        $batch = array_slice($apps, $i, $batchSize);
        foreach ($batch as $key => $item) {
          //send reminder mail to owner on deletion
          $this->email->from($email, $appName . " Support Team");
          $this->email->to($item["email"]);
          $this->email->subject($appName . " account deleted!");
          $emailData["globalConfig"] = $config;
          $emailData["appName"] = $appName;
          $emailData["saluation"] = "Dear " . $item["name"] . ",";
          $emailData["matter"] = [
            '<p style="color:red"><b>IMPORTANT</b></p>',
            "This is to remind you that, according to our data retention policy, your account data with " .
            $appName .
            " is scheduled for deletion on " .
            date("jS M Y", strtotime($item["closeRequestedDate"])) .
            ".",
            "<p></p>",
            "<b>What does this mean for you?</b>",
            "As you requested for " .
            $appName .
            " account closure, all associated data including your user login data, settings, transaction, files and other records will be permanently deleted from our systems. This action is irreversible.",
            "<p></p>",
            "<b>What if you would like to keep your account active?</b>",
            "If you wish to continue enjoying our services, please withdraw / revoke your account closure request before " .
            date("jS M Y", strtotime($item["closeRequestedDate"])) .
            ".",
            "<p></p>",
            "<b>Why are we doing this?</b>",
            "We regularly review our data practices to comply with privacy regulations and to ensure that we only retain data that is necessary for providing the best possible service.",
            "<p></p>",
            "Thank you for your attention to this matter. If you have any questions or need further assistance, please don`t hesitate to reach out.",
            "<p></p>",
          ];
          $emailData["signature"] = "Regards,";
          $emailData["signatureCompany"] = $appName;
          $mesg = $this->load->view("emailTemplate", $emailData, true);
          $this->email->message($mesg);
          $this->email->send();

          // add to logs
          $this->db->insert("logs", [
            "log_id" => null,
            "log_name" => "Cron Job",
            "log_email" => $config["appSupportEmail"],
            "log_source" => "Cron",
            "log_type" => "deleteReminderAppData",
            "log_description" => "App Id: " . $item["closeAppId"] . " account data deletetion reminder sent.",
            "log_user_id" => "XXX",
            "log_time" => $date->format("D M d Y H:i:s") . " GMT" . $timezoneOffset,
            "log_ip" => $_SERVER["SERVER_ADDR"],
          ]);
        }
      }
    } catch (Exception $e) {
      $this->throwException($e);
    }
  }
  public function updateMonthlyAccountAitokens()
  {
    try {
      $config = $this->home_model->getGlobalConfig();
      $appName = $config["appName"];
      $rows = $this->home_model->getAccountAiTokenDetails();
      $this->email->from($config["appSupportEmail"], $appName . " Cron Jobs");
      $this->email->to($config["appSupportEmail"]);
      $this->email->subject($appName . " account users, AI token update!");
      $emailData["globalConfig"] = $config;
      $emailData["appName"] = $appName;
      $emailData["saluation"] = "Dear support,";
      $link = "<a href='https://platform.openai.com/settings/organization/billing/overview'>Open AI</a>";
      $intro =
        "<p>Here is the batch update information on AI tokens for account users. Please be informed to recharge in " . $link . " if required.</p>";
      $html = '
        <table border="1" cellpadding="4" cellspacing="0">
            <thead>
                <tr>
                    <th>Tenant IDs</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Available Tokens</th>
                    <th>Plan Token Limit</th>
                    <th>Recharge Required</th>
                    <th>Added On</th>
                </tr>
            </thead>
            <tbody>
        ';

      foreach ($rows["list"] as $row) {
        $html .=
          '<tr>
              <td>' .
          htmlspecialchars($row["tenantId"] ?? "--") .
          '</td>
              <td>' .
          htmlspecialchars($row["name"] ?? "--") .
          '</td>
              <td>' .
          htmlspecialchars($row["email"] ?? "--") .
          '</td>
              <td>' .
          htmlspecialchars($row["mobile"] ?? "--") .
          '</td>
              <td>' .
          htmlspecialchars($row["availableExisting"] ?? "--") .
          '</td>
              <td>' .
          htmlspecialchars($row["planAiTokenLimit"] ?? "--") .
          '</td>
              <td>' .
          htmlspecialchars($row["rechargeRequired"] ?? "--") .
          '</td>
              <td>' .
          htmlspecialchars($row["addedOn"] ?? "--") .
          '</td>
          </tr>';
      }
      $html .= "</tbody></table>";
      $rechargeText =
        "<p>Total required tokens to recharge - " .
        number_format($rows["totalRechargeTokensRequired"]) .
        " for " .
        $rows["totalAccountUsers"] .
        " account users.</p>";
      $emailData["matter"] = [$intro, $html, $rechargeText];
      $emailData["signature"] = "Regards,";
      $emailData["signatureCompany"] = $appName . " Cron";
      $mesg = $this->load->view("emailTemplate", $emailData, true);
      $this->email->message($mesg);
      $this->email->send();
    } catch (Exception $e) {
      $this->throwException($e);
    }
  }
  public function deleteAccountBatchTenDaysLeftReminder()
  {
    $this->dynamicDeleteAccountReminder(355);
  }
  public function deleteAccountBatchFiveDaysLeftReminder()
  {
    $this->dynamicDeleteAccountReminder(360);
  }
  public function deleteAccountBatchOneDayLeftReminder()
  {
    $this->dynamicDeleteAccountReminder(364);
  }

  /**
   * Please do not delete the below which is for email template to view on postman
   * usage:
   * $this->load->view('emailTemplate', $emailData);
   * to view in postman
   */
  function test()
  {
    // $config = $this->home_model->getGlobalConfig();
    // $appName = $config['appName'];

    // $emailData['globalConfig'] = $config;
    // $emailData['appName'] = $appName;
    // $emailData['saluation'] = 'Dear Admin,';
    // $emailData['matter'] = [
    //     '<b>What does this mean for you?</b>',
    // ];
    // $emailData['signature'] = 'Regards,';
    // $emailData['signatureCompany'] = $appName;
    // $this->load->view('emailTemplate', $emailData);

    try {
      $this->db->get("alala");
    } catch (Exception $e) {
      $this->throwException($e);
    }
  }
}
