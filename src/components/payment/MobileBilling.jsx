import React, { useEffect, useState, useContext } from "react";
import { Capacitor } from "@capacitor/core";
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { PAYWALL_RESULT, RevenueCatUI } from "@revenuecat/purchases-capacitor-ui";
import { Container, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import PageHeader from "../shared/PageHeader";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import Loader from "../resuable/Loader";
import { BillingProviderAlert, BillingPlansPlaceholder, useBillingProviderCheck } from "./BillingProviderGuard";
import { Row, Col } from "react-bootstrap";
import OffCanvas from "../shared/OffCanvas";
import { Description } from "./Billing";

const planDetailLabels = {
  planTrxLimit: ["bankTransactions"],
  planCreditCardTrxLimit: ["creditCardTransactions"],
  planUsersLimit: ["users"],
  planCategoriesLimit: ["incExpCat"],
  planIsBulkImport: ["bulkImport"],
  planBankAccountsLimit: ["bankAccounts"],
  planCreditCardAccounts: ["creditCardAccounts"],
  planStorageLimit: ["fileStorage"],
  planDatasourceLimit: ["dataSource"],
  planWorkbookLimit: ["workbook"],
  planTemplateLimit: ["schedules"],
  planAiTokenLimit: ["ledgerelyAi", "tokens"],
  planIsPredictions: ["predictions"],
  planIsEmailAlerts: ["emailAlerts"],
  planIsTransactionSearch: ["globalSearch"],
  visualizationLimit: ["visualizations"],
};

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

  const loadOffCanvas = row => {
    const renderPlanValue = (key, value) => {
      if (value === null) {
        return <span className='text-success'>∞</span>;
      }
      if (typeof value === "boolean") {
        return value ? <i className='fa fa-check text-success' /> : <i className='fa fa-times text-danger' />;
      }
      if (typeof value === "number") {
        if (["planStorageLimit", "planDatasourceLimit", "planWorkbookLimit"].includes(key)) {
          return `${value / 1024 / 1024} MB`;
        }
        return value.toLocaleString();
      }
      return typeof value === "string" ? value : "";
    };

    return (
      <OffCanvas
        className={`text-center ${userContext.userData.theme === "dark" ? "bg-dark text-white-50" : "bg-white text-black"}`}
        trigger={
          <Button variant='default' className='btn btn-sm btn-light text-dark'>
            <FormattedMessage id='select' defaultMessage='select' />
          </Button>
        }
        placement='end'
        key={row.planId}
        label={intl.formatMessage({
          id: "details",
          defaultMessage: "details",
        })}
      >
        {row.planMostPopular && (
          <div className='text-center'>
            <span className={`badge bg-black text-white`}>
              <FormattedMessage id={"mostPopular"} defaultMessage={"mostPopular"} />
            </span>
          </div>
        )}
        <Description {...row} />
        <div className='my-3'>
          {Object.entries(planDetailLabels).map(([key, labelIds]) => (
            <Row className='py-1' key={key}>
              <Col xs={8}>
                <FormattedMessage id={labelIds[0]} defaultMessage={labelIds[0]} />
                {key === "planAiTokenLimit" && <FormattedMessage id={labelIds[1]} defaultMessage={labelIds[1]} />}
              </Col>
              <Col xs={4} className='text-end'>
                {renderPlanValue(key, row[key])}
              </Col>
            </Row>
          ))}
        </div>
        <Button
          className='btn btn-lg fs-6 btn-outline-primary w-100 bg-transparent text-primary text-uppercase'
          onClick={() => openPaywall(row.planCodeExpanded)}
        >
          <FormattedMessage
            id={row.planCodeExpanded === "lifetime" ? "pay" : "subscribeNow"}
            defaultMessage={row.planCodeExpanded === "lifetime" ? "pay" : "subscribeNow"}
          />
        </Button>
      </OffCanvas>
    );
  };
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
          <div className={`mb-3 rounded d-inline-block`}>
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
            >
              <div
                className={`bg-gradient shadow-${userContext.userData.theme} text-white rounded-3`}
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
                    <div className='d-flex align-items-center justify-content-start gap-3'>
                      <span className='fs-4'>
                        <FormattedMessage id={row.planTitle} defaultMessage={row.planTitle} />
                      </span>
                      {userContext.userConfig.planCode === row?.planCode && (
                        <span className='badge rounded-2 bg-dark'>
                          <FormattedMessage id='currentPlan' defaultMessage='currentPlan' />
                        </span>
                      )}
                    </div>
                    <div className='d-flex align-items-center justify-content-start gap-2'>
                      <div
                        className={`rounded-circle d-flex align-items-center justify-content-center border border-1 bg-light text-dark`}
                        style={{
                          width: "2rem",
                          height: "2rem",
                          fontSize: ".7rem",
                        }}
                      >
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
                  <div className='w-25 text-center'>
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
                        <i className='fa fa-info-circle fa-2x text-white' />
                      </OverlayTrigger>
                    ) : (
                      loadOffCanvas(row)
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
