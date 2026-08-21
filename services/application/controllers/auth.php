<?php
defined("BASEPATH") or exit("No direct script access allowed");

class auth extends CI_Controller
{
  public string $JWT_SECRET_KEY;
  public array $jwtStatic;
  public int $jwtExpiryTime;

  public function __construct()
  {
    parent::__construct();
    $this->JWT_SECRET_KEY = $_ENV["JWT_SECRET_KEY"];
    $this->jwtExpiryTime = 86400; // 900 - 15 minutes
    $this->jwtStatic = [
      "iss" => "https://ledgerely.com",
      "doc" => "https://ledgerely.com/documentations",
      "app" => "https://ledgerely.com/app",
      "contact" => "https://ledgerely.com/contact-us",
      "faq" => "https://ledgerely.com/faq",
      "pricing" => "https://ledgerely.com/pricing",
      "instagramId" => "ledgerelyapp",
      "instagramUrl" => "https://www.instagram.com/ledgerelyapp",
      "supportMail" => "support@ledgerely.com",
      "sub" => "ledgerely-jwt-token",
      "aud" => "ledgerely-app-client",
      "appName" => "Ledgerely",
    ];
  }

  private function getDbErrorMessage(int $code)
  {
    $messages = [
      // Connection
      1040 => "Database server is busy. Please try again later.",
      1044 => "Access to the database is denied.",
      1045 => "Invalid database credentials.",
      1049 => "Database not found.",

      // Table / Column
      1051 => "Requested table does not exist.",
      1054 => "Invalid field name specified.",
      1146 => "Requested table was not found.",

      // Duplicate
      1062 => "A record with the same information already exists.",

      // Foreign Key
      1216 => "Cannot save record because the related data does not exist.",
      1217 => "Cannot delete this record because it is referenced elsewhere.",
      1451 => "This record cannot be deleted because it is being used by another record.",
      1452 => "Related record not found.",

      // Null / Required
      1048 => "A required field is missing.",
      1364 => "A required value was not provided.",

      // Data Length
      1406 => "One or more values exceed the allowed length.",

      // Data Type
      1264 => "A numeric value is out of range.",
      1292 => "Invalid date or number format.",

      // Syntax
      1064 => "Database query contains an invalid syntax.",

      // Deadlock
      1213 => "The database is busy. Please try again.",

      // Lock Wait
      1205 => "The request timed out while waiting for the database.",

      // Transaction
      1196 => "Transaction failed.",

      // Generic
      2002 => "Unable to connect to the database server.",
      2006 => "Database connection was lost.",
    ];

    return isset($messages[$code]) ? $messages[$code] : "An unexpected database error occurred.";
  }

  public function response_code($code = null)
  {
    if ($code !== null) {
      switch ($code) {
        case 100:
          $text = "Continue";
          break;
        case 101:
          $text = "Switching Protocols";
          break;
        case 200:
          $text = "OK";
          break;
        case 201:
          $text = "Created";
          break;
        case 202:
          $text = "Accepted";
          break;
        case 203:
          $text = "Non-Authoritative Information";
          break;
        case 204:
          $text = "No Content";
          break;
        case 205:
          $text = "Reset Content";
          break;
        case 206:
          $text = "Partial Content";
          break;
        case 300:
          $text = "Multiple Choices";
          break;
        case 301:
          $text = "Moved Permanently";
          break;
        case 302:
          $text = "Moved Temporarily";
          break;
        case 303:
          $text = "See Other";
          break;
        case 304:
          $text = "Not Modified";
          break;
        case 305:
          $text = "Use Proxy";
          break;
        case 400:
          $text = "Bad Request";
          break;
        case 401:
          $text = "Unauthorized";
          break;
        case 402:
          $text = "Payment Required";
          break;
        case 403:
          $text = "Forbidden";
          break;
        case 404:
          $text = "Not Found";
          break;
        case 405:
          $text = "Method Not Allowed";
          break;
        case 406:
          $text = "Not Acceptable";
          break;
        case 407:
          $text = "Proxy Authentication Required";
          break;
        case 408:
          $text = "Request Time-out";
          break;
        case 409:
          $text = "Conflict";
          break;
        case 410:
          $text = "Gone";
          break;
        case 411:
          $text = "Length Required";
          break;
        case 412:
          $text = "Precondition Failed";
          break;
        case 413:
          $text = "Request Entity Too Large";
          break;
        case 414:
          $text = "Request-URI Too Large";
          break;
        case 415:
          $text = "Unsupported Media Type";
          break;
        case 500:
          $text = "Internal Server Error";
          break;
        case 501:
          $text = "Not Implemented";
          break;
        case 502:
          $text = "Bad Gateway";
          break;
        case 503:
          $text = "Service Unavailable";
          break;
        case 504:
          $text = "Gateway Time-out";
          break;
        case 505:
          $text = "HTTP Version not supported";
          break;
        default:
          $text = "Unknown http status code " . $code;
          break;
      }
      return ["code" => $code, "text" => $text];
    }
  }

  public function info(array $passed, int $statusCode)
  {
    $ci = &get_instance();
    $data["server"] = $_SERVER["SERVER_NAME"];
    $data["baseUrl"] = base_url();
    $data["requestUrl"] = current_url();
    $data["requestMethod"] = $_SERVER["REQUEST_METHOD"];
    $data["httpResponse"] = $this->response_code($statusCode);
    $data["CI_VERSION"] = CI_VERSION;
    $data["environment"] = ENVIRONMENT;
    $data["phpVersion"] = phpversion();
    $data["memory_usage"] = $ci->benchmark->memory_usage();
    $data["elapsedTime"] = $ci->benchmark->elapsed_time();
    foreach ($passed as $key => $val) {
      $data[$key] = $val;
    }
    return $data;
  }

  public function invalidTokenResponse()
  {
    $ci = &get_instance();
    $ci->output->set_content_type("application/json");
    $ci->output->set_status_header(401);
    $ci->output->_display(json_encode(["error" => "Expired / Illegal / Empty token."]));
    exit();
  }

  public function response(array $response, array $passed, int $statusCode, $errorCode = null)
  {
    $ci = &get_instance();
    $ci->output->set_content_type("application/json")->set_status_header($statusCode);
    $output = array_merge(
      $this->info($passed, $statusCode),
      $response,
      !is_null($errorCode) ? ["error" => ["errorCode" => $errorCode, "errorMessage" => $this->getDbErrorMessage($errorCode)]] : [],
    );
    $ci->output->set_output(json_encode($output));
  }

  public function tokenException(mixed $exc)
  {
    $ci = &get_instance();
    $ci->output->set_content_type("application/json");
    $ci->output->set_status_header(401);
    $ci->output->_display(json_encode($exc));
    exit();
  }

  public function renderFile(string $fileURL)
  {
    $ci = &get_instance();
    if (!file_exists($fileURL)) {
      exit("File not found!");
    }
    $ci->load->helper("file");
    $ci->output
      ->set_header('Content-Disposition: inline; filename="' . basename($fileURL) . '"')
      ->set_content_type(get_mime_by_extension($fileURL))
      ->set_output(file_get_contents($fileURL));
  }

  public function renderPartial(string $fileURL)
  {
    $ci = &get_instance();
    if (!file_exists($fileURL)) {
      exit("File not found!");
    }
    $filesize = filesize($fileURL);
    $begin = 0;
    $end = $filesize - 1;

    header("Content-Range: bytes $begin-$end/$filesize");
    header("HTTP/1.1 206 Partial Content");
    header("Content-Length: " . $filesize);
    header("Content-Type: " . get_mime_by_extension(APPPATH . "upload/" . $fileURL));
    header("Accept-Ranges: bytes");
    readfile($fileURL);
  }

  public function refreshToken(string $user)
  {
    $token = md5($user);
    return $token;
  }

  public function getAccessToken(string $user, $return = false)
  {
    if (empty($user)) {
      $this->tokenException(["error" => "Request user is empty"]);
    }
    $issuedAt = time();
    $expire = $issuedAt + $this->jwtExpiryTime;
    $token = JWT::encode(
      array_merge($this->jwtStatic, [
        "iat" => $issuedAt,
        "exp" => $expire,
        "role" => !(bool) $user ? "ledgerian" : "admin",
        "user" => $user,
      ]),
      $this->JWT_SECRET_KEY,
    );
    if ($return) {
      return $token;
    } else {
      $this->response(["response" => $token], [], 200);
    }
  }

  public function getTokens()
  {
    $user = $this->input->post("username");
    $tokens = [
      "accessToken" => $this->getAccessToken($user, true),
      "refreshToken" => $this->refreshToken($user),
    ];
    $this->response(["response" => $tokens], [], 200);
  }

  public function validateToken()
  {
    $headers = $this->input->request_headers("Authorization");
    if (isset($headers["Authorization"])) {
      $token = $headers["Authorization"];
    } elseif (isset($_SERVER["REDIRECT_HTTP_AUTHORIZATION"])) {
      $token = $_SERVER["REDIRECT_HTTP_AUTHORIZATION"] ?? false;
    } else {
      $token = false;
    }

    if (empty($token)) {
      $this->invalidTokenResponse();
    }
    if ($token) {
      try {
        if (!preg_match('/^Bearer\s+(.*)$/i', $token, $matches)) {
          $this->tokenException([
            "error" => "Invalid Authorization header format. Expected: Bearer token",
          ]);
        }
        $token = str_replace("Bearer ", "", $token);
        $decoded = JWT::decode($token, $this->JWT_SECRET_KEY, ["HS256"]);
        if (isset($decoded->exp) && $decoded->exp < time()) {
          $this->tokenException(["error" => "Token expired"]);
        }
        $this->response(["response" => $decoded], [], 200);
      } catch (Exception $e) {
        $this->tokenException(["error" => $e->getMessage()]);
      }
    }
  }
}
