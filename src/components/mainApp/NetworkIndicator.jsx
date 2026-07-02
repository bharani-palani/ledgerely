import React, { useEffect, useState } from "react";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { FormattedMessage } from "react-intl";

const NetworkIndicator = () => {
  const { isOnline } = useNetworkStatus();
  const [visible, setVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setVisible(true);
    setIsLeaving(false);

    const showTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, 3000);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, 3600);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isOnline]);

  if (!visible) return null;

  const animationClass = isLeaving ? "animate__animated animate__slideOutDown" : "animate__animated animate__slideInUp";

  return (
    <div className={`position-fixed bottom-0 start-50 translate-middle-x z-1 mb-3`}>
      <div className={`${animationClass} text-light`}>
        {isOnline ? (
          <div className={`bg-success p-1 px-3 py-2 rounded-pill`}>
            <i className='fa fa-wifi pe-1' />
            <FormattedMessage id='youAreBackOnline' defaultMessage='youAreBackOnline' />
          </div>
        ) : (
          <div className={`bg-danger p-1 px-3 py-2 rounded-pill`}>
            <i className='fa fa-plug pe-1' />
            <FormattedMessage id='youAreOffline' defaultMessage='youAreOffline' />
          </div>
        )}
      </div>
    </div>
  );
};
export default NetworkIndicator;
