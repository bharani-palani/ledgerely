import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { MyAlertContext } from "../../contexts/AlertContext";
import { ExpiryHeading, ExpiryContent } from "../payment/ExpiryAlert";

const AppExpiry = props => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const { setAppExpired } = userContext;

  const calculateTimeLeft = expiryTime => {
    const difference = +new Date(expiryTime) - +new Date();
    return Math.floor(difference / 1000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const secondsLeft = calculateTimeLeft(
        userContext.userConfig.expiryDateTime,
        // "2024-05-11 17:46:00",
      );
      if (secondsLeft <= 0) {
        setAppExpired(true);
        history.push("/billing");
        clearInterval(timer);
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: false,
          heading: <ExpiryHeading />,
          content: <ExpiryContent />,
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [userContext.userConfig.expiryDateTime]);

  return null;
};

export default AppExpiry;
