import React, { useContext, useState, useCallback } from "react";
import Switch from "react-switch";
import { Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { BillingContext, CurrencyPrice } from "./Billing";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useIntl, FormattedMessage } from "react-intl";
import { useRazorpay } from "react-razorpay";
import useAxios from "../../services/apiServices";
import {
  PaymentFailedHeading,
  PaymentFailedContent,
  PaymentSuccessHeading,
  PaymentSuccessContent,
  PaymentCancelledHeading,
  PaymentCancelledContent,
  PaymentLifetimeSuccessContent,
} from "./PaymentAlert";
import { MyAlertContext } from "../../contexts/AlertContext";
import moment from "moment";

const Summary = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const myAlertContext = useContext(MyAlertContext);
  const globalContext = useContext(GlobalContext);
  const userContext = useContext(UserContext);
  const billingContext = useContext(BillingContext);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { summary, setSummary, cycleList, table, selectedPlan, cycleRef, total, subscribeLoader, setSubscribeLoader, setRefetchHistory } =
    billingContext;
  const { error, Razorpay } = useRazorpay();
  const createSubscription = () => {
    const formdata = new FormData();
    formdata.append("count", summary.cycle === "month" ? 12 * 30 : 30); // 30 years
    formdata.append("planId", summary.razorPayPlanId);
    formdata.append("custId", summary.razorPayCustomerId);
    return apiInstance.post("/payments/razorpay/createSubscription", formdata);
  };

  const onPayment = paymentId => {
    const formdata = new FormData();
    formdata.append("paymentId", paymentId);
    return apiInstance.post("/payments/razorpay/onPayment", formdata);
  };

  const createRazorpayOrder = () => {
    const formdata = new FormData();
    formdata.append("amount", Math.round(total * 100));
    formdata.append("currency", userContext?.userConfig?.currency);
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance.post("/payments/razorpay/createRazorpayOrder", formdata);
  };

  const onPaymentCancel = () => {
    setRefetchHistory(false);
    setTimeout(() => {
      setRefetchHistory(true);
      myAlertContext.setConfig(
        {
          show: true,
          className: "alert-success border-0 text-dark",
          type: "success",
          dismissible: true,
          heading: <PaymentCancelledHeading />,
          content: <PaymentCancelledContent />,
        },
        1000,
      );
    });
  };

  const handlePayment = useCallback(async () => {
    if (!error) {
      setSubscribeLoader(true);
      createSubscription()
        .then(res => {
          const subData = res?.data?.response;
          const options = {
            key: import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_RAZORPAY_LIVE_KEY_ID : import.meta.env.VITE_RAZORPAY_TEST_KEY_ID,
            key_secret:
              import.meta.env.VITE_ENV === "production"
                ? import.meta.env.VITE_RAZORPAY_LIVE_KEY_SECRET
                : import.meta.env.VITE_RAZORPAY_TEST_KEY_SECRET,
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
                  if (status === "captured" || status === "authorized") {
                    const futureExpiry = moment()
                      .add(1, summary.cycle === "year" ? "Y" : "M")
                      .format("YYYY-MM-DD HH:mm:ss");
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
                .catch(e => console.log(e))
                .finally(() => {
                  setRefetchHistory(false);
                  setTimeout(() => {
                    setRefetchHistory(true);
                  }, 1000);
                });
            },
            modal: {
              escape: false,
              handleback: false,
              confirm_close: true,
              ondismiss: () => onPaymentCancel(),
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
              color: document.documentElement.style.getPropertyValue("--app-theme-bg-color"),
            },
          };
          const rzpay = new Razorpay(options);
          rzpay.open();
        })
        .catch(e => {
          myAlertContext.setConfig({
            show: true,
            className: "alert-danger border-0 text-dark",
            type: "danger",
            dismissible: true,
            heading: e.response.data.response.CODE,
            content: e.response.data.response.MESSAGE,
          });
        })
        .finally(() => setSubscribeLoader(false));
    }
  }, [summary, intl, error]);

  const handleLifetimePayment = useCallback(async () => {
    if (error) return;
    setSubscribeLoader(true);
    createRazorpayOrder()
      .then(res => {
        const order = res?.data?.response;
        const options = {
          key: import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_RAZORPAY_LIVE_KEY_ID : import.meta.env.VITE_RAZORPAY_TEST_KEY_ID,
          amount: order?.amount,
          currency: order?.currency || userContext?.userConfig?.currency,
          order_id: order?.id,
          name: `${globalContext.appName}`,
          description: `${intl.formatMessage({ id: selectedPlan.planTitle, defaultMessage: selectedPlan.planTitle })}: ${intl.formatMessage({
            id: selectedPlan.planDescription,
            defaultMessage: selectedPlan.planDescription,
          })}`,
          handler: handleData => {
            onPayment(handleData.razorpay_payment_id)
              .then(r => {
                const { status } = r.data.response;
                myAlertContext.setConfig({
                  show: true,
                  className:
                    status === "captured" || status === "authorized" ? "alert-success border-0 text-dark" : "alert-danger border-0 text-dark",
                  type: status === "captured" || status === "authorized" ? "success" : "danger",
                  dismissible: status === "captured" || status === "authorized",
                  heading: status === "captured" || status === "authorized" ? <PaymentSuccessHeading /> : <PaymentFailedHeading />,
                  content: status === "captured" || status === "authorized" ? <PaymentLifetimeSuccessContent /> : <PaymentFailedContent />,
                });
              })
              .catch(e => console.log(e));
          },
          modal: {
            escape: false,
            handleback: false,
            confirm_close: true,
            ondismiss: () => onPaymentCancel(),
            animation: true,
          },
          prefill: {
            name: userContext?.userConfig?.name,
            email: userContext?.userConfig?.email,
            contact: userContext?.userConfig?.mobile,
          },
          notes: {
            name: userContext?.userConfig?.name,
            email: userContext?.userConfig?.email,
          },
          theme: {
            color: document.documentElement.style.getPropertyValue("--app-theme-bg-color"),
          },
        };
        const rzpay = new Razorpay(options);
        rzpay.open();
      })
      .catch(e => {
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: e.response?.data?.response?.CODE,
          content: e.response?.data?.response?.MESSAGE,
        });
      })
      .finally(() => setSubscribeLoader(false));
  }, [error, total, userContext, globalContext, intl, selectedPlan, Razorpay]);

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
            "--theme-color": userContext.userData.theme === "dark" ? "#111" : "#eee",
          }}
        >
          <div
            className='p-4 h-100'
            style={{
              background: userContext.userData.theme === "dark" ? "#111" : "#eee",
              color: userContext.userData.theme === "dark" ? "#fff" : "#000",
            }}
          >
            <div>
              <div className='fs-4 pb-2 text-center'>
                <FormattedMessage id={globalContext.appName} defaultMessage={globalContext.appName} />
              </div>
              {summary.invoice.map(sum => (
                <Col xs={12} key={sum.id} className='d-flex justify-content-between align-items-center py-3'>
                  <div>
                    <span>
                      <FormattedMessage id={sum.id} defaultMessage={sum.id} />
                    </span>
                    <span className='ps-2'>{sum.title ? `(${sum.title})` : ""}</span>
                  </div>
                  <div>{sum.value.toFixed(2)}</div>
                </Col>
              ))}
              <div
                style={{
                  borderTop: "dotted 5px #aeaeae",
                  borderBottom: "dotted 5px #aeaeae",
                }}
                className='d-flex justify-content-between align-items-center py-3'
              >
                <div>
                  <FormattedMessage id='total' defaultMessage='total' />
                </div>
                <div>{total.toFixed(2)}</div>
              </div>
              {globalContext.appSupportEmail && (
                <a href={`mailto:${globalContext.appSupportEmail}`} className={`btn btn-primary badge btn-sm float-end my-3`}>
                  {globalContext.appSupportEmail}
                </a>
              )}
            </div>
          </div>
        </Col>
        <Col md={6} className='p-2'>
          <div className='d-flex justify-content-between align-items-center py-1'>
            {summary.paymentType !== "lifetime" && (
              <>
                <div>
                  <FormattedMessage id='paymentCycle' defaultMessage='paymentCycle' />
                </div>
                <div>
                  <Form.Select
                    value={summary.cycle}
                    disabled={!selectedPlan.planCode}
                    size='sm'
                    onChange={e => {
                      const price = table.filter(f => f.planCode === selectedPlan.planCode)[0][cycleRef[e.target.value].prop];
                      const razorPayPlanId = table.filter(f => f.planCode === selectedPlan.planCode)[0][cycleRef[e.target.value].razorPayProp];

                      setSummary(prev => ({
                        ...prev,
                        paymentType: "subscription",
                        razorPayPlanId,
                        cycle: e.target.value,
                        invoice: prev.invoice.map(o => (o.id === "price" ? Object.assign(o, { value: price }) : o)),
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
              </>
            )}
          </div>
          {externalLinks.map(link => (
            <div key={link.id} className='py-1'>
              <a target='_blank' rel='noreferrer' className='link-primary' href={link.href}>
                {link.label}
              </a>
            </div>
          ))}
          {selectedPlan.planCodeExpanded !== "lifetime" && selectedPlan.lifeTimeprice > 0 && (
            <div className='d-flex justify-content-between align-items-center py-1'>
              <div>Payment type</div>
              <Form.Select
                value={summary.paymentType}
                size='sm'
                onChange={e => {
                  const paymentType = e.target.value;
                  const price = paymentType === "lifetime" ? selectedPlan.lifeTimeprice : selectedPlan[cycleRef[summary.cycle].prop];
                  setSummary(prev => ({
                    ...prev,
                    paymentType,
                    invoice: prev.invoice.map(o => (o.id === "price" ? Object.assign(o, { value: price }) : o)),
                  }));
                }}
              >
                <option value='subscription'>Subscription</option>
                <option value='lifetime'>Lifetime</option>
              </Form.Select>
            </div>
          )}
          <div className='d-flex justify-content-between align-items-center py-1'>
            <div>
              <FormattedMessage id='iAgreeTerms' defaultMessage='iAgreeTerms' />
            </div>
            <div>
              <Switch
                className={`${selectedPlan.planCode ? "animate__animated animate__headShake infiniteAnimation" : ""}`}
                onColor={document.documentElement.style.getPropertyValue("--app-theme-bg-color")}
                offColor={document.documentElement.style.getPropertyValue("--app-theme-color")}
                offHandleColor={userContext.userData.theme === "dark" ? "#555" : "#ddd"}
                onHandleColor={userContext.userData.theme === "dark" ? "#555" : "#ddd"}
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
              disabled={!(acceptTerms && total > 0 && !subscribeLoader)}
              className='btn btn-primary w-100 border-0 d-flex justify-content-between align-items-center'
              onClick={summary.paymentType === "lifetime" ? handleLifetimePayment : handlePayment}
            >
              <FormattedMessage
                id={summary.paymentType === "lifetime" ? "payNow" : "subscribeNow"}
                defaultMessage={summary.paymentType === "lifetime" ? "Pay now" : "Subscribe now"}
              />
              <div>
                {!subscribeLoader ? (
                  <CurrencyPrice
                    amount={total}
                    suffix={summary.paymentType === "lifetime" ? "" : cycleRef[summary.cycle].suffix}
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
