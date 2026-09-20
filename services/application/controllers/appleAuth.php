<?php
defined("BASEPATH") or exit("No direct script access allowed");

use Firebase\JWT\JWK as AppleJWK;
use Firebase\JWT\JWT as AppleJWT;

class appleAuth extends CI_Controller
{
  public string $APPLE_BUNDLE_ID;
  public string $APPLE_SERVICE_ID;
  public string $APPLE_TEAM_ID;
  public string $APPLE_KEY_ID;
  public string $APPLE_PRIVATE_KEY_PATH;
  public array $APPLE_REDIRECT_URLS;

  public function __construct()
  {
    parent::__construct();
    $this->load->library("../controllers/auth");
    $this->load->model("home_model");
    // Move APPLE_BUNDLE_ID, APPLE_SERVICE_ID, APPLE_TEAM_ID, APPLE_KEY_ID,
    // APPLE_PRIVATE_KEY_PATH, and APPLE_*_CALLBACK_URL to the environment file.
    $this->APPLE_BUNDLE_ID = $_ENV["APPLE_BUNDLE_ID"];
    $this->APPLE_SERVICE_ID = $_ENV["APPLE_SERVICE_ID"];
    $this->APPLE_TEAM_ID = $_ENV["APPLE_TEAM_ID"];
    $this->APPLE_KEY_ID = $_ENV["APPLE_KEY_ID"];
    $this->APPLE_PRIVATE_KEY_PATH = $_ENV["APPLE_PRIVATE_KEY_PATH"];
  }

  public function appleCallback()
  {
    $payload = json_decode(file_get_contents("php://input"), true) ?: $this->input->post();
    $idToken = $payload["idToken"] ?? ($payload["id_token"] ?? null);

    try {
      if (!$idToken && !empty($payload["code"])) {
        $idToken = $this->exchangeAppleAuthorizationCode($payload["code"]);
      }
      if (empty($idToken)) {
        throw new RuntimeException("Apple identity token is required.");
      }

      $claims = $this->validateAppleIdentityToken($idToken, $payload["nonce"] ?? null);
      $email = $claims->email ?? ($payload["email"] ?? null);
      if (empty($email)) {
        throw new RuntimeException("Apple account email was not provided.");
      }

      $user = $this->home_model->validateEmailProvider([
        "username" => $payload["username"] ?? $email,
        "email" => $email,
      ]);
      if (!$user) {
        $this->auth->response(["response" => false], [], 401);
        return;
      }
      $this->auth->response(
        [
          "response" => $user,
          "token" => $this->auth->getAccessToken($email, true),
        ],
        [],
        200,
      );
    } catch (Throwable $error) {
      log_message("error", "Apple Sign In validation failed: " . $error->getMessage());
      $this->auth->response(["response" => false, "message" => "Apple sign in could not be validated."], [], 401);
    }
  }

  private function validateAppleIdentityToken(string $idToken, ?string $nonce = null): object
  {
    $httpClient = new GuzzleHttp\Client(["timeout" => 10]);
    $jwksResponse = $httpClient->get("https://appleid.apple.com/auth/keys");
    $jwks = json_decode($jwksResponse->getBody()->getContents(), true);
    $claims = AppleJWT::decode($idToken, AppleJWK::parseKeySet($jwks));
    $audiences = is_array($claims->aud ?? null) ? $claims->aud : [$claims->aud ?? null];

    if (($claims->iss ?? null) !== "https://appleid.apple.com") {
      throw new RuntimeException("Invalid Apple token issuer.");
    }
    if (!in_array($this->APPLE_BUNDLE_ID, $audiences, true) && !in_array($this->APPLE_SERVICE_ID, $audiences, true)) {
      throw new RuntimeException("Invalid Apple token audience.");
    }
    if (isset($claims->exp) && $claims->exp < time()) {
      throw new RuntimeException("Apple identity token has expired.");
    }
    if ($nonce && isset($claims->nonce) && !hash_equals($claims->nonce, $nonce) && !hash_equals($claims->nonce, hash("sha256", $nonce))) {
      throw new RuntimeException("Invalid Apple token nonce.");
    }

    return $claims;
  }

  private function exchangeAppleAuthorizationCode(string $authorizationCode): string
  {
    $privateKey = file_get_contents($this->APPLE_PRIVATE_KEY_PATH);
    if ($privateKey === false) {
      throw new RuntimeException("Apple private key could not be loaded.");
    }

    $clientSecret = AppleJWT::encode(
      [
        "iss" => $this->APPLE_TEAM_ID,
        "iat" => time(),
        "exp" => time() + 15777000,
        "aud" => "https://appleid.apple.com",
        "sub" => $this->APPLE_SERVICE_ID,
      ],
      $privateKey,
      "ES256",
      $this->APPLE_KEY_ID,
    );
    $httpClient = new GuzzleHttp\Client(["timeout" => 10]);
    $response = $httpClient->post("https://appleid.apple.com/auth/token", [
      "form_params" => [
        "client_id" => $this->APPLE_SERVICE_ID,
        "client_secret" => $clientSecret,
        "code" => $authorizationCode,
        "grant_type" => "authorization_code",
      ],
    ]);
    $tokenResponse = json_decode($response->getBody()->getContents(), true);

    if (empty($tokenResponse["id_token"])) {
      throw new RuntimeException("Apple authorization code exchange failed.");
    }

    return $tokenResponse["id_token"];
  }
}
