import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { FormattedMessage, useIntl } from "react-intl";
import apiInstance from "../../services/apiServices";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import Summary from "./Summary";
import CloseAccount from "./CloseAccount";

const BillingContext = React.createContext(undefined);
const CurrencyPrice = ({ amount, suffix, symbol }) => {
  const n = amount.toFixed(2);
  const pieces = (n + "").split(".");
  return (
    <>
      <sup className='fs-6'>{symbol}</sup>
      <span className='fs-3'>{Number(pieces[0]).toLocaleString("en-US")}</span>
      <sub>
        .{pieces[1]}
        {suffix}
      </sub>
    </>
  );
};

const Billing = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const [table, setTable] = useState([]);
  const [loader, setLoader] = useState(true);
  const [billingLoader, setBillingLoader] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [restTable, setRestTable] = useState([]);
  const cycleRef = {
    month: {
      prop: "planPriceMonthly",
      stripeProp: "pricingMonthStripeId",
      suffix: `  / ${intl.formatMessage({
        id: "month",
        defaultMessage: "month",
      })}`,
    },
    year: {
      prop: "planPriceYearly",
      stripeProp: "pricingYearStripeId",
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
    "planIsBulkImport",
    "planIsEmailAlerts",
    "planIsPredictions",
    "planIsTransactionSearch",
    "visualizationLimit",
  ];

  const propertyTypes = [
    {
      key: "planBankAccountsLimit",
      type: "numericNull",
      label: "Bank accounts",
    },
    {
      key: "planCreditCardAccounts",
      type: "numericNull",
      label: "Credit card accounts",
    },
    {
      key: "planCategoriesLimit",
      type: "numericNull",
      label: "Categories",
    },
    { key: "planUsersLimit", type: "numericNull", label: "Users" },
    { key: "planTemplateLimit", type: "numericNull", label: "Planner" },
    {
      key: "planTrxLimit",
      type: "numericNull",
      label: "Income / Expense transactions",
    },
    {
      key: "planCreditCardTrxLimit",
      type: "numericNull",
      label: "Credit card transactions",
    },
    {
      key: "planDatasourceLimit",
      type: "bytesOrNull",
      label: "Datasource",
    },
    {
      key: "planWorkbookLimit",
      type: "bytesOrNull",
      label: "Workbook",
    },
    { key: "planStorageLimit", type: "bytesOrNull", label: "Storage" },
    { key: "planIsBulkImport", type: "boolean", label: "Bulk import" },
    { key: "planIsEmailAlerts", type: "boolean", label: "Email alerts" },
    {
      key: "planIsPredictions",
      type: "boolean",
      label: "Prediction notifications",
    },
    {
      key: "planIsTransactionSearch",
      type: "boolean",
      label: "Global search",
    },
    {
      key: "visualizationLimit",
      type: "numericNull",
      label: "Visualizations",
    },
  ];

  const cycleList = [
    { value: "month", label: "Monthly" },
    { value: "year", label: "Yearly" },
  ];

  const [summary, setSummary] = useState({
    currency: userContext.userConfig.currency,
    cycle: "month",
    stripePriceId: "",
    invoice: [
      { id: "price", label: "Price", value: 0 },
      { id: "creditAdjustment", label: "Credit adjustment", value: 0 },
      { id: "discount", label: "Discount", title: "", value: 0 },
      { id: "taxes", label: "Taxes", title: "", value: 0 },
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

  const getDiscounts = planId => {
    const formdata = new FormData();
    formdata.append("planId", planId);
    return apiInstance.post("/payments/checkDiscounts", formdata);
  };
  const getTaxes = () => {
    const formdata = new FormData();
    formdata.append("country", userContext.userConfig.country);
    return apiInstance.get("/payments/checkTaxes");
  };
  const getCreditAdjustments = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/payments/deductExhaustedUsage", formdata);
  };

  useEffect(() => {
    myAlertContext.setConfig({
      show: false,
    });
    getAvailablePlans()
      .then(res => {
        setTable(res.data.response);
        const objArray = Object.keys(res.data.response[0]).sort((a, b) => {
          return sortableProperties.indexOf(a) - sortableProperties.indexOf(b);
        });
        setRestTable(objArray);
      })
      .catch(e => console.log(e))
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    if (selectedPlan?.planId) {
      setBillingLoader(true);
      const a = getDiscounts(selectedPlan.planId);
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
                  ? Object.assign(o, { title: discName, value: discValue })
                  : o,
                o.id === "taxes"
                  ? Object.assign(o, {
                      title: taxName,
                      value: taxValue,
                    })
                  : o,
                o.id === "creditAdjustment"
                  ? Object.assign(o, {
                      value: -adjustmentCredit,
                    })
                  : o
              ),
            ),
          }));
        })
        .catch(e => console.log(e))
        .finally(() => setBillingLoader(false));
    }
  }, [selectedPlan, summary.cycle]);

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
        <div className='ps-3 w-50'>
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
      <div className='fs-4'>{planTitle}</div>
      <div style={{ fontSize: "0.75rem" }}>{planDescription}</div>
    </div>
  );

  const Head = ({ planName, planCode, isPlanOptable }) => (
    <div className='bni-bg rounded-top text-dark px-2 py-1 d-flex align-items-center justify-content-between'>
      <div style={!isPlanOptable ? { textDecoration: "line-through" } : {}}>
        {selectedPlan.planCode === planCode && (
          <i className='fa fa-check-circle pe-1' />
        )}
        <span>{planName}</span>
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
          <span className='badge rounded-pill bg-dark'>Curent plan</span>
        </div>
      )}
      <div
        style={!isPlanOptable ? { textDecoration: "line-through" } : {}}
        className='rounded-circle bg-dark text-white p-1 small'
      >
        <span>{planCode}</span>
      </div>
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
      <div className='relativeSpinner'>
        <Loader
          type={helpers.loadRandomSpinnerIcon()}
          color={document.documentElement.style.getPropertyValue(
            "--app-theme-bg-color",
          )}
          height={100}
          width={100}
        />
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

      const stripePriceId = table.filter(f => f.planCode === obj.planCode)[0]
        .pricingMonthStripeId;

      setSummary(prev => ({
        ...prev,
        stripePriceId,
        cycle: cycleList[0].value,
        invoice: prev.invoice.map(o =>
          o.id === "price" ? Object.assign(o, { value: price }) : o,
        ),
      }));
    }
  };

  const SubscribeButton = obj =>
    Number(obj.planPriceMonthly) && Number(obj.planPriceYearly) ? (
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
        className='w-100 btn btn-bni rounded-top-0 border-0 py-2'
      >
        <div className='py-1'>Free</div>
      </button>
    );

  return (
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
      }}
    >
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
          </div>
        </div>
        {loader && loaderComp()}
        {!loader && (
          <>
            <div>
              {table.length > 0 && (
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
                                boxShadow: "0 0 20px 0px #000",
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
                                  "pricingMonthStripeId",
                                  "pricingYearStripeId",
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
            {total < 0 && (
              <div
                className={`p-2 my-3 rounded bg-black icon-bni animate__animated animate__backInUp`}
              >
                <div className='d-flex align-items-center justify-content-center'>
                  <i className='fa fa-smile-o pe-2 fa-2x' />
                  <span>
                    You already have sufficient credits in your current plan, as
                    you can subscribe later once they are utilized.
                  </span>
                </div>
              </div>
            )}
            <Summary />
            <hr className='mt-5' />
            <Row>
              <Col sm={6}>
                <CloseAccount />
              </Col>
            </Row>
          </>
        )}
      </div>
    </BillingContext.Provider>
  );
};

export default Billing;
export { BillingContext, CurrencyPrice };
