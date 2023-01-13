<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['default_controller'] = 'home';
$route['404_override'] = '';
// cms
$route['getPages'] = 'cms/cms/getPages';
$route['getConfigPages'] = 'cms/cms/getConfigPages';
$route['getPageStatuses'] = 'cms/cms/getPageStatuses';
$route['getConfigPageDetails'] = 'cms/cms/getConfigPageDetails';
$route['createPage'] = 'cms/cms/createPage';
$route['updatePage'] = 'cms/cms/updatePage';
$route['getAccessLevels'] = 'cms/cms/getAccessLevels';
$route['deletePage'] = 'cms/cms/deletePage';
$route['deleteAccessLevel'] = 'cms/cms/deleteAccessLevel';
$route['saveOrUpdateAccessLevel'] = 'cms/cms/saveOrUpdateAccessLevel';

// users and config
$route['postBackend'] = 'home/postBackend';
$route['fetchAccessLevels'] = 'home/fetchAccessLevels';
$route['fetchUsers'] = 'home/fetchUsers';
$route['validateUser'] = 'home/validateUser';
$route['checkUserExists'] = 'home/checkUserExists';
$route['changePassword'] = 'home/changePassword';
$route['resetPassword'] = 'home/resetPassword';
$route['sendOtp'] = 'home/sendOtp';
$route['getBackend'] = 'home/getBackend';
$route['sendUserInfo'] = 'home/sendUserInfo';
$route['getLocale'] = 'home/getLocale';
$route['getUniqueLocales'] = 'home/getUniqueLocales';
$route['saveLog'] = 'home/saveLog';

// Account planner
$route['account_planner/year_list'] =
    'account_planner/account_planner/year_list';
$route['account_planner/vendor_list'] =
    'account_planner/account_planner/vendor_list';
$route['account_planner/inc_exp_list'] =
    'account_planner/account_planner/inc_exp_list';
$route['account_planner/bank_list'] =
    'account_planner/account_planner/bank_list';
$route['account_planner/getBankDetails'] =
    'account_planner/account_planner/getBankDetails';
$route['account_planner/cc_year_list'] =
    'account_planner/account_planner/cc_year_list';
$route['account_planner/getIncExpChartData'] =
    'account_planner/account_planner/getIncExpChartData';
$route['account_planner/getCreditCardChartData'] =
    'account_planner/account_planner/getCreditCardChartData';
$route['account_planner/getIncExpTemplate'] =
    'account_planner/account_planner/getIncExpTemplate';
$route['account_planner/credit_card_list'] =
    'account_planner/account_planner/credit_card_list';
$route['account_planner/credit_card_details'] =
    'account_planner/account_planner/credit_card_details';
$route['account_planner/getPlanDetails'] =
    'account_planner/account_planner/getPlanDetails';
$route['account_planner/getTotalHoldings'] =
    'account_planner/account_planner/getTotalHoldings';
$route['account_planner/getAccountPlanner'] =
    'account_planner/account_planner/getAccountPlanner';
$route['account_planner/postAccountPlanner'] =
    'account_planner/account_planner/postAccountPlanner';
$route['account_planner/runQuery'] = 'account_planner/account_planner/runQuery';

/* End of file routes.php */
/* Location: ./application/config/routes.php */
