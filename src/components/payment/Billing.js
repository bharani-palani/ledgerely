import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { FormattedMessage, useIntl } from "react-intl";
import apiInstance from "../../services/apiServices";
import {
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
  Form,
  Button,
} from "react-bootstrap";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import Switch from "react-switch";

const Billing = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const [table, setTable] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [restTable, setRestTable] = useState([]);
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
      { id: "tax", label: "Tax", value: 0 },
    ],
    total: 0,
  });

  const getAvailablePlans = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/payments/availableBillingPlans", formdata);
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
        setSelectedPlan(userContext.userConfig.planCode);
      })
      .catch(e => console.log("bbb", e))
      .finally(() => setLoader(false));
  }, []);

  const Price = ({ planPriceMonthly, planPriceYearly, isPlanOptable }) => {
    return (
      <div
        style={!isPlanOptable ? { textDecoration: "line-through" } : {}}
        className='d-flex align-items-center justify-content-evenly text-center'
      >
        <div className='border-secondary border-end pe-2 w-50'>
          <sup className='fs-4'>₹</sup>
          <span className='fs-3'>{planPriceMonthly}</span>
          <sub>.00</sub>
          <sup className='small'> / mo</sup>
        </div>
        <div className='ps-3 w-50'>
          <sup className='fs-4'>₹</sup>
          <span className='fs-3'>{planPriceYearly}</span>
          <sub>.00</sub>
          <sup className='small'> / yr</sup>
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
        {selectedPlan === planCode && (
          <i className='fa fa-check-circle text-success pe-1' />
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
    setSelectedPlan(obj.planCode);
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
        acceptTerms: false,
        invoice: prev.invoice.map(o =>
          o.id === "price" ? Object.assign(o, { value: price }) : o,
        ),
      }));
    }
  };

  useEffect(() => {}, []);

  const SubscribeButton = ({
    planPriceMonthly,
    planPriceYearly,
    isPlanOptable,
    planCode,
  }) =>
    Number(planPriceMonthly) && Number(planPriceYearly) ? (
      <button
        onClick={() => onPlanClick({ isPlanOptable, planCode })}
        disabled={!isPlanOptable}
        className='w-100 btn btn-bni p-1 rounded-top-0 border-0'
      >
        <div style={!isPlanOptable ? { textDecoration: "line-through" } : {}}>
          Subscribe now
        </div>
        <Price {...{ planPriceMonthly, planPriceYearly, isPlanOptable }} />
      </button>
    ) : (
      <div className='text-center py-3 icon-bni'>
        <span className='fs-2'>Free</span>
      </div>
    );

  return (
    <div className='container'>
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
      <div>
        {loader && loaderComp()}
        {table.length > 0 && (
          <Row className=''>
            {table.map((t, i) => (
              <Col md={6} lg={3} key={i} className=''>
                <div
                  className='rounded'
                  style={
                    selectedPlan === t.planCode
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
      <div className='my-3'>
        <div className='fs-3'>Summary</div>
        <Row className='m-1'>
          <Col md={6} className='p-2 rounded borderDotted'>
            {summary.invoice.map((sum, i) => (
              <Col
                xs={12}
                key={sum.id}
                className='d-flex justify-content-between align-items-center py-2'
              >
                <div>{sum.label}</div>
                <div>{sum.value}</div>
              </Col>
            ))}
            <Col
              xs={12}
              style={{ borderTop: "double" }}
              className='d-flex justify-content-between align-items-center py-2'
            >
              <div>Total</div>
              <div>{summary.invoice.reduce((a, b) => a + b.value, 0)}</div>
            </Col>
          </Col>
          <Col md={6}>
            <div className='d-flex justify-content-between align-items-center py-2'>
              <div>Cycle</div>
              <div>
                <Form.Select
                  value={summary.cycle}
                  size='sm'
                  onChange={e => {
                    const ref = {
                      month: "planPriceMonthly",
                      year: "planPriceYearly",
                    };
                    const price = table.filter(
                      f => f.planCode === selectedPlan,
                    )[0][ref[e.target.value]];

                    setSummary(prev => ({
                      ...prev,
                      cycle: e.target.value,
                      invoice: prev.invoice.map(o =>
                        o.id === "price"
                          ? Object.assign(o, { value: price })
                          : o,
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
            <div className='d-flex justify-content-between align-items-center py-2'>
              <div>I agree to the terms and conditions</div>
              <div>
                <Switch
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
                    setSummary(prev => ({ ...prev, acceptTerms: e }));
                  }}
                  checked={summary.acceptTerms}
                />
              </div>
            </div>
            <div>
              <Button
                disabled={!summary.acceptTerms}
                className='btn btn-bni w-100 border-0'
              >
                Checkout {summary.invoice.reduce((a, b) => a + b.value, 0)}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Billing;
