<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

use Razorpay\Api\Api;
use Razorpay\Api\Errors;

class home_model extends CI_Model
{
    public $settingId;
    public $appIdSettings;
    public $razorPayApi;
    public function __construct()
    {
        parent::__construct();
        @$this->db = $this->load->database('default', true);
        $this->settingId = 1;
        $this->appIdSettings = [
            'INCEXPTRX' => 'inc_exp_appId',
            'CREDITCARDTRX' => 'cc_appId',
            'USERS' => 'user_appId',
            'CATEGORIES' => 'inc_exp_cat_appId',
            'BANKS' => 'bank_appId',
            'CREDITCARDS' => 'credit_card_appId',
        ];
        $this->razorPayApi =
            $_ENV['APP_ENV'] === 'production' ?
            new Api($this->config->item('razorpay_live_key_id'), $this->config->item('razorpay_live_key_secret')) :
            new Api($this->config->item('razorpay_test_key_id'), $this->config->item('razorpay_test_key_secret'));
    }
    public function throwException($e)
    {
        $errors = [
            'CODE' => $e->getCode(),
            'MESSAGE' => $e->getMessage(),
            'FILE' => $e->getFile(),
            'LINE' => $e->getLine(),
            'STRING_TRACE' => $e->getTraceAsString(),
        ];

        if ($_ENV['APP_ENV'] !== 'local') {
            $object = (object) [
                'name' => 'ErrorHandler',
                'email' => 'errorHandler@ledgerely.com',
                'source' => 'BE',
                'type' => 'PhpError',
                'description' => json_encode($errors),
                'userId' => 'XXX',
                'time' => date("Y-m-d\TH:i:s"),
                'ip' => $_SERVER['REMOTE_ADDR'],
            ];
            $this->saveLog($object);
        }
        return $errors;
    }
    public function getGlobalConfig()
    {
        $query = $this->db->get_where('appSettings', array('appSetting_id' => $this->settingId));
        return get_all_rows($query);
    }
    public function getUserConfig($appId)
    {
        $rpCustId = $_ENV['APP_ENV'] === "production" ? 'a.razorPayLiveCustomerId' : 'a.razorPayTestCustomerId';
        $rpSubId = $_ENV['APP_ENV'] === "production" ? 'a.razorPayLiveSubscriptionId' : 'a.razorPayTestSubscriptionId';
        $this->db
            ->select(
                [
                    'a.appId as appId',
                    $rpCustId . ' as razorPayCustomerId',
                    $rpSubId . ' as razorPaySubscriptionId',
                    'a.name as name',
                    'a.email as email',
                    'a.mobile as mobile',
                    'a.bgSongDefaultPlay as bgSongDefaultPlay',
                    'a.bgVideoDefaultPlay as bgVideoDefaultPlay',
                    'a.switchSongFeatureRequired as switchSongFeatureRequired',
                    'a.switchVideoFeatureRequired as switchVideoFeatureRequired',
                    'a.switchThemeFeatureRequired as switchThemeFeatureRequired',
                    'a.webLayoutType as webLayoutType',
                    'a.webMenuType as webMenuType',
                    'a.webTheme as webTheme',
                    'a.social_media_facebook as social_media_facebook',
                    'a.social_media_twitter as social_media_twitter',
                    'a.social_media_linkedIn as social_media_linkedIn',
                    'a.social_media_instagram as social_media_instagram',
                    'a.isOwner as isOwner',
                    'a.expiryDateTime as expiryDateTime',
                    'b.planId as planId',
                    'b.planName as planName',
                    'b.planCode as planCode',
                    'IFNULL(b.planStorageLimit, "Infinity") as planStorageLimit',
                    'IFNULL(b.planTrxLimit, "Infinity") as planTrxLimit',
                    'IFNULL(b.planUsersLimit, "Infinity") as planUsersLimit',
                    'IFNULL(b.planCategoriesLimit, "Infinity") as planCategoriesLimit',
                    'b.planIsBulkImport as planIsBulkImport',
                    'IFNULL(b.planBankAccountsLimit, "Infinity") as planBankAccountsLimit',
                    'IFNULL(b.planCreditCardAccounts, "Infinity") as planCreditCardAccounts',
                    'GROUP_CONCAT(cast(c.chartKey AS CHAR)) as planVisualizations',
                    'b.planIsPredictions as planIsPredictions',
                    'b.planIsEmailAlerts as planIsEmailAlerts',
                    'b.planIsTransactionSearch as planIsTransactionSearch',
                    'a.country as country',
                    'a.address1 as address1',
                    'a.address2 as address2',
                    'a.city as city',
                    'a.postalCode as postalCode',
                    'a.state as state',
                    'a.currency as currency',
                ]
            )
            ->from('apps as a')
            ->join('plans as b', 'a.appsPlanId = b.planId')
            ->join('planBasedCharts as c', 'b.planId = c.planId')
            ->where('c.isActive',  "1")
            ->where('a.appId',  $appId)
            ->group_by(['a.appId']);
        $query = $this->db->get();
        $row = $query->row();
        return [[
            'appId' => $row->appId,
            'razorPayCustomerId' => $row->razorPayCustomerId,
            'razorPaySubscriptionId' => $row->razorPaySubscriptionId,
            'name' => $row->name,
            'email' => $row->email,
            'mobile' => $row->mobile,
            'bgSongDefaultPlay' => $row->bgSongDefaultPlay,
            'bgVideoDefaultPlay' => $row->bgVideoDefaultPlay,
            'switchSongFeatureRequired' => $row->switchSongFeatureRequired,
            'switchVideoFeatureRequired' => $row->switchVideoFeatureRequired,
            'switchThemeFeatureRequired' => $row->switchThemeFeatureRequired,
            'webLayoutType' => $row->webLayoutType,
            'webMenuType' => $row->webMenuType,
            'webTheme' => $row->webTheme,
            'social_media_facebook' => $row->social_media_facebook,
            'social_media_twitter' => $row->social_media_twitter,
            'social_media_linkedIn' => $row->social_media_linkedIn,
            'social_media_instagram' => $row->social_media_instagram,
            'isOwner' => $row->isOwner,
            'expiryDateTime' => $row->expiryDateTime,
            'planId' => $row->planId,
            'planName' => $row->planName,
            'planCode' => $row->planCode,
            'planTrxLimit' => $row->planTrxLimit,
            'planUsersLimit' => $row->planUsersLimit,
            'planCategoriesLimit' => $row->planCategoriesLimit,
            'planIsBulkImport' => $row->planIsBulkImport,
            'planBankAccountsLimit' => $row->planBankAccountsLimit,
            'planCreditCardAccounts' => $row->planCreditCardAccounts,
            'planStorageLimit' => $row->planStorageLimit,
            'planVisualizations' => explode(",", $row->planVisualizations),
            'planIsPredictions' => $row->planIsPredictions,
            'planIsEmailAlerts' => $row->planIsEmailAlerts,
            'planIsTransactionSearch' => $row->planIsTransactionSearch,
            'country' => $row->country,
            'address1' => $row->address1,
            'address2' => $row->address2,
            'city' => $row->city,
            'postalCode' => $row->postalCode,
            'state' => $row->state,
            'currency' => $row->currency,
        ]];
    }
    public function fetchAccessLevels()
    {
        $this->db->where('access_value !=', 'public');
        $query = $this->db->get('access_levels');
        return get_all_rows($query);
    }
    public function fetchUsers($appId)
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
                    'a.user_image as user_image',
                    'b.access_label as user_type',
                    'a.user_is_founder as user_is_founder',
                ],
                false
            )
            ->from('users as a')
            ->join('access_levels as b', 'a.user_type = b.access_id')
            ->where('a.user_appId', $appId)
            ->group_by(['a.user_id']);
        $query = $this->db->get();
        $array = array();
        $i = 0;
        foreach ($query->result_array() as $row) {
            $array[$i]['user_id'] = $row['user_id'];
            $array[$i]['user_name'] = $row['user_name'];
            $array[$i]['user_display_name'] = $row['user_display_name'];
            $array[$i]['user_profile_name'] = $row['user_profile_name'];
            $array[$i]['user_email'] = $row['user_email'];
            $array[$i]['user_mobile'] = $row['user_mobile'];
            $array[$i]['user_image'] = $row['user_image'];
            $array[$i]['user_type'] = $row['user_type'];
            $array[$i]['user_is_founder'] = $row['user_is_founder'];
            $i++;
        }
        return $array;
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
                    'a.user_image as user_image',
                    'a.user_last_login as user_last_login',
                    'a.user_current_login as user_current_login',
                    'GROUP_CONCAT(c.appId) as appId',
                ],
                false
            )
            ->from('users as a')
            ->join('access_levels as b', 'a.user_type = b.access_id')
            ->join('apps as c', 'a.user_appId = c.appId')
            ->where('a.user_password', md5($post['password']))
            ->where('c.isActive', '1')
            ->where('a.user_name like binary', strtolower($post['username']))
            ->or_where('a.user_email =', $post['username']);

        $query = $this->db->get();
        if ($query->num_rows > 0) {
            $row = $query->row();
            if (!is_null($row->appId)) {

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
                    'user_image' => $row->user_image,
                    'user_last_login' => $row->user_last_login,
                    'user_current_login' => $row->user_current_login,
                    'appId' => explode(',', $row->appId),
                ];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function validateGoogleUser($post)
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
                    'a.user_image as user_image',
                    'a.user_last_login as user_last_login',
                    'a.user_current_login as user_current_login',
                    'GROUP_CONCAT(c.appId) as appId',
                ],
            )
            ->from('users as a')
            ->join('access_levels as b', 'a.user_type = b.access_id')
            ->join('apps as c', 'a.user_appId = c.appId')
            ->where('c.isActive', '1')
            ->where('a.user_email =', $post['email']);

        $query = $this->db->get();
        if ($query->num_rows > 0) {
            $row = $query->row();
            if (!is_null($row->appId)) {
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
                    'user_image' => $row->user_image,
                    'user_last_login' => $row->user_last_login,
                    'user_current_login' => $row->user_current_login,
                    'appId' => explode(',', $row->appId),
                ];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function getMultiUserRoles($post)
    {
        $query = $this->db->query("SELECT 
            a.user_id as user_id, a.user_display_name as user_display_name, a.user_profile_name as user_profile_name, 
            a.user_email as user_email, a.user_mobile as user_mobile, b.access_value as user_type, a.user_image as user_image, 
            a.user_last_login as user_last_login, a.user_current_login as user_current_login
        FROM (`users` as a)
        JOIN `access_levels` as b ON `a`.`user_type` = `b`.`access_id`
        JOIN `apps` as c ON `a`.`user_appId` = `c`.`appId`
        WHERE 
        `c`.`isActive` =  '1' AND `a`.`user_appId` =  '" . $post['appId'] . "' AND 
        (`a`.`user_email` =  '" . $post['username'] . "' OR `a`.`user_name` =  '" . $post['username'] . "')");

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
                'user_image' => $row->user_image,
                'user_last_login' => $row->user_last_login,
                'user_current_login' => $row->user_current_login,
                'appId' => $post['appId'],
            ];
        } else {
            // return $this->db->last_query();
            return [];
        }
    }

    public function checkAppUserExists($post)
    {
        if (!empty($post['accountUserName'])) {
            $query = $this->db
                ->where(['user_name' => strtolower($post['accountUserName'])])
                ->get('users');
            return $query->num_rows() > 0;
        } else {
            return null;
        }
    }
    public function checkUserExists($post)
    {
        if (!empty($post['userId']) || !empty($post['username'])) {
            $query =
                $this->db->query(
                    "SELECT * FROM (`users`) WHERE `user_id` != '" . $post['userId'] . "' AND (`user_name` = '" . strtolower($post['username']) . "' OR `user_email` = '" . strtolower($post['email']) . "') AND user_appId = '" . $post['appId'] . "'"
                );
        } else {
            $query = $this->db->where(['user_name' => strtolower($post['username']), 'user_appId' => $post['appId']])
                ->or_where('user_email', strtolower($post['email']))
                ->get('users');
        }
        if ($query->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function changePassword($post)
    {
        $query = $this->db->get_where('users', [
            'user_id' => $post['userId'],
            'user_password' => md5((string)$post['currentPass']),
        ]);
        if ($query->num_rows > 0 && (string)$post['newPass'] === (string)$post['repeatPass']) {
            $this->db->where('user_id', $post['userId']);
            $this->db->where('user_appId', $post['appId']);
            $this->db->update('users', [
                'user_password' => md5($post['newPass']),
            ]);
            if ($this->db->affected_rows() > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    public function checkValidEmail($post)
    {
        $query = $this->db->get_where('users', [
            'user_email' => $post['email'],
            'user_appId' => $post['appId'],
        ]);
        if ($query->num_rows > 0) {
            $result = $query->row();
            return $result->user_id;
        } else {
            return false;
        }
    }
    public function getSingleOrMutliAccountDetails($post)
    {
        $this->db
            ->select(['user_appId', 'user_id'])
            ->where([
                'user_email' => $post['email'],
            ])
            ->group_by(['user_appId']);
        $query = $this->db->get('users');
        if ($query->num_rows > 0) {
            return get_all_rows($query);
        } else {
            return false;
        }
    }
    public function validateOtpTime($post)
    {
        $this->db->where([
            'user_id' => $post['id'],
            'user_otp' => $post['otp'],
            'user_appId' => $post['appId'],
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
    public function otpUpdate($userId, $appId, $otp)
    {
        $this->db->where('user_id', $userId);
        $this->db->where('user_appId', $appId);
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
        $appId = $post['appId'];
        $this->db->select($post['TableRows']);
        switch ($Table) {
            case 'apps':
                $query = $this->db->get_where('apps', array('appId' => $appId));
                break;
            case 'users':
                $query = $this->db->get_where('users', array('user_appId' => $appId));
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
            case 'apps':
                return $this->onTransaction($postData, 'apps', 'appId');
                break;
            case 'users':
                return $this->onTransaction($postData, 'users', 'user_id', 'USERS');
                break;
            default:
                return false;
        }
    }
    public function updateCustomerInfo($appId, $name, $email, $mobile)
    {
        $rpCustId = $_ENV['APP_ENV'] === "production" ? 'razorPayLiveCustomerId' : 'razorPayTestCustomerId';
        $query = $this->db->get_where('apps', ['appId' => $appId]);
        $customerId = $query->row_array()[$rpCustId];
        $this->razorPayApi->customer->fetch($customerId)->edit([
            'name' => $name,
            'email' => $email,
            'contact' => $mobile
        ]);
    }
    public function onTransaction($postData, $table, $primary_field, $service = '')
    {
        $this->db->trans_start();
        if (isset($postData->updateData) && count($postData->updateData) > 0) {
            $array = json_decode(json_encode($postData->updateData), true);
            $this->db->update_batch($table, $array, $primary_field);
            if ($table === "apps") {
                if (
                    isset($array[0]['appId']) ||
                    isset($array[0]['name']) ||
                    isset($array[0]['email']) ||
                    isset($array[0]['mobile'])
                ) {
                    $this->updateCustomerInfo(
                        $array[0]['appId'],
                        $array[0]['name'],
                        $array[0]['email'],
                        $array[0]['mobile']
                    );
                }
            }
        }
        if (isset($postData->insertData) && count($postData->insertData) > 0) {
            $array = json_decode(json_encode($postData->insertData), true);
            if (!empty($service)) {
                $CI = &get_instance();
                $CI->load->model('quota_model');
                $appId = $array[0][$this->appIdSettings[$service]];
                if (!$CI->quota_model->hasQuotaFor($appId, $service)) {
                    return null;
                }
            }
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
    public function getLocale($localeCode)
    {
        $this->db
            ->select('*')
            ->from('locale_master as a')
            ->join('locale_child as b', 'a.locale_id = b.locale_ref_id')
            ->where('a.locale_string', $localeCode);
        $query = $this->db->get();
        return get_all_rows($query);
    }
    public function getUniqueLocales()
    {
        $query = $this->db->order_by('locale_sort asc')->get('locale_master');
        return get_all_rows($query);
    }
    public function saveLog($post)
    {
        $this->db->insert('logs', [
            'log_id' => NULL,
            'log_name' => $post->name,
            'log_email' => $post->email,
            'log_source' => $post->source,
            'log_type' => $post->type,
            'log_description' => $post->description,
            'log_user_id' => $post->userId,
            'log_time' => $post->time,
            'log_ip' => $post->ip,
        ]);
        return $this->db->affected_rows() > 0;
    }
    public function signUp($post)
    {
        try {
            $this->db->trans_start();
            $razorPayTestApi = new Api($this->config->item('razorpay_test_key_id'), $this->config->item('razorpay_test_key_secret'));
            $testCustomer = $razorPayTestApi->customer->create([
                'name' => $post['accountName'],
                'email' => $post['accountEmail'],
                'fail_existing' => 0
            ])->toArray();
            $razorPayLiveApi = new Api($this->config->item('razorpay_live_key_id'), $this->config->item('razorpay_live_key_secret'));
            $liveCustomer = $razorPayLiveApi->customer->create([
                'name' => $post['accountName'],
                'email' => $post['accountEmail'],
                'fail_existing' => 0
            ])->toArray();
            $topAccessLevel = $this->db->get_where('access_levels', ['access_value' => 'superAdmin'])->row()->access_id;
            $this->db->insert('apps', [
                'appId' => null,
                'appsPlanId' => 4,
                'razorPayTestCustomerId' => $testCustomer['id'],
                'razorPayLiveCustomerId' => $liveCustomer['id'],
                'name' => $post['accountName'],
                'email' => $post['accountEmail'],
                'mobile' => '',
                'bgSongDefaultPlay' => 0,
                'bgVideoDefaultPlay' => 0,
                'switchSongFeatureRequired' => 1,
                'switchVideoFeatureRequired' => 1,
                'switchThemeFeatureRequired' => 1,
                'webLayoutType' => "classic",
                'webMenuType' => "topMenu",
                'webTheme' => "dark",
                'social_media_facebook' => "",
                'social_media_twitter' => "",
                'social_media_linkedIn' => "",
                'social_media_instagram' => "",
                'isOwner' => 1,
                'expiryDateTime' => date("Y-m-d H:i:s", strtotime("+1 month")),
                'isActive' => 1,
                'incomeExpenseTransactionSize' => 2,
                'creditCardTransactionSize' => 2,
                'usersSize' => 1,
                'categoriesSize' => 2,
                'bankAccountsSize' => 1,
                'creditCardsSize' => 1,
                'storageSize' => 0,
                'dataSourceSize' => 0,
                'workbookSize' => 0,
                'templateSize' => 0,
                'country' => $post['accountCountry'],
                'address1' => $post['accountAddress1'],
                'address2' => $post['accountAddress2'],
                'city' => $post['accountCity'],
                'postalCode' => $post['accountPostalCode'],
                'state' => $post['accountState'],
                'currency' => "INR",
            ]);
            $appInsertId = $this->db->insert_id();
            $this->db->insert('users', [
                'user_id' => null,
                'user_appId' => $appInsertId,
                'user_name' => $post['accountUserName'],
                'user_display_name' => $post['accountUserName'],
                'user_profile_name' => "",
                'user_password' => md5($post['accountPassword']),
                'user_email' => $post['accountEmail'],
                'user_mobile' => "",
                'user_image' => "",
                'user_type' => $topAccessLevel,
                'user_is_founder' => 1,
                'user_otp' => "",
                'user_otp_expiry' => null,
            ]);
            $creditCategory =
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Salary',
                    'inc_exp_cat_is_metric' => 1,
                    'inc_exp_cat_is_plan_metric' => 1
                ];
            $this->db->insert('income_expense_category', $creditCategory);
            $creditCategoryInsertId = $this->db->insert_id();
            $debitCategory = [
                'inc_exp_cat_id' => null,
                'inc_exp_cat_appId' => $appInsertId,
                'inc_exp_cat_name' => 'House rent',
                'inc_exp_cat_is_metric' => 0,
                'inc_exp_cat_is_plan_metric' => 1
            ];
            $this->db->insert('income_expense_category', $debitCategory);
            $debitCategoryInsertId = $this->db->insert_id();
            // Add some basic categories
            $bulkCategories = [
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Fuel',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Education',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Food & Restaurant',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Groceries',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Electricity',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Mobile & Internet',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Travel',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Entertainment',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Medical',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
                [
                    'inc_exp_cat_id' => null,
                    'inc_exp_cat_appId' => $appInsertId,
                    'inc_exp_cat_name' => 'Tax',
                    'inc_exp_cat_is_metric' => 0,
                    'inc_exp_cat_is_plan_metric' => 1
                ],
            ];
            $this->db->insert_batch('income_expense_category', $bulkCategories);


            $banks = [
                'bank_id' => null,
                'bank_appId' => $appInsertId,
                'bank_name' => 'My first bank',
                'bank_account_number' => "1234",
                'bank_swift_code' => "SWIFT123",
                'bank_account_type' => "SAV",
                'bank_country' => "IND",
                'bank_sort' => 0,
                'bank_locale' => "en-IN",
                'bank_currency' => "INR",
            ];
            $this->db->insert('banks', $banks);
            $bankInsertId = $this->db->insert_id();

            $bankTransactions = [
                [
                    'inc_exp_id' => null,
                    'inc_exp_appId' => $appInsertId,
                    'inc_exp_name' => 'Salary for the month ' . date('F Y'),
                    'inc_exp_amount' => 100000,
                    'inc_exp_plan_amount' => 100000,
                    'inc_exp_type' => 'Cr',
                    'inc_exp_date' => date("Y-m-d H:i:s"),
                    'inc_exp_added_at'  => date("Y-m-d H:i:s"),
                    'inc_exp_category' => $creditCategoryInsertId,
                    'inc_exp_bank' => $bankInsertId,
                    'inc_exp_comments' => '',
                    'inc_exp_is_planned' => 1,
                    'inc_exp_is_income_metric' => 1
                ],
                [
                    'inc_exp_id' => null,
                    'inc_exp_appId' => $appInsertId,
                    'inc_exp_name' => 'House rent part payment for month ' . date('F Y'),
                    'inc_exp_amount' => 25000,
                    'inc_exp_plan_amount' => 25000,
                    'inc_exp_type' => 'Dr',
                    'inc_exp_date' => date("Y-m-d H:i:s"),
                    'inc_exp_added_at'  => date("Y-m-d H:i:s"),
                    'inc_exp_category' => $debitCategoryInsertId,
                    'inc_exp_bank' => $bankInsertId,
                    'inc_exp_comments' => '',
                    'inc_exp_is_planned' => 1,
                    'inc_exp_is_income_metric' => 1
                ]
            ];
            $this->db->insert_batch('income_expense', $bankTransactions);

            $creditCards = [
                'credit_card_id' => null,
                'credit_card_appId' => $appInsertId,
                'credit_card_name' => 'My credit card',
                'credit_card_number' => '1234',
                'credit_card_start_date' => '17',
                'credit_card_end_date' => '16',
                'credit_card_payment_date' => '6',
                'credit_card_annual_interest' => '36',
                'credit_card_locale' => 'en-IN',
                'credit_card_currency' => 'INR',
            ];
            $this->db->insert('credit_cards', $creditCards);
            $creditCardInsertId = $this->db->insert_id();

            $creditCardTransactions = [
                [
                    'cc_id' => null,
                    'cc_appId' => $appInsertId,
                    'cc_transaction' => 'House rent final payment for month',
                    'cc_date' => date("Y-m-18 H:i:s", strtotime("-1 month")),
                    'cc_opening_balance' => 0,
                    'cc_payment_credits' => 0,
                    'cc_purchases' => 10000,
                    'cc_taxes_interest' => 0,
                    'cc_for_card' => $creditCardInsertId,
                    'cc_inc_exp_cat' => $debitCategoryInsertId,
                    'cc_comments' => '',
                    'cc_transaction_status' => 0,
                    'cc_added_at' => date("Y-m-d H:i:s")
                ],
                [
                    'cc_id' => null,
                    'cc_appId' => $appInsertId,
                    'cc_transaction' => 'Last month late payment interest',
                    'cc_date' => date("Y-m-17 H:i:s", strtotime("-1 month")),
                    'cc_opening_balance' => 0,
                    'cc_payment_credits' => 0,
                    'cc_purchases' => 0,
                    'cc_taxes_interest' => 2000,
                    'cc_for_card' => $creditCardInsertId,
                    'cc_inc_exp_cat' => $debitCategoryInsertId,
                    'cc_comments' => '',
                    'cc_transaction_status' => 0,
                    'cc_added_at' => date("Y-m-d H:i:s")
                ]
            ];
            $this->db->insert_batch('credit_card_transactions', $creditCardTransactions);

            $this->db->trans_complete();
            return $this->db->trans_status() === false ? false : true;
        } catch (Errors\Error $e) {
            return [null, $this->throwException($e)];
        }
    }
    public function getActiveAppAccounts()
    {
        try {
            $query = $this->db->select('appId')->where(['isActive' => '1'])->get('apps');
            return get_all_rows($query);
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }
    public function getInActiveAppAccounts($limitDays)
    {
        try {
            $query =
                $this->db
                ->select('a.closeAppId AS closeAppId', FALSE)
                ->select('b.email AS email', FALSE)
                ->select('b.name AS name', FALSE)
                ->select('a.closeRequestedDate AS closeRequestedDate', FALSE)
                ->from('closure as a')
                ->join('apps as b', 'a.closeAppId = b.appId')
                ->where("DATE(a.closeRequestedDate) + INTERVAL " . $limitDays . " DAY < NOW() ")
                ->group_by(['a.closeAppId'])
                ->get();
            return get_all_rows($query);
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }

    public function getActiveExpiredAppAccounts()
    {
        try {
            $query = $this->db
                ->select(['appId', 'name', 'email', 'DATEDIFF(CURDATE(), expiryDateTime) as expiredDaysPast', 'expiryDateTime'], false)
                ->where(['isActive' => '1'])
                ->where("date(expiryDateTime) < CURRENT_DATE()")
                ->get('apps');
            // return ['data' => get_all_rows($query), 'abc' => str_replace(array("\r", "\n"), ' ', $this->db->last_query())];
            return get_all_rows($query);
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }

    public function getTableCount($table, $column, $id)
    {
        try {
            $count = $this->db->from($table)->where([$column => $id])->get()->num_rows();
            return $count;
        } catch (Exception $e) {
            return 0;
            $this->throwException($e);
        }
    }
    public function getTableSize($table, $sizeColumn, $whereColumn, $id)
    {
        try {
            $query = $this->db->select(['COALESCE(sum(length(' . $sizeColumn . ')),0) as size'])->from($table)->where([$whereColumn => $id])->get()->row_array();
            return (int)$query['size'];
        } catch (Exception $e) {
            return 0;
            $this->throwException($e);
        }
    }
    public function updateQuotaBatch($table, $data, $id)
    {
        return $this->db->update_batch($table, $data, $id);
    }
    public function multipleAccountsList($appIdList)
    {
        try {
            $query = $this->db
                ->select(['appId', 'name'])
                ->where_in("appId", $appIdList)
                ->group_by(['appId'])
                ->get('apps');
            return get_all_rows($query);
        } catch (Exception $e) {
            $this->throwException($e);
        }
    }
    function test()
    {
        return $this->db->last_query();
    }
}
