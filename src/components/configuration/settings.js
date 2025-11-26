import React, { useContext, useState, useMemo } from "react";
import Config from "./config";
import Users from "./users";
import ChangePassword from "../GlobalHeader/changePassword";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import OffCanvas from "../shared/OffCanvas";
import { FormattedMessage, useIntl } from "react-intl";

const Settings = () => {
  const userContext = useContext(UserContext);
  const [collapse, setCollapse] = useState("");
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "settings",
    defaultMessage: "settings",
  })}`;

  const propertyTypes = useMemo(
    () => [
      {
        key: "planCode",
        value: userContext.userConfig.planCode,
        label: intl.formatMessage({
          id: "plan",
          defaultMessage: "plan",
        }),
      },
      {
        key: "planBankAccountsLimit",
        type: "numericInfinity",
        value: userContext.userConfig.planBankAccountsLimit,
        label: intl.formatMessage({
          id: "bankAccounts",
          defaultMessage: "bankAccounts",
        }),
      },
      {
        key: "planTrxLimit",
        type: "numericInfinity",
        value: userContext.userConfig.planTrxLimit,
        label: intl.formatMessage({
          id: "bankTransactions",
          defaultMessage: "bankTransactions",
        }),
      },
      {
        key: "planCreditCardAccounts",
        type: "numericInfinity",
        value: userContext.userConfig.planCreditCardAccounts,
        label: intl.formatMessage({
          id: "creditCardAccounts",
          defaultMessage: "creditCardAccounts",
        }),
      },
      {
        key: "planCreditCardTrxLimit",
        type: "numericInfinity",
        value: userContext.userConfig.planCreditCardTrxLimit,
        label: intl.formatMessage({
          id: "creditCardTransactions",
          defaultMessage: "creditCardTransactions",
        }),
      },
      {
        key: "planTemplateLimit",
        type: "numericInfinity",
        value: userContext.userConfig.planTemplateLimit,
        label: intl.formatMessage({
          id: "schedules",
          defaultMessage: "schedules",
        }),
      },

      {
        key: "planUsersLimit",
        type: "numericInfinity",
        value: userContext.userConfig.planUsersLimit,
        label: intl.formatMessage({
          id: "users",
          defaultMessage: "users",
        }),
      },
      {
        key: "planCategoriesLimit",
        type: "numericInfinity",
        value: userContext.userConfig.planCategoriesLimit,
        label: intl.formatMessage({
          id: "incExpCat",
          defaultMessage: "incExpCat",
        }),
      },
      {
        key: "planIsBulkImport",
        type: "boolean",
        value: userContext.userConfig.planIsBulkImport,
        label: intl.formatMessage({
          id: "bulkImport",
          defaultMessage: "bulkImport",
        }),
      },
      {
        key: "planIsEmailAlerts",
        type: "boolean",
        value: userContext.userConfig.planIsEmailAlerts,
        label: intl.formatMessage({
          id: "emailAlerts",
          defaultMessage: "emailAlerts",
        }),
      },
      {
        key: "planIsPredictions",
        type: "boolean",
        value: userContext.userConfig.planIsPredictions,
        label: intl.formatMessage({
          id: "predictions",
          defaultMessage: "predictions",
        }),
      },
      {
        key: "planIsTransactionSearch",
        type: "boolean",
        value: userContext.userConfig.planIsTransactionSearch,
        label: intl.formatMessage({
          id: "globalSearch",
          defaultMessage: "globalSearch",
        }),
      },
      {
        key: "planStorageLimit",
        type: "bytesInfinity",
        value: userContext.userConfig.planStorageLimit,
        label: intl.formatMessage({
          id: "fileStorage",
          defaultMessage: "fileStorage",
        }),
      },
      {
        key: "planDatasourceLimit",
        type: "bytesInfinity",
        value: userContext.userConfig.planDatasourceLimit,
        label: intl.formatMessage({
          id: "dataSource",
          defaultMessage: "dataSource",
        }),
      },
      {
        key: "planWorkbookLimit",
        type: "bytesInfinity",
        value: userContext.userConfig.planWorkbookLimit,
        label: intl.formatMessage({
          id: "workbook",
          defaultMessage: "workbook",
        }),
      },
      {
        key: "visualizationLimit",
        type: "numericInfinity",
        value: userContext?.userConfig?.planVisualizations?.length,
        label: intl.formatMessage({
          id: "visualizations",
          defaultMessage: "visualizations",
        }),
      },
    ],
    [userContext?.userConfig, intl],
  );

  const renderElement = (str, type) => {
    let comp = "";
    if (type === "numericInfinity") {
      comp = str !== "Infinity" ? str : <span className='text-success'>∞</span>;
    } else if (type === "bytesInfinity") {
      comp = str !== "Infinity" ? `${str / 1024 / 1024} MB` : <span className='text-success'>∞</span>;
    } else if (type === "boolean") {
      comp = str ? <span className='text-success'>✓</span> : <span className='text-danger'>×</span>;
    } else if (["1", "0"].includes(type)) {
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
          <div className={`shadow-${userContext.userData.theme} rounded-3`}>
            <div className='badge bni-bg text-dark mx-3 mt-3'>
              <FormattedMessage id='limit' defaultMessage='limit' />
            </div>
            <div className={`row px-2 py-3 m-0 `}>
              {confArray.map((conf, i) => (
                <React.Fragment key={i}>
                  <div className='col-6 py-1 col-md-3'>
                    <FormattedMessage id={conf.label} defaultMessage={conf.label} />
                  </div>
                  <div className='col-6 py-1 col-md-1 text-end'>{conf.value}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
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
                      btnClassName={`col-1 text-end btn btn-sm ${userContext.userData.theme === "dark" ? "text-white" : "text-dark"}`}
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
