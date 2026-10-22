import React, { useEffect, useState, useContext } from "react";
import { Capacitor } from "@capacitor/core";
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { PAYWALL_RESULT, RevenueCatUI } from "@revenuecat/purchases-capacitor-ui";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import PageHeader from "../shared/PageHeader";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import Loader from "../resuable/Loader";
import { BillingProviderAlert, BillingPlansPlaceholder, useBillingProviderCheck } from "./BillingProviderGuard";
import { Row, Col } from "react-bootstrap";

const MobileBillingContent = ({ alertType, blockedByOtherProvider, otherProviderSubscriber, ...props }) => {
  const intl = useIntl();
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openingPaywall, setOpeningPaywall] = useState(false);
  const [table, setTable] = useState([]);
  const [offerings, setOfferings] = useState({});
  const myAlertContext = useContext(MyAlertContext);

  useEffect(() => {
    if (!alertType) {
      myAlertContext.setConfig({ show: false });
    }
    return () => myAlertContext.setConfig({ show: false });
  }, [alertType]);

  useEffect(() => {
    if (blockedByOtherProvider) {
      setLoading(false);
      return;
    }
    initRevenueCat();
  }, []);

  const renderTooltip = (props, content) => (
    <Tooltip id={`button-tooltip-${Math.random()}`} className='in show'>
      {content}
    </Tooltip>
  );

  const getAvailablePlans = () => {
    const formdata = new FormData();
    formdata.append("tenantId", userContext.userConfig.tenantId);
    formdata.append("currency", userContext.userConfig.currency);
    return apiInstance.post("/payments/availableBillingPlans", formdata);
  };

  const handlePaywallSuccess = result => {
    /**
     * Success message for subscription / life time purchased and app restored
     */
    let message = "";
    if (result === PAYWALL_RESULT.PURCHASED) {
      message = `${intl.formatMessage({
        id: "success",
        defaultMessage: "success",
      })}! ${intl.formatMessage({
        id: "youAreDone",
        defaultMessage: "youAreDone",
      })}.`;
    } else if (result === PAYWALL_RESULT.RESTORED) {
      message = intl.formatMessage({
        id: "accountRestore",
        defaultMessage: "accountRestore",
      });
    }
    userContext.renderToast({
      type: "success",
      message,
    });
  };

  const handlePaywallFailure = message => {
    setErrorMsg(message);
    userContext.renderToast({
      type: "error",
      message,
    });
  };

  useEffect(() => {
    if (blockedByOtherProvider) {
      return;
    }
    setLoading(true);
    const a = getAvailablePlans();
    Promise.all([a])
      .then(res => {
        const data = res[0].data.response;
        setTable(data);
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  const initRevenueCat = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      if (!Capacitor.isNativePlatform()) {
        setErrorMsg("Ledgerely Paywall is available in the iOS and Android apps.");
        return;
      }
      const platform = Capacitor.getPlatform();
      /**
       * RevenueCat API key for testing
       * VITE_REVENUECAT_TEST_STORE_API_KEY
       **/
      const apiKey = platform === "ios" ? import.meta.env.VITE_REVENUECAT_APPLE_API_KEY : import.meta.env.VITE_REVENUECAT_ANDROID_API_KEY;
      if (!apiKey) {
        throw new Error(`RevenueCat API key is not configured for ${platform}.`);
      }
      await Purchases.configure({
        apiKey,
        /**
         * Important: (Do not delete)
         * appUserID field is very important.
         * Without this the revenue cat web hooks wont work.
         * */
        appUserID: userContext.userConfig.tenantId,
      });
      // await Purchases.setAttributes({});
      const availableOfferings = await Purchases.getOfferings();
      setOfferings(availableOfferings.all || {});
    } catch (err) {
      console.error("RevenueCat setup error:", err);
      setErrorMsg(err.message || "Failed to load subscription plans.");
    } finally {
      setLoading(false);
    }
  };

  const openPaywall = async planCode => {
    try {
      setOpeningPaywall(true);
      setErrorMsg(null);
      const offeringId = planCode;
      const selectedOffering = offerings[offeringId];
      if (!selectedOffering) {
        throw new Error(`The ${offeringId} offering is not configured in RevenueCat.`);
      }
      const { result } = await RevenueCatUI.presentPaywall({ offering: selectedOffering });
      if (result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED) {
        handlePaywallSuccess(result);
      } else if (result === PAYWALL_RESULT.ERROR) {
        handlePaywallFailure(
          intl.formatMessage({
            id: "paymentFailMessage",
            defaultMessage: "paymentFailMessage",
          }),
        );
      }
    } catch (err) {
      console.log(err);
      handlePaywallFailure(
        intl.formatMessage({
          id: "sorryYourRequestedPageCannotBeFound",
          defaultMessage: "sorryYourRequestedPageCannotBeFound",
        }),
      );
    } finally {
      setOpeningPaywall(false);
    }
  };

  if (loading || openingPaywall) {
    return <Loader />;
  }

  const showPlaceholder = (blockedByOtherProvider || !table || table.length === 0) && otherProviderSubscriber;

  if (blockedByOtherProvider) {
    return (
      <Container fluid>
        <PageHeader icon='fa fa-credit-card-alt' intlId='billing' className='mb-3 billing-tour' />
        <BillingProviderAlert type={alertType} />
        {showPlaceholder && <BillingPlansPlaceholder provider='revenueCat' isDuplicate={alertType === "duplicate"} />}
      </Container>
    );
  }
  if (errorMsg) {
    return (
      <Container fluid>
        <div className='alert alert-danger'>
          <h3 className='badge bg-danger fs-6'>
            <FormattedMessage id='error' defaultMessage='Error' />
          </h3>
          <p>{errorMsg}</p>
        </div>
      </Container>
    );
  }

  /**
   * Important: All plans, icons and colors are rendered from DB.
   * If new list required, add them in DB
   * Donot handle any ui related to that.
   * Prices or currencies should not be included in MobileBilling, as those will be taken care by IOS/Android
   */
  return (
    <div className='pb-5'>
      <Container fluid>
        <PageHeader icon='fa fa-credit-card-alt' intlId='billing' className='mb-3 billing-tour' />
        {alertType && <BillingProviderAlert type={alertType} />}
        {showPlaceholder && <BillingPlansPlaceholder provider='revenueCat' isDuplicate={alertType === "duplicate"} />}
        {table.length > 0 && (
          <div className={`mb-3 border border-${userContext.userData.theme === "dark" ? "secondary" : "1"} rounded d-inline-block p-2`}>
            <FormattedMessage id='pleaseChoosePlan' defaultMessage='pleaseChoosePlan' />
          </div>
        )}
        <Row className='g-3'>
          {table.map((row, i) => (
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              key={row.planId}
              className={`${!row.isPlanOptable ? "text-decoration-line-through cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => row.isPlanOptable && openPaywall(row.planCodeExpanded)}
            >
              <div className={`bg-gradient shadow-${userContext.userData.theme} text-white rounded-3`}
              style={{
                background: row.planColor,
              }}
              >
                <div className='d-flex align-items-center justify-content-between p-3'>
                  <div className='w-25'>
                    <div
                      style={{ width: "3rem", height: "3rem" }}
                      className={`d-flex align-items-center justify-content-center small rounded-circle bg-white text-dark shadow-dark`}
                    >
                      <i className={`${row.planIcon} fa-2x`} style={{ color: row.planColor }} />
                    </div>
                  </div>
                  <div className='w-75 d-flex flex-column row-gap-2'>
                    <div className='fs-4'>
                      <FormattedMessage id={row.planTitle} defaultMessage={row.planTitle} />
                    </div>
                    <div className='d-flex align-items-center justify-content-start gap-2'>
                      <div className={`rounded-circle d-flex align-items-center justify-content-center border border-1 bg-light text-dark`} style={{
                        width: "2rem",
                        height: "2rem",
                        fontSize: ".7rem"
                      }}>
                        {row.planCode}
                      </div>
                      <div className='fs-5'>
                        <FormattedMessage id={row.planName} defaultMessage={row.planName} />
                      </div>
                    </div>
                    <small className={`fs-6`}>
                      <FormattedMessage id={row.planDescription} defaultMessage={row.planDescription} />
                    </small>
                  </div>
                  <div className='w-25'>
                    {!row.isPlanOptable ? (
                      <OverlayTrigger
                        placement='left'
                        overlay={renderTooltip(
                          props,
                          intl.formatMessage({
                            id: "maximumQuotaExceeded",
                            defaultMessage: "maximumQuotaExceeded",
                          }),
                        )}
                        triggerType='click'
                      >
                        <i className='fa fa-lock fa-2x text-white' />
                      </OverlayTrigger>
                    ) : i === table.length - 1 ? (
                      <i className='fa fa-shopping-cart text-white fa-2x' />
                    ) : (
                      <i role='button' className={`fa fa-hand-pointer-o fa-2x text-white`} />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const MobileBilling = () => {
  const providerCheck = useBillingProviderCheck("revenueCat");

  if (providerCheck.checking) {
    return <Loader />;
  }

  return (
    <MobileBillingContent
      alertType={providerCheck.alertType}
      blockedByOtherProvider={providerCheck.blockedByOtherProvider}
      otherProviderSubscriber={providerCheck.otherProviderSubscriber}
    />
  );
};

export default MobileBilling;
