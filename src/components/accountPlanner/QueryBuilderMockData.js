const creditCard = {
  fields: {
    T1: [
      { field: "inc_exp_cat_id", marker: true, relationId: "blue", type: "int(11)"},
      { field: "inc_exp_cat_name", type: "varchar(40)" },
    ],
    T2: [
      { field: "credit_card_id", marker: true, relationId: "red", type: "int(11)"},
      { field: "credit_card_name", type: "varchar(40)" },
      { field: "credit_card_number", type: "varchar(20)" },
      { field: "credit_card_start_date", type: "char(2)" },
      { field: "credit_card_end_date", type: "char(2)" },
      { field: "credit_card_payment_date", type: "char(2)" },
    ],
    T3: [
      { field: "cc_id", marker: true, type: "int(11)" },
      { field: "cc_transaction", type: "varchar(100)" },
      { field: "cc_date", type: "date" },
      { field: "cc_opening_balance", type: "decimal(10,2)" },
      { field: "cc_payment_credits", type: "decimal(10,2)" },
      { field: "cc_purchases", type: "decimal(10,2)" },
      { field: "cc_taxes_interest", type: "decimal(10,2)" },
      { field: "cc_expected_balance", type: "decimal(10,2)" },
      { field: "cc_for_card", relationId: "red", type: "int(11)" },
      { field: "cc_inc_exp_cat", relationId: "blue", type: "int(11)" },
      { field: "cc_comments", type: "varchar(100)" },
    ],
  },
  tables: {
    T1: "income_expense_category",
    T2: "credit_cards",
    T3: "credit_card_transactions",
  },
};

const incomeExpense = {
  fields: {
    T1: [
      {
        field: "inc_exp_cat_id",
        marker: true,
        relationId: "red",
        type: "int(11)",
      },
      { field: "inc_exp_cat_name", type: "varchar(40)" },
    ],
    T2: [
      { field: "bank_id", marker: true, relationId: "blue", type: "int(11)" },
      { field: "bank_name", type: "varchar(40)" },
      { field: "bank_account_number", type: "varchar(20)" },
      { field: "bank_ifsc_code", type: "varchar(15)" },
      { field: "bank_card_no", type: "varchar(20)" },
      { field: "bank_card_validity", type: "varchar(7)" },
      { field: "isPrimaryAccount", type: "tinyint(1)" },
    ],
    T3: [
      { field: "inc_exp_id", marker: true, type: "int(11)" },
      { field: "inc_exp_name", type: "varchar(100)" },
      { field: "inc_exp_amount", type: "decimal(10,2)" },
      { field: "inc_exp_plan_amount", type: "decimal(10,2)" },
      { field: "inc_exp_type", type: "char(2)" },
      { field: "inc_exp_date", type: "date" },
      { field: "inc_exp_category", relationId: "red", type: "int(11)" },
      { field: "inc_exp_bank", relationId: "blue", type: "int(11)" },
      { field: "inc_exp_comments", type: "varchar(100)" },
    ],
  },
  tables: {
    T1: "income_expense_category",
    T2: "banks",
    T3: "income_expense",
  },
};

export { creditCard, incomeExpense };
