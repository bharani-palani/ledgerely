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

db.version(1).stores({
  apiCache: "key",
  statics: "&key, updatedAt",
  syncQueue:
    "++id,[status+entity+type],[status+entity],[updatedAt],status,type,entity,apiUrl,localId,serverId,payload,retryCount,error,createdAt,updatedAt",
  categoryList: "++id, isIncomeMetric, isPlanMetric, value",
  categoryTable: "++inc_exp_cat_id, inc_exp_cat_is_metric, inc_exp_cat_is_plan_metric, inc_exp_cat_name",
  bankList: "++id, value",
  bankTable: "++bank_id, bank_name, bank_account_number, bank_swift_code, bank_account_type, bank_country, bank_sort, bank_locale, bank_currency",
  creditCardList: "++id, value",
  creditCardTable:
    "++credit_card_id, credit_card_name, credit_card_number, credit_card_start_date, credit_card_end_date, credit_card_payment_date, credit_card_annual_interest, credit_card_limit, credit_card_locale, credit_card_currency",
  scheduleTable:
    "++template_id, temp_inc_exp_name, temp_amount, temp_inc_exp_type, temp_inc_exp_date, temp_inc_exp_month, temp_inc_exp_year, temp_category, temp_bank",
  bankYearList: "++id, value",
  ccYearList: "++id, value",
  bankTransactionTable:
    "++inc_exp_id, inc_exp_name, inc_exp_amount, inc_exp_plan_amount, inc_exp_type, inc_exp_date, inc_exp_category, inc_exp_bank, inc_exp_comments, inc_exp_added_at, inc_exp_is_planned",
});
