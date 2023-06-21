<?php
defined('BASEPATH') or exit('No direct script access allowed');
class auth extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
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
        $data['phpVersion'] = phpversion();
        $data['memory_usage'] = $ci->benchmark->memory_usage();
        $data['elapsedTime'] = $ci->benchmark->elapsed_time();
        foreach ($passed as $key => $val) {
            $data[$key] = $val;
        }
        return $data;
    }
    public function generateAuthToken($id)
    {
        $tokenData = [];
        $tokenData['id'] = $id;
        return AUTHORIZATION::generateToken($tokenData);
    }
    public function allowed_http_origins($headers)
    {
        $http_origin = array_key_exists('Origin', $headers)
            ? $headers['Origin']
            : $headers['Referer'];
        $allowed_http_origins = [
            'http://localhost:3000',
            'https://bharani.tech',
            'https://www.bharani.tech',
            'http://bharani.tech',
            'http://www.bharani.tech',
        ];
        return in_array($http_origin, $allowed_http_origins)
            ? $http_origin
            : '';
    }
    public function validateHeaderToken($headers, $authKey, $authHash)
    {
        if (
            (array_key_exists('Access-Control-Request-Headers', $headers) &&
                $headers['Access-Control-Request-Headers'] ===
                strtolower($authKey)) ||
            (array_key_exists($authKey, $headers) &&
                $authHash === $headers[$authKey])
        ) {
            return true;
        }
        return false;
    }
    public function validateReferer($headers)
    {
        if (
            array_key_exists('Origin', $headers) ||
            array_key_exists('Referer', $headers)
        ) {
            return true;
        }
        return false;
    }
    public function invalidTokenResponse()
    {
        $ci = &get_instance();
        $ci->output->set_content_type('application/json');
        $ci->output->set_status_header(401);
        $ci->output->set_output(json_encode(['error' => 'Illegal token.']));
    }
    public function invalidDomainResponse()
    {
        $ci = &get_instance();
        $ci->output->set_content_type('application/json');
        $ci->output->set_status_header(400);
        $ci->output->set_output(
            json_encode(['error' => 'Illegal domain request.'])
        );
    }
    public function validateAll()
    {
        ob_start();
        $authHash = $this->generateAuthToken(1);
        $authKey = 'Authorization';
        $ci = &get_instance();
        $ci->output->set_header('Access-Control-Allow-Headers: ' . $authKey);
        $ci->output->set_header(
            'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'
        );
        $headers = apache_request_headers();

        if ($this->validateReferer($headers)) {
            $ci->output->set_header(
                'Access-Control-Allow-Origin: ' .
                    $this->allowed_http_origins($headers)
            );
            if ($this->validateHeaderToken($headers, $authKey, $authHash)) {
                return 1;
            } else {
                return 2;
            }
        } else {
            return 3;
        }
    }
    public function response($response, $passed, $statusCode)
    {
        $ci = &get_instance();
        $ci->output->set_content_type('application/json');
        $ci->output->set_status_header($statusCode);
        $output = array_merge($this->info($passed, $statusCode), $response);
        $ci->output->set_output(json_encode($output));
    }
    public function tokenException($exc)
    {
        $ci = &get_instance();
        $ci->output->set_content_type('application/json');
        $ci->output->set_status_header(401);
        $ci->output->set_output(json_encode($exc));
    }
    public function renderFile($fileURL)
    {
        $ci = &get_instance();
        if (!file_exists($fileURL)) {
            exit('File not found!');
        }
        $ci->load->helper('file');
        $ci->output
            ->set_header('Content-Disposition: inline; filename="'.basename($fileURL).'"')
            ->set_content_type(get_mime_by_extension($fileURL))
            ->set_output(file_get_contents($fileURL));
    }
    function rangeDownload($file){
        $fp = @fopen($file, 'rb');

        $size   = filesize($file); // File size
        $length = $size;           // Content length
        $start  = 0;               // Start byte
        $end    = $size - 1;       // End byte
        // Now that we've gotten so far without errors we send the accept range header
        /* At the moment we only support single ranges.
         * Multiple ranges requires some more work to ensure it works correctly
         * and comply with the spesifications: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.2
         *
         * Multirange support annouces itself with:
         * header('Accept-Ranges: bytes');
         *
         * Multirange content must be sent with multipart/byteranges mediatype,
         * (mediatype = mimetype)
         * as well as a boundry header to indicate the various chunks of data.
         */
        header("Accept-Ranges: 0-$length");
        // header('Accept-Ranges: bytes');
        // multipart/byteranges
        // http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.2
        if (isset($_SERVER['HTTP_RANGE'])){
            $c_start = $start;
            $c_end   = $end;

            // Extract the range string
            list(, $range) = explode('=', $_SERVER['HTTP_RANGE'], 2);
            // Make sure the client hasn't sent us a multibyte range
            if (strpos($range, ',') !== false){
                // (?) Shoud this be issued here, or should the first
                // range be used? Or should the header be ignored and
                // we output the whole content?
                header('HTTP/1.1 416 Requested Range Not Satisfiable');
                header("Content-Range: bytes $start-$end/$size");
                // (?) Echo some info to the client?
                exit;
            } // fim do if
            // If the range starts with an '-' we start from the beginning
            // If not, we forward the file pointer
            // And make sure to get the end byte if spesified
            if ($range[0] == '-'){
                // The n-number of the last bytes is requested
                $c_start = $size - substr($range, 1);
            } else {
                $range  = explode('-', $range);
                $c_start = $range[0];
                $c_end   = (isset($range[1]) && is_numeric($range[1])) ? $range[1] : $size;
            } // fim do if
            /* Check the range and make sure it's treated according to the specs.
             * http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
             */
            // End bytes can not be larger than $end.
            $c_end = ($c_end > $end) ? $end : $c_end;
            // Validate the requested range and return an error if it's not correct.
            if ($c_start > $c_end || $c_start > $size - 1 || $c_end >= $size){
                header('HTTP/1.1 416 Requested Range Not Satisfiable');
                header("Content-Range: bytes $start-$end/$size");
                // (?) Echo some info to the client?
                exit;
            } // fim do if

            $start  = $c_start;
            $end    = $c_end;
            $length = $end - $start + 1; // Calculate new content length
            fseek($fp, $start);
            header('HTTP/1.1 206 Partial Content');
        } // fim do if

        // Notify the client the byte range we'll be outputting
        header("Content-Range: bytes $start-$end/$size");
        header("Content-Length: $length");

        // Start buffered download
        $buffer = 1024 * 8;
        while(!feof($fp) && ($p = ftell($fp)) <= $end){
            if ($p + $buffer > $end){
                // In case we're only outputtin a chunk, make sure we don't
                // read past the length
                $buffer = $end - $p + 1;
            } // fim do if

            set_time_limit(0); // Reset time limit for big files
            echo fread($fp, $buffer);
            flush(); // Free up memory. Otherwise large files will trigger PHP's memory limit.
        } // fim do while

        fclose($fp);
    }
    public function renderPartial($fileURL)
    {
        if (is_file($fileURL)){
            header("Content-type: video/mp4"); // change mimetype
    
            if (isset($_SERVER['HTTP_RANGE'])){ // do it for any device that supports byte-ranges not only iPhone
                $this->rangeDownload($fileURL);
            } else {
                header("Content-length: " . filesize($fileURL));
                readfile($fileURL);
            } // fim do if
        }
    }

}
