import helpers from '../../helpers';
import _ from 'lodash';

const configArray = [
	{
		id: 1,
		label: 'Awards',
		Table: 'awards',
		TableRows: [ 'award_id', 'award_label', 'award_value', 'award_sort' ],
		TableAliasRows: [ '', 'Label', 'Value', 'Sort' ],
		rowElements: [ 'checkbox', 'textbox', 'textarea', 'number' ]
	},
	{
		id: 2,
		label: 'Technolgies',
		Table: 'technologies',
		TableRows: [ 'tech_id', 'tech_label', 'tech_value', 'tech_image_url', 'tech_sort' ],
		TableAliasRows: [ '', 'Label', 'Value', 'Image URL', 'Sort order' ],
		rowElements: [ 'checkbox', 'textbox', 'textarea', 'textbox', 'number' ]
	},
	{
		id: 3,
		label: 'Projects',
		Table: 'projects',
		TableRows: [ 'project_id', 'project_label', 'project_value', 'project_sort' ],
		TableAliasRows: [ '', 'Label', 'Value', 'Sort order' ],
		rowElements: [ 'checkbox', 'textbox', 'textarea', 'number' ]
	},
	{
		id: 4,
		label: 'Skills',
		Table: 'skills',
		TableRows: [ 'skill_id', 'skill_label', 'skill_value', 'skill_image_url', 'skill_sort' ],
		TableAliasRows: [ '', 'Label', 'Value', 'Image URL', 'Sort order' ],
		rowElements: [ 'checkbox', 'textbox', 'textarea', 'textbox', 'number' ]
	},
	{
		id: 6,
		label: 'Contact',
		Table: 'contacts',
		TableRows: [ 'contact_id', 'contact_label', 'contact_value', 'contact_href', 'contact_sort' ],
		TableAliasRows: [ '', 'Label', 'Value', 'Href', 'Sort order' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'textbox', 'number' ]
	},
	{
		id: 8,
		label: 'IDE',
		Table: 'ide',
		TableRows: [ 'ide_id', 'ide_label', 'ide_value', 'ide_image_url', 'ide_sort' ],
		TableAliasRows: [ '', 'Label', 'Value', 'Image URL', 'Sort order' ],
		rowElements: [ 'checkbox', 'textbox', 'textarea', 'textbox', 'number' ]
	},
	{
		id: 9,
		label: 'Operating System',
		Table: 'operating_system',
		TableRows: [ 'os_id', 'os_label', 'os_value', 'os_image_url', 'os_sort' ],
		TableAliasRows: [ '', 'Label', 'Value', 'Image URL', 'Sort order' ],
		rowElements: [ 'checkbox', 'textbox', 'textarea', 'textbox', 'number' ]
	},
	{
		id: 10,
		label: 'Public comments',
		Table: 'public_comments',
		TableRows: [
			'comment_id',
			'comment_name',
			'comment_mobile',
			'comment_description',
			'comment_email',
			'comment_ip',
			'latitude',
			'longitude'
		],
		TableAliasRows: [ '', 'Name', 'Mobile', 'Description', 'Email', 'IP Address', 'Latitude', 'Longitude' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'textarea', 'textbox', 'textbox', 'number', 'number' ]
	}
];

const resumeArray = [
	{
		id: 11,
		label: 'Header',
		Table: 'resume_01_header',
		TableRows: [ 'header_id', 'header_name', 'header_mobile', 'header_email', 'header_address', 'header_web' ],
		TableAliasRows: [ '', 'Name', 'Mobile', 'Email', 'Address', 'Website' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'textbox', 'textarea', 'textbox' ]
	},
	{
		id: 12,
		label: 'Career Objective',
		Table: 'resume_02_career_objective',
		TableRows: [ 'career_id', 'career_title', 'career_description' ],
		TableAliasRows: [ '', 'Title', 'Description' ],
		rowElements: [ 'checkbox', 'textbox', 'textarea' ],
		cellWidth: '40rem'
	},
	{
		id: 13,
		label: 'Work summary',
		Table: 'resume_03_work_summary',
		TableRows: [ 'work_id', 'work_company', 'work_country', 'work_start_date', 'work_end_date', 'work_sort' ],
		TableAliasRows: [ '', 'Company', 'Country', 'Start Date', 'End Date', 'Sort Order' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'date', 'date', 'number' ]
	},
	{
		id: 14,
		label: 'Profesional Highlights',
		Table: 'resume_04_pro_highlights',
		TableRows: [ 'pro_id', 'pro_text', 'pro_sort' ],
		TableAliasRows: [ '', 'Text', 'Sort Order' ],
		rowElements: [ 'checkbox', 'textarea', 'number' ],
		cellWidth: '30rem'
	},
	{
		id: 15,
		label: 'Technical Skills',
		Table: 'resume_05_tech_skills',
		TableRows: [ 'tech_skill_id', 'tech_skill_label', 'tech_sort' ],
		TableAliasRows: [ '', 'Label', 'Sort Order' ],
		rowElements: [ 'checkbox', 'textarea', 'number' ],
		cellWidth: '30rem'
	},
	{
		id: 16,
		label: 'Project Experience',
		Table: 'resume_06_project_experience',
		TableRows: [
			'project_id',
			'project_name',
			'project_role',
			'project_introduction',
			'project_company_id',
			'project_duration_months',
			'project_sort_order'
		],
		TableAliasRows: [ '', 'Name', 'Role', 'Introduction', 'Company', 'Duration (months)', 'Sort Order' ],
		rowElements: [
			'checkbox',
			'textbox',
			'textbox',
			'textarea',
			{
				fetch: {
					dropDownList: []
				}
			},
			'number',
			'number'
		]
	},
	{
		id: 17,
		label: 'Roles & responsibilities',
		Table: 'resume_07_roles_and_responsibilities',
		TableRows: [ 'role_id', 'role_label', 'project_id', 'role_order' ],
		TableAliasRows: [ '', 'Label', 'Project', 'Sort Order' ],
		rowElements: [
			'checkbox',
			'textarea',
			{
				fetch: {
					dropDownList: []
				}
			},
			'number'
		],
		cellWidth: '30rem'
	},
	{
		id: 18,
		label: 'Education',
		Table: 'resume_08_education',
		TableRows: [
			'edu_id',
			'edu_graduation_acronym',
			'edu_graduation_abbreviation',
			'edu_graduation_institution',
			'edu_graduation_year',
			'edu_graduation_percent',
			'edu_graduation_sort'
		],
		TableAliasRows: [ '', 'Acronym', 'Abbreviation', 'Institution', 'Year', 'Percent', 'Sort Order' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'textbox', 'textbox', 'textbox', 'number' ]
	},
	{
		id: 19,
		label: 'Extracurricular activities',
		Table: 'resume_09_activities',
		TableRows: [ 'activity_id', 'activity_name', 'activity_order' ],
		TableAliasRows: [ '', 'Activity', 'Sort Order' ],
		rowElements: [ 'checkbox', 'textbox', 'number' ]
	},
	{
		id: 20,
		label: 'Personal information',
		Table: 'resume_10_personal_info',
		TableRows: [ 'info_id', 'info_key', 'info_value', 'info_order' ],
		TableAliasRows: [ '', 'Key', 'Value', 'Sort Order' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'number' ]
	},
	{
		id: 21,
		label: 'Footer',
		Table: 'resume_11_footer',
		TableRows: [ 'footer_id', 'footer_text', 'footer_place', 'footer_signature_name' ],
		TableAliasRows: [ '', 'Text', 'Place', 'Signature Name' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'textbox' ]
	}
];

const crudFormArray = [
	{
		id: 22,
		Table: 'banks',
		config: {
			footer: {
				total: {},
				pagination: {
					currentPage: 'last',
					recordsPerPage: 10,
					maxPagesToShow: 5
				}
			}
		},
		label: 'Bank accounts',
		TableRows: [
			'bank_id',
			'bank_name',
			'bank_account_number',
			'bank_ifsc_code',
			'bank_card_no',
			'bank_card_validity',
			'isPrimaryAccount'
		],
		TableAliasRows: [ '', 'Name', 'Account Number', 'IFSC Code', 'Card Number', 'Validity', 'Primary Account' ],
		rowElements: [
			'checkbox',
			'textbox',
			'textbox',
			'textbox',
			'textbox',
			'textbox',
			{
				radio: {
					radioList: [
						{ label: 'Yes', value: '1', checked: false },
						{ label: 'No', value: '0', checked: true }
					]
				}
			}
		],
		defaultValues: [ { isPrimaryAccount: '0' } ]
	},
	{
		id: 23,
		Table: 'credit_cards',
		label: 'Credit cards',
		TableRows: [
			'credit_card_id',
			'credit_card_name',
			'credit_card_number',
			'credit_card_start_date',
			'credit_card_end_date',
			'credit_card_payment_date'
		],
		TableAliasRows: [ '', 'Name', 'Number', 'Start Date', 'End Date', 'Payment Date' ],
		rowElements: [ 'checkbox', 'textbox', 'textbox', 'number', 'number', 'number' ]
	},
	{
		id: 24,
		config: {
			footer: {
				total: {},
				pagination: {
					currentPage: 'last',
					recordsPerPage: 10,
					maxPagesToShow: 5
				}
			}
		},
		Table: 'vendors',
		label: 'Vendors',
		TableRows: [ 'vendor_id', 'vendor_name', 'vendor_limit' ],
		TableAliasRows: [ '', 'Name', 'Limit' ],
		rowElements: [ 'checkbox', 'textbox', 'number' ],
		defaultValues: [{ vendor_name: '' },{ vendor_limit: '' }]
	},
	{
		id: 25,
		config: {
			footer: {
				total: {},
				pagination: {
					currentPage: 'last', // first or last
					recordsPerPage: 5,
					maxPagesToShow: 5
				}
			}
		},
		Table: 'income_expense_category',
		label: 'Income / expense categories',
		TableRows: [ 'inc_exp_cat_id', 'inc_exp_cat_name', 'inc_exp_cat_vendor' ],
		TableAliasRows: [ '', 'Name', 'Vendor' ],
		rowElements: [
			'checkbox',
			'textbox',
			{
				fetch: {
					dropDownList: []
				}
			}
		]
	},
	{
		id: '24A',
		config: {
			footer: {
				total: {},
				pagination: {
					currentPage: 'last', // first or last
					recordsPerPage: 5,
					maxPagesToShow: 5
				}
			}
		},
		Table: 'income_expense_template',
		label: 'Income expense template',
		TableRows: [ 'template_id', 'temp_inc_exp_name', 'temp_amount', 'temp_inc_exp_type' ],
		TableAliasRows: [ '', 'Name', 'Amount', 'Type' ],
		showTotal: [
			{
				whichKey: 'temp_amount',
				forKey: 'temp_inc_exp_type',
				forCondition: 'equals',
				forValue: [ 'Dr' ],
				showDifference: { indexes: [], showStability: false }
			}
		],
		rowElements: [
			'checkbox',
			'textbox',
			'number',
			{
				radio: {
					radioList: [
						{ label: 'Credit', value: 'Cr', checked: false },
						{ label: 'Debit', value: 'Dr', checked: true }
					]
				}
			}
		]
	}
];

const monthExpenditureConfig = [
	{
		id: 26,
		config: {
			footer: {
				total: {},
				pagination: {
					currentPage: 'last', // first or last
					recordsPerPage: 10,
					maxPagesToShow: 5
				}
			}
		},
		Table: 'income_expense',
		label: 'Expenditures for selected month',
		TableRows: [
			'inc_exp_id',
			'inc_exp_name',
			'inc_exp_amount',
			'inc_exp_plan_amount',
			'inc_exp_type',
			'inc_exp_date',
			'inc_exp_category',
			'inc_exp_bank',
			'inc_exp_comments'
		],
		TableAliasRows: [ 'id', 'Transaction', 'Amount', 'Plan', 'Type', 'Date', 'Category', 'Bank', 'Comments' ],
		defaultValues: [
			{ inc_exp_type: 'Dr' },
			{ inc_exp_amount: 0 },
			{ inc_exp_plan_amount: 0 },
			{ inc_exp_date: helpers.DateToYYYYMMDD(new Date()) }
		],
		showTotal: [
			{
				whichKey: 'inc_exp_amount',
				forKey: 'inc_exp_type',
				forCondition: 'equals', // includes or equals
				forValue: [ 'Cr', 'Dr' ],
				showDifference: { indexes: [ 0, 1 ], showStability: true }
				// Ex:
				// 1. difference result = "Cr - Dr = Balance" Ex: "1000 - 750 = 250"
				// 2. showStability: (Settled), (Ahead), (YetTo) strings will be shown
			},
			{
				whichKey: 'inc_exp_plan_amount',
				forKey: 'inc_exp_type',
				forCondition: 'equals',
				forValue: [ 'Cr', 'Dr' ],
				showDifference: { indexes: [ 0, 1 ], showStability: true }
			}
		],
		rowKeyUp: '',
		rowElements: [
			'checkbox',
			'textbox',
			'number',
			'number',
			{
				radio: {
					radioList: [
						{ label: 'Credit', value: 'Cr', checked: false },
						{ label: 'Debit', value: 'Dr', checked: true }
					]
				}
			},
			'date',
			{
				fetch: {
					dropDownList: []
				}
			},
			{
				fetch: {
					dropDownList: []
				}
			},
			'textbox'
		],
		showTooltipFor: [ 'inc_exp_name', 'inc_exp_comments' ]
	}
];

const creditCardConfig = [
	{
		id: 27,
		config: {
			footer: {
				total: {},
				pagination: {
					currentPage: 'last', // first or last
					recordsPerPage: 10,
					maxPagesToShow: 5
				}
			}
		},
		Table: 'credit_card_transactions',
		label: 'Credit card transactions',
		TableRows: [
			'cc_id',
			'cc_transaction',
			'cc_date',
			'cc_opening_balance',
			'cc_payment_credits',
			'cc_purchases',
			'cc_taxes_interest',
			'cc_expected_balance',
			'cc_for_card',
			'cc_inc_exp_cat',
			'cc_comments'
		],
		TableAliasRows: [
			'',
			'Transaction',
			'Date',
			'Opening',
			'Credits',
			'Purchases',
			'Interest',
			'Balance',
			'Card',
			'Category',
			'Comments'
		],
		showTotal: [
			'cc_opening_balance',
			'cc_payment_credits',
			'cc_purchases',
			'cc_taxes_interest',
			'cc_expected_balance'
		],
		rowKeyUp:
			'cc_expected_balance=((Number(row.cc_opening_balance) - Number(row.cc_payment_credits)) + (Number(row.cc_purchases) + Number(row.cc_taxes_interest))).toFixed(2)',
		rowElements: [
			'checkbox',
			'textbox',
			'date',
			'number',
			'number',
			'number',
			'number',
			'label',
			{
				fetch: {
					dropDownList: []
				}
			},
			{
				fetch: {
					dropDownList: []
				}
			},
			'textbox'
		],
		defaultValues: [
			{ cc_date: helpers.DateToYYYYMMDD(new Date()) },
			{ cc_opening_balance: 0 },
			{ cc_payment_credits: 0 },
			{ cc_purchases: 0 },
			{ cc_taxes_interest: 0 },
			{ cc_expected_balance: 0 }
		],
		showTooltipFor: [ 'cc_transaction', 'cc_comments' ]
	}
];

const configPanel = [
	{
		type: 'text',
		field: 'user_name',
		placeHolder: 'Ex: John',
		defaultValue: '',
		maxLength: 25,
		mandatories: {
			required: true,
			validationRule: 'minOne'
		},
		className: '',
		isHelp: {}
	}
];

const masterConfig = [
	{
		id: 'config_id',
		index: 'config_id',
		elementType: 'hidden',
		value: '',
		className: ''
	},
	// {
	// 	id: 'user_name',
	// 	index: 'user_name',
	// 	label: 'User Name',
	// 	elementType: 'text',
	// 	value: '',
	// 	placeHolder: 'JohnDoe',
	// 	className: 'col-md-4 col-sm-6',
	// 	options: {
	// 		required: true,
	// 		validation: /^[a-zA-Z0-9]{4,10}$/g,
	// 		errorMsg: 'Input does not match criteria',
	// 		help: [ `Min 4 letters`, `Max 10 letters`, `No special characters allowed` ]
	// 	}
	// },
	// {
	// 	id: 'password',
	// 	index: 'password',
	// 	label: 'Password',
	// 	elementType: 'password',
	// 	value: '',
	// 	placeHolder: 'Welcome@123',
	// 	className: 'col-md-4 col-sm-6',
	// 	options: {
	// 		required: true,
	// 		validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
	// 		errorMsg: 'Input field doesn not match password criteria',
	// 		help: [
	// 			`Min 8 letters long`,
	// 			`Atleast 1 Capital letter`,
	// 			`Atleast 1 Special (!@#$%^&*) character`,
	// 			`Atleast 1 Number, are required`
	// 		]
	// 	}
	// },
	// {
	// 	id: 'display_name',
	// 	index: 'display_name',
	// 	label: 'Display Name',
	// 	elementType: 'text',
	// 	value: '',
	// 	placeHolder: 'John Doe',
	// 	className: 'col-md-4 col-sm-6',
	// 	options: {
	// 		required: true,
	// 		validation: /^[a-zA-Z0-9 ]{4,20}$/g,
	// 		errorMsg: 'Input does not match criteria',
	// 		help: [ `Min 4 letters`, `Max 20 letters`, `No special characters allowed` ]
	// 	}
	// },
	// {
	// 	id: 'profile_name',
	// 	index: 'profile_name',
	// 	label: 'Profile Name',
	// 	elementType: 'text',
	// 	value: '',
	// 	placeHolder: 'Software Engineer',
	// 	className: 'col-md-4 col-sm-6',
	// 	options: {
	// 		required: true,
	// 		validation: /^[a-zA-Z0-9 !@#$%^&|*]{4,50}$/g,
	// 		errorMsg: 'Input does not match criteria',
	// 		help: [ `Min 4 letters`, `Max 50`, `No special characters allowed` ]
	// 	}
	// },
	// {
	// 	id: 'user_mobile',
	// 	index: 'user_mobile',
	// 	label: 'Mobile',
	// 	elementType: 'number',
	// 	value: '',
	// 	placeHolder: '9XXXX12345',
	// 	className: 'col-md-4 col-sm-6',
	// 	options: {
	// 		required: true,
	// 		validation: /^[0-9]{10}$/,
	// 		errorMsg: 'Enter a valid 10 digit mobile number'
	// 	}
	// },
	// {
	// 	id: 'user_mail',
	// 	index: 'user_mail',
	// 	label: 'Email',
	// 	elementType: 'text',
	// 	value: '',
	// 	placeHolder: 'John@Doe.com',
	// 	className: 'col-md-4 col-sm-6',
	// 	options: {
	// 		required: true,
	// 		validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
	// 		errorMsg: 'Enter a valid email',
	// 		help: [ `You will get application specific alerts & updates` ]
	// 	}
	// },
	{
		id: 'web',
		index: 'web',
		label: 'Website',
		elementType: 'text',
		value: '',
		placeHolder: 'JohnDoe.com',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Enter a valid website',
			help: [ `Your web domain`, `This value will be set to your global variables, which can be accessed accross application` ]
		}
	},
	{
		id: 'email',
		index: 'email',
		label: 'Email',
		elementType: 'text',
		value: '',
		placeHolder: 'support@JohnDoe.com',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
			errorMsg: 'Enter a valid email',
			help: [ `Your personal or company mail id, which will be exposed to public.`,`This value will be set to your global variables, which can be accessed accross application` ]
		}
	},
	{
		id: 'latitude',
		index: 'latitude',
		label: 'Geo Latitude',
		elementType: 'number',
		value: '',
		placeHolder: '13.80',
		className: 'col-md-4 col-sm-6',
		options: {
			validation: /$/,
			errorMsg: '',
			help: [ `Open Google maps`, `Find your home or office`, `Right click the location to get your latitude`, `Paste here` ]
		}
	},
	{
		id: 'longitude',
		index: 'longitude',
		label: 'Geo Longitude',
		elementType: 'number',
		value: '',
		placeHolder: '80.80',
		className: 'col-md-4 col-sm-6',
		options: {
			validation: /$/,
			errorMsg: '',
			help: [ `Open Google maps`, `Find your home or office`, `Right click the location to get your longitude`,`Paste here` ]
		}
	},
	{
		id: 'google_map_api_key',
		index: 'google_map_api_key',
		label: 'Google Map API Key',
		elementType: 'textArea',
		value: '',
		placeHolder: 'xxYYzz',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'API key required',
			help: [
				`Go to https://console.cloud.google.com/`,
				`Scroll and click Google Maps Platform`,
				`Click Credentials`,
				`Click +Create Credentials at the top center`,
				`Click API Key`,
				`Copy the generated key`,
				`Paste here and save`,
				`You are done. This helps to integrate google maps in your website`,
			]
		}
	},
	{
		id: 'google_login_auth_token',
		index: 'google_login_auth_token',
		label: 'Google Login Auth Token',
		elementType: 'textArea',
		value: '',
		placeHolder: 'xxYYzz',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Auth token required',
			help: [
				`Go to https://console.cloud.google.com/`,
				`Click API Services`,
				`Click Credentials`,
				`Click +Create Credentials at the top center`,
				`Click Oauth Client Id`,
				`Select Web Application, give a suitable name`,
				`Click Add URI and type your domain URL.`,
				`Click Create`,
				`Copy Client ID`,
				`Paste here.`,
				`You're done.`,
				`Now Super Admin can directly login once their google id is validated, which comes in the next step.`
			],
			rowLength: 4
		}
	},
	{
		id: 'google_id',
		index: 'google_id',
		label: 'Google Id',
		elementType: 'text',
		value: '',
		placeHolder: 'xxYYzz',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Google Id is required',
			help: [
				`Go to https://mail.google.com/`,
				`Open Developer tools (ctrl + shift + i)`,
				`Click Application tab`,
				`Collapse LocalStorage`,
				`Collapse https://mail.google.com/`,
				`Select the first row in "Key" Column`,
				`Copy your Google Id (Shud be a long integer)`,
				`Paste it here and save`,
				`This helps you to login as Super admin and configure your settings`
			]
		}
	},
	{
		id: 'address1',
		index: 'address1',
		label: 'Address 1',
		elementType: 'text',
		value: '',
		placeHolder: '3, Wall street',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /^[a-zA-Z0-9 ,./:;]{4,50}$/g,
			errorMsg: 'Min 4 & Max 50 alphanumerics required'
		}
	},
	{
		id: 'address2',
		index: 'address2',
		label: 'Address 2',
		elementType: 'text',
		value: '',
		placeHolder: 'Park Town',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /^[a-zA-Z0-9 ,./:;]{4,50}$/g,
			errorMsg: 'Min 4 & Max 50 alphanumerics required'
		}
	},
	{
		id: 'city',
		index: 'city',
		label: 'City',
		elementType: 'text',
		value: '',
		placeHolder: 'New york',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /^[a-zA-Z ]{4,50}$/g,
			errorMsg: 'Min 4 & Max 20 alphabets required'
		}
	},
	{
		id: 'state',
		index: 'state',
		label: 'State',
		elementType: 'text',
		value: '',
		placeHolder: 'New york',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /^[a-zA-Z ]{4,50}$/g,
			errorMsg: 'Min 4 & Max 20 alphabets required'
		}
	},
	{
		id: 'country',
		index: 'country',
		label: 'Country',
		elementType: 'text',
		value: '',
		placeHolder: 'United States',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /^[a-zA-Z ]{4,20}$/g,
			errorMsg: 'Min 4 & Max 20 alphabets required'
		}
	},
	{
		id: 'postcode',
		index: 'postcode',
		label: 'Post Code',
		elementType: 'number',
		value: '',
		placeHolder: 'XX12345',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /^[0-9]{4,32}$/g,
			errorMsg: 'Min 4 & Max 32 numerics required'
		}
	},
	{
		id: 'locale',
		index: 'locale',
		label: 'Locale',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: 'col-md-4 col-sm-6',
		list: _.sortBy(
			Object.keys(helpers.LANGUAGE_BY_LOCALE).map((lang) => ({
				value: helpers.LANGUAGE_BY_LOCALE[lang],
				label: `${lang} (${helpers.LANGUAGE_BY_LOCALE[lang]})`
			})),
			'label'
		),
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `Set your regional locale language`, `Default browser locale will be set to this`, `Ex: Thousand seperators, currencies and more..` ]
		}
	},
	{
		id: 'maximumFractionDigits',
		index: 'maximumFractionDigits',
		label: 'Decimal digit limit',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		list: [ 0, 1, 2 ].map((v) => ({ label: String(v), value: String(v) })),
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `Maintains decimal point on math operations` ]
		}
	},
	{
		id: 'currency',
		index: 'currency',
		label: 'Currency',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		list: _.sortBy(
			Object.keys(helpers.CURRENCY).map((curr) => ({
				value: helpers.CURRENCY[curr],
				label: `${helpers.CURRENCY[curr]} - ${curr}`
			})),
			'label'
		),
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required'
		}
	},
	{
		id: 'upiKey',
		index: 'upiKey',
		label: 'UPI Key',
		elementType: 'textArea',
		value: '',
		placeHolder: 'johndoe@okhdfcbank',
		className: 'col-md-4 col-sm-6',
		options: {
			validation: /$/,
			errorMsg: 'Invalid key',
			help: [
				`A link that identifies you on UPI payments (typically yourname@bankname)`,
				`You can get this on your UPI mobile App, Account settings`,
				`Paste it here`,
				`Now, you can ask your payees to visit your web to transfer funds, on providing sufficient links, without sharing your mobile number`,
			],
			rowLength: 4
		}
	},
	{
		id: 'bgSong',
		index: 'bgSong',
		label: 'Theme Background Music',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://mysong.mp3',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Audio file name required',
			help: [ `Choose your theme song playable for people`, `If not required, leave a white space`, `If required, Paste it from AWS gallery (copy to clipboard button), where your media files are located` ],
			rowLength: 4
		}
	},
	{
		id: 'bgSongDefaultPlay',
		index: 'bgSongDefaultPlay',
		label: 'Theme Music Default Play',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		list: [ { label: 'True', value: 1 }, { label: 'False', value: 0 } ],
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `Theme Background Music will be played or not played during start up` ]
		}
	},
	{
		id: 'switchSongFeatureRequired',
		index: 'switchSongFeatureRequired',
		label: 'Require background song switch?',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: 'col-md-4 col-sm-6',
		list: [
			{ label: 'Yes', value: '1' },
			{ label: 'No', value: '0' },
		],
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `You can show or hide audio control switch to users from the global menu`, `This feature can be enabled or disabled basesd on your selection` ]
		}
	},
	{
		id: 'bgVideo',
		index: 'bgVideo',
		label: 'Theme Background Video',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://my-video.mp4',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Video file name required',
			help: [
				`Choose your theme video which plays in background`,
				`Dont worry.. It will be muted`,
				`Keep a small video. Check file size not exceeds 5MB`,
				`Paste it from AWS gallery (copy to clipboard button), where your media files are located`
			],
			rowLength: 4
		}
	},
	{
		id: 'bgVideoDefaultPlay',
		index: 'bgVideoDefaultPlay',
		label: 'Theme Video Default Play',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		list: [ { label: 'True', value: 1 }, { label: 'False', value: 0 } ],
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `Theme Background Video will be played or not played on start up` ]
		}
	},
	{
		id: 'switchVideoFeatureRequired',
		index: 'switchVideoFeatureRequired',
		label: 'Require background video switch?',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: 'col-md-4 col-sm-6',
		list: [
			{ label: 'Yes', value: '1' },
			{ label: 'No', value: '0' },
		],
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `You can show or hide video control switch to users from the global menu`, `This feature can be enabled or disabled basesd on your selection` ]
		}
	},
	{
		id: 'bannerImg',
		index: 'bannerImg',
		label: 'Logo Image',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://my-banner-img.svg',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Image name required',
			help: [ `Set your logo image`, `PNG or SVG type is recommended`,  `200 X 40 dimension required`, `Paste it from AWS gallery (copy to clipboard button), where your media files are located`, `This will be available in top global header` ],
			rowLength: 4
		}
	},
	{
		id: 'logoImg',
		index: 'logoImg',
		label: 'Logo Icon',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://my-logo.svg',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'File name required',
			help: [ `Set your logo icon`, `PNG or SVG type is recommended`, `Paste it from AWS gallery (copy to clipboard button), where your media files are located`],
			rowLength: 4
		}
	},
	{
		id: 'favIconImg',
		index: 'favIconImg',
		label: 'favicon Image',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://my-favicon.icon',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /$/,
			errorMsg: 'File name required',
			help: [ `Set your favicon. Usually it shud be your logo`, `32X32 or 64X64 size is sufficient`, `Paste it from AWS gallery (copy to clipboard button), where your media files are located` ],
			rowLength: 4
		}
	},
	{
		id: 'webLayoutType',
		index: 'webLayoutType',
		label: 'Web Layout Type',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: 'col-md-4 col-sm-6',
		list: [ { label: 'Default', value: 'default' }, { label: 'Classic', value: 'classic' } ],
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [
				`This setup is only for large displays`,
				`Default: Occupies entire width of screen`,
				`Classic: Occupiess 70% width in screen middle`
			]
		}
	},
	{
		id: 'webMenuType',
		index: 'webMenuType',
		label: 'Web Menu Type',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: 'col-md-4 col-sm-6',
		list: [
			{ label: 'Top', value: 'topMenu' },
			{ label: 'Left', value: 'sideMenuLeft' },
			{ label: 'Right', value: 'sideMenuRight' }
		],
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `Where you want to place your menu?`, `Top, Left or Right` ]
		}
	},
	{
		id: 'webTheme',
		index: 'webTheme',
		label: 'Web Theme',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: 'col-md-4 col-sm-6',
		list: [
			{ label: 'Dark', value: 'dark' },
			{ label: 'Light', value: 'light' },
		],
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `How does your website look in start up?`, `Dark or Light` ]
		}
	},
	{
		id: 'switchThemeFeatureRequired',
		index: 'switchThemeFeatureRequired',
		label: 'Require Theme Switch?',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: 'col-md-4 col-sm-6',
		list: [
			{ label: 'Yes', value: '1' },
			{ label: 'No', value: '0' },
		],
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `You can show or hide theme buttons to users from the global menu`, `This feature can be enabled or disabled basesd on your selection` ]
		}
	},
	{
		id: 'webThemeColor',
		index: 'webThemeColor',
		label: 'Web Theme Color',
		elementType: 'text',
		value: '',
		placeHolder: '#000000',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'A valid color is required',
			help: [ `Your application text color`, `Usualy its #000000 (black)`, `This decides the look and feel of your application, unless you use these color variables` ]
		}
	},
	{
		id: 'webThemeBackground',
		index: 'webThemeBackground',
		label: 'Web Theme Background Color',
		elementType: 'text',
		value: '',
		placeHolder: '#c2d82e',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'A valid color is required',
			help: [ `Your application back ground color`, `It should be a dark color`, `This decides the look and feel of your application, unless you use these color variables` ]
		}
	},
	{
		id: 'aws_s3_access_key_id',
		index: 'aws_s3_access_key_id',
		label: 'AWS S3 Access Key ID',
		elementType: 'textArea',
		value: '',
		placeHolder: 'XXXyyyZZZ',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Access key id is required',
			help: [
				`Follow these steps in https://s3.console.aws.amazon.com/`,
				`You'll see this key while adding user in create user section`,
				`You need to copy, paste and backup during user credentials. Else you cant retrieve`,
				`This configuration is important to maintain your images and other files`,
				`Important: You should set "AdministratorAccess" in permissions (Attach existing policies directly), else the AWS gallery module wont work`
			],
			rowLength: 4
		}
	},
	{
		id: 'aws_s3_secret_access_key',
		index: 'aws_s3_secret_access_key',
		label: 'AWS S3 Secret Access Key',
		elementType: 'textArea',
		value: '',
		placeHolder: 'XXXyyyZZZ',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Secret Access key is required',
			help: [
				`Follow the same steps described in AWS S3 Access Key ID`,
			],
			rowLength: 4
		}
	},
	{
		id: 'aws_s3_bucket',
		index: 'aws_s3_bucket',
		label: 'AWS S3 Bucket Name',
		elementType: 'text',
		value: '',
		placeHolder: 'My-S3-Bucket',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Bucket name is required',
			help: [
				`Follow these steps in https://s3.console.aws.amazon.com/`,
				`Create bucket name in Buckets section`,
				`Once created, click the bucket name`,
				`Go to Permissions tab`,
				`Check "Block public access" is On`,
				`Goto "Bucket policy", Edit and replace the below code with your credentials`,
				`{
					"Version": "2012-10-17",
					"Statement": [
						{
							"Sid": "Statement1",
							"Effect": "Allow",
							"Principal": {
								"AWS": "arn:aws:iam::12345678:user/xxxyyyzzz"
							},
							"Action": [
								"s3:PutObject",
								"s3:PutObjectAcl",
								"s3:DeleteObject"
							],
							"Resource": "arn:aws:s3:::yourbucketname/*"
						}
					]
				}`,
				`Go to Cross-origin resource sharing (CORS)`,
				`Edit and replace the below code with your credentials`,
				`[
					{
						"AllowedHeaders": [
							"*"
						],
						"AllowedMethods": [
							"GET",
							"PUT",
							"POST",
							"DELETE"
						],
						"AllowedOrigins": [
							"https://yourwebsite.com"
						],
						"ExposeHeaders": [
							"ETag"
						]
					}
				]`,
				`You are done. Enjoy AWS S3.`
			]
		}
	},
	{
		id: 'aws_s3_region',
		index: 'aws_s3_region',
		label: 'AWS S3 Region Name',
		elementType: 'text',
		value: '',
		placeHolder: 'xx-south-yy',
		className: 'col-md-4 col-sm-6',
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'Region name is required',
			help: [
				`The region name that you've selected in creating bucket section`,
				`This helps to fetch files from your nearest AWS sever region`,
				`This configuration is important to maintain your images and other files`
			]
		}
	},
	{
		id: 'social_media_facebook',
		index: 'social_media_facebook',
		label: 'Facebook',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://facebook.com/xyz',
		className: 'col-md-4 col-sm-6',
		options: {
			validation: /$/,
			errorMsg: 'Facebook profile name is required',
			help: [ `Individual or company facebook profile` ]
		}
	},
	{
		id: 'social_media_twitter',
		index: 'social_media_twitter',
		label: 'Twitter',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://twitter.com/xyz',
		className: 'col-md-4 col-sm-6',
		options: {
			validation: /$/,
			errorMsg: 'Twitter profile name is required',
			help: [ `Individual or company twitter profile` ]
		}
	},
	{
		id: 'social_media_linkedIn',
		index: 'social_media_linkedIn',
		label: 'LinkedIn',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://linkedIn.com/xyz',
		className: 'col-md-4 col-sm-6',
		options: {
			validation: /$/,
			errorMsg: 'LinkedIn profile name is required',
			help: [ `Individual or company LinkedId profile` ]
		}
	},
	{
		id: 'social_media_instagram',
		index: 'social_media_instagram',
		label: 'Instagram',
		elementType: 'textArea',
		value: '',
		placeHolder: 'https://instagram.com/xyz',
		className: 'col-md-4 col-sm-6',
		options: {
			validation: /$/,
			errorMsg: 'Instagram profile name is required',
			help: [ `Individual or company Instagram profile` ]
		}
	}
];

const wizardData = [
	// {
	// 	id: 0,
	// 	label: 'Account',
	// 	icon: 'fa fa-user',
	// 	filterArray: [ 'user_name', 'display_name', 'profile_name', 'user_mobile', 'user_mail', 'user_web' ]
	// },
	{
		id: 0,
		label: 'Google & Geo',
		icon: 'fa fa-google',
		filterArray: [ 'latitude', 'longitude', 'google_map_api_key', 'google_login_auth_token', 'google_id' ]
	},
	{
		id: 1,
		label: 'Address',
		icon: 'fa fa-map-marker',
		filterArray: [ 'address1', 'address2', 'city', 'state', 'country', 'postcode', 'locale' ]
	},
	{
		id: 2,
		label: 'Money & Locale',
		icon: 'fa fa-inr',
		filterArray: [ 'maximumFractionDigits', 'currency', 'upiKey' ]
	},
	{
		id: 3,
		label: 'Web Defaults',
		icon: 'fa fa-globe',
		filterArray: [
			'web',
			'email',
			'bgSong',
			'bgSongDefaultPlay',
			'switchSongFeatureRequired',
			'bgVideo',
			'bgVideoDefaultPlay',
			'switchVideoFeatureRequired',
			'bannerImg',
			'logoImg',
			'favIconImg',
			'webLayoutType',
			'webMenuType',
			"webTheme",
			"switchThemeFeatureRequired",
			"webThemeColor",
			"webThemeBackground"
		]
	},
	{
		id: 4,
		label: 'AWS',
		icon: 'fa fa-amazon',
		filterArray: [ 'aws_s3_access_key_id', 'aws_s3_secret_access_key', 'aws_s3_bucket', 'aws_s3_region' ]
	},
	{
		id: 5,
		label: 'Social Media',
		icon: 'fa fa-share-square',
		filterArray: [
			'social_media_facebook',
			'social_media_twitter',
			'social_media_linkedIn',
			'social_media_instagram'
		]
	}
];

const userCreateForm = [
	{
		id: 'user_id',
		index: 'user_id',
		elementType: 'hidden',
		value: '',
		className: ''
	},
	{
		id: 'user_status',
		index: 'user_status',
		label: 'User status',
		elementType: 'hidden',
		value: "1"
	},
	{
		id: 'user_name',
		index: 'user_name',
		label: 'User name',
		elementType: 'text',
		value: '',
		placeHolder: 'User name',
		className: '',
		options: {
			required: true,
			validation: /^[a-zA-Z0-9 ]{4,20}$/g,
			errorMsg: 'User name required',
			help: [ `Set unique user name.`, `This should not conflict other user names.`,`Min 4 letters`, `Max 20 letters`, `No special characters allowed` ]
		}
	},
	{
		id: 'user_display_name',
		index: 'user_display_name',
		label: 'User display name',
		elementType: 'text',
		value: '',
		placeHolder: 'User display name',
		className: '',
		options: {
			required: true,
			validation: /^[a-zA-Z0-9 ]{4,20}$/g,
			errorMsg: 'Input does not match criteria',
			help: [ `Min 4 letters`, `Max 20 letters`, `No special characters allowed` ]
		}
	},
	{
		id: 'user_profile_name',
		index: 'user_profile_name',
		label: 'User profile name',
		elementType: 'text',
		value: '',
		placeHolder: 'User profile name',
		className: '',
		options: {
			required: true,
			validation: /^[a-zA-Z0-9 ]{4,50}$/g,
			errorMsg: 'Input does not match criteria',
			help: [ `Min 4 letters`, `Max 50 letters`, `No special characters allowed` ]
		}
	},
	{
		id: 'user_password',
		index: 'user_password',
		label: 'Password',
		elementType: 'text',
		value: '',
		placeHolder: 'Password',
		className: '',
		options: {
			required: true,
			validation: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
			errorMsg: 'Password does not meet criteria',
			help: [
				`Min 8 letters long`,
				`Atleast 1 Capital letter`,
				`Atleast 1 Special (!@#$%^&*) character`,
				`Atleast 1 Number`,
				`All the above are required`
			]
		}
	},
	{
		id: 'user_email',
		index: 'user_email',
		label: 'Email',
		elementType: 'text',
		value: '',
		placeHolder: 'Email',
		className: '',
		options: {
			required: true,
			validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
			errorMsg: 'Enter a valid email',
			help: [ `A valid email is required`, `Ex: abc@xyz.com` ]
		}
	},
	{
		id: 'user_type',
		index: 'user_type',
		label: 'User Type',
		elementType: 'dropDown',
		value: '',
		placeHolder: 'Select',
		className: '',
		list: [
			{ label: 'Super-admin', value: 'superAdmin' },
			{ label: 'Admin', value: 'admin' },
		],
		options: {
			required: true,
			validation: /([^\s])/,
			errorMsg: 'This field is required',
			help: [ `Super-admin: Has access to setings and build in applications`, `Admin: Has access only to maintain and design pages (CRUD operations)` ]
		}
	},

	{
		id: 'user_mobile',
		index: 'user_mobile',
		label: 'Mobile',
		elementType: 'number',
		value: '',
		placeHolder: 'Mobile number',
		className: '',
		options: {
			required: true,
			validation: /^[0-9]{10}$/,
			errorMsg: 'Enter a valid 10 digit mobile number',
			help: [ `A Valid 10 digit mobile number` ]
		}
	},
	{
		id: 'user_image_url',
		index: 'user_image_url',
		label: 'User image location',
		elementType: 'text',
		value: '',
		placeHolder: 'Image location',
		className: '',
		options: {
			help: [ `User image file location from your AWS S3 bucket`, `Copy this from AWS gallery grid (Copy to clip board) button`, `This image will be shown while user logs in` ]
		}
	}
];

export {
	configArray,
	resumeArray,
	crudFormArray,
	monthExpenditureConfig,
	creditCardConfig,
	configPanel,
	masterConfig,
	wizardData,
	userCreateForm
};
