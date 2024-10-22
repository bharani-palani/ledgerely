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

// users and config
$route['signUp'] = 'home/signUp';
$route['getUserConfig'] = 'home/getUserConfig';
$route['postBackend'] = 'home/postBackend';
$route['fetchAccessLevels'] = 'home/fetchAccessLevels';
$route['fetchUsers'] = 'home/fetchUsers';
$route['validateUser'] = 'home/validateUser';
$route['checkUserExists'] = 'home/checkUserExists';
$route['checkAppUserExists'] = 'home/checkAppUserExists';
$route['changePassword'] = 'home/changePassword';
$route['resetPassword'] = 'home/resetPassword';
$route['sendOtp'] = 'home/sendOtp';
$route['viewEmailTemplate'] = 'home/viewEmailTemplate';
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
$route['account_planner/getPlanSum'] =
    'account_planner/account_planner/getPlanSum';
$route['account_planner/getTotalHoldings'] =
    'account_planner/account_planner/getTotalHoldings';
$route['account_planner/getAccountPlanner'] =
    'account_planner/account_planner/getAccountPlanner';
$route['account_planner/postAccountPlanner'] =
    'account_planner/account_planner/postAccountPlanner';
$route['account_planner/runQuery'] = 'account_planner/account_planner/runQuery';
$route['account_planner/postFundTransfer'] = 'account_planner/account_planner/postFundTransfer';
$route['account_planner/getFundDetails'] = 'account_planner/account_planner/getFundDetails';
$route['account_planner/bulkImport'] = 'account_planner/account_planner/bulkImport';
$route['account_planner/categoryReport'] = 'account_planner/account_planner/categoryReport';

// Media
$route['api/media/upload'] = 'media/media/upload';
$route['api/media/render'] = 'media/media/render';
$route['api/media/getList'] = 'media/media/getList';
$route['api/media/deleteFile'] = 'media/media/deleteFile';
$route['api/media/renameFile'] = 'media/media/renameFile';
$route['api/dummy'] = 'media/media/dummy';

// Dashboard
$route['dashboard/topCcTrends'] = 'dashboard/dashboard/topCcTrends';
$route['dashboard/topTrends'] = 'dashboard/dashboard/topTrends';
$route['dashboard/recentTransactions'] = 'dashboard/dashboard/recentTransactions';
$route['dashboard/searchTopics'] = 'dashboard/dashboard/searchTopics';

// Workbook and Datasource
$route['workbook/fetchDynamicQuery'] = 'workbook/workbook/fetchDynamicQuery';
$route['workbook/saveDatasource'] = 'workbook/workbook/saveDatasource';
$route['workbook/getSavedQueryLists'] = 'workbook/workbook/getSavedQueryLists';
$route['workbook/fetchQueryObjectById'] = 'workbook/workbook/fetchQueryObjectById';
$route['workbook/deleteSavedQuery'] = 'workbook/workbook/deleteSavedQuery';
$route['workbook/saveWorkbook'] = 'workbook/workbook/saveWorkbook';
$route['workbook/getSavedWorkbooks'] = 'workbook/workbook/getSavedWorkbooks';
$route['workbook/fetchWorkbookById'] = 'workbook/workbook/fetchWorkbookById';
$route['workbook/deleteWorkbook'] = 'workbook/workbook/deleteWorkbook';
$route['workbook/phpinfo'] = 'workbook/workbook/phpinfo';

// payment and plans
$route['payments/availableBillingPlans'] = 'payments/plans/availableBillingPlans';
$route['payments/checkDiscounts'] = 'payments/plans/checkDiscounts';
$route['payments/checkTaxes'] = 'payments/plans/checkTaxes';
$route['payments/deductExhaustedUsage'] = 'payments/plans/deductExhaustedUsage';
$route['payments/accountClosure'] = 'payments/plans/accountClosure';
$route['payments/checkClosure'] = 'payments/plans/checkClosure';
$route['payments/revokeAccount'] = 'payments/plans/revokeAccount';
$route['payments/getPricingCurrencies'] = 'payments/plans/getPricingCurrencies';

// stripe (not in scope)
$route['payments/createUpdatePlans'] = 'payments/stripe/createUpdatePlans';
$route['payments/createSubscription'] = 'payments/stripe/createSubscription';
$route['payments/checkoutSubscription'] = 'payments/stripe/checkoutSubscription';
$route['payments/checkoutSession'] = 'payments/stripe/checkoutSession';
$route['payments/test'] = 'payments/stripe/test';

// razorpay (active)
$route['payments/razorpay/test'] = 'payments/razorpay/test';
$route['payments/razorpay/createSubscription'] = 'payments/razorpay/createSubscription';
$route['payments/razorpay/onPayment'] = 'payments/razorpay/onPayment';
$route['payments/razorpay/onPostPaymentAutomation'] = 'payments/razorpay/onPostPaymentAutomation';
$route['payments/razorpay/isOrderPaid'] = 'payments/razorpay/isOrderPaid';


/* End of file routes.php */
/* Location: ./application/config/routes.php */
