<?php if (!defined('BASEPATH')) {
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
$route['getAccessLevels'] = 'cms/cms/getAccessLevels';

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
// miscellanous remove this
$route['technologies'] = 'technologies/technologies/get_all_techs';
$route['ides'] = 'technologies/technologies/get_all_ides';
$route['operating-system'] = 'technologies/technologies/get_all_oss';
$route['contacts'] = 'contacts/contacts/get_all_contacts';
$route['projects'] = 'projects/projects/get_all_projects';
$route['skills'] = 'skills/skills/get_all_skills';
$route['awards'] = 'awards/awards/get_all_awards';
$route['write'] = 'write/write/post_write';
// resume remove this
$route['resume/getHeader'] = 'resume/resume/get_header';
$route['resume/getCareerObjective'] = 'resume/resume/getCareerObjective';
$route['resume/getCareerExpYears'] = 'resume/resume/getCareerExpYears';
$route['resume/workSummary'] = 'resume/resume/workSummary';
$route['resume/proHighLights'] = 'resume/resume/proHighLights';
$route['resume/techSkills'] = 'resume/resume/techSkills';
$route['resume/projectExperience'] = 'resume/resume/projectExperience';
$route['resume/education'] = 'resume/resume/education';
$route['resume/extraAct'] = 'resume/resume/extraAct';
$route['resume/personalInfo'] = 'resume/resume/personalInfo';
$route['resume/footer'] = 'resume/resume/footer';
$route['resume/getCompanyList'] = 'resume/resume/getCompanyList';
$route['resume/getProjectList'] = 'resume/resume/getProjectList';
$route['resume/getResume'] = 'resume/resume/getResume';
// Account planner
$route['account_planner/year_list'] =
    'account_planner/account_planner/year_list';
$route['account_planner/vendor_list'] =
    'account_planner/account_planner/vendor_list';
$route['account_planner/inc_exp_list'] =
    'account_planner/account_planner/inc_exp_list';
$route['account_planner/bank_list'] =
    'account_planner/account_planner/bank_list';
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
