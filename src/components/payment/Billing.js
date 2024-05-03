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
const CurrencyPrice = ({ amount, suffix }) => {
  const n = amount.toFixed(2);
  const pieces = (n + "").split(".");
  return (
    <>
      <sup className='fs-6'>₹</sup>
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
  const [selectedPlan, setSelectedPlan] = useState({});
  const [restTable, setRestTable] = useState([]);
  const cycleRef = {
    month: {
      prop: "planPriceMonthly",
      suffix: `  / ${intl.formatMessage({
        id: "month",
        defaultMessage: "month",
      })}`,
    },
    year: {
      prop: "planPriceYearly",
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
    currency: "INR",
    cycle: "month",
    acceptTerms: false,
    invoice: [
      { id: "price", label: "Price", value: 0 },
      { id: "creditAdjustment", label: "Credit adjustment", value: 0 },
      { id: "discount", label: "Discount", value: 0 },
      { id: "taxes", label: "Taxes", value: 0 },
    ],
    total: 0,
  });

  const getAvailablePlans = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/payments/availableBillingPlans", formdata);
  };

  const getDiscounts = planId => {
    const formdata = new FormData();
    formdata.append("planId", planId);
    return apiInstance.post("/payments/checkDiscounts", formdata);
  };
  const getTaxes = () => {
    return apiInstance.get("/payments/checkTaxes");
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
      Promise.all([getDiscounts(selectedPlan.planId), getTaxes()])
        .then(r => {
          const discObj = r[0].data.response;
          const discName = discObj.name;
          let discValue =
            (discObj.value / 100) * selectedPlan[cycleRef[summary.cycle].prop];
          discValue = -Number(discValue.toFixed(2));
          const taxObj = r[1].data.response;
          const taxName = taxObj.name;
          let taxValue =
            (taxObj.value / 100) * selectedPlan[cycleRef[summary.cycle].prop];
          taxValue = Number(taxValue.toFixed(2));
          setSummary(prev => ({
            ...prev,
            invoice: prev.invoice.map(
              o => (
                o.id === "discount"
                  ? Object.assign(o, { label: discName, value: discValue })
                  : o,
                o.id === "taxes"
                  ? Object.assign(o, {
                      label: taxName,
                      value: taxValue,
                    })
                  : o
              ),
            ),
          }));
        })
        .catch(e => console.log(e));
    }
  }, [selectedPlan, JSON.stringify(summary)]);

  const Price = ({ planPriceMonthly, planPriceYearly, isPlanOptable }) => {
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
          />
        </div>
        <div className='ps-3 w-50'>
          <CurrencyPrice
            amount={planPriceYearly}
            suffix={` / ${intl.formatMessage({
              id: "year",
              defaultMessage: "year",
            })}`}
          />
        </div>
      </div>
    );
  };

  const Description = ({ planTitle, planDescription }) => (
    <div className='text-center py-2'>
      <div className='fs-4 letterSpacing'>{planTitle}</div>
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
      <div className='d-flex align-items-center justify-content-between'>
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
    window.scrollTo(0, document.body.scrollHeight);
  };

  const updateSummary = obj => {
    if (obj.isPlanOptable) {
      const price = table.filter(f => f.planCode === obj.planCode)[0]
        .planPriceMonthly;
      setSummary(prev => ({
        ...prev,
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
      value={{ summary, setSummary, cycleList, table, selectedPlan, cycleRef }}
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
                        className='rounded'
                        style={
                          selectedPlan.planCode === t.planCode
                            ? {
                                boxShadow: "0 0 10px 0px #000",
                                transform: "scale(1.05)",
                              }
                            : {}
                        }
                      >
                        <Head {...t} />
                        <Description {...t} />
                        <div className='p-2'>
                          {restTable
                            .filter(
                              f =>
                                ![
                                  "planCode",
                                  "planName",
                                  "planTitle",
                                  "planDescription",
                                  "planIsActive",
                                  "planPriceMonthly",
                                  "planPriceYearly",
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
