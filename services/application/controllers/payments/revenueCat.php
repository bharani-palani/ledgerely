<?php if (!defined("BASEPATH")) {
  exit("No direct script access allowed");
}
/**
 * Important:
 * Check Azure devops for payload details.
 * https://dev.azure.com/tpbharani/ledgerely.com/_queries/edit/136/?queryId=2d5210d0-b261-4f18-a27e-2e88b06e2695
 */
class Revenuecat extends CI_Controller
{
  private string $webhook_authorization;
  public function __construct()
  {
    parent::__construct();
    $this->load->model("home_model", "homeModel");
    $this->load->library("../controllers/auth");
    $this->webhook_authorization = $_ENV["REVENUECAT_WEBHOOK_SECRET"];
    $this->load->library("email");
    $this->email->initialize([
      "protocol" => $this->config->item("protocol"),
      "smtp_host" => $this->config->item("smtp_host"),
      "smtp_user" => $this->config->item("smtp_user"),
      "smtp_pass" => $this->config->item("smtp_pass"),
      "mailtype" => $this->config->item("mailtype"),
      "charset" => $this->config->item("charset"),
    ]);
  }

  private function millisecondsToDate(int $milliseconds)
  {
    if (!$milliseconds) {
      return "";
    }
    return date("Y-m-d H:i:s", (int) ($milliseconds / 1000));
  }

  public function webhook()
  {
    try {
      // Only POST
      if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        return $this->auth->response(
          [
            "status" => false,
            "message" => "Method not allowed",
          ],
          [],
          405,
        );
      }

      // Get raw body BEFORE JSON parsing
      $rawBody = file_get_contents("php://input");

      if (!$rawBody) {
        return $this->auth->response(
          [
            "status" => false,
            "message" => "Empty request body",
          ],
          [],
          400,
        );
      }

      // Verify RevenueCat webhook
      if (!$this->verifyWebhookSignature($rawBody)) {
        return $this->auth->response(
          [
            "status" => false,
            "message" => "Invalid webhook signature",
          ],
          [],
          401,
        );
      }

      // Decode JSON
      $payload = json_decode($rawBody, true);

      if (!is_array($payload) || !isset($payload["event"])) {
        return $this->auth->response(
          [
            "status" => false,
            "message" => "Invalid webhook payload",
          ],
          [],
          400,
        );
      }

      $event = $payload["event"];
      $eventId = isset($event["id"]) ? $event["id"] : null;
      $eventType = isset($event["type"]) ? $event["type"] : null;
      $appUserId = isset($event["app_user_id"]) ? $event["app_user_id"] : null;

      if (!$eventId || !$eventType || !$appUserId) {
        return $this->auth->response(
          [
            "status" => false,
            "message" => "Missing required event fields",
          ],
          [],
          400,
        );
      }
      /*
       * Process RevenueCat event
       */
      switch ($eventType) {
        case "INITIAL_PURCHASE":
          $this->handleInitialPurchase($event, $rawBody);
          break;
        case "RENEWAL":
          $this->handleRenewal($event, $rawBody);
          break;
        case "NON_RENEWING_PURCHASE":
          $this->handleLifeTime($event, $rawBody);
          break;
        case "PRODUCT_CHANGE":
          $this->handleProductChange($event, $rawBody);
          break;
        case "CANCELLATION":
          $this->handleCancellation($event, $rawBody);
          break;
        case "UNCANCELLATION":
          $this->handleUncancellation($event, $rawBody);
          break;
        case "EXPIRATION":
          $this->handleExpiration($event, $rawBody);
          break;
        case "BILLING_ISSUE":
          $this->handleBillingIssue($event, $rawBody);
          break;
        case "TRANSFER":
          $this->handleTransfer($event, $rawBody);
          break;
        case "TEST":
          log_message("info", "RevenueCat TEST webhook received");
          break;
        default:
          log_message("info", "Unhandled RevenueCat event: " . $eventType);
          break;
      }
      return $this->auth->response(["status" => "success"], ["message" => "Revenue cat web hook successfully executed"], 200);
    } catch (Exception $e) {
      return $this->auth->response(["error" => $e], [], 500);
    }
  }

  private function verifyWebhookSignature($rawBody)
  {
    $authorization = isset($_SERVER["HTTP_AUTHORIZATION"])
      ? $_SERVER["HTTP_AUTHORIZATION"]
      : (isset($_SERVER["REDIRECT_HTTP_AUTHORIZATION"])
        ? $_SERVER["REDIRECT_HTTP_AUTHORIZATION"]
        : "");

    if (!$authorization && function_exists("getallheaders")) {
      foreach (getallheaders() as $name => $value) {
        if (strcasecmp($name, "Authorization") === 0) {
          $authorization = $value;
          break;
        }
      }
    }

    return $authorization !== "" && hash_equals($this->webhook_authorization, trim($authorization));
  }

  public function orderInsert(array $event, string $body)
  {
    /** *
     * both IOS/Android
     */
    try {
      // check duplicates
      $existing = $this->db->where("orderId", $event["id"])->get("orders")->row();
      if ($existing) {
        return $this->auth->response(
          [
            "status" => true,
            "message" => "Event already processed",
          ],
          [],
          200,
        );
      }
      // Store webhook event first
      $tenantId = $event["app_user_id"] ?? "";
      $appUser = $this->db->from("apps")->where("tenant_id", $tenantId)->get()->row();
      $infDate = new DateTime(date("Y-m-d H:i:s"));
      $infDate->modify("9999-" . $infDate->format("m-d H:i:s"));
      $order = [
        "orderId" => $event["id"],
        "provider" => "REVENUECAT",
        "paymentId" => isset($event["transaction_id"]) ? $event["transaction_id"] : "",
        "customerId" => isset($event["app_user_id"]) ? $event["app_user_id"] : "",
        "subscriptionId" => isset($event["original_transaction_id"]) ? $event["original_transaction_id"] : "",
        "invoiceId" => isset($event["invoice_id"]) ? $event["invoice_id"] : "",
        "planId" => isset($event["product_id"]) ? $event["product_id"] : "",
        "commissionFee" => 0,
        "discountAmount" => 0,
        "taxAmount" => 0,
        "total" => isset($event["price_in_purchased_currency"]) ? $event["price_in_purchased_currency"] : "",
        "currency" => isset($event["currency"]) ? $event["currency"] : "",
        "customerName" => $appUser->name,
        "customerEmail" => $appUser->email,
        "cycleStart" => $this->millisecondsToDate($event["purchased_at_ms"]),
        "cycleEnd" =>
          $event["type"] === "NON_RENEWING_PURCHASE" ? $infDate->format("Y-m-d H:i:s") : $this->millisecondsToDate($event["expiration_at_ms"]),
        "paymentStatus" => $event["type"],
        "rest" => $body,
        "paidAt" => $this->millisecondsToDate($event["purchased_at_ms"]),
      ];
      $this->db->insert("orders", $order);
    } catch (Exception $e) {
      $this->auth->response(["status" => "failure", "exception" => $e], ["message" => "Order insert failed"], 500);
    }
  }
  public function updateAppData(array $event)
  {
    try {
      $tenantId = $event["app_user_id"] ?? "";
      $productId = $event["product_id"] ?? "";
      $productParts = explode("_", $productId);
      $size = $productParts[1] ?? "";
      $tenure = strtolower(str_replace("ly", "", $productParts[2] ?? ""));

      if (!$tenantId || !$size || !in_array($tenure, ["month", "year", "lifetime"], true)) {
        throw new InvalidArgumentException("Invalid RevenueCat product data");
      }

      $expiryDate = new DateTime();
      if ($tenure === "month") {
        $expiryDate->modify("+1 month");
      } elseif ($tenure === "year") {
        $expiryDate->modify("+1 year");
      } elseif ($tenure === "lifetime") {
        $expiryDate->setDate(9999, 12, 31);
        $expiryDate->setTime(23, 59, 59);
      }

      $query = $this->db->get_where("plans", ["planCodeExpanded" => $size]);
      $plan = $query->row();
      if (!$plan) {
        throw new RuntimeException("RevenueCat plan not found: " . $size);
      }

      $update = [
        "expiryDateTime" => $expiryDate->format("Y-m-d H:i:s"),
        "isActive" => 1,
        "appsPlanId" => $plan->planId,
      ];
      $this->db->where("tenant_id", $tenantId);
      $this->db->update("apps", $update);
    } catch (Exception $e) {
      $this->auth->response(["status" => "failure", "exception" => $e], ["message" => "Update plan and expiry date set failed"], 500);
    }
  }

  private function updateAiTokens(array $event)
  {
    try {
      $tenantId = $event["app_user_id"];
      [$org, $size, $tenure] = explode("_", $event["product_id"]);
      $query = $this->db->get_where("plans", ["planCodeExpanded" => $size]);
      $plan = $query->row();
      $update = [
        "aiTokenSize" => $plan->planAiTokenLimit,
      ];
      $this->db->where("tenant_id", $tenantId);
      $this->db->update("apps", $update);
    } catch (Exception $e) {
      $this->auth->response(["status" => "failure", "exception" => $e], ["message" => "AI token update failed"], 500);
    }
  }

  public function subscriptionFailedLog(array $event)
  {
    $object = (object) [
      "name" => "Webhook",
      "email" => "revenueCatWebhook@ledgerely.com",
      "source" => "BE",
      "type" => "subscriptionTransactionFailed",
      "description" => $event,
      "userId" => $event["app_user_id"] ?? "notFound",
      "time" => date("Y-m-d\TH:i:s", time()),
      "ip" => $_SERVER["REMOTE_ADDR"],
    ];
    $this->saveLog($object);
  }
  private function handleInitialPurchase(array $event, string $body)
  {
    /**
     * use case:
     * No welcome mail required
     * If subscribed for month set expiry time to 1 month from now
     * If subscribed for year set expiry time to 1 year from now
     * If life time purchase, set expiry year to 9999 instead of 2026, 2027 etc..
     * update new plan based AI token value for selected plan
     * Insert order table
     * Update app table on expiry and plan selected
     * update app on Ai tokens
     */
    try {
      $this->orderInsert($event, $body);
      $this->updateAppData($event);
      $this->updateAiTokens($event);
    } catch (Exception $e) {
      $this->subscriptionFailedLog($event);
      $this->auth->response(["status" => "failure", "exception" => $e], ["message" => "Subscription - Initial process failed"], 500);
    }
  }

  private function handleLifeTime(array $event, string $body)
  {
    /**
     * use case:
     * Insert order table
     * set expiry time to year 9999
     * set one time ai credits - as declared in plan table
     */
    try {
      $this->orderInsert($event, $body);
      $this->updateAppData($event);
      $this->updateAiTokens($event);
    } catch (Exception $e) {
      $this->subscriptionFailedLog($event);
      $this->auth->response(["status" => "failure", "exception" => $e], ["message" => "Life time purchase failed"], 500);
    }
  }
  private function handleRenewal(array $event, string $body)
  {
    /**
     * Insert order table
     * handle app expiry alone
     * Tokens gets updated every month by cron
     */
    try {
      $this->orderInsert($event, $body);
      $this->updateAppData($event);
    } catch (Exception $e) {
      $this->subscriptionFailedLog($event);
      $this->auth->response(["status" => "failure", "exception" => $e], ["message" => "Life time purchase failed"], 500);
    }
  }

  private function handleProductChange(array $event, string $body)
  {
    try {
      $this->orderInsert($event, $body);
      $this->updateAppData($event);
      $this->updateAiTokens($event);
    } catch (Exception $e) {
      $this->subscriptionFailedLog($event);
      $this->auth->response(["status" => "failure", "exception" => $e], ["message" => "Subscription - Initial process failed"], 500);
    }
  }

  private function handleCancellation(array $event, string $body)
  {
    /**
     * Trigger mail to user stating on the subscribtion was cancelled
     * This event invokes only when subscription period actually finishes, not the customer unsubscribe from device!
     */
    $config = $this->homeModel->getGlobalConfig();
    $appName = $config["appName"];
    $email = $config["appSupportEmail"];
    $tenantId = $event["app_user_id"] ?? "";
    $appUser = $this->db->from("apps")->where("tenant_id", $tenantId)->get()->row();

    $this->email->from($email, $appName . " Support Team");
    $this->email->to($appUser->email);
    $this->email->subject("Your " . $appName . " Subscription Has Been Cancelled");
    $emailData["globalConfig"] = $config;
    $emailData["appName"] = $appName;
    $emailData["saluation"] = "Hello " . $appUser->name . ",";
    $emailData["matter"] = [
      "<p>We`re writing to confirm that your " . $appUser->name . " subscription has ended.</p>",
      "<p>You can continue using your current " .
      $appUser->name .
      " paid features until your existing subscription period ends on " .
      $appUser->expiryDateTime .
      ". 
      After this date, access to paid features will be discontinued unless you have an active subscription.</p>",
      "<p>If your account is sctive, you would like to continue using " .
      $appUser->name .
      " without interruption. Please subscribe to a plan that best suits your requirements if you are inactive.</p>",
      '<p><a href="' . $_ENV["DOMAIN_URL"] . '/billing" />View Subscription Plans</p>',
      "<p>If you have already subscribed to another valid " .
      $appUser->name .
      " plan, please disregard this email. Your active subscription will continue to provide access according to its applicable plan and validity period.</p>",
      "<p>We truly appreciate having you as a " .
      $appUser->name .
      " customer and look forward to supporting you for the long term. Thank you for choosing " .
      $appUser->name .
      ".</p>",
    ];
    $emailData["signature"] = "Regards,";
    $emailData["signatureCompany"] = $appName . " Team";
    $mesg = $this->load->view("emailTemplate", $emailData, true);
    $this->email->message($mesg);
    $this->email->send();
  }

  private function handleUncancellation(array $event, string $body)
  {
    /**
     * No action required.
     * User revokes the cancellation.
     * He/She can access application if expiry is valid.
     * Else they need to subscribe new plan
     */
  }

  private function handleExpiration(array $event, string $body)
  {
    /**
     * No action required.
     * Our expiry time grants user to access until then.
     * 
    */
  }

  private function handleBillingIssue(array $event, string $body)
  {
    /**
     * Trigger mail to user stating on the payment type failure
     * Ask them to update mayment method with proper bank account or credit card.
     * Some reasons are,
     * Expired card, insufficient funds, bank fraud blocks or card declined.
     * 3D secure verification from bank
     */
    $config = $this->homeModel->getGlobalConfig();
    $appName = $config["appName"];
    $email = $config["appSupportEmail"];
    $tenantId = $event["app_user_id"] ?? "";
    $appUser = $this->db->from("apps")->where("tenant_id", $tenantId)->get()->row();

    $this->email->from($email, $appName . " Support Team");
    $this->email->to($appUser->email);
    $this->email->subject("Action Required: Update Your Payment Method to Keep " . $appName . " Active");
    $emailData["globalConfig"] = $config;
    $emailData["appName"] = $appName;
    $emailData["saluation"] = "Hello " . $appUser->name . ",";
    $emailData["matter"] = [
      "<p>We were unable to process your latest Ledgerely subscription payment.</p>",
      "<p>Your Ledgerely subscription may be affected if the payment issue is not resolved. Please update your payment method as soon as possible to avoid interruption to your account.</p>",
      "<p>Common reasons for payment failure include:</p>",
      "<ul>
        <li>Expired or blocked card</li>
        <li>Insufficient funds or credit limit</li>
        <li>Bank or card issuer declining the transaction</li>
        <li>Fraud/security restrictions placed by your bank</li>
        <li>Required 3D Secure verification not completed</li>
        <li>Incorrect or outdated payment information</li>
      </ul>",
      "<p><strong>What you need to do?</strong></p>",
      "<p>Please update your payment method with a valid bank account or credit/debit card and complete any verification requested by your bank.</p>",
      "<p>If the payment has already been completed, you can ignore this email.</p>",
      "<p>If the payment issue remains unresolved, access to paid Ledgerely features may be suspended until the subscription payment is successfully completed.</p>",
    ];
    $emailData["signature"] = "Regards,";
    $emailData["signatureCompany"] = $appName . " Team";
    $mesg = $this->load->view("emailTemplate", $emailData, true);
    $this->email->message($mesg);
    $this->email->send();
  }

  private function handleTransfer(array $event, string $body)
  {
    /**
     * No action required.
     * Only user transfers his usage from old device to new device.
     */
  }
  public function saveLog(object $post)
  {
    $this->db->insert("logs", [
      "log_id" => null,
      "log_name" => $post->name,
      "log_email" => $post->email,
      "log_source" => $post->source,
      "log_type" => $post->type,
      "log_description" => $post->description,
      "log_user_id" => $post->userId,
      "log_time" => $post->time,
      "log_ip" => $post->ip,
    ]);
    return $this->db->affected_rows() > 0;
  }
}
