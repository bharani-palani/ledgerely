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
    const timer = setInterval(() => {
      const secondsLeft = calculateTimeLeft(
        userContext.userConfig.expiryDateTime,
        // "2024-08-25 00:06:00",
      );
      // If logged in user and time expired, set expired, navigate to billing page, suppress other routes
      if (secondsLeft <= 0 && userData.userId) {
        setAppExpired(true);
        navigate("/billing");
        setTimeout(() => {
          clearInterval(timer);
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
    return () => clearInterval(timer);
  }, [userContext.userConfig.expiryDateTime]);

  return <Suspense>{null}</Suspense>;
};

export default AppExpiry;
