import React, { useState, useContext, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import Table from "../shared/D3/Table";
import { db } from "../../services/indexedDb";
import { useLiveQuery } from "dexie-react-hooks";
import moment from "moment";
import useAxios from "../../services/apiServices";
import helpers from "../../helpers";
import { LocaleContext } from "../../contexts/LocaleContext";
import _ from "lodash";

const NetworkStatus = () => {
  const { apiInstance } = useAxios();
  const { isOnline, isNavigatorSupport } = useNetworkStatus();
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const [isSyncing, setIsSyncing] = useState(false);
  const [popup, setPopup] = useState(false);
  const [quota, setQuota] = useState({
    usage: 0,
    quota: 0,
    usagePercentage: 0,
  });

  const StatusIcon = ({ status }) => {
    const refObject = {
      PENDING: "fa fa-hourglass-half text-warning",
      INPROGRESS: "fa fa-cog fa-spin text-primary",
      COMPLETED: "fa fa-check text-success",
      FAILED: "fa fa-exclamation-triangle text-danger",
    };
    return <i className={refObject[status]} title={status} />;
  };

  const ExpandedData = ({ item }) => {
    const { retryCount, error, createdAt, updatedAt, status, type } = item;
    const payloadValues = type !== "DELETE" ? Object.values(_.omit(item?.payload[0], "localId")).slice(1).join(" | ") : false;
    return (
      <div className='d-flex justify-content-between'>
        <div className='d-flex flex-column gap-1'>
          {status === "FAILED" && retryCount > 0 && (
            <div>
              <span>
                <i className='fa fa-refresh pe-2' />
                {retryCount}
              </span>
            </div>
          )}
          <div>
            <span>
              <i className='fa fa-clock-o pe-2' />
              {createdAt}
            </span>
          </div>
          {updatedAt && (
            <div>
              <span>
                <i className='fa fa-pencil pe-2' />
                {updatedAt}
              </span>
            </div>
          )}
          {error && (
            <div className='d-flex align-items-center text-danger gap-2'>
              <i className='fa fa-exclamation-triangle' />
              <div>
                {error?.status && <div>Error code: {error.status}</div>}
                {error?.errorMessage && <div>{error.errorMessage}</div>}
              </div>
            </div>
          )}
        </div>
        {payloadValues && (
          <div title={payloadValues} className='text-primary px-2 py-1 rounded' style={{ border: "dashed 1px", cursor: "help" }}>
            <div className='badge bg-primary'>
              <FormattedMessage id='transaction' defaultMessage='transaction' />:
            </div>
            <br />
            <div className='text-truncate d-inline-block' style={{ maxWidth: "200px", minWidth: "200px" }}>
              {payloadValues}
            </div>
          </div>
        )}
        <div className='d-flex align-items-center justify-content-center'>
          {status !== "COMPLETED" && (
            <div className='d-flex gap-2'>
              <Button onClick={() => onRetry(item)} size='sm' className='btn-primary rounded-circle'>
                <i className='fa fa-repeat' />
              </Button>
              <Button onClick={() => onDelete(item)} size='sm' className='btn-danger rounded-circle'>
                <i className='fa fa-trash' />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const allRecords = useLiveQuery(() => db.syncQueue.orderBy("createdAt").limit(100).reverse().toArray(), [], []);
  const tableData = useMemo(() => {
    return (allRecords ?? []).map(item => ({
      entity: item.entity.replaceAll("_", " ").toUpperCase(),
      type: item.type,
      status: <StatusIcon status={item.status} />,
      expandedData: <ExpandedData item={item} />,
    }));
  }, [allRecords]);

  const onRetry = async item => {
    try {
      await processItem(item);
    } catch (e) {
      console.error(e);
    }
  };

  const onDelete = async item => {
    await db.syncQueue.delete(item.id);
  };

  const processItem = async item => {
    try {
      db.syncQueue.update(item.id, {
        status: "INPROGRESS",
      });
      const response = await ajaxSingle(item);
      if (response.success === false) {
        throw {
          response: {
            data: {
              error: response.error,
            },
          },
        };
      }
      await db.syncQueue.update(item.id, {
        status: "COMPLETED",
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        error: null,
      });
      return response;
    } catch (e) {
      const error = e.response?.data?.error ?? {
        errorCode: e.response?.data?.error.errorCode,
        errorMessage: e.response?.data?.error.errorMessage,
      };

      await db.syncQueue.update(item.id, {
        status: "FAILED",
        retryCount: item.retryCount + 1,
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        error: {
          status: error.errorCode,
          errorMessage: error.errorMessage,
        },
      });

      throw e;
    }
  };

  const ajaxSingle = async item => {
    const action = {
      UPDATE: "updateData",
      DELETE: "deleteData",
      INSERT: "insertData",
    };
    const Table = item.entity;
    const santizedPayload = item.payload.every(item => typeof item === "object")
      ? helpers.stripArrayKeys(item.payload, ["isSync", "localId"])
      : item.payload;

    const formPayload = {
      Table,
      [action[item.type]]: santizedPayload,
    };
    const formdata = new FormData();
    formdata.append("postData", JSON.stringify(formPayload));
    formdata.append("tenantId", userContext.userConfig.tenantId);
    const response = await apiInstance.post(item.apiUrl, formdata);
    return response.data;
  };

  const syncQueue = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const queue = await db.syncQueue.where("status").equals("PENDING").sortBy("updatedAt");
      for (const item of queue) {
        try {
          await processItem(item);
        } catch (e) {
          console.error("Sync failed:", e);
        }
      }
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const isQueueCompleted = async () => {
      const count = await db.syncQueue.where("status").anyOf(["PENDING", "INPROGRESS", "FAILED"]).count();
      if (count === 0) {
        await db.syncQueue.where("status").equals("COMPLETED").delete();
      }
    };
    if (isOnline) {
      syncQueue();
    }
    if (!isOnline) {
      isQueueCompleted();
    }
  }, [isOnline]);

  useEffect(() => {
    getOfflineQuotaDetails();
  }, []);

  const getOfflineQuotaDetails = async () => {
    try {
      const result = await navigator.storage.estimate();
      setQuota({
        usage: result.usage || 0,
        quota: result.quota || 0,
        usagePercentage: result.usage && result.quota ? (result.usage / result.quota) * 100 : 0,
      });
    } catch (error) {
      console.error("Error estimating storage:", error);
    }
  };

  const SyncModal = props => {
    return (
      <Modal {...props} style={{ zIndex: 10000 }}>
        <Modal.Header closeButton>
          <Modal.Title className='w-100'>
            <div className='d-flex align-items-center justify-content-between'>
              <div>
                <FormattedMessage id='offLineDataSyncStatus' defaultMessage='offLineDataSyncStatus' />
              </div>
              <div className='badge bg-secondary'>
                {tableData.length || 0} <FormattedMessage id='recordsFound' defaultMessage='recordsFound' />
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`rounded-bottom p-0 ${userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}>
          <div className='table-responsive'>
            {tableData.length > 0 ? (
              <Table
                data={tableData}
                className='shadow-lg rounded'
                fillColor={userContext.userData.theme === "dark" ? "#343a40" : "#ffffff"}
                fontColor={userContext.userData.theme === "dark" ? "#ffffff" : "#000000"}
                lineColor={userContext.userData.theme === "dark" ? "#495057" : "#dee2e6"}
                fontSize={14}
                padding={0.5}
                width={`100%`}
                height={"500px"}
                expandableKey='expandedData'
              />
            ) : (
              <div className='text-center p-3'>
                <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer
          className={`border-0 rounded-bottom p-0 ${userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}
        >
          <div className='d-flex flex-column w-100 p-1'>
            <div className='d-flex justify-content-between'>
              <div>
                <span className='badge bg-secondary'>
                  <FormattedMessage id='limit' defaultMessage='limit' />
                </span>
              </div>
              <div>
                <span className='badge bg-success'>
                  <i className='fa fa-check-circle pe-1' />
                  {`${(quota?.usage / 1024 / 1024).toFixed(2)} MB`}
                </span>
              </div>
              <div>
                <span className='badge bg-primary'>
                  <i className='fa fa-check-square pe-1' />
                  {quota?.usagePercentage.toFixed(2)}%
                </span>
              </div>
              <div>
                <span className='badge bg-danger'>
                  <i className='fa fa-tachometer pe-1' />
                  {`${(quota?.quota / 1024 / 1024).toLocaleString(localeContext.localeLanguage, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} MB`}
                </span>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    isNavigatorSupport && (
      <>
        {popup && <SyncModal className='accountPlanner' show={popup} onHide={() => setPopup(false)} size='lg' backdrop='static' />}
        <button
          onClick={() => setPopup(true)}
          className={`btn btn-sm btn-outline-${isSyncing ? "primary" : isOnline ? "success" : "danger"} rounded-pill d-flex align-items-center`}
        >
          {isSyncing ? <i className='fa fa-cog fa-spin fa-fw' /> : <i className={`fa fa-${isOnline ? "wifi" : "plug"} pe-1`} />}
          {isSyncing ? (
            <FormattedMessage id='syncing' defaultMessage='syncing' />
          ) : (
            <FormattedMessage id={isOnline ? "online" : "offline"} defaultMessage={isOnline ? "online" : "offline"} />
          )}
        </button>
      </>
    )
  );
};

export default NetworkStatus;
