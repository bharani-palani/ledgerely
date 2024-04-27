import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  Card,
  useAccordionButton,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import BackendCore from "../../components/configuration/backend/BackendCore";
import { crudFormArray } from "../configuration/backendTableConfig";
import apiInstance from "../../services/apiServices";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { UserContext } from "../../contexts/UserContext";
import { MyAlertContext } from "../../contexts/AlertContext";
import { injectIntl } from "react-intl";
import { LocaleContext } from "../../contexts/LocaleContext";
import CsvDownloader from "react-csv-downloader";
import { currencyList, localeTagList, countryList } from "../../helpers/static";
import { AccountContext } from "./AccountPlanner";
import { UpgradeHeading, UpgradeContent } from "../payment";

const CreateModule = props => {
  const { intl } = props;
  const [collapse, setCollapse] = useState("");
  const [dbData, setDbData] = useState([]);
  const [bool, setBool] = useState(true);
  const userContext = useContext(UserContext);
  const myAlertContext = useContext(MyAlertContext);
  const localeContext = useContext(LocaleContext);
  const accountContext = useContext(AccountContext);
  const defaultData = {
    banks: [
      {
        bank_id: "",
        bank_name: "",
        bank_account_number: "",
        bank_swift_code: "",
        bank_account_type: "",
        bank_country: "",
        bank_sort: "0",
        bank_locale: "",
        bank_currency: "",
      },
    ],
    credit_cards: [
      {
        credit_card_id: "",
        credit_card_name: "",
        credit_card_number: "",
        credit_card_start_date: "",
        credit_card_end_date: "",
        credit_card_payment_date: "",
        credit_card_annual_interest: "",
        credit_card_locale: "",
        credit_card_currency: "",
      },
    ],
    income_expense_category: [
      {
        inc_exp_cat_id: "",
        inc_exp_cat_name: "",
        inc_exp_cat_is_metric: "",
        inc_exp_cat_is_plan_metric: "",
      },
    ],
    income_expense_template: [
      {
        template_id: "",
        temp_inc_exp_name: "",
        temp_amount: "0.00",
        temp_inc_exp_type: "Dr",
        temp_inc_exp_date: "1",
        temp_category: "",
        temp_bank: "",
      },
    ],
  };

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onToggle = async t => {
    setDbData([]);
    const a = getBackendAjax(t.Table, t.TableRows);
    Promise.all([a]).then(async r => {
      r[0].data.response.length > 0
        ? setDbData(r[0].data.response)
        : setDbData(defaultData[t.Table]);
      setCollapse("");
      setTimeout(() => {
        setCollapse(t.label);
      }, 100);
    });
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
  const onPostApi = (response, id) => {
    const { status, data } = response;
    if (status) {
      if (response && data && data.response !== null && data.response) {
        userContext.renderToast({
          message: intl.formatMessage({
            id: "transactionSavedSuccessfully",
            defaultMessage: "transactionSavedSuccessfully",
          }),
        });
      }
      if (
        response &&
        data &&
        data.response !== null &&
        data.response === false
      ) {
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "noFormChangeFound",
            defaultMessage: "noFormChangeFound",
          }),
        });
      }
      if (response && data && data.response === null) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: <UpgradeHeading />,
          content: <UpgradeContent />,
        });
      }
      updateContext(id);
    } else {
      userContext.renderToast({
        type: "error",
        icon: "fa fa-times-circle",
        message: intl.formatMessage({
          id: "unableToReachServer",
          defaultMessage: "unableToReachServer",
        }),
      });
    }
  };

  const postApi = path => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post(path, formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const updateContext = id => {
    let fetch = {};
    switch (id) {
      case "bankAccounts":
        fetch.route = postApi("/account_planner/bank_list");
        fetch.setter = "setBankList";
        break;
      case "creditCardAccounts":
        fetch.route = postApi("/account_planner/credit_card_list");
        fetch.setter = "setCcBankList";
        break;
      case "incExpCat":
        fetch.route = postApi("/account_planner/inc_exp_list");
        fetch.setter = "setIncExpList";
        break;
      default:
        fetch = {};
    }
    if (Object.keys(fetch).length > 0) {
      fetch.route
        .then(data => {
          accountContext[fetch.setter](data);
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
        });
    }
  };

  const alias = {
    bankAccounts: [
      "id",
      "bank",
      "accountNumber",
      "swiftCode",
      "type",
      "country",
      "sort",
      "localeLanguage",
      "localeCurrency",
    ],
    creditCardAccounts: [
      "id",
      "name",
      "cardNumber",
      "startDate",
      "endDate",
      "payDate",
      "annuaInterestRate",
      "localeLanguage",
      "localeCurrency",
    ],
    incExpCat: ["id", "name", "isIncomeMetric", "isPlanMetric"],
    incExpTemp: ["id", "name", "amount", "type", "date", "category", "bank"],
  };

  useEffect(() => {
    setBool(false);
    setTimeout(() => {
      setBool(true);
    }, 100);
  }, [intl]);

  const rElements = {
    bankAccounts: [
      "checkbox",
      "textbox",
      "textbox",
      "textbox",
      {
        fetch: {
          dropDownList: [
            {
              id: "SAV",
              value: intl.formatMessage({
                id: "savingsAccount",
                defaultMessage: "savingsAccount",
              }),
            },
            {
              id: "CUR",
              value: intl.formatMessage({
                id: "currentAccount",
                defaultMessage: "currentAccount",
              }),
            },
          ],
        },
      },
      {
        fetch: {
          dropDownList: countryList,
        },
      },
      "number",
      {
        fetch: {
          dropDownList: localeTagList,
        },
      },
      {
        fetch: {
          dropDownList: currencyList,
        },
      },
    ],
    creditCardAccounts: [
      "checkbox",
      "textbox",
      "textbox",
      "number",
      "number",
      "number",
      "number",
      {
        fetch: {
          dropDownList: localeTagList,
        },
      },
      {
        fetch: {
          dropDownList: currencyList,
        },
      },
    ],
    incExpCat: [
      "checkbox",
      "textbox",
      {
        radio: {
          radioList: [
            {
              label: intl.formatMessage({ id: "yes", defaultMessage: "yes" }),
              value: "1",
              checked: false,
            },
            {
              label: intl.formatMessage({ id: "no", defaultMessage: "no" }),
              value: "0",
              checked: true,
            },
          ],
        },
      },
      {
        radio: {
          radioList: [
            {
              label: intl.formatMessage({ id: "yes", defaultMessage: "yes" }),
              value: "1",
              checked: false,
            },
            {
              label: intl.formatMessage({ id: "no", defaultMessage: "no" }),
              value: "0",
              checked: true,
            },
          ],
        },
      },
    ],
    incExpTemp: [
      "checkbox",
      "textbox",
      "number",
      {
        radio: {
          radioList: [
            {
              label: intl.formatMessage({
                id: "credit",
                defaultMessage: "credit",
              }),
              value: "Cr",
              checked: false,
            },
            {
              label: intl.formatMessage({
                id: "debit",
                defaultMessage: "debit",
              }),
              value: "Dr",
              checked: true,
            },
          ],
        },
      },
      {
        fetch: {
          dropDownList: new Array(28).fill("_").map((_, i) => ({
            checked: String(i + 1) === "1",
            id: String(i + 1),
            value: String(i + 1),
          })),
        },
      },
      "textbox",
      "textbox",
    ],
  };

  const shTotal = {
    bankAccounts: null,
    creditCardAccounts: null,
    incExpCat: null,
    incExpTemp: [
      {
        whichKey: "temp_amount",
        forKey: "temp_inc_exp_type",
        forCondition: "equals",
        forValue: [
          { key: "+", value: "Cr" },
          { key: "-", value: "Dr" },
        ],
        showDifference: { indexes: [0, 1], showStability: false },
      },
    ],
  };

  const crudFormMassageArray = crudFormArray.map(crud => {
    const obj = {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
      },
      footer: {
        total: {
          locale: localeContext.localeLanguage,
          currency: localeContext.localeCurrency,
          maxDecimal: 2,
        },
        pagination: {
          currentPage: "last",
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    };
    crud.config = obj;
    crud.TableAliasRows = alias[crud.id].map(al =>
      intl.formatMessage({ id: al, defaultMessage: al }),
    );
    crud.rowElements = rElements[crud.id];
    crud.showTotal = shTotal[crud.id];
    return crud;
  });

  const appIdRef = {
    bankAccounts: "bank_appId",
    creditCardAccounts: "credit_card_appId",
    incExpCat: "inc_exp_cat_appId",
    incExpTemp: "temp_appId",
  };

  function CustomToggle({ children, eventKey, object }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      onToggle(object),
    );

    return (
      <button
        type='button'
        className={`col-12 text-start btn ${
          userContext.userData.theme === "dark" ? "btn-dark" : "btn-white"
        }`}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const renderCloneTooltip = (props, content) => (
    <Tooltip id={`button-tooltip-${Math.random()}`} className='in show'>
      {content}
    </Tooltip>
  );

  return (
    <div className='settings'>
      <Accordion bsPrefix='util' defaultActiveKey={1} className=''>
        {crudFormMassageArray
          .sort((a, b) => a.id - b.id)
          .map((t, i) => (
            <Card
              key={t.id}
              className={`my-2 ${
                userContext.userData.theme === "dark"
                  ? "bg-dark text-white"
                  : "bg-white text-dark"
              }`}
            >
              <Card.Header className='row m-0'>
                <CustomToggle eventKey={t.id} object={t}>
                  {intl.formatMessage({ id: t.id, defaultMessage: t.id })}
                </CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey={t.id}>
                <Card.Body>
                  {t.label === collapse && bool ? (
                    <div className='pt-10'>
                      <div className='text-end pb-2'>
                        {dbData.length > 0 && (
                          <CsvDownloader
                            datas={helpers.stripCommasInCSV(dbData)}
                            filename={`${t.id}.csv`}
                          >
                            <OverlayTrigger
                              placement='left'
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderCloneTooltip(
                                props,
                                intl.formatMessage({
                                  id: "download",
                                  defaultMessage: "download",
                                }),
                              )}
                              triggerType='hover'
                            >
                              <i className='fa fa-download roundedButton' />
                            </OverlayTrigger>
                          </CsvDownloader>
                        )}
                      </div>
                      <BackendCore
                        key={i}
                        config={t.config}
                        Table={t.Table}
                        TableRows={t.TableRows}
                        TableAliasRows={t.TableAliasRows}
                        showTotal={t.showTotal}
                        rowElements={t.rowElements}
                        defaultValues={t.defaultValues}
                        dbData={dbData}
                        postApiUrl='/account_planner/postAccountPlanner'
                        onPostApi={response => onPostApi(response, t.id)}
                        onReFetchData={() => onToggle(t)}
                        cellWidth={t.cellWidth}
                        ajaxButtonName={intl.formatMessage({
                          id: "submit",
                          defaultMessage: "submit",
                        })}
                        appIdKeyValue={{
                          key: appIdRef[t.id],
                          value: userContext.userConfig.appId,
                        }}
                      />
                    </div>
                  ) : (
                    loaderComp()
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>
    </div>
  );
};

CreateModule.propTypes = {
  property: PropTypes.string,
};
CreateModule.defaultProps = {
  property: "String name",
};

export default injectIntl(CreateModule);
