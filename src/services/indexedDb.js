import Dexie from "dexie";

export const db = new Dexie("LedgerelyDB");

db.version(1).stores({
  categoryList: "++id, isIncomeMetric, isPlanMetric, value",
  categoryTable: "++inc_exp_cat_id, inc_exp_cat_is_metric, inc_exp_cat_is_plan_metric, inc_exp_cat_name",
  categorisedBankTransactions: "++inc_exp_id, inc_exp_amount, inc_exp_comments, inc_exp_date, inc_exp_name, inc_exp_type",
  categorisedCreditCardTransactions:
    "++cc_id, cc_comments, cc_date, cc_payment_credits, cc_purchases, cc_taxes_interest, cc_transaction, credit_card_name",
});
