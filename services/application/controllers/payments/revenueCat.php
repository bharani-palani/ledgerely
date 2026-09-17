<?php if (!defined("BASEPATH")) {
  exit("No direct script access allowed");
}

class Revenuecat extends CI_Controller
{
  private $webhook_secret = "YOUR_REVENUECAT_HMAC_SECRET";

  public function __construct()
  {
    parent::__construct();
    $this->load->library("../controllers/auth");
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
        return $this->respond(405, [
          "status" => false,
          "message" => "Method not allowed",
        ]);
      }

      // Get raw body BEFORE JSON parsing
      $rawBody = file_get_contents("php://input");

      if (!$rawBody) {
        return $this->respond(400, [
          "status" => false,
          "message" => "Empty request body",
        ]);
      }

      // Verify RevenueCat webhook
      // if (!$this->verifyWebhookSignature($rawBody)) {
      //   return $this->respond(401, [
      //     "status" => false,
      //     "message" => "Invalid webhook signature",
      //   ]);
      // }

      // Decode JSON
      $payload = json_decode($rawBody, true);

      if (!is_array($payload) || !isset($payload["event"])) {
        return $this->respond(400, [
          "status" => false,
          "message" => "Invalid webhook payload",
        ]);
      }

      $event = $payload["event"];
      $eventId = isset($event["id"]) ? $event["id"] : null;
      $eventType = isset($event["type"]) ? $event["type"] : null;
      $appUserId = isset($event["app_user_id"]) ? $event["app_user_id"] : null;

      if (!$eventId || !$eventType || !$appUserId) {
        return $this->respond(400, [
          "status" => false,
          "message" => "Missing required event fields",
        ]);
      }

      /*
       * IMPORTANT:
       * RevenueCat can deliver the same event more than once.
       *
       * Check whether this event was already processed.
       */
      $existing = $this->db->where("orderId", $eventId)->get("orders")->row();

      if ($existing) {
        return $this->respond(200, [
          "status" => true,
          "message" => "Event already processed",
        ]);
      }

      // Store webhook event first
      $order = [
        "orderId" => $eventId,
        "provider" => "REVENUECAT", // both IOS/Android
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
        "customerName" => "",
        "customerEmail" => isset($event["subscriber_attributes"]['$email']["value"]) ? $event["subscriber_attributes"]['$email']["value"] : "",
        "cycleStart" => $this->millisecondsToDate($event["purchased_at_ms"]),
        "cycleEnd" => $this->millisecondsToDate($event["expiration_at_ms"]),
        "paymentStatus" => $eventType,
        "rest" => $rawBody,
        "paidAt" => $this->millisecondsToDate($event["purchased_at_ms"]),
      ];

      $this->db->insert("orders", $order);
      /*
       * Process RevenueCat event
       */
      switch ($eventType) {
        case "INITIAL_PURCHASE":
          /**
           * No welcome mail required
           * If subscribed for month set expiry time to 1 month from now
           * If subscribed for year set expiry time to 1 year from now
           * If life time purchase, set expiry year to 9999 instead of 2026, 2027 etc..
           * update new plan based AI token value for selected plan
           */
          $this->handleInitialPurchase($event);
          break;

        case "RENEWAL":
          /**
           * update expiry time alone
           */
          $this->handleRenewal($event);
          break;

        case "PRODUCT_CHANGE":
          $this->handleProductChange($event);
          break;

        case "CANCELLATION":
          $this->handleCancellation($event);
          break;

        case "UNCANCELLATION":
          $this->handleUncancellation($event);
          break;

        case "EXPIRATION":
          $this->handleExpiration($event);
          break;

        case "BILLING_ISSUE":
          $this->handleBillingIssue($event);
          break;

        case "NON_RENEWING_PURCHASE":
          $this->handleNonRenewingPurchase($event);
          break;

        case "TRANSFER":
          $this->handleTransfer($event);
          break;

        case "TEST":
          log_message("info", "RevenueCat TEST webhook received");
          break;

        default:
          log_message("info", "Unhandled RevenueCat event: " . $eventType);
          break;
      }

      return $this->respond(200, [
        "status" => true,
      ]);
    } catch (Exception $e) {
      return $this->respond(500, [
        "error" => $e,
      ]);
    }
  }

  private function verifyWebhookSignature($rawBody)
  {
    $header = isset($_SERVER["HTTP_X_REVENUECAT_WEBHOOK_SIGNATURE"]) ? $_SERVER["HTTP_X_REVENUECAT_WEBHOOK_SIGNATURE"] : "";

    if (!$header) {
      return false;
    }

    $parts = [];

    foreach (explode(",", $header) as $part) {
      $pair = explode("=", $part, 2);

      if (count($pair) === 2) {
        $parts[$pair[0]] = $pair[1];
      }
    }

    if (!isset($parts["t"]) || !isset($parts["v1"])) {
      return false;
    }

    $timestamp = $parts["t"];
    $signature = $parts["v1"];

    // Prevent replay attacks
    if (abs(time() - (int) $timestamp) > 300) {
      return false;
    }

    $signedPayload = $timestamp . "." . $rawBody;

    $expectedSignature = hash_hmac("sha256", $signedPayload, $this->webhook_secret);

    return hash_equals($expectedSignature, $signature);
  }

  private function handleInitialPurchase(array $event)
  {
    $this->db->trans_start();
    $this->db->trans_complete();
    if ($this->db->trans_status()) {
      // $product_id = $event['product_id']; // Ex: com.ledgerely.medium.monthly
      // $planType =
    } else {
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
      $this->auth->response(["response" => false], ["message" => "Subscription insert failed"], 500);
    }
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

  private function handleRenewal($event)
  {
    // TODO
  }

  private function handleProductChange($event)
  {
    // TODO
  }

  private function handleCancellation($event)
  {
    // TODO
  }

  private function handleUncancellation($event)
  {
    // TODO
  }

  private function handleExpiration($event)
  {
    // TODO
  }

  private function handleBillingIssue($event)
  {
    // TODO
  }

  private function handleNonRenewingPurchase($event)
  {
    // TODO
  }

  private function handleTransfer($event)
  {
    // TODO
  }

  private function respond(int $statusCode, array $data)
  {
    $this->output->set_status_header($statusCode)->set_content_type("application/json")->set_output(json_encode($data));
  }
}
