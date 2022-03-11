<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
class home_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->db = $this->load->database('default', true);
    }
    public function get_config()
    {
        $query = $this->db->get('config');
        return get_all_rows($query);
    }
    public function validateUser($post)
    {
        $query = $this->db->get_where('users', [
            'user_status' => "1",
            'user_name' => $post['username'],
            'user_password' => md5($post['password']),
        ]);
        if ($query->num_rows > 0) {
            $row = $query->row();
            $user_current_login = $row->user_current_login;
            $user_id = $row->user_id;

            $data = [
                'user_last_login' => $user_current_login,
                'user_current_login' => date('Y-m-d H:i:s'),
            ];

            $this->db->where('user_id', $user_id);
            $this->db->update('users', $data);

            return [
                'user_display_name' => $row->user_display_name,
                'user_profile_name' => $row->user_profile_name,
                'user_email' => $row->user_email,
                'user_mobile' => $row->user_mobile,
                'user_image_url' => $row->user_image_url,
                'user_last_login' => $row->user_last_login,
                'user_current_login' => $row->user_current_login
            ];
        } else {
            return false;
        }
    }
    public function checkUserExists($post)
    {
        $this->db->where('user_name =', $post['username']);
        $this->db->or_where('user_email =', $post['email']);
        $query = $this->db->get('users');
        if ($query->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function changePassword($post)
    {
        $query = $this->db->get_where('users', [
            'user_status' => "1",
            'user_name' => $post['userName'],
            'user_password' => md5($post['currentPass']),
        ]);
        if ($query->num_rows > 0) {
            $this->db->where('user_name', $post['userName']);
            $this->db->update('users', [
                'user_password' => md5($post['newPass']),
            ]);
            if ($this->db->affected_rows() > 0) {
                return ['status' => true];
            } else {
                return ['status' => false];
            }
        } else {
            return ['status' => false];
        }
    }
    public function checkValidEmail($post)
    {
        $query = $this->db->get_where('users', [
            'user_status' => "1",
            'user_email' => $post['email'],
        ]);
        if ($query->num_rows > 0) {
            $result = $query->row();
            return $result->user_id;
        } else {
            return false;
        }
    }
    public function validateOtpTime($post) {
        $this->db->where([
            'user_status' => "1",
            'user_id' => $post['id'],
            'user_otp' => $post['otp'],
            'user_otp_expiry >' => time()
        ]);
        $query = $this->db->get('users');
        if ($query->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function resetUpdate($userId, $resetPassword)
    {
        $this->db->where('user_status', "1");
        $this->db->where('user_id', $userId);
        $this->db->update('users', ['user_password' => md5($resetPassword)]);
        if ($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function otpUpdate($userId, $otp) {
        $this->db->where('user_status', "1");
        $this->db->where('user_id', $userId);
        $this->db->update('users', ['user_otp' => $otp, 'user_otp_expiry' => strtotime("+5 minutes", time())]);
        if ($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
    function getBackend($post)
    {
        $Table = $post['Table'];
        $this->db->select($post['TableRows']);
        switch ($Table) {
            case 'config':
                $query = $this->db->get('config');
                break;
            case 'users':
                $query = $this->db->get_where('users', array('user_status' => "1"));
                break;
            case 'awards':
                $query = $this->db
                    ->order_by('award_sort', 'asc')
                    ->get('awards');
                break;
            case 'contacts':
                $query = $this->db
                    ->order_by('contact_sort', 'asc')
                    ->get('contacts');
                break;
            case 'ide':
                $query = $this->db->order_by('ide_sort', 'asc')->get('ide');
                break;
            case 'operating_system':
                $query = $this->db
                    ->order_by('os_sort', 'asc')
                    ->get('operating_system');
                break;
            case 'projects':
                $query = $this->db
                    ->order_by('project_sort', 'asc')
                    ->get('projects');
                break;
            case 'public_comments':
                $query = $this->db
                    ->limit(10)
                    ->order_by('comment_time', 'desc')
                    ->get('public_comments');
                break;
            case 'skills':
                $query = $this->db
                    ->order_by('skill_sort', 'asc')
                    ->get('skills');
                break;
            case 'technologies':
                $query = $this->db
                    ->order_by('tech_sort', 'asc')
                    ->get('technologies');
                break;
            case 'resume_01_header':
                $query = $this->db->get('resume_01_header');
                break;
            case 'resume_02_career_objective':
                $query = $this->db->get('resume_02_career_objective');
                break;
            case 'resume_03_work_summary':
                $query = $this->db
                    ->order_by('work_sort', 'asc')
                    ->get('resume_03_work_summary');
                break;
            case 'resume_04_pro_highlights':
                $query = $this->db
                    ->order_by('pro_sort', 'asc')
                    ->get('resume_04_pro_highlights');
                break;
            case 'resume_05_tech_skills':
                $query = $this->db
                    ->order_by('tech_sort', 'asc')
                    ->get('resume_05_tech_skills');
                break;
            case 'resume_06_project_experience':
                $query = $this->db
                    ->order_by('project_sort_order', 'asc')
                    ->get('resume_06_project_experience');
                break;
            case 'resume_07_roles_and_responsibilities':
                $query = $this->db
                    ->order_by('project_id', 'asc')
                    ->get('resume_07_roles_and_responsibilities');
                break;
            case 'resume_08_education':
                $query = $this->db
                    ->order_by('edu_graduation_sort', 'asc')
                    ->get('resume_08_education');
                break;
            case 'resume_09_activities':
                $query = $this->db
                    ->order_by('activity_order', 'asc')
                    ->get('resume_09_activities');
                break;
            case 'resume_10_personal_info':
                $query = $this->db
                    ->order_by('info_order', 'asc')
                    ->get('resume_10_personal_info');
                break;
            case 'resume_11_footer':
                $query = $this->db
                    ->order_by('footer_signature_name', 'asc')
                    ->get('resume_11_footer');
                break;
            default:
                return false;
        }
        return get_all_rows($query);
    }
    public function postBackend($post)
    {
        $postData = json_decode($post['postData']);
        $Table = $postData->Table;
        switch ($Table) {
            case 'config':
                return $this->onTransaction($postData, 'config', 'config_id');
                break;
            case 'users':
                return $this->onTransaction($postData, 'users', 'user_id');
                break;
            case 'awards':
                return $this->onTransaction($postData, 'awards', 'award_id');
                break;
            case 'technologies':
                return $this->onTransaction(
                    $postData,
                    'technologies',
                    'tech_id'
                );
                break;
            case 'projects':
                return $this->onTransaction(
                    $postData,
                    'projects',
                    'project_id'
                );
                break;
            case 'skills':
                return $this->onTransaction($postData, 'skills', 'skill_id');
                break;
            case 'contacts':
                return $this->onTransaction(
                    $postData,
                    'contacts',
                    'contact_id'
                );
                break;
            case 'about_images':
                return $this->onTransaction(
                    $postData,
                    'about_images',
                    'image_id'
                );
                break;
            case 'ide':
                return $this->onTransaction($postData, 'ide', 'ide_id');
                break;
            case 'operating_system':
                return $this->onTransaction(
                    $postData,
                    'operating_system',
                    'os_id'
                );
                break;
            case 'public_comments':
                return $this->onTransaction(
                    $postData,
                    'public_comments',
                    'comment_id'
                );
                break;
            case 'resume_01_header':
                return $this->onTransaction(
                    $postData,
                    'resume_01_header',
                    'header_id'
                );
                break;
            case 'resume_02_career_objective':
                return $this->onTransaction(
                    $postData,
                    'resume_02_career_objective',
                    'career_id'
                );
                break;
            case 'resume_03_work_summary':
                return $this->onTransaction(
                    $postData,
                    'resume_03_work_summary',
                    'work_id'
                );
                break;
            case 'resume_04_pro_highlights':
                return $this->onTransaction(
                    $postData,
                    'resume_04_pro_highlights',
                    'pro_id'
                );
                break;
            case 'resume_05_tech_skills':
                return $this->onTransaction(
                    $postData,
                    'resume_05_tech_skills',
                    'tech_skill_id'
                );
                break;
            case 'resume_06_project_experience':
                return $this->onTransaction(
                    $postData,
                    'resume_06_project_experience',
                    'project_id'
                );
                break;
            case 'resume_07_roles_and_responsibilities':
                return $this->onTransaction(
                    $postData,
                    'resume_07_roles_and_responsibilities',
                    'role_id'
                );
                break;
            case 'resume_08_education':
                return $this->onTransaction(
                    $postData,
                    'resume_08_education',
                    'edu_id'
                );
                break;
            case 'resume_09_activities':
                return $this->onTransaction(
                    $postData,
                    'resume_09_activities',
                    'activity_id'
                );
                break;
            case 'resume_10_personal_info':
                return $this->onTransaction(
                    $postData,
                    'resume_10_personal_info',
                    'info_id'
                );
                break;
            case 'resume_11_footer':
                return $this->onTransaction(
                    $postData,
                    'resume_11_footer',
                    'footer_id'
                );
                break;
            default:
                return false;
        }
    }
    public function onTransaction($postData, $table, $primary_field)
    {
        $this->db->trans_start();
        if (isset($postData->updateData) && count($postData->updateData) > 0) {
            $array = json_decode(json_encode($postData->updateData), true);
            $this->db->update_batch($table, $array, $primary_field);
        }
        if (isset($postData->insertData) && count($postData->insertData) > 0) {
            $array = json_decode(json_encode($postData->insertData), true);
            $this->db->insert_batch($table, $array);
        }
        if (isset($postData->deleteData) && count($postData->deleteData) > 0) {
            $array = json_decode(json_encode($postData->deleteData), true);
            $this->db->where_in($primary_field, $array);
            $this->db->delete($table);
        }
        $this->db->trans_complete();
        return $this->db->trans_status() === false ? false : true;
    }
}
