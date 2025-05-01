<?php
defined('BASEPATH') or exit('No direct script access allowed');
class auth extends CI_Controller
{
    public $JWT_SECRET_KEY;
    public function __construct()
    {
        parent::__construct();
        $this->JWT_SECRET_KEY = $_ENV['JWT_SECRET_KEY'];
    }
    public function response_code($code = null)
    {
        if ($code !== null) {
            switch ($code) {
                case 100:
                    $text = 'Continue';
                    break;
                case 101:
                    $text = 'Switching Protocols';
                    break;
                case 200:
                    $text = 'OK';
                    break;
                case 201:
                    $text = 'Created';
                    break;
                case 202:
                    $text = 'Accepted';
                    break;
                case 203:
                    $text = 'Non-Authoritative Information';
                    break;
                case 204:
                    $text = 'No Content';
                    break;
                case 205:
                    $text = 'Reset Content';
                    break;
                case 206:
                    $text = 'Partial Content';
                    break;
                case 300:
                    $text = 'Multiple Choices';
                    break;
                case 301:
                    $text = 'Moved Permanently';
                    break;
                case 302:
                    $text = 'Moved Temporarily';
                    break;
                case 303:
                    $text = 'See Other';
                    break;
                case 304:
                    $text = 'Not Modified';
                    break;
                case 305:
                    $text = 'Use Proxy';
                    break;
                case 400:
                    $text = 'Bad Request';
                    break;
                case 401:
                    $text = 'Unauthorized';
                    break;
                case 402:
                    $text = 'Payment Required';
                    break;
                case 403:
                    $text = 'Forbidden';
                    break;
                case 404:
                    $text = 'Not Found';
                    break;
                case 405:
                    $text = 'Method Not Allowed';
                    break;
                case 406:
                    $text = 'Not Acceptable';
                    break;
                case 407:
                    $text = 'Proxy Authentication Required';
                    break;
                case 408:
                    $text = 'Request Time-out';
                    break;
                case 409:
                    $text = 'Conflict';
                    break;
                case 410:
                    $text = 'Gone';
                    break;
                case 411:
                    $text = 'Length Required';
                    break;
                case 412:
                    $text = 'Precondition Failed';
                    break;
                case 413:
                    $text = 'Request Entity Too Large';
                    break;
                case 414:
                    $text = 'Request-URI Too Large';
                    break;
                case 415:
                    $text = 'Unsupported Media Type';
                    break;
                case 500:
                    $text = 'Internal Server Error';
                    break;
                case 501:
                    $text = 'Not Implemented';
                    break;
                case 502:
                    $text = 'Bad Gateway';
                    break;
                case 503:
                    $text = 'Service Unavailable';
                    break;
                case 504:
                    $text = 'Gateway Time-out';
                    break;
                case 505:
                    $text = 'HTTP Version not supported';
                    break;
                default:
                    $text = 'Unknown http status code ' . $code;
                    break;
            }
            return ['code' => $code, 'text' => $text];
        }
    }
    public function info($passed, $statusCode)
    {
        $ci = &get_instance();
        $data['server'] = $_SERVER['SERVER_NAME'];
        $data['baseUrl'] = base_url();
        $data['requestUrl'] = current_url();
        $data['requestMethod'] = $_SERVER['REQUEST_METHOD'];
        $data['httpResponseCodes'] = $this->response_code($statusCode);
        $data['codeigniter_version'] = CI_VERSION;
        $data['environment'] = ENVIRONMENT;
        $data['phpVersion'] = phpversion();
        $data['memory_usage'] = $ci->benchmark->memory_usage();
        $data['elapsedTime'] = $ci->benchmark->elapsed_time();
        foreach ($passed as $key => $val) {
            $data[$key] = $val;
        }
        return $data;
    }
    public function invalidTokenResponse()
    {
        $ci = &get_instance();
        $ci->output->set_content_type('application/json');
        $ci->output->set_status_header(401);
        $ci->output->_display(json_encode(['error' => 'Expired / Illegal / Empty token.']));
        exit();
    }
    public function response($response, $passed, $statusCode)
    {
        $ci = &get_instance();
        $ci
            ->output
            ->set_content_type('application/json')
            ->set_status_header($statusCode);
        $output = array_merge($this->info($passed, $statusCode), $response);
        $ci->output->set_output(json_encode($output));
    }
    public function tokenException($exc)
    {
        $ci = &get_instance();
        $ci->output->set_content_type('application/json');
        $ci->output->set_status_header(401);
        $ci->output->_display(json_encode($exc));
        exit();
    }
    public function renderFile($fileURL)
    {
        $ci = &get_instance();
        if (!file_exists($fileURL)) {
            exit('File not found!');
        }
        $ci->load->helper('file');
        $ci->output
            ->set_header('Content-Disposition: inline; filename="' . basename($fileURL) . '"')
            ->set_content_type(get_mime_by_extension($fileURL))
            ->set_output(file_get_contents($fileURL));
    }
    public function renderPartial($fileURL)
    {
        $ci = &get_instance();
        if (!file_exists($fileURL)) {
            exit('File not found!');
        }
        $filesize = filesize($fileURL);
        $begin  = 0;
        $end  = $filesize - 1;

        header("Content-Range: bytes $begin-$end/$filesize");
        header('HTTP/1.1 206 Partial Content');
        header('Content-Length: ' . $filesize);
        header('Content-Type: ' . get_mime_by_extension(APPPATH . "upload/" . $fileURL));
        header('Accept-Ranges: bytes');
        readfile($fileURL);
    }
    public function getToken($return = false)
    {
        $user = $this->input->post('username');
        if (empty($user)) {
            $this->tokenException(['error' => 'Request payload is empty']);
        }
        $issuedAt = time();
        $expire = $issuedAt + 3600;
        $token = JWT::encode(
            [
                "iss" => "https://ledgerely.com",
                "doc" => "https://ledgerely.com/documentations",
                "app" => "https://ledgerely.com/app",
                "contact" => "https://ledgerely.com/contact-us",
                "faq" => 'https://ledgerely.com/faq',
                "pricing" => 'https://ledgerely.com/pricing',
                "instagramId" => 'ledgerelyapp',
                "instagramUrl" => 'https://www.instagram.com/ledgerelyapp',
                "supportMail" => 'support@ledgerely.com',
                "sub" => "ledgerely-jwt-token",
                "aud" => "ledgerely-app-client",
                "iat" => $issuedAt,
                "exp" => $expire,
                "appName" => "Ledgerely",
                "role" => !is_null($user) ? "ledgerian" : "admin",
                "user" => $user,
                "ref" => $_SERVER['HTTP_REFERER'],
            ],
            $this->JWT_SECRET_KEY,
        );
        if ($return) {
            return $token;
        } else {
            $this->response(['response' => $token], [], 200);
        }
    }
    public function validateToken()
    {
        $headers = $this->input->request_headers('Authorization');
        $token = $headers['Authorization'] ?? false;
        // $token = substr($token, 0, -1); // testing invalid token
        if (empty($token)) {
            $this->invalidTokenResponse();
        }
        if($token) {
            try {
                if (!preg_match('/^Bearer\s+(.*)$/i', $token, $matches)) {
                    $this->tokenException(['error' => 'Invalid Authorization header format. Expected: Bearer token']);
                }
                $token = str_replace('Bearer ', '', $token);
                $decoded = JWT::decode($token, $this->JWT_SECRET_KEY, array('HS256'));
                if ($decoded->exp < time()) {
                    $this->tokenException(['error' => 'Token expired']);
                }
                $this->response(['response' => $decoded], [], 200);
            } catch (Exception $e) {
                $this->tokenException(['error' => $e->getMessage()]);
            }
        }
    }
}
