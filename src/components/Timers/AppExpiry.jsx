import React, { useContext, useEffect, lazy, Suspense } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { MyAlertContext } from "../../contexts/AlertContext";

const ExpiryHeading = lazy(() =>
  import("../payment/ExpiryAlert").then(module => ({
    default: module["ExpiryHeading"],
  })),
);
const ExpiryContent = lazy(() =>
  import("../payment/ExpiryAlert").then(module => ({
    default: module["ExpiryContent"],
  })),
);

const AppExpiry = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const {
    // appExpired,
    setAppExpired,
    userData,
  } = userContext;

  const calculateTimeLeft = expiryTime => {
    const difference = +new Date(expiryTime) - +new Date();
    return Math.floor(difference / 1000);
  };

  useEffect(() => {
    let alertTimer;
    const timer = setInterval(() => {
      const secondsLeft = calculateTimeLeft(
        userContext.userConfig.expiryDateTime,
      );
      if (secondsLeft <= 0 && userData.userName) {
        setAppExpired(true);
        navigate("/billing");
        clearInterval(timer);
        alertTimer = setTimeout(() => {
          myAlertContext.setConfig({
            show: false,
          });
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: false,
            heading: <ExpiryHeading />,
            content: <ExpiryContent />,
          });
        }, 1000);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(alertTimer);
    };
  }, [userContext.userConfig.expiryDateTime]);

  // the expiry alert must not outlive the logged-in session
  useEffect(
    () => () => {
      myAlertContext.setConfig({ show: false });
    },
    [],
  );

  return <Suspense>{null}</Suspense>;
};

export default AppExpiry;
