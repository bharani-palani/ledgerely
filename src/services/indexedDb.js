import Dexie from "dexie";

export const db = new Dexie("LedgerelyDB");

db.version(1).stores({
  apiCache: "key",
  categoryList: "++id, isIncomeMetric, isPlanMetric, value",
  categoryTable: "++inc_exp_cat_id, inc_exp_cat_is_metric, inc_exp_cat_is_plan_metric, inc_exp_cat_name",
});
