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

const NetworkStatus = () => {
  const { apiInstance } = useAxios();
  const { isOnline, isNavigatorSupport } = useNetworkStatus();
  const userContext = useContext(UserContext);
  const [isSyncing, setIsSyncing] = useState(false);
  const [popup, setPopup] = useState(false);

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
    const { retryCount, error, createdAt, updatedAt, status } = item;
    return (
      <div className='d-flex'>
        <div className='d-flex flex-column gap-1 w-75'>
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
          <div>
            <span>
              <i className='fa fa-pencil pe-2' />
              {updatedAt}
            </span>
          </div>
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
        <div className='d-flex w-25 align-items-center justify-content-center'>
          {status !== "COMPLETED" && (
            <Button onClick={() => onRetry(item)} size='sm' className='btn-bni text-wrap'>
              <i className='fa fa-repeat pe-1' />
              <FormattedMessage id='retry' defaultMessage='retry' />
            </Button>
          )}
          {status === "COMPLETED" && (
            <div className='badge bg-success'>
              <FormattedMessage id='youAreDone' defaultMessage='youAreDone' />
            </div>
          )}
        </div>
      </div>
    );
  };

  const onRetry = item => {
    ajaxSingle(item, async (data, stat) => {
      await db.syncQueue.update(item.id, {
        status: "INPROGRESS",
      });
      const { ...rest } = data;
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      if (stat === "success") {
        await db.syncQueue.update(item.id, {
          status: "COMPLETED",
          updatedAt: now,
          error: null,
        });
      } else {
        const error = rest.response.data.error;
        await db.syncQueue.update(item.id, {
          status: "FAILED",
          updatedAt: now,
          retryCount: item.retryCount + 1,
          error,
        });
      }
    });
  };

  const allRecords = useLiveQuery(() => db.syncQueue.orderBy("updatedAt").reverse().toArray(), [], []);
  const tableData = useMemo(
    () =>
      allRecords
        // .map(item => _.omit(item, ["payload", "localId", "serverId", "apiUrl"]))
        .map(item => {
          const { entity, type, status } = item;
          const statusComponent = <StatusIcon status={status} />;
          return {
            entity: entity.replaceAll("_", " ").toUpperCase(),
            type,
            status: statusComponent,
            expandedData: <ExpandedData item={item} />,
          };
        }),
    [allRecords],
  );

  const ajaxSingle = async (item, cb) => {
    const action = {
      UPDATE: "updateData",
      DELETE: "deleteData",
      INSERT: "insertData",
    };
    const Table = item.entity;
    const formPayload = {
      Table,
      [action[item.type]]: item.payload,
    };
    const formdata = new FormData();
    formdata.append("postData", JSON.stringify(formPayload));
    formdata.append("tenantId", userContext.userConfig.tenantId);
    await apiInstance
      .post(item.apiUrl, formdata)
      .then(d => typeof cb === "function" && cb(d, "success"))
      .catch(e => typeof cb === "function" && cb(e, "fail"));
  };

  const syncQueue = async () => {
    const queue = await db.syncQueue.where("status").equals("PENDING").sortBy("createdAt"); // PENDING
    if (queue.length > 0) {
      setIsSyncing(true);
      for (const item of queue) {
        const now = moment().format("YYYY-MM-DD HH:mm:ss");
        try {
          // Mark as syncing
          await db.syncQueue.update(item.id, {
            status: "INPROGRESS",
            updatedAt: now,
            error: null,
          });

          // Call your API
          await ajaxSingle(item);

          // Success
          await db.syncQueue.update(item.id, {
            status: "COMPLETED", // COMPLETED
            updatedAt: now,
          });

          // Optional:
          // await db.syncQueue.delete(item.id);
        } catch (e) {
          const error = e.response.data.error;
          const eObj = {
            errorMessage: error.errorMessage,
            status: error.errorCode,
          };
          await db.syncQueue.update(item.id, {
            status: "FAILED",
            retryCount: item.retryCount + 1,
            error: eObj,
            updatedAt: now,
          });
        }
      }
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (isOnline) {
      syncQueue();
    }
  }, [isOnline]);

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
                height={"300px"}
                expandableKey='expandedData'
              />
            ) : (
              <div className='text-center p-3'>
                <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
              </div>
            )}
          </div>
        </Modal.Body>
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
