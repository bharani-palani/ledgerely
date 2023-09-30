import moment from "moment";

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
    ],
    TableAliasRows: ["", "Name", "Mobile", "Email", "Address", "Website"],
    rowElements: [
      "checkbox",
      "textbox",
      "textbox",
      "textbox",
      "textarea",
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
    cellWidth: "40rem",
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
    rowElements: ["checkbox", "textarea", "number"],
    cellWidth: "30rem",
  },
  {
    id: 15,
    label: "Technical Skills",
    Table: "resume_05_tech_skills",
    TableRows: ["tech_skill_id", "tech_skill_label", "tech_sort"],
    TableAliasRows: ["", "Label", "Sort Order"],
    rowElements: ["checkbox", "textarea", "number"],
    cellWidth: "30rem",
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
      "textarea",
      {
        fetch: {
          dropDownList: [],
        },
      },
      "number",
    ],
    cellWidth: "30rem",
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
    id: "bankAccounts",
    Table: "banks",
    config: {
      footer: {
        total: {},
        pagination: {
          currentPage: "last",
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    },
    label: "Bank accounts",
    TableRows: [
      "bank_id",
      "bank_name",
      "bank_account_number",
      "bank_swift_code",
      "bank_account_type",
      "bank_country",
      "bank_sort",
      "bank_locale",
      "bank_currency",
    ],
    defaultValues: [{ bank_sort: "0" }],
    cellWidth: [4, 13, 11, 11, 13, 13, 5, 13, 13],
  },
  {
    id: "creditCardAccounts",
    Table: "credit_cards",
    label: "Credit cards",
    TableRows: [
      "credit_card_id",
      "credit_card_name",
      "credit_card_number",
      "credit_card_start_date",
      "credit_card_end_date",
      "credit_card_payment_date",
      "credit_card_annual_interest",
      "credit_card_locale",
      "credit_card_currency",
    ],
    defaultValues: [{ credit_card_annual_interest: "48" }],
    cellWidth: [4, 13, 11, 8, 8, 8, 8, 13, 13],
  },
  {
    id: "incExpCat",
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
    TableRows: [
      "inc_exp_cat_id",
      "inc_exp_cat_name",
      "inc_exp_cat_is_metric",
      "inc_exp_cat_is_plan_metric",
    ],
    defaultValues: [
      { inc_exp_cat_is_metric: "0" },
      { inc_exp_cat_is_plan_metric: "0" },
    ],
    cellWidth: [4, 13, 13, 13],
  },
  {
    id: "incExpTemp",
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
      "temp_inc_exp_date",
      "temp_category",
      "temp_bank",
    ],
    defaultValues: [
      { temp_inc_exp_date: "1" },
      { temp_inc_exp_type: "Dr" },
      { temp_amount: "0.00" },
    ],
    cellWidth: [4, 13, 13, 13, 5, 13, 13],
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
    TableAliasRows: [],
    defaultValues: [
      { inc_exp_type: "Dr" },
      { inc_exp_amount: 0 },
      { inc_exp_plan_amount: 0 },
      { inc_exp_date: moment(new Date()).format("YYYY-MM-DD") },
    ],
    rowKeyUp: "",
    rowElements: [
      "checkbox",
      "textbox",
      "number",
      "label",
      null,
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
      "cc_transaction_status",
      "cc_comments",
      "cc_added_at",
    ],
    TableAliasRows: [],
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
      {
        fetch: {
          dropDownList: [
            { checked: false, id: "1", value: "Settled" },
            { checked: false, id: "0", value: "Pending" },
            { checked: false, id: "2", value: "Part payment" },
          ],
        },
      },
      "textbox",
      "relativeTime",
    ],
    defaultValues: [
      { cc_date: moment().format("YYYY-MM-DD") },
      { cc_opening_balance: 0 },
      { cc_payment_credits: 0 },
      { cc_purchases: 0 },
      { cc_taxes_interest: 0 },
      { cc_expected_balance: 0 },
      { cc_transaction_status: "0" },
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

export {
  configArray,
  resumeArray,
  crudFormArray,
  monthExpenditureConfig,
  creditCardConfig,
  configPanel,
};
