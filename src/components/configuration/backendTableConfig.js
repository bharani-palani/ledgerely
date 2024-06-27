import moment from "moment";

const crudFormArray = [
  {
    id: "bankAccounts",
    Table: "banks",
    config: {
      footer: {
        total: {},
        pagination: {
          currentPage: "last",
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
          maxPagesToShow: 5,
        },
      },
      searchable: true,
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

export { crudFormArray, monthExpenditureConfig, creditCardConfig, configPanel };
