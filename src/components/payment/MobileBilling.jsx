import React, { useEffect, useState, useContext } from "react";
import { Capacitor } from "@capacitor/core";
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { PAYWALL_RESULT, RevenueCatUI } from "@revenuecat/purchases-capacitor-ui";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import PageHeader from "../shared/PageHeader";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../resuable/Loader";

const MobileBilling = props => {
  const intl = useIntl();
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openingPaywall, setOpeningPaywall] = useState(false);
  const [table, setTable] = useState([]);
  const [offerings, setOfferings] = useState({});

  useEffect(() => {
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
     * Success message for purchased and app restored
     */
    let message = "";
    if (result === PAYWALL_RESULT.PURCHASED) {
      message = intl.formatMessage({
        id: "success",
        defaultMessage: "success",
      });
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
      const apiKey = import.meta.env.VITE_REVENUECAT_API_KEY;
      await Purchases.configure({
        apiKey,
        /**
         * Important:
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
    return <Loader middle />;
  }

  if (errorMsg) {
    return (
      <Container fluid>
        <p className='text-danger'>{errorMsg}</p>
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
    table.length > 0 && (
      <div className=''>
        <Container>
          <PageHeader icon='fa fa-credit-card-alt' intlId='billing' className='mb-3 billing-tour' />
          <div className='fs-6 pb-3'>
            <FormattedMessage id='pleaseChoosePlan' defaultMessage='pleaseChoosePlan' />
          </div>
        </Container>
        <div className='d-flex flex-column gap-3'>
          {table.map((row, i) => (
            <div
              key={row.planId}
              className={`
              ${i === table.length - 1 ? "w-100 position-absolute bottom-0 z-3" : "rounded-pill mx-2"} p-3 bg-gradient shadow-${userContext.userData.theme} 
               d-flex align-items-center text-white`}
              style={{
                background: row.planColor,
              }}
              onClick={() => row.isPlanOptable && openPaywall(row.planCodeExpanded)}
            >
              <div className='px-1'>
                <div
                  style={{ width: "3rem", height: "3rem" }}
                  className={`d-flex align-items-center justify-content-center small rounded-circle bg-white text-dark shadow-dark`}
                >
                  <i className={`${row.planIcon} fa-2x`} style={{ color: row.planColor }} />
                </div>
              </div>
              <div className='px-2 w-75'>
                <div className='fs-4'>
                  <FormattedMessage id={row.planTitle} defaultMessage={row.planTitle} />
                </div>
                <small className={``}>
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
                    <i className='fa fa-lock fa-2x text-white' />
                  </OverlayTrigger>
                ) : i === table.length - 1 ? (
                  <i className='fa fa-shopping-cart text-white fa-2x' />
                ) : (
                  <i role='button' className={`fa fa-hand-pointer-o fa-2x text-white`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default MobileBilling;
