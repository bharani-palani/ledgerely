<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Cms_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }

    public function getPages()
	{
        $this->db
        ->select(array(
            'a.page_id as page_id',
            'a.page_label as page_label',
			'a.page_route as page_route',
			'a.page_object as page_object',
            'GROUP_CONCAT(d.access_value SEPARATOR ",") as hasAccessTo'
        ), false)
        ->from('pages as a')
        ->join('pages_publication_status as b', 'a.page_status = b.pub_id')
        ->join('page_access as c', 'c.page_id = a.page_id')
        ->join('access_levels as d', 'd.access_id = c.access_id')
        ->where('b.pub_name', "Published")
        ->group_by(array("a.page_id"));
        $query = $this->db->get();
        return get_all_rows($query);
	}

}