import helpers from "../../helpers";
import _ from 'lodash';

const configArray = [
  {
    id: 1,
    label: "Awards",
    Table: "awards",
    TableRows: ["award_id", "award_label", "award_value", "award_sort"],
    TableAliasRows: ["", "Label", "Value", "Sort"],
    rowElements: ["checkbox", "textbox", "textarea", "number"],
  },
  {
    id: 2,
    label: "Technolgies",
    Table: "technologies",
    TableRows: [
      "tech_id",
      "tech_label",
      "tech_value",
      "tech_image_url",
      "tech_sort",
    ],
    TableAliasRows: ["", "Label", "Value", "Image URL", "Sort order"],
    rowElements: ["checkbox", "textbox", "textarea", "textbox", "number"],
  },
  {
    id: 3,
    label: "Projects",
    Table: "projects",
    TableRows: ["project_id", "project_label", "project_value", "project_sort"],
    TableAliasRows: ["", "Label", "Value", "Sort order"],
    rowElements: ["checkbox", "textbox", "textarea", "number"],
  },
  {
    id: 4,
    label: "Skills",
    Table: "skills",
    TableRows: [
      "skill_id",
      "skill_label",
      "skill_value",
      "skill_image_url",
      "skill_sort",
    ],
    TableAliasRows: ["", "Label", "Value", "Image URL", "Sort order"],
    rowElements: ["checkbox", "textbox", "textarea", "textbox", "number"],
  },
  {
    id: 5,
    label: "About",
    Table: "login",
    TableRows: [
      "user_id",
      "display_name",
      "profile_name",
      "user_mail",
      "user_mobile",
      "latitude",
      "longitude",
      "google_map_api_key",
      "google_login_auth_token",
      "google_id",
      "address1",
      "address2",
      "city",
      "state",
      "country",
      "postcode",
      "locale",
      "maximumFractionDigits",
      "currency",
    ],
    TableAliasRows: [
      "",
      "Display Name",
      "Profile Name",
      "Email",
      "Mobile",
      "Latitude",
      "Longitude",
      "Google Map API Key",
      "Google Login Auth Token",
      "Google ID",
      "Address 1",
      "Address 2",
      "City",
      "State",
      "Country",
      "Postcode",
      "Locale",
      "Maximum Fraction Digits",
      "Currency",
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textbox",
      "number",
      "number",
      "number",
      "textarea",
      "textarea",
      "textbox",
      "textarea",
      "textarea",
      "textbox",
      "textbox",
      "textbox",
      "number",
      "textbox",
      "number",
      "textbox",
    ],
  },
  {
    id: 6,
    label: "Contact",
    Table: "contacts",
    TableRows: [
      "contact_id",
      "contact_label",
      "contact_value",
      "contact_href",
      "contact_sort",
    ],
    TableAliasRows: ["", "Label", "Value", "Href", "Sort order"],
    rowElements: ["checkbox", "textbox", "textbox", "textbox", "number"],
  },
  {
    id: 7,
    label: "About Images",
    Table: "about_images",
    TableRows: ["image_id", "image_url", "image_order"],
    TableAliasRows: ["", "Image URL", "Sort order"],
    rowElements: ["checkbox", "textbox", "number"],
  },
  {
    id: 8,
    label: "IDE",
    Table: "ide",
    TableRows: [
      "ide_id",
      "ide_label",
      "ide_value",
      "ide_image_url",
      "ide_sort",
    ],
    TableAliasRows: ["", "Label", "Value", "Image URL", "Sort order"],
    rowElements: ["checkbox", "textbox", "textarea", "textbox", "number"],
  },
  {
    id: 9,
    label: "Operating System",
    Table: "operating_system",
    TableRows: ["os_id", "os_label", "os_value", "os_image_url", "os_sort"],
    TableAliasRows: ["", "Label", "Value", "Image URL", "Sort order"],
    rowElements: ["checkbox", "textbox", "textarea", "textbox", "number"],
  },
  {
    id: 10,
    label: "Public comments",
    Table: "public_comments",
    TableRows: [
      "comment_id",
      "comment_name",
      "comment_mobile",
      "comment_description",
      "comment_email",
      "comment_ip",
      "latitude",
      "longitude",
    ],
    TableAliasRows: [
      "",
      "Name",
      "Mobile",
      "Description",
      "Email",
      "IP Address",
      "Latitude",
      "Longitude",
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textarea",
      "textbox",
      "textbox",
      "number",
      "number",
    ],
  },
];

const resumeArray = [
  {
    id: 11,
    label: "Header",
    Table: "resume_01_header",
    TableRows: [
      "header_id",
      "header_name",
      "header_mobile",
      "header_email",
      "header_address",
      "header_web",
      "config_arrow_font",
    ],
    TableAliasRows: [
      "",
      "Name",
      "Mobile",
      "Email",
      "Address",
      "Website",
      "Arrow font",
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textbox",
      "textarea",
      "textbox",
      "textbox",
    ],
  },
  {
    id: 12,
    label: "Career Objective",
    Table: "resume_02_career_objective",
    TableRows: ["career_id", "career_title", "career_description"],
    TableAliasRows: ["", "Title", "Description"],
    rowElements: ["checkbox", "textbox", "textarea"],
  },
  {
    id: 13,
    label: "Work summary",
    Table: "resume_03_work_summary",
    TableRows: [
      "work_id",
      "work_company",
      "work_country",
      "work_start_date",
      "work_end_date",
      "work_sort",
    ],
    TableAliasRows: [
      "",
      "Company",
      "Country",
      "Start Date",
      "End Date",
      "Sort Order",
    ],
    rowElements: ["checkbox", "textbox", "textbox", "date", "date", "number"],
  },
  {
    id: 14,
    label: "Profesional Highlights",
    Table: "resume_04_pro_highlights",
    TableRows: ["pro_id", "pro_text", "pro_sort"],
    TableAliasRows: ["", "Text", "Sort Order"],
    rowElements: ["checkbox", "textbox", "number"],
  },
  {
    id: 15,
    label: "Technical Skills",
    Table: "resume_05_tech_skills",
    TableRows: ["tech_skill_id", "tech_skill_label", "tech_sort"],
    TableAliasRows: ["", "Label", "Sort Order"],
    rowElements: ["checkbox", "textbox", "number"],
  },
  {
    id: 16,
    label: "Project Experience",
    Table: "resume_06_project_experience",
    TableRows: [
      "project_id",
      "project_name",
      "project_role",
      "project_introduction",
      "project_company_id",
      "project_duration_months",
      "project_sort_order",
    ],
    TableAliasRows: [
      "",
      "Name",
      "Role",
      "Introduction",
      "Company",
      "Duration (months)",
      "Sort Order",
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textarea",
      {
        fetch: {
          dropDownList: [],
        },
      },
      "number",
      "number",
    ],
  },
  {
    id: 17,
    label: "Roles & responsibilities",
    Table: "resume_07_roles_and_responsibilities",
    TableRows: ["role_id", "role_label", "project_id", "role_order"],
    TableAliasRows: ["", "Label", "Project", "Sort Order"],
    rowElements: [
      "checkbox",
      "textbox",
      {
        fetch: {
          dropDownList: [],
        },
      },
      "number",
    ],
  },
  {
    id: 18,
    label: "Education",
    Table: "resume_08_education",
    TableRows: [
      "edu_id",
      "edu_graduation_acronym",
      "edu_graduation_abbreviation",
      "edu_graduation_institution",
      "edu_graduation_year",
      "edu_graduation_percent",
      "edu_graduation_sort",
    ],
    TableAliasRows: [
      "",
      "Acronym",
      "Abbreviation",
      "Institution",
      "Year",
      "Percent",
      "Sort Order",
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textbox",
      "textbox",
      "textbox",
      "number",
    ],
  },
  {
    id: 19,
    label: "Extracurricular activities",
    Table: "resume_09_activities",
    TableRows: ["activity_id", "activity_name", "activity_order"],
    TableAliasRows: ["", "Activity", "Sort Order"],
    rowElements: ["checkbox", "textbox", "number"],
  },
  {
    id: 20,
    label: "Personal information",
    Table: "resume_10_personal_info",
    TableRows: ["info_id", "info_key", "info_value", "info_order"],
    TableAliasRows: ["", "Key", "Value", "Sort Order"],
    rowElements: ["checkbox", "textbox", "textbox", "number"],
  },
  {
    id: 21,
    label: "Footer",
    Table: "resume_11_footer",
    TableRows: [
      "footer_id",
      "footer_text",
      "footer_place",
      "footer_signature_name",
    ],
    TableAliasRows: ["", "Text", "Place", "Signature Name"],
    rowElements: ["checkbox", "textbox", "textbox", "textbox"],
  },
];

const crudFormArray = [
  {
    id: 22,
    Table: "banks",
    config: {
      footer: {
        total: {},
        pagination: {},
      },
    },
    label: "Bank accounts",
    TableRows: [
      "bank_id",
      "bank_name",
      "bank_account_number",
      "bank_ifsc_code",
      "bank_card_no",
      "bank_card_validity",
      "isPrimaryAccount",
    ],
    TableAliasRows: [
      "",
      "Name",
      "Account Number",
      "IFSC Code",
      "Card Number",
      "Validity",
      "Primary Account",
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textbox",
      "textbox",
      "textbox",
      {
        radio: {
          radioList: [
            { label: "Yes", value: "1", checked: false },
            { label: "No", value: "0", checked: true },
          ],
        },
      },
    ],
    defaultValues: [{ isPrimaryAccount: "0" }],
  },
  {
    id: 23,
    Table: "credit_cards",
    label: "Credit cards",
    TableRows: [
      "credit_card_id",
      "credit_card_name",
      "credit_card_number",
      "credit_card_start_date",
      "credit_card_end_date",
      "credit_card_payment_date",
    ],
    TableAliasRows: [
      "",
      "Name",
      "Number",
      "Start Date",
      "End Date",
      "Payment Date",
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "number",
      "number",
      "number",
    ],
  },
  {
    id: 24,
    config: {
      footer: {
        total: {},
        pagination: {
          currentPage: "last", // first or last
          recordsPerPage: 5,
          maxPagesToShow: 5,
        },
      },
    },
    Table: "vendors",
    label: "Vendors",
    TableRows: ["vendor_id", "vendor_name", "vendor_limit"],
    TableAliasRows: ["", "Name", "Limit"],
    rowElements: ["checkbox", "textbox", "number"],
  },
  {
    id: 25,
    config: {
      footer: {
        total: {},
        pagination: {
          currentPage: "last", // first or last
          recordsPerPage: 5,
          maxPagesToShow: 5,
        },
      },
    },
    Table: "income_expense_category",
    label: "Income / expense categories",
    TableRows: ["inc_exp_cat_id", "inc_exp_cat_name", "inc_exp_cat_vendor"],
    TableAliasRows: ["", "Name", "Vendor"],
    rowElements: [
      "checkbox",
      "textbox",
      {
        fetch: {
          dropDownList: [],
        },
      },
    ],
  },
  {
    id: "24A",
    config: {
      footer: {
        total: {},
        pagination: {
          currentPage: "last", // first or last
          recordsPerPage: 5,
          maxPagesToShow: 5,
        },
      },
    },
    Table: "income_expense_template",
    label: "Income expense template",
    TableRows: [
      "template_id",
      "temp_inc_exp_name",
      "temp_amount",
      "temp_inc_exp_type",
    ],
    TableAliasRows: ["", "Name", "Amount", "Type"],
    showTotal: [
      {
        whichKey: "temp_amount",
        forKey: "temp_inc_exp_type",
        forCondition: "equals",
        forValue: ["Dr"],
        showDifference: { indexes: [], showStability: false },
      },
    ],
    rowElements: [
      "checkbox",
      "textbox",
      "number",
      {
        radio: {
          radioList: [
            { label: "Credit", value: "Cr", checked: false },
            { label: "Debit", value: "Dr", checked: true },
          ],
        },
      },
    ],
  },
];

const monthExpenditureConfig = [
  {
    id: 26,
    config: {
      footer: {
        total: {},
        pagination: {
          currentPage: "last", // first or last
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    },
    Table: "income_expense",
    label: "Expenditures for selected month",
    TableRows: [
      "inc_exp_id",
      "inc_exp_name",
      "inc_exp_amount",
      "inc_exp_plan_amount",
      "inc_exp_type",
      "inc_exp_date",
      "inc_exp_category",
      "inc_exp_bank",
      "inc_exp_comments",
    ],
    TableAliasRows: [
      "id",
      "Transaction",
      "Amount",
      "Plan",
      "Type",
      "Date",
      "Category",
      "Bank",
      "Comments",
    ],
    defaultValues: [
      { inc_exp_type: "Dr" },
      { inc_exp_date: helpers.DateToYYYYMMDD(new Date()) },
    ],
    showTotal: [
      {
        whichKey: "inc_exp_amount",
        forKey: "inc_exp_type",
        forCondition: "equals", // includes or equals
        forValue: ["Cr", "Dr"],
        showDifference: { indexes: [0, 1], showStability: true },
        // Ex:
        // 1. difference result = "Cr - Dr = Balance" Ex: "1000 - 750 = 250"
        // 2. showStability: (Settled), (Ahead), (YetTo) strings will be shown
      },
      {
        whichKey: "inc_exp_plan_amount",
        forKey: "inc_exp_type",
        forCondition: "equals",
        forValue: ["Cr", "Dr"],
        showDifference: { indexes: [0, 1], showStability: true },
      },
    ],
    rowKeyUp: "",
    rowElements: [
      "checkbox",
      "textbox",
      "number",
      "number",
      {
        radio: {
          radioList: [
            { label: "Credit", value: "Cr", checked: false },
            { label: "Debit", value: "Dr", checked: true },
          ],
        },
      },
      "date",
      {
        fetch: {
          dropDownList: [],
        },
      },
      {
        fetch: {
          dropDownList: [],
        },
      },
      "textbox",
    ],
    showTooltipFor: ["inc_exp_name", "inc_exp_comments"],
  },
];

const creditCardConfig = [
  {
    id: 27,
    config: {
      footer: {
        total: {},
        pagination: {
          currentPage: "last", // first or last
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    },
    Table: "credit_card_transactions",
    label: "Credit card transactions",
    TableRows: [
      "cc_id",
      "cc_transaction",
      "cc_date",
      "cc_opening_balance",
      "cc_payment_credits",
      "cc_purchases",
      "cc_taxes_interest",
      "cc_expected_balance",
      "cc_for_card",
      "cc_inc_exp_cat",
      "cc_comments",
    ],
    TableAliasRows: [
      "",
      "Transaction",
      "Date",
      "Opening",
      "Credits",
      "Purchases",
      "Interest",
      "Balance",
      "Card",
      "Category",
      "Comments",
    ],
    showTotal: [
      "cc_opening_balance",
      "cc_payment_credits",
      "cc_purchases",
      "cc_taxes_interest",
      "cc_expected_balance",
    ],
    rowKeyUp:
      "cc_expected_balance=((Number(row.cc_opening_balance) - Number(row.cc_payment_credits)) + (Number(row.cc_purchases) + Number(row.cc_taxes_interest))).toFixed(2)",
    rowElements: [
      "checkbox",
      "textbox",
      "date",
      "number",
      "number",
      "number",
      "number",
      "label",
      {
        fetch: {
          dropDownList: [],
        },
      },
      {
        fetch: {
          dropDownList: [],
        },
      },
      "textbox",
    ],
    defaultValues: [
      { cc_date: helpers.DateToYYYYMMDD(new Date()) },
      { cc_opening_balance: 0 },
      { cc_payment_credits: 0 },
      { cc_purchases: 0 },
      { cc_taxes_interest: 0 },
      { cc_expected_balance: 0 },
    ],
    showTooltipFor: ["cc_transaction", "cc_comments"],
  },
];

const configPanel = [
  {
    type: "text",
    field: "user_name",
    placeHolder: "Ex: John",
    defaultValue: "",
    maxLength: 25,
    mandatories: {
      required: true,
      validationRule: "minOne",
    },
    className: "",
    isHelp: {},
  },
];

const masterConfig = [
  {
    id: 'user_id',
    index: 'user_id',
    elementType: 'hidden',
    value: '',
  },
  {
    id: 'user_name',
    index: 'user_name',
    label: 'User Name',
    elementType: 'text',
    value: '',
    placeHolder: 'JohnDoe',
    className: 'form-control',
    options: {
      required: true,
      validation: /^[a-zA-Z0-9]{4,10}$/g,
      errorMsg: 'Input does not match criteria',
      help: [ `Min 4 letters`, `Max 10 letters`, `No special characters allowed` ]
    }
  },
  {
    id: 'display_name',
    index: 'display_name',
    label: 'Display Name',
    elementType: 'text',
    value: '',
    placeHolder: 'John Doe',
    className: 'form-control',
    options: {
      required: true,
      validation: /^[a-zA-Z0-9 ]{4,20}$/g,
      errorMsg: 'Input does not match criteria',
      help: [ `Min 4 letters`, `Max 20 letters`, `No special characters allowed` ]
    }
  },
  {
    id: 'profile_name',
    index: 'profile_name',
    label: 'Profile Name',
    elementType: 'text',
    value: '',
    placeHolder: 'Software Engineer',
    className: 'form-control',
    options: {
      required: true,
      validation: /^[a-zA-Z0-9 !@#$%^&|*]{4,50}$/g,
      errorMsg: 'Input does not match criteria',
      help: [ `Min 4 letters`, `Max 50`, `No special characters allowed` ]
    }
  },
  // {
  // 	id: 'password',
  // 	index: 'password',
  // 	label: 'Password',
  // 	elementType: 'password',
  // 	value: '',
  // 	placeHolder: 'Welcome@123',
  // 	className: 'form-control',
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
  {
    id: 'user_mobile',
    index: 'user_mobile',
    label: 'Mobile',
    elementType: 'number',
    value: '',
    placeHolder: '9XXXX12345',
    className: 'form-control',
    options: {
      required: true,
      validation: /^[0-9]{10}$/,
      errorMsg: 'Enter a valid 10 digit mobile number'
    }
  },
  {
    id: 'user_mail',
    index: 'user_mail',
    label: 'Email',
    elementType: 'text',
    value: '',
    placeHolder: 'John@Doe.com',
    className: 'form-control',
    options: {
      required: true,
      validation: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      errorMsg: 'Enter a valid email',
      help: [`You will get only monthly updates on this application`]
    }
  },
  {
    id: 'latitude',
    index: 'latitude',
    label: 'Geo Latitude',
    elementType: 'number',
    value: '',
    placeHolder: '13.80',
    className: 'form-control',
    options: {
      validation: /$/,
      errorMsg: '',
      help: [
        `Open Google maps`,
        `Find your home or office`,
        `Right click the location to get your latitude`
      ]
    }
  },
  {
    id: 'longitude',
    index: 'longitude',
    label: 'Geo Longitude',
    elementType: 'number',
    value: '',
    placeHolder: '80.80',
    className: 'form-control',
    options: {
      validation: /$/,
      errorMsg: '',
      help: [
        `Open Google maps`,
        `Find your home or office`,
        `Right click the location to get your longitude`
      ]
    }
  },
  {
    id: 'google_map_api_key',
    index: 'google_map_api_key',
    label: 'Google Map API Key',
    elementType: 'textArea',
    value: '',
    placeHolder: 'xxYYzz',
    className: 'form-control',
    options: {
      validation: /$/,
      errorMsg: '',
      help: [
        `Go to <a target="_blank" href='https://console.cloud.google.com/'>https://console.cloud.google.com/</a>`,
        `Scroll and click Google Maps Platform`,
        `Click Credentials`,
        `Click +Create Credentials at the top center`,
        `Click API Key`,
        `Copy the generated key`,
        `Paste here and save`,
        `This helps people to reach you, using <a href="${document.location.origin}/contact page">${document.location.origin}/contact page</a>, on clicking the map marker icon`,
        `Note: You shud've configured latitude, longitude correctly`,
        `Now, you can trace people from where they message you in ${document.location.origin}/write blog`
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
    className: 'form-control',
    options: {
      validation: /$/,
      errorMsg: '',
      help: [
        `Go to <a target="_blank" href='https://console.cloud.google.com/'>https://console.cloud.google.com/</a>`,
        `Click API Services`,
        `Click Credentials`,
        `Click +Create Credentials at the top center`,
        `Click Oauth Client Id`,
        `Select Web Application, give a suitable name`,
        `Click Add URI and type your domain URL.`,
        `Click Create`,
        `Copy Client ID`,
        `Paste here. You're done.`
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
    className: 'form-control',
    options: {
      required: true,
      validation: /([^\s])/,
      errorMsg: 'Google Id is required',
      help: [
        `Go to <a target="_blank" href="https://mail.google.com/">https://mail.google.com/</a>`,
        `Open Developer tools (ctrl + shift + i)`,
        `Click Application tab`,
        `Collapse LocalStorage`,
        `Collapse https://mail.google.com/`,
        `Select the first row in "Key" Column`,
        `Copy your Google Id (Shud be a long integer)`,
        `Paste it here and save`,
        `This helps you to login as admin and configure your settings`
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
    className: 'form-control',
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
    className: 'form-control',
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
    className: 'form-control',
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
    className: 'form-control',
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
    className: 'form-control',
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
    className: 'form-control',
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
    className: 'form-control',
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
      help: [ `Set your custom language locale`, `Usefull to see thousand seperators` ]
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
    className: 'form-control',
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
    className: 'form-control',
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
    className: 'form-control',
    options: {
      validation: /$/,
      errorMsg: 'Invalid key',
      help: [
        `An address that identifies you on UPI payments (typically yourname@bankname)`,
        `You can get this on your UPI mobile App, Account settings`,
        `Paste it here`,
        `Now, you can ask your payees to visit <a target="_blank" href="${document.location
          .origin}/contribute">${document.location.origin}/contribute</a> to transfer funds.`,
        `This helps you to avoid sharing your mobile number.`
      ],
      rowLength: 4
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
  masterConfig
};
