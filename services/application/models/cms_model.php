<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
class cms_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }

    public function getPages()
    {
        $this->db
            ->select(
                [
                    'a.page_id as page_id',
                    'a.page_label as label',
                    'a.page_route as href',
                    'a.page_object as page_object',
                    'GROUP_CONCAT(d.access_value SEPARATOR ",") as hasAccessTo',
                ],
                false
            )
            ->from('pages as a')
            ->join('pages_publication_status as b', 'a.page_status = b.pub_id')
            ->join('page_access as c', 'c.page_id = a.page_id')
            ->join('access_levels as d', 'd.access_id = c.access_id')
            ->where('b.pub_value', 'published')
            ->group_by(['a.page_id']);
        $query = $this->db->get();
        return get_all_rows($query);
    }
    public function getConfigPages()
    {
        $this->db
            ->select(
                ['a.page_id as pageId', 'a.page_label as pageLabel'],
                false
            )
            ->from('pages as a')
            ->join('pages_publication_status as c', 'a.page_status = c.pub_id')
            ->where('a.page_is_freezed', '0')
            ->where_in('c.pub_value', ['published', 'saved', 'inactive']);
        $query = $this->db->get();
        return get_all_rows($query);
    }
    public function getConfigPageDetails($post)
    {
        $this->db
            ->select(
                [
                    'a.page_route as pageRoute',
                    'a.page_label as pageLabel',
                    'a.page_object as pageObject',
                    'b.user_display_name as pageModifiedBy',
                    'a.page_created_at as pageCreatedAt',
                    'a.page_updated_at as pageUpdatedAt',
                ],
                false
            )
            ->from('pages as a')
            ->join('users as b', 'a.page_modified_by = b.user_id')
            ->join('pages_publication_status as c', 'a.page_status = c.pub_id')
            ->where('a.page_is_freezed', '0')
            ->where('a.page_id', $post['pageId'])
            ->where_in('c.pub_value', ['published', 'saved', 'inactive']);
        $query = $this->db->get();
        return get_all_rows($query);
    }
    public function getPageStatuses()
    {
        $query = $this->db->get('pages_publication_status');
        return get_all_rows($query);
    }
    public function getAccessLevels()
    {
        $this->db->select(['access_id', 'access_label']);
        $query = $this->db->get('access_levels');
        return get_all_rows($query);
    }
}
