import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

const SHOW_DURATION = 3000;
const HIDE_DELAY = 3700;

const NetworkIndicator = () => {
  const { isOnline } = useNetworkStatus();

  const previousStatus = useRef(isOnline);
  const isFirstRender = useRef(true);

  const [visible, setVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Ignore the initial render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousStatus.current = isOnline;
      return;
    }

    // Ignore if the status hasn't actually changed
    if (previousStatus.current === isOnline) {
      return;
    }

    previousStatus.current = isOnline;

    setVisible(true);
    setIsLeaving(false);

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, SHOW_DURATION);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, HIDE_DELAY);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(hideTimer);
    };
  }, [isOnline]);

  if (!visible) return null;

  return (
    <div className='position-fixed bottom-0 start-50 translate-middle-x mb-3' style={{ zIndex: 10000 }}>
      <div className={`animate__animated ${isLeaving ? "animate__slideOutDown" : "animate__slideInUp"}`}>
        <div className={`${isOnline ? "bni-bg text-dark" : "bg-danger text-light"} p-1 px-3 py-2 rounded-pill`}>
          <i className={`fa ${isOnline ? "fa-wifi" : "fa-plug"} pe-1`} />
          <FormattedMessage
            id={isOnline ? "youAreBackOnline" : "youAreOffline"}
            defaultMessage={isOnline ? "You are back online" : "You are offline"}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkIndicator;
