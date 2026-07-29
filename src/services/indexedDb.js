import Dexie from "dexie";

export const db = new Dexie("LedgerelyDB");

// export interface SyncQueue {
//   id?: number;                 // Auto increment
//   entity: string;              // e.g. "users", "orders"
//   apiUrl: string;
//   localId: string;             // IndexedDB record id
//   serverId?: string;           // API id if already synced
//   type: "INSERT" | "UPDATE" | "DELETE";
//   payload: any;                // Data to send to API
//   status: "PENDING" | "FAILED" | "COMPLETED" | "INPROGRESS";
//   retryCount: number;
//   error?: string;
//   createdAt: number;
//   updatedAt: number;
// }
db.version(3).stores({
  apiCache: "key, [tenantId+key], tenantId, updatedAt",
  statics: "[tenantId+key], tenantId, key, updatedAt",
  syncQueue:
    "++id,[status+entity+type+tenantId],[status+entity],[status+tenantId],[updatedAt],[serverId+tenantId],[localId+tenantId],[tenantId+createdAt],status,type,entity,apiUrl,localId,serverId,payload,retryCount,error,createdAt,updatedAt, tenantId",
  categoryList: "++id, isIncomeMetric, isPlanMetric, value, tenantId",
  categoryTable: "++inc_exp_cat_id, inc_exp_cat_is_metric, inc_exp_cat_is_plan_metric, inc_exp_cat_name, tenantId",
  bankList: "++id, value, tenantId, sortOrder, [sortOrder]",
  bankTable:
    "++bank_id, bank_name, bank_account_number, bank_swift_code, bank_account_type, bank_country, bank_sort, bank_locale, bank_currency, tenantId",
  creditCardList: "++id, value, tenantId",
  creditCardTable:
    "++credit_card_id, credit_card_name, credit_card_number, credit_card_start_date, credit_card_end_date, credit_card_payment_date, credit_card_annual_interest, credit_card_limit, credit_card_locale, credit_card_currency, tenantId",
  scheduleTable:
    "++template_id, temp_inc_exp_name, temp_amount, temp_inc_exp_type, temp_inc_exp_date, temp_inc_exp_month, temp_inc_exp_year, temp_category, temp_bank, tenantId",
  bankYearList: "++id, value, tenantId",
  ccYearList: "++id, value, tenantId",
  bankTransactionTable:
    "++inc_exp_id, inc_exp_name, inc_exp_amount, inc_exp_plan_amount, inc_exp_type, inc_exp_date, inc_exp_category, inc_exp_bank, inc_exp_comments, inc_exp_added_at, inc_exp_is_planned, tenantId",
  creditCardTransactionTable:
    "++cc_id, cc_transaction, cc_date, cc_opening_balance, cc_payment_credits, cc_purchases, cc_taxes_interest, cc_expected_balance, cc_for_card, cc_inc_exp_cat, cc_transaction_status, cc_comments, cc_added_at, tenantId",
  aiChatTable: "++chatId, prompt, data, createdAt, tenantId, [tenantId+createdAt]",
  localeTable: "++localeId, locale, data, updatedAt, [locale], [updatedAt]",
});
