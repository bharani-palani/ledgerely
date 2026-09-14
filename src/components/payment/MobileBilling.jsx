import React, { useEffect, useState, useContext } from "react";
import { Capacitor } from "@capacitor/core";
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { RevenueCatUI } from "@revenuecat/purchases-capacitor-ui";
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
  const offeringRef = {
    MD: "medium",
    LG: "large",
    XL: "xlarge",
  };

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

  useEffect(() => {
    setLoading(true);
    const a = getAvailablePlans();
    Promise.all([a])
      .then(res => {
        const data = res[0].data.response;
        setTable(data.reverse());
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
        appUserID: userContext.userConfig.tenantId,
      });
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
      const offeringId = offeringRef[planCode] || planCode;
      const selectedOffering = offerings[offeringId];

      if (!selectedOffering) {
        throw new Error(`The ${offeringId} offering is not configured in RevenueCat.`);
      }

      await RevenueCatUI.presentPaywall({ offering: selectedOffering });
    } catch (err) {
      console.error("Ledgerely Paywall error:", err);
      setErrorMsg(err.message || "Unable to open the Ledgerely Paywall.");
    } finally {
      setOpeningPaywall(false);
    }
  };

  if (loading || openingPaywall) {
    return (
      <Container fluid>
        <Loader />
      </Container>
    );
  }

  if (errorMsg) {
    return (
      <Container fluid>
        <p className='text-danger'>{errorMsg}</p>
      </Container>
    );
  }

  const colors = ["--bs-indigo", "--bs-purple", "--bs-pink", "--bs-blue"];

  return (
    table.length > 0 && (
      <>
        <Container fluid>
          <PageHeader icon='fa fa-credit-card-alt' intlId='billing' className='mb-3 billing-tour' />
          <div className='fs-6'>
            <FormattedMessage id='pleaseChoosePlan' defaultMessage='pleaseChoosePlan' />
          </div>
          {table.map((row, i) => (
            <div
              key={row.planId}
              className={`my-3 p-3 bg-gradient shadow-${userContext.userData.theme} rounded-3 column-gap-2 d-flex align-items-center justify-content-between text-white`}
              style={{
                background: `var(${colors[i]})`,
              }}
              onClick={() => row.isPlanOptable && openPaywall(row.planCode)}
            >
              <div className='w-25'>
                <span className={`p-3 small rounded-circle bg-white text-dark shadow-dark`}>{row.planCode}</span>
              </div>
              <div className='w-75'>
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
                ) : (
                  <i role='button' className={`fa fa-hand-pointer-o fa-2x text-white`} />
                )}
              </div>
            </div>
          ))}
        </Container>
        <div
          onClick={() => openPaywall("lifetime")}
          className='w-100 position-absolute bottom-0 d-flex align-items-center justify-content-between z-3 bg-gradient text-white'
          style={{
            background: `var(--bs-teal)`,
          }}
        >
          <div className={`w-75 d-flex flex-column p-3 ps-5 rounded-3`}>
            <div className='fs-4'>
              <FormattedMessage id='lifeTime' defaultMessage='lifeTime' />
            </div>
            <small>
              <FormattedMessage id='oneTimePurchase' defaultMessage='oneTimePurchase' />
            </small>
          </div>
          <div className='w-25 text-center'>
            <i className='fa fa-shopping-cart fa-2x text-white' />
          </div>
        </div>
      </>
    )
  );
};

export default MobileBilling;
