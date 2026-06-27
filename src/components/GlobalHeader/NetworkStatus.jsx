import React, { useState, useContext, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import Table from "../shared/D3/Table";
import { db } from "../../services/indexedDb";
import _ from "lodash";
import { useLiveQuery } from "dexie-react-hooks";

const NetworkStatus = () => {
  const userContext = useContext(UserContext);
  const { isOnline, isNavigatorSupport } = useNetworkStatus();
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

  const ExpandedData = props => {
    const { retryCount, error, createdAt, updatedAt, status } = props;
    return (
      <div>
        <div>
          <span>
            <i className='fa fa-refresh pe-2' /> {retryCount}
          </span>
        </div>
        <div>
          <span>
            <i className='fa fa-clock-o pe-2' /> {createdAt}
          </span>
        </div>
        <div>
          <span>
            <i className='fa fa-pencil pe-2' /> {updatedAt}
          </span>
        </div>
        {error && (
          <div>
            <span className='text-danger'>
              <i className='fa fa-exclamation-triangle pe-2' /> {error}
            </span>
          </div>
        )}
        {status === "FAILED" && (
          <Button size='sm' className='btn-bni p-1 py-0 mt-2'>
            <i className='fa fa-repeat pe-1' />
            Retry
          </Button>
        )}
      </div>
    );
  };

  const allRecords = useLiveQuery(() => db.syncQueue.toArray(), [], []);
  const tableData = useMemo(
    () =>
      allRecords
        .map(item => _.omit(item, ["payload", "localId", "serverId", "apiUrl"]))
        .map(({ entity, type, retryCount, error, createdAt, updatedAt, status }) => {
          const statusComponent = <StatusIcon status={status} />;
          return {
            entity: entity.replaceAll("_", " ").toUpperCase(),
            type,
            status: statusComponent,
            expandedData: <ExpandedData retryCount={retryCount} error={error} createdAt={createdAt} updatedAt={updatedAt} status={status} />,
          };
        }),
    [allRecords],
  );

  const syncQueue = async () => {
    // Get all pending records ordered by creation time
    setIsSyncing(true);
    const queue = await db.syncQueue.where("status").equals("PENDING").sortBy("createdAt"); // PENDING

    for (const item of queue) {
      try {
        // Mark as syncing
        await db.syncQueue.update(item.id, {
          status: "INPROGRESS",
          // todo: moment time
          updatedAt: new Date().toISOString(),
          error: null,
        });

        // todo api:
        // Call your API
        // await api.post(item.apiUrl, item.payload);

        // Success
        await db.syncQueue.update(item.id, {
          status: "COMPLETED", // COMPLETED
          updatedAt: new Date().toISOString(),
        });

        // Optional:
        // await db.syncQueue.delete(item.id);
      } catch (err) {
        await db.syncQueue.update(item.id, {
          status: "FAILED",
          retryCount: item.retryCount + 1,
          error: err.message,
          updatedAt: new Date().toISOString(),
        });
      }
    }
    setIsSyncing(false);
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
