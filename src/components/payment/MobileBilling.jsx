import React, { useEffect, useState, useContext } from "react";
import { Capacitor } from "@capacitor/core";
import { Purchases, LOG_LEVEL } from "@revenuecat/purchases-capacitor";
import { RevenueCatUI } from "@revenuecat/purchases-capacitor-ui";
import { Container } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import PageHeader from "../shared/PageHeader";
import useAxios from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";

const MobileBilling = () => {
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const [offering, setOffering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [openingPaywall, setOpeningPaywall] = useState(false);
  const [targetOfferingId] = useState("xLarge");
  const [table, setTable] = useState([]);

  useEffect(() => {
    initRevenueCat();
  }, []);

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

      await Purchases.setLogLevel({ logLevel: LOG_LEVEL.DEBUG });

      if (!Capacitor.isNativePlatform()) {
        setErrorMsg("Ledgerely Paywall is available in the iOS and Android apps.");
        return;
      }

      const apiKey = import.meta.env.VITE_REVENUECAT_API_KEY;

      await Purchases.configure({ apiKey });

      const offerings = await Purchases.getOfferings();
      const selectedOffering = offerings.all?.[targetOfferingId];

      if (!selectedOffering) {
        throw new Error(`The ${targetOfferingId} offering is not configured in RevenueCat.`);
      }

      setOffering(selectedOffering);
      await openPaywall(selectedOffering);
    } catch (err) {
      console.error("RevenueCat setup error:", err);
      setErrorMsg(err.message || "Failed to load subscription plans.");
    } finally {
      setLoading(false);
    }
  };

  const openPaywall = async selectedOffering => {
    try {
      setOpeningPaywall(true);
      setErrorMsg(null);
      await RevenueCatUI.presentPaywall({ offering: selectedOffering });
    } catch (err) {
      console.error("Ledgerely Paywall error:", err);
      setErrorMsg(err.message || "Unable to open the Ledgerely Paywall.");
    } finally {
      setOpeningPaywall(false);
    }
  };

  if (loading) {
    return (
      <div className='container-fluid py-4'>
        <p>Loading available plans...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className='container-fluid py-4'>
        <p className='text-danger'>{errorMsg}</p>
      </div>
    );
  }

  return (
    <Container fluid>
      <PageHeader icon='fa fa-credit-card-alt' intlId='billing' className='mb-3 billing-tour' />
      {table.length > 0 &&
        table.map(row => (
          <div
            key={row.planId}
            className={`my-3 p-3 rounded-3 column-gap-2 d-flex align-items-center justify-content-between ${userContext.userData.theme === "dark" ? "bg-black text-white" : "bg-light text-dark border border-1"}`}
          >
            <div>
              <div className='fs-3'>
                <FormattedMessage id={row.planTitle} defaultMessage={row.planTitle} />
              </div>
              <small className={`${userContext.userData.theme === "dark" ? "icon-bni" : "text-primary"}`}>
                <FormattedMessage id={row.planDescription} defaultMessage={row.planDescription} />
              </small>
            </div>
            <div>
              <button
                type='button'
                className={`btn btn-sm text-wrap ${userContext.userData.theme === "dark" ? "btn-bni border-0" : "btn-primary"}`}
                onClick={() => openPaywall(offering)}
                disabled={!row.isPlanOptable}
              >
                {!row.isPlanOptable ? (
                  <small>
                    <FormattedMessage id='maximumQuotaExceeded' defaultMessage='maximumQuotaExceeded' />
                  </small>
                ) : (
                  <FormattedMessage id='subscribeNow' defaultMessage='subscribeNow' />
                )}
              </button>
            </div>
          </div>
        ))}
      {offering && (
        <button type='button' className='btn btn-primary' disabled={openingPaywall} onClick={() => openPaywall(offering)}>
          {openingPaywall ? <i className='fa fa-cog fa-spin fa-fw' /> : <FormattedMessage id='subscribeNow' defaultMessage='subscribeNow' />}
        </button>
      )}
    </Container>
  );
};

export default MobileBilling;
