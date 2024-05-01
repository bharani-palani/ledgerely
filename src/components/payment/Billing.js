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
      })
      .catch(e => console.log("bbb", e))
      .finally(() => setLoader(false));
  }, []);

  const Price = ({ planPriceMonthly, planPriceYearly }) => {
    return Number(planPriceMonthly) && Number(planPriceYearly) ? (
      <div className='py-3 d-flex align-items-center justify-content-evenly'>
        <div className='border-secondary border-end pe-2 w-50'>
          <div className='small'>Monthly</div>
          <sup className='fs-4 icon-bni'>₹</sup>
          <span className='fs-3'>{planPriceMonthly}</span>
          <sub>.00</sub>
        </div>
        <div className='ps-3 w-50'>
          <div className='small'>Yearly</div>
          <sup className='fs-4 icon-bni'>₹</sup>
          <span className='fs-3'>{planPriceYearly}</span>
          <sub>.00</sub>
        </div>
      </div>
    ) : (
      <div className='py-3'>
        <sup className='fs-1 icon-bni'>₹</sup>
        <span className='fs-1'>0</span>
        <sub>.00</sub>
      </div>
    );
  };

  const Description = ({ planTitle, planDescription }) => (
    <>
      <div>{planTitle}</div>
      <div style={{ fontSize: "0.75rem" }}>{planDescription}</div>
    </>
  );

  const Head = ({ planName, planCode }) => (
    <div className='bni-bg text-dark px-2 py-1 d-flex justify-content-between'>
      <div>{planName}</div>
      {userContext.userConfig.planCode === planCode && (
        <div>
          <span className='badge rounded-pill bg-dark'>Curent plan</span>
        </div>
      )}
      <div>({planCode})</div>
    </div>
  );

  const DynamicRender = ({ obj, t }) => {
    const row = propertyTypes.filter(f => f.key === obj);
    const label = row[0]?.label;
    let comp = "";
    if (row[0]?.type === "numericNull") {
      comp = t[obj] !== null ? t[obj] : <span>∞</span>;
    } else if (row[0]?.type === "bytesOrNull") {
      comp = t[obj] !== null ? `${t[obj] / 1024 / 1024} MB` : <span>∞</span>;
    } else if (row[0]?.type === "boolean") {
      comp = t[obj] ? (
        <i className='fa fa-check text-success' />
      ) : (
        <i className='fa fa-times-circle text-danger' />
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
    alert(obj.planCode);
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
                onClick={() => onPlanClick(t)}
                className='text-center cursor-pointer'
              >
                <Head {...t} />
                <Price {...t} />
                <Description {...t} />
                <div className='mt-4'>
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
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Billing;
