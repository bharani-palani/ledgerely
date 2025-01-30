import React, { useContext, useState, useCallback } from "react";
import Switch from "react-switch";
import { Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { BillingContext, CurrencyPrice } from "./Billing";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useIntl, FormattedMessage } from "react-intl";
import useRazorpay from "react-razorpay";
import apiInstance from "../../services/apiServices";
import {
  PaymentFailedHeading,
  PaymentFailedContent,
  PaymentSuccessHeading,
  PaymentSuccessContent,
} from "./PaymentAlert";
import { MyAlertContext } from "../../contexts/AlertContext";
import moment from "moment";

const Summary = () => {
  const intl = useIntl();
  const myAlertContext = useContext(MyAlertContext);
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const billingContext = useContext(BillingContext);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const {
    summary,
    setSummary,
    cycleList,
    table,
    selectedPlan,
    cycleRef,
    total,
    billingLoader,
    subscribeLoader,
    setSubscribeLoader,
  } = billingContext;
  const [Razorpay] = useRazorpay();

  const createSubscription = () => {
    const formdata = new FormData();
    formdata.append("count", summary.cycle === "month" ? 1 : 12);
    formdata.append("planId", summary.razorPayPlanId);
    formdata.append("custId", summary.razorPayCustomerId);
    return apiInstance.post("/payments/razorpay/createSubscription", formdata);
  };

  const onPayment = paymentId => {
    const formdata = new FormData();
    formdata.append("paymentId", paymentId);
    return apiInstance.post("/payments/razorpay/onPayment", formdata);
  };

  const handlePayment = useCallback(async () => {
    setSubscribeLoader(true);
    createSubscription()
      .then(res => {
        const subData = res?.data?.response;
        const options = {
          key:
            process.env.REACT_APP_ENV === "production"
              ? process.env.REACT_APP_RAZORPAY_LIVE_KEY_ID
              : process.env.REACT_APP_RAZORPAY_TEST_KEY_ID,
          key_secret:
            process.env.REACT_APP_ENV === "production"
              ? process.env.REACT_APP_RAZORPAY_LIVE_KEY_SECRET
              : process.env.REACT_APP_RAZORPAY_TEST_KEY_SECRET,
          currency: userContext?.userConfig?.currency,
          amount: summary.invoice[0].value * 100,
          subscription_id: subData?.id,
          name: `${globalContext.appName}`,
          description: `${intl.formatMessage({
            id: selectedPlan.planTitle,
            defaultMessage: selectedPlan.planTitle,
          })}: ${intl.formatMessage({
            id: selectedPlan.planDescription,
            defaultMessage: selectedPlan.planDescription,
          })}`,
          plan_id: summary?.razorPayPlanId,
          handler: handleData => {
            const payId = handleData.razorpay_payment_id;
            onPayment(payId)
              .then(r => {
                const { status } = r.data.response;
                if (status === "captured") {
                  const futureExpiry = moment()
                    .add(1, summary.cycle === "year" ? "Y" : "M")
                    .format("DD-MM-YYYY HH:mm:ss");
                  myAlertContext.setConfig({
                    show: true,
                    className: "alert-success border-0 text-dark",
                    type: "success",
                    dismissible: true,
                    heading: <PaymentSuccessHeading />,
                    content: <PaymentSuccessContent />,
                  });
                  userContext.setUserConfig(prev => ({
                    ...prev,
                    razorPaySubscriptionId: subData?.id,
                    expiryDateTime: futureExpiry,
                  }));
                  userContext.setAppExpired(false);
                } else {
                  myAlertContext.setConfig({
                    show: true,
                    className: "alert-danger border-0 text-dark",
                    type: "danger",
                    dismissible: false,
                    heading: <PaymentFailedHeading />,
                    content: <PaymentFailedContent />,
                  });
                }
              })
              .catch(e => console.log(e));
          },
          modal: {
            escape: false,
            handleback: false,
            confirm_close: true,
            ondismiss: () => false,
            animation: true,
          },
          readonly: {
            contact: true,
            email: true,
            name: true,
          },
          hidden: {
            contact: false,
            email: false,
          },
          prefill: {
            name: userContext?.userConfig?.name,
            email: userContext?.userConfig?.email,
            contact: userContext?.userConfig?.mobile,
            method: "card",
          },
          notes: {
            name: userContext?.userConfig?.name,
            mobile: userContext?.userConfig?.mobile,
            address1: userContext?.userConfig?.address1,
            address2: userContext?.userConfig?.address2,
            city: userContext?.userConfig?.city,
            country: userContext?.userConfig?.country,
            email: userContext?.userConfig?.email,
          },
          theme: {
            color: document.documentElement.style.getPropertyValue(
              "--app-theme-bg-color",
            ),
          },
        };
        const rzpay = new Razorpay(options);
        rzpay.open();
      })
      .catch(e => console.log(e))
      .finally(() => setSubscribeLoader(false));
  }, [summary, intl]);

  const externalLinks = [
    {
      id: 0,
      href: globalContext.cancellationRefundPolicyLink,
      label: intl.formatMessage({
        id: "cancellationPolicy",
        defaultMessage: "cancellationPolicy",
      }),
    },
    {
      id: 1,
      href: globalContext.termsOfServiceLink,
      label: intl.formatMessage({
        id: "termsOfService",
        defaultMessage: "termsOfService",
      }),
    },
    {
      id: 2,
      href: globalContext.privacyPolicyLink,
      label: intl.formatMessage({
        id: "privacyPolicy",
        defaultMessage: "privacyPolicy",
      }),
    },
  ];

  return (
    <div className='my-3'>
      <div className='fs-3'>
        <FormattedMessage id='summary' defaultMessage='summary' />
      </div>
      <Row className='p-2'>
        <Col
          md={6}
          className='receipt rounded'
          style={{
            "--theme-color":
              userContext.userData.theme === "dark" ? "#111" : "#eee",
          }}
        >
          <div
            className='p-4'
            style={{
              background:
                userContext.userData.theme === "dark" ? "#111" : "#eee",
              color: userContext.userData.theme === "dark" ? "#fff" : "#000",
            }}
          >
            <div
              style={{
                height: "12rem",
              }}
              className='position-relative'
            >
              {summary.invoice.map(sum => (
                <Col
                  xs={12}
                  key={sum.id}
                  className='d-flex justify-content-between align-items-center py-1'
                >
                  <div>
                    <span>
                      <FormattedMessage id={sum.id} defaultMessage={sum.id} />
                    </span>
                    <span className='ps-2'>
                      {sum.title ? `(${sum.title})` : ""}
                    </span>
                  </div>
                  <div>
                    {billingLoader ? (
                      <i className='fa fa-circle-o-notch fa-spin'></i>
                    ) : (
                      sum.value
                    )}
                  </div>
                </Col>
              ))}
              <div
                style={{
                  borderTop: "dotted 5px #aeaeae",
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                }}
                className='d-flex justify-content-between align-items-center py-2'
              >
                <div>
                  <FormattedMessage id='total' defaultMessage='total' />
                </div>
                <div>{total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} className='p-2'>
          <div className='d-flex justify-content-between align-items-center py-1'>
            <div>
              <FormattedMessage
                id='paymentCycle'
                defaultMessage='paymentCycle'
              />
            </div>
            <div>
              <Form.Select
                value={summary.cycle}
                disabled={!selectedPlan.planCode}
                size='sm'
                onChange={e => {
                  const price = table.filter(
                    f => f.planCode === selectedPlan.planCode,
                  )[0][cycleRef[e.target.value].prop];
                  const razorPayPlanId = table.filter(
                    f => f.planCode === selectedPlan.planCode,
                  )[0][cycleRef[e.target.value].razorPayProp];

                  setSummary(prev => ({
                    ...prev,
                    razorPayPlanId,
                    cycle: e.target.value,
                    invoice: prev.invoice.map(o =>
                      o.id === "price" ? Object.assign(o, { value: price }) : o,
                    ),
                  }));
                }}
              >
                {cycleList.map((l, i) => (
                  <option key={i} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
          {externalLinks.map(link => (
            <div key={link.id} className='py-1'>
              <a
                target='_blank'
                rel='noreferrer'
                className='link-primary'
                href={link.href}
              >
                {link.label}
              </a>
            </div>
          ))}
          <div className='d-flex justify-content-between align-items-center py-1'>
            <div>
              <FormattedMessage id='iAgreeTerms' defaultMessage='iAgreeTerms' />
            </div>
            <div>
              <Switch
                className={`${
                  selectedPlan.planCode
                    ? "animate__animated animate__headShake infiniteAnimation"
                    : ""
                }`}
                onColor={document.documentElement.style.getPropertyValue(
                  "--app-theme-bg-color",
                )}
                offColor={document.documentElement.style.getPropertyValue(
                  "--app-theme-color",
                )}
                offHandleColor={
                  userContext.userData.theme === "dark" ? "#555" : "#ddd"
                }
                onHandleColor={
                  userContext.userData.theme === "dark" ? "#555" : "#ddd"
                }
                handleDiameter={15}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={30}
                onChange={e => {
                  setAcceptTerms(e);
                }}
                checked={acceptTerms}
              />
            </div>
          </div>
          <div className='p-1'>
            <Button
              disabled={!(acceptTerms && total > 0 && !billingLoader)}
              className='btn btn-bni w-100 border-0 d-flex justify-content-between align-items-center'
              onClick={handlePayment}
            >
              <FormattedMessage
                id='subscribeNow'
                defaultMessage='subscribeNow'
              />
              <div>
                {!subscribeLoader ? (
                  <CurrencyPrice
                    amount={total}
                    suffix={cycleRef[summary.cycle].suffix}
                    symbol={selectedPlan.planPriceCurrencySymbol}
                  />
                ) : (
                  <i className='fa p-1 fa-1x fa-circle-o-notch fa-spin py-2'></i>
                )}
              </div>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
