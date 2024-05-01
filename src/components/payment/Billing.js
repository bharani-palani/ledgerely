import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { FormattedMessage } from "react-intl";
import apiInstance from "../../services/apiServices";
import { Row, Col } from "react-bootstrap";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";

const Billing = props => {
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
    { key: "planIsPredictions", type: "boolean", label: "Predictions" },
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
    return Number(planPriceMonthly) && Number(planPriceYearly) ? (
      <div className='py-3 d-flex align-items-center justify-content-evenly text-center'>
        <div className='border-secondary border-end pe-2 w-50'>
          <sup className='fs-4 icon-bni'>₹</sup>
          <span className='fs-3'>{planPriceMonthly}</span>
          <sub>.00</sub>
          <sup className='small'> / mo</sup>
        </div>
        <div className='ps-3 w-50'>
          <sup className='fs-4 icon-bni'>₹</sup>
          <span className='fs-3'>{planPriceYearly}</span>
          <sub>.00</sub>
          <sup className='small'> / yr</sup>
        </div>
      </div>
    ) : (
      <div className='py-2 text-center'>
        <sup className='fs-1 icon-bni'>₹</sup>
        <span className='fs-1'>0</span>
        <sub>.00</sub>
      </div>
    );
  };

  const Description = ({ planTitle, planDescription }) => (
    <div className='text-center'>
      <div>{planTitle}</div>
      <div style={{ fontSize: "0.75rem" }}>{planDescription}</div>
    </div>
  );

  const Head = ({ planName, planCode, isPlanOptable }) => (
    <div className='bni-bg text-dark px-2 py-1 d-flex align-items-center justify-content-between'>
      {isPlanOptable ? (
        <div>
          <span>{planName}</span>
        </div>
      ) : (
        <del className='text-danger'>{planName}</del>
      )}
      {userContext.userConfig.planCode === planCode && (
        <div>
          <span className='badge rounded-pill bg-dark'>Curent plan</span>
        </div>
      )}
      {isPlanOptable ? (
        <div className='rounded-circle bg-dark text-white p-1 small'>
          {planCode}
        </div>
      ) : (
        <del className='text-danger rounded-circle bg-dark p-1 small'>
          {planCode}
        </del>
      )}
    </div>
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
    if (obj.isPlanOptable) {
      setSelectedPlan(obj.planCode);
    }
  };

  return (
    <div className='m-2'>
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
              <Col
                md={6}
                lg={3}
                key={i}
                style={!t.isPlanOptable ? { cursor: "not-allowed" } : {}}
              >
                <Head {...t} />
                <Price {...t} />
                <Description {...t} />
                <div className='my-2'>
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
                <button
                  onClick={() => onPlanClick(t)}
                  disabled={!t.isPlanOptable}
                  className='w-100 btn btn-xl btn-bni'
                >
                  <div className='d-flex justify-content-around align-items-center'>
                    {selectedPlan === t.planCode && (
                      <i className='fa fa-check-circle fa-2x text-success pe-1' />
                    )}
                    <Price {...t} />
                  </div>
                </button>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Billing;
