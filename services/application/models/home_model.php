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
    public function fetchAccessLevels()
    {
        $this->db->where('access_value !=', 'public');
        $query = $this->db->get('access_levels');
        return get_all_rows($query);
    }
    public function fetchUsers()
    {
        $this->db
            ->select(
                [
                    'a.user_id as user_id',
                    'a.user_name as user_name',
                    'a.user_display_name as user_display_name',
                    'a.user_profile_name as user_profile_name',
                    'a.user_email as user_email',
                    'a.user_mobile as user_mobile',
                    'a.user_image_url as user_image_url',
                    'b.access_label as user_type',
                    'a.user_is_founder as user_is_founder',
                ],
                false
            )
            ->from('users as a')
            ->join('access_levels as b', 'a.user_type = b.access_id')
            ->group_by(['a.user_id']);
        $query = $this->db->get();
        return get_all_rows($query);
    }
    public function validateUser($post)
    {
        $this->db
            ->select(
                [
                    'a.user_id as user_id',
                    'a.user_display_name as user_display_name',
                    'a.user_profile_name as user_profile_name',
                    'a.user_email as user_email',
                    'a.user_mobile as user_mobile',
                    'b.access_value as user_type',
                    'a.user_image_url as user_image_url',
                    'a.user_last_login as user_last_login',
                    'a.user_current_login as user_current_login',
                ],
                false
            )
            ->from('users as a')
            ->join('access_levels as b', 'a.user_type = b.access_id')
            ->where('a.user_name', $post['username'])
            ->where('a.user_password', md5($post['password']))
            ->group_by(['a.user_id']);
        $query = $this->db->get();

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
                'user_id' => $row->user_id,
                'user_display_name' => $row->user_display_name,
                'user_profile_name' => $row->user_profile_name,
                'user_email' => $row->user_email,
                'user_mobile' => $row->user_mobile,
                'user_type' => $row->user_type,
                'user_image_url' => $row->user_image_url,
                'user_last_login' => $row->user_last_login,
                'user_current_login' => $row->user_current_login,
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
            'user_email' => $post['email'],
        ]);
        if ($query->num_rows > 0) {
            $result = $query->row();
            return $result->user_id;
        } else {
            return false;
        }
    }
    public function validateOtpTime($post)
    {
        $this->db->where([
            'user_id' => $post['id'],
            'user_otp' => $post['otp'],
            'user_otp_expiry >' => time(),
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
        $this->db->where('user_id', $userId);
        $this->db->update('users', ['user_password' => md5($resetPassword)]);
        if ($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function otpUpdate($userId, $otp)
    {
        $this->db->where('user_id', $userId);
        $this->db->update('users', [
            'user_otp' => $otp,
            'user_otp_expiry' => strtotime('+5 minutes', time()),
        ]);
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
                $query = $this->db->get_where('users', []);
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
    public function getLocale()
    {
        $this->db
            ->select('*')
            ->from('locale_master as a')
            ->join('locale_child as b', 'a.locale_id = b.locale_ref_id');

        $query = $this->db->get();
        return get_all_rows($query);
    }
    public function getUniqueLocales()
    {
        $query = $this->db->group_by(['locale_label'])->get('locale_master');
        return get_all_rows($query);
    }
}
