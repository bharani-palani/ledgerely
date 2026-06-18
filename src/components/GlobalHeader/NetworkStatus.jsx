import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const syncNow = () => {
    /**
     * todo:
     * 1. trigger sync api call to fetch latest data and update indexed db
     * 2. show syncing status in the button and disable it until sync is complete.
     * 3. once sync is complete, show last synced time in tooltip on hover of the button.
     * 4. handle sync failure scenario and show appropriate message to the user.
     */
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  return (
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
  );
};

export default NetworkStatus;
