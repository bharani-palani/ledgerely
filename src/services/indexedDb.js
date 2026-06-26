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
//   status: "PENDING" | "SYNCING" | "FAILED" | "COMPLETED";
//   retryCount: number;
//   error?: string;
//   createdAt: number;
//   updatedAt: number;
// }

db.version(1).stores({
  apiCache: "key",
  syncQueue: "++id,status,type,entity,apiUrl,localId,serverId,payload,retryCount,error,createdAt,updatedAt",
  categoryList: "++id, isIncomeMetric, isPlanMetric, value",
  categoryTable: "++inc_exp_cat_id, inc_exp_cat_is_metric, inc_exp_cat_is_plan_metric, inc_exp_cat_name",
});
