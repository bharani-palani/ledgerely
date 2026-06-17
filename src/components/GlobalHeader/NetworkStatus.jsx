import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
  };

  return (
    <button onClick={syncNow} className={`btn btn-sm btn-${isOnline ? "success" : "danger"} rounded-pill d-flex align-items-center`}>
      <i className={`fa fa-${isOnline ? "wifi" : "plug"} pe-1`} />
      <FormattedMessage id={isOnline ? "online" : "offline"} defaultMessage={isOnline ? "online" : "offline"} />
    </button>
  );
};

export default NetworkStatus;
