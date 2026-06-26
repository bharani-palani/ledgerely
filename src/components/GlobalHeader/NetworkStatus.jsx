import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

const NetworkStatus = () => {
  const { isOnline, isNavigatorSupport } = useNetworkStatus();
  const [isSyncing, setIsSyncing] = useState(false);

  const syncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
    isNavigatorSupport && (
      <button
        onClick={syncNow}
        disabled={!isOnline || isSyncing}
        className={`btn btn-sm btn-outline-${isSyncing ? "primary" : isOnline ? "success" : "danger"} rounded-pill d-flex align-items-center`}
      >
        {isSyncing ? <i className='fa fa-cog fa-spin fa-fw' /> : <i className={`fa fa-${isOnline ? "wifi" : "plug"} pe-1`} />}
        {isSyncing ? (
          <FormattedMessage id='syncing' defaultMessage='syncing' />
        ) : (
          <FormattedMessage id={isOnline ? "online" : "offline"} defaultMessage={isOnline ? "online" : "offline"} />
        )}
      </button>
    )
  );
};

export default NetworkStatus;
