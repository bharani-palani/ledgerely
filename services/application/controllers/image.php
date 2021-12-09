<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class image extends CI_Controller {
	public function __construct()
    {
		parent::__construct();
	}
	public function actualAvatar($folder, $image)
	{
        $file_path = APPPATH."images/".$folder."/".$image;
        $mime_type_or_return = "image/png";
        if(!file_exists($file_path)) {
            $file_path = APPPATH."images/404.png";
        }
        $image_content = file_get_contents($file_path);
        header('Content-Length: '.strlen($image_content));
        header('Content-Type: '.$mime_type_or_return); // send mime-type header
        header('Content-Disposition: inline; filename="'.basename($file_path).'";'); // sends filename header
        exit($image_content);
    }
}