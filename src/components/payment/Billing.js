import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { FormattedMessage, useIntl } from "react-intl";
import { Row, Col, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";
import SubscriptionModal from "./SubscriptionModal";
import Transactions from "./Transactions";
const Summary = lazy(() => import("./Summary"));
const CloseAccount = lazy(() => import("./CloseAccount"));

const CouponHeading = lazy(() =>
  import("./CouponAlert").then(module => ({
    default: module["CouponHeading"],
  })),
);
const CouponContent = lazy(() =>
  import("./CouponAlert").then(module => ({
    default: module["CouponContent"],
  })),
);

const BillingContext = React.createContext(undefined);

const CurrencyPrice = ({ amount, suffix, symbol }) => {
  const n = amount.toFixed(2);
  const pieces = (n + "").split(".");
  return (
    <>
      <sup className='fs-6'>{symbol}</sup>
      <span className='fs-5'>{Number(pieces[0]).toLocaleString("en-US")}</span>
      <sub>
        .{pieces[1]}
        {suffix}
      </sub>
    </>
  );
};

const Billing = props => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "billing",
    defaultMessage: "billing",
  })}`;
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const [table, setTable] = useState([]);
  const [loader, setLoader] = useState(true);
  const [billingLoader, setBillingLoader] = useState(false);
  const [subscribeLoader, setSubscribeLoader] = useState(false);
  const [subscriptionModalShow, setSubscriptionModalShow] = useState(false); //
  const [selectedPlan, setSelectedPlan] = useState({});
  const [restTable, setRestTable] = useState([]);
  const [refetchHistory, setRefetchHistory] = useState(true);
  const [coupons] = useState({});
  const cycleRef = {
    month: {
      prop: "planPriceMonthly",
      razorPayProp: "pricingMonthId",
      suffix: `  / ${intl.formatMessage({
        id: "month",
        defaultMessage: "month",
      })}`,
    },
    year: {
      prop: "planPriceYearly",
      razorPayProp: "pricingYearId",
      suffix: ` / ${intl.formatMessage({
        id: "year",
        defaultMessage: "year",
      })}`,
    },
  };
  const sortableProperties = [
    "planBankAccountsLimit",
    "planCreditCardAccounts",
    "planCategoriesLimit",
    "planUsersLimit",
    "planTemplateLimit",
    "planTrxLimit",
    "planCreditCardTrxLimit",
    "planDatasourceLimit",
    "planWorkbookLimit",
    "planStorageLimit",
    "planIsTransactionSearch",
    "planIsBulkImport",
    "planIsEmailAlerts",
    "planIsPredictions",
    "visualizationLimit",
  ];

  const propertyTypes = [
    {
      key: "planBankAccountsLimit",
      type: "numericNull",
      label: intl.formatMessage({
        id: "bankAccounts",
        defaultMessage: "bankAccounts",
      }),
    },
    {
      key: "planCreditCardAccounts",
      type: "numericNull",
      label: intl.formatMessage({
        id: "creditCardAccounts",
        defaultMessage: "creditCardAccounts",
      }),
    },
    {
      key: "planCategoriesLimit",
      type: "numericNull",
      label: intl.formatMessage({
        id: "incExpCat",
        defaultMessage: "incExpCat",
      }),
    },
    {
      key: "planUsersLimit",
      type: "numericNull",
      label: intl.formatMessage({
        id: "users",
        defaultMessage: "users",
      }),
    },
    {
      key: "planTemplateLimit",
      type: "numericNull",
      label: intl.formatMessage({
        id: "schedules",
        defaultMessage: "schedules",
      }),
    },
    {
      key: "planTrxLimit",
      type: "numericNull",
      label: intl.formatMessage({
        id: "bankTransactions",
        defaultMessage: "bankTransactions",
      }),
    },
    {
      key: "planCreditCardTrxLimit",
      type: "numericNull",
      label: intl.formatMessage({
        id: "creditCardTransactions",
        defaultMessage: "creditCardTransactions",
      }),
    },
    {
      key: "planDatasourceLimit",
      type: "bytesOrNull",
      label: intl.formatMessage({
        id: "dataSource",
        defaultMessage: "dataSource",
      }),
    },
    {
      key: "planWorkbookLimit",
      type: "bytesOrNull",
      label: intl.formatMessage({
        id: "workbook",
        defaultMessage: "workbook",
      }),
    },
    {
      key: "planStorageLimit",
      type: "bytesOrNull",
      label: intl.formatMessage({
        id: "fileStorage",
        defaultMessage: "fileStorage",
      }),
    },
    {
      key: "planIsBulkImport",
      type: "boolean",
      label: intl.formatMessage({
        id: "bulkImport",
        defaultMessage: "bulkImport",
      }),
    },
    {
      key: "planIsEmailAlerts",
      type: "boolean",
      label: intl.formatMessage({
        id: "emailAlerts",
        defaultMessage: "emailAlerts",
      }),
    },
    {
      key: "planIsPredictions",
      type: "boolean",
      label: intl.formatMessage({
        id: "predictions",
        defaultMessage: "predictions",
      }),
    },
    {
      key: "planIsTransactionSearch",
      type: "boolean",
      label: intl.formatMessage({
        id: "globalSearch",
        defaultMessage: "globalSearch",
      }),
    },
    {
      key: "visualizationLimit",
      type: "numericNull",
      label: intl.formatMessage({
        id: "visualizations",
        defaultMessage: "visualizations",
      }),
    },
  ];

  const cycleList = [
    {
      value: "month",
      label: intl.formatMessage({
        id: "monthly",
        defaultMessage: "monthly",
      }),
    },
    {
      value: "year",
      label: intl.formatMessage({
        id: "yearly",
        defaultMessage: "yearly",
      }),
    },
  ];

  const [summary, setSummary] = useState({
    currency: userContext.userConfig.currency,
    cycle: "month",
    razorPayCustomerId: userContext.userConfig.razorPayCustomerId,
    razorPayPlanId: "",
    invoice: [
      {
        id: "price",
        label: intl.formatMessage({
          id: "price",
          defaultMessage: "price",
        }),
        value: 0,
      },
      {
        id: "creditAdjustment",
        label: intl.formatMessage({
          id: "creditAdjustment",
          defaultMessage: "creditAdjustment",
        }),
        value: 0,
      },
      {
        id: "discount",
        label: intl.formatMessage({
          id: "discount",
          defaultMessage: "discount",
        }),
        title: "",
        value: 0,
      },
      {
        id: "tax",
        label: intl.formatMessage({
          id: "tax",
          defaultMessage: "tax",
        }),
        title: "",
        value: 0,
      },
    ],
    total: 0,
  });
  const total = Number(
    summary.invoice.reduce((a, b) => a + b.value, 0).toFixed(2),
  );

  const getAvailablePlans = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    formdata.append("currency", userContext.userConfig.currency);
    return apiInstance.post("/payments/availableBillingPlans", formdata);
  };

  const getDiscounts = () => {
    const formdata = new FormData();
    formdata.append("razorPayCustomerId", summary.razorPayCustomerId);
    return apiInstance.post("/payments/checkDiscounts", formdata);
  };
  const getTaxes = () => {
    const formdata = new FormData();
    formdata.append("country", userContext.userConfig.country);
    return apiInstance.get("/payments/checkTaxes");
  };
  const getCreditAdjustments = () => {
    const formdata = new FormData();
    formdata.append(
      "razorPayCustomerId",
      userContext.userConfig.razorPayCustomerId,
    );
    formdata.append("razorPayPlanId", summary.razorPayPlanId);
    return apiInstance.post("/payments/deductExhaustedUsage", formdata);
  };

  useEffect(() => {
    myAlertContext.setConfig({
      show: false,
    });
    const a = getAvailablePlans();

    Promise.all([a])
      .then(res => {
        setTable(res[0].data.response);
        const objArray =
          Array.isArray(res[0]?.data?.response) && res[0]?.data?.response[0]
            ? Object.keys(res[0]?.data?.response[0]).sort((a, b) => {
                return (
                  sortableProperties.indexOf(a) - sortableProperties.indexOf(b)
                );
              })
            : [];
        setRestTable(objArray);
      })
      .catch(e => console.log(e))
      .finally(() => setLoader(false));

    return () => {
      myAlertContext.setConfig({ show: false });
    };
  }, []);

  useEffect(() => {
    if (
      Object.keys(coupons).length > 0 &&
      coupons?.percentOff > 0 &&
      coupons?.name
    ) {
      myAlertContext.setConfig({
        show: true,
        className: "alert-success border-0 text-dark",
        type: "success",
        dismissible: true,
        heading: <CouponHeading />,
        content: (
          <CouponContent
            values={{ n: coupons?.percentOff, y: coupons?.name }}
          />
        ),
      });
    }
  }, [coupons]);

  useEffect(() => {
    if (selectedPlan?.planId) {
      setBillingLoader(true);
      const a = getDiscounts();
      const b = getTaxes();
      const c = getCreditAdjustments();
      Promise.all([a, b, c])
        .then(r => {
          // Discounts
          const discObj = r[0].data.response;
          const discName = discObj.name;
          let discValue =
            (discObj.value / 100) * selectedPlan[cycleRef[summary.cycle].prop];
          discValue = -Number(discValue.toFixed(2));
          // Taxes
          const taxObj = r[1].data.response;
          const taxName = taxObj.name;
          let taxValue =
            (taxObj.value / 100) * selectedPlan[cycleRef[summary.cycle].prop];
          taxValue = Number(taxValue.toFixed(2));
          // Credit adjustments
          const creditObj = r[2].data.response;
          const { adjustmentCredit } = creditObj;
          setSummary(prev => ({
            ...prev,
            invoice: prev.invoice.map(
              o => (
                o.id === "discount"
                  ? Object.assign(o, {
                      title:
                        discName && discObj?.value > 0
                          ? `${discName} - ${discObj?.value}%`
                          : null,
                      value: discValue,
                    })
                  : o,
                o.id === "tax"
                  ? Object.assign(o, {
                      title: taxName,
                      value: taxValue,
                    })
                  : o,
                o.id === "creditAdjustment"
                  ? Object.assign(o, {
                      value: adjustmentCredit,
                    })
                  : o
              ),
            ),
          }));
        })
        .catch(e => console.log(e))
        .finally(() => setBillingLoader(false));
    }
  }, [selectedPlan.planId, summary.cycle]);

  const Price = ({
    planPriceMonthly,
    planPriceYearly,
    isPlanOptable,
    planPriceCurrencySymbol,
  }) => {
    return (
      <div
        style={!isPlanOptable ? { textDecoration: "line-through" } : {}}
        className='d-flex align-items-center justify-content-center text-center'
      >
        <div className='pe-2'>
          <CurrencyPrice
            amount={planPriceMonthly}
            suffix={` / ${intl.formatMessage({
              id: "month",
              defaultMessage: "month",
            })}`}
            symbol={planPriceCurrencySymbol}
          />
        </div>
        <div className='w-50'>
          <CurrencyPrice
            amount={planPriceYearly}
            suffix={` / ${intl.formatMessage({
              id: "year",
              defaultMessage: "year",
            })}`}
            symbol={planPriceCurrencySymbol}
          />
        </div>
      </div>
    );
  };

  const Description = ({ planTitle, planDescription }) => (
    <div className='text-center py-2'>
      <div className='fs-4'>
        <FormattedMessage id={planTitle} defaultMessage={planTitle} />
      </div>
      <div style={{ fontSize: "0.75rem" }}>
        <FormattedMessage
          id={planDescription}
          defaultMessage={planDescription}
        />
      </div>
    </div>
  );

  const Head = ({ planName, planCode, isPlanOptable }) => (
    <div className='bni-bg rounded-top text-dark px-2 py-1 d-flex align-items-center justify-content-between'>
      <div style={!isPlanOptable ? { textDecoration: "line-through" } : {}}>
        {selectedPlan.planCode === planCode && (
          <i className='fa fa-check-circle pe-1' />
        )}
        <span>
          <FormattedMessage id={planName} defaultMessage={planName} />
        </span>
        {!isPlanOptable && (
          <OverlayTrigger
            placement='right'
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip(
              props,
              intl.formatMessage({
                id: "maximumQuotaExceeded",
                defaultMessage: "maximumQuotaExceeded",
              }),
            )}
            triggerType='hover'
          >
            <i className='fa fa-info-circle ps-1 cursor-pointer' />
          </OverlayTrigger>
        )}
      </div>
      {userContext.userConfig.planCode === planCode && (
        <div>
          <span className='badge rounded-pill bg-dark'>
            <FormattedMessage id='currentPlan' defaultMessage='currentPlan' />
          </span>
        </div>
      )}
    </div>
  );

  const renderTooltip = (props, content) => (
    <Tooltip id={`button-tooltip-${Math.random()}`} className='in show'>
      {content}
    </Tooltip>
  );

  const DynamicRender = ({ obj, t }) => {
    const row = propertyTypes.filter(f => f.key === obj);
    const label = row[0]?.label;
    let comp = "";
    if (row[0]?.type === "numericNull") {
      comp = t[obj] !== null ? t[obj] : <span className='text-success'>∞</span>;
    } else if (row[0]?.type === "bytesOrNull") {
      comp =
        t[obj] !== null ? (
          `${t[obj] / 1024 / 1024} MB`
        ) : (
          <span className='text-success'>∞</span>
        );
    } else if (row[0]?.type === "boolean") {
      comp = t[obj] ? (
        <i className='fa fa-check text-success' />
      ) : (
        <i className='fa fa-times text-danger' />
      );
    } else {
      comp = t[obj];
    }
    return (
      <div className='d-flex align-items-center justify-content-between pb-1'>
        <div>{label}</div>
        <div>{comp}</div>
      </div>
    );
  };

  const loaderComp = () => {
    return (
      <div className='relativeSpinner middle'>
        <Loader />
      </div>
    );
  };

  const onPlanClick = obj => {
    setSelectedPlan(obj);
    updateSummary(obj);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  };

  const updateSummary = obj => {
    if (obj.isPlanOptable) {
      const price = table.filter(f => f.planCode === obj.planCode)[0]
        .planPriceMonthly;

      const razorPayPlanId = table.filter(f => f.planCode === obj.planCode)[0]
        .pricingMonthId;

      setSummary(prev => ({
        ...prev,
        razorPayPlanId,
        cycle: cycleList[0].value,
        invoice: prev.invoice.map(o =>
          o.id === "price" ? Object.assign(o, { value: price }) : o,
        ),
      }));
    }
  };

  const SubscribeButton = obj =>
    obj.planPriceMonthly > 0 && obj.planPriceYearly > 0 ? (
      <button
        onClick={() => onPlanClick(obj)}
        disabled={!obj.isPlanOptable}
        className='w-100 btn btn-bni p-1 rounded-top-0 border-0'
        title='Subscribe now'
      >
        <Price
          {...{
            planPriceMonthly: obj.planPriceMonthly,
            planPriceYearly: obj.planPriceYearly,
            isPlanOptable: obj.isPlanOptable,
            planPriceCurrencySymbol: obj.planPriceCurrencySymbol,
          }}
        />
      </button>
    ) : (
      <button
        disabled={!obj.isPlanOptable}
        className='w-100 btn btn-bni rounded-top-0 border-0 py-1'
      >
        <div className='py-1'>
          <FormattedMessage id='free' defaultMessage='free' />
        </div>
      </button>
    );

  return (
    <Suspense fallback={loaderComp()}>
      <BillingContext.Provider
        value={{
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
          subscriptionModalShow,
          setSubscriptionModalShow,
          refetchHistory,
          setRefetchHistory,
        }}
      >
        {subscriptionModalShow && (
          <SubscriptionModal
            className=''
            show={subscriptionModalShow}
            onHide={() => setSubscriptionModalShow(false)}
            size='md'
            animation={false}
          />
        )}
        <div className='container-fluid'>
          <div
            className={`bg-gradient ${
              userContext.userData.theme === "dark"
                ? "bg-dark darkBoxShadow"
                : "bg-white lightBoxShadow"
            } mt-2 ps-3 py-2 rounded-pill mb-4`}
          >
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <i className={`fa fa-credit-card-alt fa-1x`}></i>
                <div className='ps-2 mb-0'>
                  <FormattedMessage id='billing' defaultMessage='billing' />
                </div>
              </div>
              <Button
                size='sm'
                variant={`${userContext.userData.theme === "dark" ? "dark" : "light"}`}
                className={`rounded-pill me-2 ${userContext.userData.theme === "dark" ? "" : "border"}`}
                onClick={() => setSubscriptionModalShow(true)}
                disabled={
                  userContext.userConfig.razorPaySubscriptionId ? false : true
                }
              >
                <i
                  className={`fa fa-circle pe-2 ${userContext.userConfig.razorPaySubscriptionId ? "icon-bni" : "text-danger"}`}
                />
                <FormattedMessage
                  id={
                    userContext.userConfig.razorPaySubscriptionId
                      ? "subscriptionStarted"
                      : "subscriptionNotStarted"
                  }
                  defaultMessage={
                    userContext.userConfig.razorPaySubscriptionId
                      ? "subscriptionStarted"
                      : "subscriptionNotStarted"
                  }
                />
              </Button>
            </div>
          </div>
          {loader && loaderComp()}
          {!loader && (
            <>
              <div>
                {table && table.length > 0 && (
                  <Row className=''>
                    {table.map((t, i) => (
                      <Col md={6} lg={3} key={i} className='pb-3'>
                        <div
                          className={`rounded-3 border ${
                            userContext.userData.theme === "dark"
                              ? "border-black"
                              : "border-1"
                          } ${
                            t.isPlanOptable
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          } ${
                            selectedPlan.planCode === t.planCode
                              ? "animate__animated animate__headShake"
                              : ""
                          }`}
                          style={
                            selectedPlan.planCode === t.planCode
                              ? {
                                  boxShadow: "0 2px 10px 0 #000",
                                }
                              : {}
                          }
                          onClick={() => t.isPlanOptable && onPlanClick(t)}
                        >
                          <Head {...t} />
                          <Description {...t} />
                          <div className='p-2'>
                            {restTable
                              .filter(
                                f =>
                                  ![
                                    "planId",
                                    "planCode",
                                    "planName",
                                    "planTitle",
                                    "planDescription",
                                    "planIsActive",
                                    "planPriceMonthly",
                                    "planPriceYearly",
                                    "planPriceCurrencySymbol",
                                    "pricingMonthId",
                                    "pricingYearId",
                                  ].includes(f),
                              )
                              .map((obj, j) => (
                                <DynamicRender key={j} obj={obj} t={t} />
                              ))}
                          </div>
                          <SubscribeButton {...t} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
              <Summary />
            </>
          )}
        </div>
        {refetchHistory && <Transactions />}
        <hr className='mt-5' />
        <Row>
          <Col sm={6}>
            <CloseAccount />
          </Col>
        </Row>
      </BillingContext.Provider>
    </Suspense>
  );
};

export default Billing;
export { BillingContext, CurrencyPrice };
