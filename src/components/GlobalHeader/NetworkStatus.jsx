import React, { useState, useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import Table from "../shared/D3/Table";
import { db } from "../../services/indexedDb";
import _ from "lodash";

const NetworkStatus = () => {
  const userContext = useContext(UserContext);
  const { isOnline, isNavigatorSupport } = useNetworkStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [popup, setPopup] = useState(false);
  const [tableData, setTableData] = useState([]);

  const StatusIcon = ({ status }) => {
    const refObject = {
      PENDING: "fa fa-hourglass-half text-primary",
      COMPLETE: "fa fa-check text-success",
      FAILED: "fa fa-times text-danger",
    };
    return <i className={refObject[status]} title={status} />;
  };

  const ExpandedData = props => {
    const { retryCount, error, createdAt, updatedAt, status } = props;
    return (
      <p>
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
          <Button size='sm' className='btn-bni'>
            <i className='fa fa-repeat pe-2 pe-2' />
            Retry
          </Button>
        )}
      </p>
    );
  };

  useEffect(() => {
    const fetchOfflineRecords = async () => {
      let table = await db.syncQueue.where("status").equals("PENDING").toArray();
      table = table
        .map(item => _.omit(item, ["payload", "localId", "serverId", "apiUrl"]))
        .map(({ id, entity, type, retryCount, error, createdAt, updatedAt, status }) => {
          status = <StatusIcon status={status} />;
          return {
            id,
            entity,
            type,
            status,
            expandedData: <ExpandedData retryCount={retryCount} error={error} createdAt={createdAt} updatedAt={updatedAt} status={status} />,
          };
        });
      setTableData(table);
    };
    fetchOfflineRecords();
    syncNow();
  }, []);

  const syncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
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
            <div>
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
