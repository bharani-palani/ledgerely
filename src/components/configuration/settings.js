import React, { useContext, useEffect, useState, useMemo } from "react";
import Config from "./config";
import Users from "./users";
import ChangePassword from "../GlobalHeader/changePassword";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import OffCanvas from "../shared/OffCanvas";
import { FormattedMessage, useIntl } from "react-intl";
import useAxios from "../../services/apiServices";
import Loader from "../resuable/Loader";

const Settings = () => {
  const { apiInstance } = useAxios();
  const userContext = useContext(UserContext);
  const [collapse, setCollapse] = useState("");
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  const [planDetails, setPlanDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "settings",
    defaultMessage: "settings",
  })}`;

  const getAvailablePlans = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    formdata.append("currency", userContext.userConfig.currency);
    return apiInstance.post("/payments/availableBillingPlans", formdata);
  };

  useEffect(() => {
    setLoading(true);
    getAvailablePlans()
      .then(res => {
        const currentPlanCode = userContext.userConfig.planCode;
        const selectedPlanDetails = res.data.response.filter(f => f.planCode === currentPlanCode)[0];
        setPlanDetails(selectedPlanDetails);
      })
      .catch(() => {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const propertyTypes = useMemo(
    () => [
      {
        key: "planCode",
        value: planDetails.planCode,
        label: intl.formatMessage({
          id: "plan",
          defaultMessage: "plan",
        }),
      },
      {
        key: "planBankAccountsLimit",
        type: "numericNull",
        value: planDetails.planBankAccountsLimit,
        label: intl.formatMessage({
          id: "bankAccounts",
          defaultMessage: "bankAccounts",
        }),
      },
      {
        key: "planCategoriesLimit",
        type: "numericNull",
        value: planDetails.planCategoriesLimit,
        label: intl.formatMessage({
          id: "incExpCat",
          defaultMessage: "incExpCat",
        }),
      },
      {
        key: "planCreditCardAccounts",
        type: "numericNull",
        value: planDetails.planCreditCardAccounts,
        label: intl.formatMessage({
          id: "creditCardAccounts",
          defaultMessage: "creditCardAccounts",
        }),
      },
      {
        key: "planIsBulkImport",
        type: "boolean",
        value: planDetails.planIsBulkImport,
        label: intl.formatMessage({
          id: "bulkImport",
          defaultMessage: "bulkImport",
        }),
      },
      {
        key: "planIsEmailAlerts",
        type: "boolean",
        value: planDetails.planIsEmailAlerts,
        label: intl.formatMessage({
          id: "emailAlerts",
          defaultMessage: "emailAlerts",
        }),
      },
      {
        key: "planIsPredictions",
        type: "boolean",
        value: planDetails.planIsPredictions,
        label: intl.formatMessage({
          id: "predictions",
          defaultMessage: "predictions",
        }),
      },
      {
        key: "planIsTransactionSearch",
        type: "boolean",
        value: planDetails.planIsTransactionSearch,
        label: intl.formatMessage({
          id: "globalSearch",
          defaultMessage: "globalSearch",
        }),
      },
      {
        key: "planStorageLimit",
        type: "numericNull",
        value: planDetails.planStorageLimit,
        label: intl.formatMessage({
          id: "fileStorage",
          defaultMessage: "fileStorage",
        }),
      },
      {
        key: "planTrxLimit",
        type: "numericNull",
        value: planDetails.planTrxLimit,
        label: intl.formatMessage({
          id: "bankTransactions",
          defaultMessage: "bankTransactions",
        }),
      },
      {
        key: "planUsersLimit",
        type: "numericNull",
        value: planDetails.planUsersLimit,
        label: intl.formatMessage({
          id: "users",
          defaultMessage: "users",
        }),
      },
      {
        key: "planTemplateLimit",
        type: "numericNull",
        value: planDetails.planTemplateLimit,
        label: intl.formatMessage({
          id: "schedules",
          defaultMessage: "schedules",
        }),
      },
      {
        key: "planCreditCardTrxLimit",
        type: "numericNull",
        value: planDetails.planCreditCardTrxLimit,
        label: intl.formatMessage({
          id: "creditCardTransactions",
          defaultMessage: "creditCardTransactions",
        }),
      },
      {
        key: "planDatasourceLimit",
        type: "bytesOrNull",
        value: planDetails.planDatasourceLimit,
        label: intl.formatMessage({
          id: "dataSource",
          defaultMessage: "dataSource",
        }),
      },
      {
        key: "planWorkbookLimit",
        type: "bytesOrNull",
        value: planDetails.planWorkbookLimit,
        label: intl.formatMessage({
          id: "workbook",
          defaultMessage: "workbook",
        }),
      },
      {
        key: "visualizationLimit",
        type: "numericNull",
        value: planDetails.visualizationLimit,
        label: intl.formatMessage({
          id: "visualizations",
          defaultMessage: "visualizations",
        }),
      },
    ],
    [planDetails, intl],
  );

  const renderElement = (str, type) => {
    let comp = "";
    if (type === "numericNull") {
      comp = str !== null ? str : <span className='text-success'>∞</span>;
    } else if (type === "bytesOrNull") {
      comp = str !== null ? `${str / 1024 / 1024} MB` : <span className='text-success'>∞</span>;
    } else if (type === "boolean") {
      comp = str ? <span className='text-success'>✓</span> : <span className='text-danger'>×</span>;
    } else if (type === "string") {
      comp = str === "1" ? <span className='text-success'>✓</span> : <span className='text-danger'>×</span>;
    } else {
      comp = str;
    }
    return comp;
  };

  const confArray = propertyTypes.map(conf => ({ label: conf.label, value: renderElement(conf?.value, conf?.type) }));

  const compList = [
    {
      id: "configuration",
      label: intl.formatMessage({
        id: "configuration",
        defaultMessage: "configuration",
      }),
      component: Config,
      accessTo: ["superAdmin"],
      help: {
        heading: intl.formatMessage({
          id: "configuration",
          defaultMessage: "configuration",
        }),
        points: [
          intl.formatMessage({
            id: "configWebDefaults",
            defaultMessage: "configWebDefaults",
          }),
          intl.formatMessage({
            id: "configSocialMedia",
            defaultMessage: "configSocialMedia",
          }),
        ],
      },
    },
    {
      id: "changePassword",
      label: intl.formatMessage({
        id: "changePassword",
        defaultMessage: "changePassword",
      }),
      component: ChangePassword,
      accessTo: ["superAdmin", "admin"],
      help: {
        heading: intl.formatMessage({
          id: "changePassword",
          defaultMessage: "changePassword",
        }),
        points: [
          intl.formatMessage({
            id: "changePasswordHelp",
            defaultMessage: "changePasswordHelp",
          }),
        ],
      },
    },
    {
      ...(Number(userContext.userConfig.planUsersLimit) > 1 && {
        id: "users",
        label: intl.formatMessage({ id: "users", defaultMessage: "users" }),
        component: Users,
        accessTo: ["superAdmin"],
        help: {
          heading: intl.formatMessage({ id: "users", defaultMessage: "users" }),
          points: [
            intl.formatMessage({
              id: "setUsersToHandleAndMaintainYourApp",
              defaultMessage: "setUsersToHandleAndMaintainYourApp",
            }),
            intl.formatMessage({
              id: "superAdminIsAddedByDefault",
              defaultMessage: "superAdminIsAddedByDefault",
            }),
            intl.formatMessage({
              id: "superAdminHasAccessToControl",
              defaultMessage: "superAdminHasAccessToControl",
            }),
            intl.formatMessage({
              id: "crudOperationsAreAvailable",
              defaultMessage: "crudOperationsAreAvailable",
            }),
            intl.formatMessage({
              id: "onceUsersCreated",
              defaultMessage: "onceUsersCreated",
            }),
          ],
        },
      }),
    },
  ];

  const loaderComp = () => {
    return (
      <div className='relativeSpinner'>
        <Loader />
      </div>
    );
  };

  function CustomToggle({ children, eventKey, eventLabel }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => setCollapse(eventLabel));

    return (
      <button
        type='button'
        className={`col-11 text-start btn ${userContext.userData.theme === "dark" ? "btn-dark" : "btn-white"}`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <section className={`container-fluid`}>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark" ? "bg-dark darkBoxShadow" : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-4`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-cog fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='settings' defaultMessage='settings' />
            </div>
          </div>
        </div>
      </div>
      <div className='px-1'>
        <div className=''>
          {!loading ? (
            <div className={`row px-2 py-3 m-0 shadow-${userContext.userData.theme} rounded-2`}>
              {confArray.map((conf, i) => (
                <React.Fragment key={i}>
                  <div className='col-6 py-1 col-md-2'>
                    <FormattedMessage id={conf.label} defaultMessage={conf.label} />
                  </div>
                  <div className='col-6 py-1 col-md-2 text-end'>{conf.value}</div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            loaderComp()
          )}
          {/* defaultActiveKey={'fileStorage'} */}
          <Accordion bsPrefix='util' defaultActiveKey={""} className=''>
            {compList
              .filter(f => f?.accessTo?.includes(userContext.userData.type))
              .map(t => (
                <Card
                  key={t.id}
                  className={`my-3 shadow-${userContext.userData.theme} ${userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}
                >
                  <Card.Header className='row m-0'>
                    <CustomToggle eventLabel={t.label} eventKey={t.id}>
                      {t.label}
                    </CustomToggle>
                    <OffCanvas
                      className={`text-center ${userContext.userData.theme === "dark" ? "bg-dark text-white-50" : "bg-white text-black"}`}
                      btnValue="<i class='fa fa-question-circle' />"
                      btnClassName={`col-1 btn btn-sm ${userContext.userData.theme === "dark" ? "text-white" : "text-dark"}`}
                      placement='end'
                      key={t.id}
                      label={t.help.heading}
                    >
                      {t.help.points.length > 0 && (
                        <ul className={`list-group list-group-flush`}>
                          {t.help.points.map((point, j) => (
                            <li
                              key={j}
                              className={`list-group-item border-bottom-0 ${
                                userContext.userData.theme === "dark" ? "bg-dark text-white-50" : "bg-white text-black"
                              }`}
                              dangerouslySetInnerHTML={{ __html: point }}
                            ></li>
                          ))}
                        </ul>
                      )}
                    </OffCanvas>
                  </Card.Header>
                  <Accordion.Collapse eventKey={t.id}>
                    <Card.Body className='p-2'>{t.label === collapse && React.createElement(t.component)}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Settings;
