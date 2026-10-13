import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Capacitor } from "@capacitor/core";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { ActiveWebSubDetectedHeading, ActiveWebSubDetectedMsgContent, ActiveMobileSubDetectedHeading, ActiveMobileSubDetectedMsgContent, DuplicateSubDetectedHeading, DuplicateSubDetectedMsgContent } from "./PaymentAlert";

/**
 * provider: "razorpay" (web Billing) or "revenueCat" (MobileBilling).
 * Fails open: if the check errors, billing stays accessible.
 */
export const useBillingProviderCheck = provider => {
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const [state, setState] = useState({ checking: true, isRazorPaySubscriber: false, isRevenueCatSubscriber: false });

  useEffect(() => {
    const formdata = new FormData();
    formdata.append("tenantId", userContext.userConfig.tenantId);
    if (provider === "razorpay") {
      formdata.append("razorPayCustomerId", userContext.userConfig.razorPayCustomerId || "");
    } else {
      // "ios" | "android" | "web"
      formdata.append("platform", Capacitor.getPlatform());
    }
    apiInstance
      .post(`/payments/${provider}/checkSubscriber`, formdata)
      .then(res => {
        const data = res.data.response || {};
        setState({
          checking: false,
          isRazorPaySubscriber: data.isRazorPaySubscriber === true,
          isRevenueCatSubscriber: data.isRevenueCatSubscriber === true,
        });
      })
      .catch(e => {
        console.log(e);
        setState(s => ({ ...s, checking: false }));
      });
  }, []);

  const isDuplicate = state.isRazorPaySubscriber && state.isRevenueCatSubscriber;
  const blockedByOtherProvider = provider === "razorpay" ? state.isRevenueCatSubscriber && !isDuplicate : state.isRazorPaySubscriber && !isDuplicate;
  const otherProviderSubscriber = provider === "razorpay" ? state.isRevenueCatSubscriber : state.isRazorPaySubscriber;
  let alertType = null;
  if (isDuplicate) {
    alertType = "duplicate";
  } else if (blockedByOtherProvider) {
    alertType = provider === "razorpay" ? "useMobileApp" : "useWebApp";
  }
  return { ...state, isDuplicate, blockedByOtherProvider, otherProviderSubscriber, alertType };
};

export const BillingPlansPlaceholder = ({ provider, isDuplicate }) => (
  <div className={`alert ${isDuplicate ? "alert-danger" : "alert-warning"} text-center my-3 py-5`} role='status'>
    {isDuplicate ? (
      <FormattedMessage
        id='duplicateSubscriptionTakeAction'
        defaultMessage='Duplicate subscription detected. Please take immediate action: cancel one of your active subscriptions (web or mobile).'
      />
    ) : provider === "razorpay" ? (
      <FormattedMessage id='pleaseMoveToMobileApp' defaultMessage='Please move to Mobile app' />
    ) : (
      <FormattedMessage id='pleaseMoveToWebApp' defaultMessage='Please move to Web app' />
    )}
  </div>
);

export const BillingProviderAlert = ({ type }) => {
  const messages = {
    useMobileApp:{
      heading: <ActiveMobileSubDetectedHeading />,
      content: <ActiveMobileSubDetectedMsgContent />,
      variant: "warning",
    },
    useWebApp:{
      heading: <ActiveWebSubDetectedHeading />,
      content: <ActiveWebSubDetectedMsgContent />,
      variant: "warning",
    },
    duplicate: {
      heading: <DuplicateSubDetectedHeading />,
      content: <DuplicateSubDetectedMsgContent />,
      variant: "danger",
    }
  }
  const myAlertContext = useContext(MyAlertContext);
  const userContext = useContext(UserContext);
  // The payment required (expiry) alert has the highest priority, so this alert never replaces it.
  useEffect(() => {
    if (userContext.appExpired) {
      return;
    }
    myAlertContext.setConfig({
      show: true,
      className: `alert-${messages[type]?.variant || "warning"} border-0 text-dark`,
      type: messages[type]?.variant || "warning",
      dismissible: true,
      heading: messages[type]?.heading,
      content: messages[type]?.content,
    });
  }, [myAlertContext.setConfig, type, userContext.appExpired]);

  return null;
};
