import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Col, Row, Container } from "react-bootstrap";
import apiInstance from "../../services/apiServices";
import { UserContext } from "../../contexts/UserContext";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { FormattedMessage, useIntl } from "react-intl";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import BackendCore from "../configuration/backend/BackendCore";
import { useQuery } from "../GlobalHeader/queryParamHook";
import { crudFormArray } from "../configuration/backendTableConfig";
import { LocaleContext } from "../../contexts/LocaleContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import { MyAlertContext } from "../../contexts/AlertContext";
import { currencyList, localeTagList } from "../../helpers/static";

const CreditCardContext = React.createContext(undefined);

const CreditCard = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const myAlertContext = useContext(MyAlertContext);
  const [init, setInit] = useState(false);
  const [ajaxStatus, setAjaxStatus] = useState(false);
  const [loader, setLoader] = useState(true);
  const [cCList, setCcList] = useState([]);
  const [selection, setSelection] = useState({
    creditCard: "",
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
  });
  const [ccData, setCcData] = useState([]);

  const master = {
    config: {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: "total", defaultMessage: "total" }),
          maxDecimal: 2,
        },
        pagination: {
          currentPage: "first",
          recordsPerPage: 10,
          maxPagesToShow: 5,
        },
      },
    },
    showTotal: null,
    id: "cCTable",
    Table: "creditCardTrx",
    TableRows: [
      "name",
      "date",
      "creditCard",
      "credits",
      "purchases",
      "interest",
      "comments",
    ],
    TableAliasRows: [
      intl.formatMessage({ id: "name", defaultMessage: "name" }),
      intl.formatMessage({
        id: "date",
        defaultMessage: "date",
      }),
      intl.formatMessage({
        id: "creditCard",
        defaultMessage: "creditCard",
      }),
      intl.formatMessage({ id: "credits", defaultMessage: "credits" }),
      intl.formatMessage({ id: "purchases", defaultMessage: "purchases" }),
      intl.formatMessage({ id: "interest", defaultMessage: "interest" }),
      intl.formatMessage({ id: "comments", defaultMessage: "comments" }),
    ],
    defaultValues: [],
    rowElements: [
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
    ],
  };

  const getCcList = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/credit_card_list", formdata)
      .then(res => {
        setCcList(res.data.response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  };

  const getCcTrxTable = () => {
    const formdata = new FormData();
    formdata.append(
      "TableRows",
      `a.cc_transaction as name, a.cc_date as date, d.credit_card_name as creditCard, a.cc_payment_credits as credits, a.cc_purchases as purchases, a.cc_taxes_interest as interest, a.cc_comments as comments`,
    );
    formdata.append("Table", "creditCardTrx");
    formdata.append(
      "WhereClause",
      `a.cc_appId = '${userContext.userConfig.appId}' && a.cc_for_card = '${
        selection.creditCard
      }' && d.credit_card_appId = '${
        userContext.userConfig.appId
      }' && a.cc_date >= '${moment(selection.startDate)
        .format("YYYY-MM-DD")
        .toString()}' && a.cc_date <= '${moment(selection.endDate)
        .format("YYYY-MM-DD")
        .toString()}'`,
    );
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onGenerate = cb => {
    setAjaxStatus(true);
    setCcData([]);
    setTimeout(() => {
      const a = getCcTrxTable();
      Promise.all([a])
        .then(r => {
          setCcData(r[0].data.response);
          typeof cb === "function" && cb();
        })
        .catch(e => console.log("bbb", e))
        .finally(() => {
          setAjaxStatus(false);
          setInit(true);
        });
    }, 100);
  };

  useEffect(() => {
    getCcList();
  }, []);

  /*
   * Query params landing feature starts
   */
  const searchParams = useQuery();
  const params = {
    fetch: searchParams.get("fetch"),
    creditCardId: searchParams.get("creditCardId"),
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  };
  const [paramCcFetch, setParamCcFetch] = useState(false);

  useEffect(() => {
    if (params.fetch === "creditCard" && params.creditCardId) {
      setParamCcFetch(true);
      setSelection(prev => ({
        ...prev,
        creditCard: params.creditCardId,
        startDate: moment(params.startDate).toDate(),
        endDate: moment(params.endDate).toDate(),
      }));
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (
      params.fetch === "creditCard" &&
      selection.creditCard &&
      selection.startDate &&
      selection.endDate &&
      paramCcFetch
    ) {
      onGenerate(() => {
        setParamCcFetch(false);
        setTimeout(() => {
          document.getElementById("ccTable")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
          });
        }, 200);
      });
    }
  }, [JSON.stringify(params), selection.creditCard, paramCcFetch]);

  /*
   * Query params landing feature ends
   */

  const LoaderComp = () => {
    return (
      <div className='relativeSpinner middle'>
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
  const cCFields = [
    "id",
    "name",
    "last4DigitCardNo",
    "startDate",
    "endDate",
    "payDate",
    "annuaInterestRate",
    "localeLanguage",
    "localeCurrency",
  ];
  const rElements = [
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
  ];
  const shTotal = null;
  const cCCoreOptions = crudFormArray
    .filter(f => f.id === "creditCardAccounts")
    .map(crud => {
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
      crud.TableAliasRows = cCFields.map(al =>
        intl.formatMessage({ id: al, defaultMessage: al }),
      );
      crud.rowElements = rElements;
      crud.showTotal = shTotal;
      return crud;
    })[0];

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const [dbData, setDbData] = useState([]);
  const fetchCcMaster = () => {
    setDbData([]);
    const a = getBackendAjax(cCCoreOptions.Table, cCCoreOptions.TableRows);
    Promise.all([a]).then(async r => {
      setDbData(r[0].data.response);
    });
  };
  useEffect(() => {
    fetchCcMaster();
  }, []);

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
        myAlertContext.setConfig({
          show: true,
          className: "alert-danger border-0 text-dark",
          type: "danger",
          dismissible: true,
          heading: <UpgradeHeading />,
          content: <UpgradeContent />,
        });
      }
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

  return (
    <CreditCardContext.Provider value={{ cCList, selection }}>
      <Container fluid>
        <PageHeader icon='fa fa-credit-card' intlId='creditCard' />
        {loader ? (
          <LoaderComp />
        ) : (
          <>
            {dbData.length > 0 && (
              <>
                <BackendCore
                  className='pt-3'
                  config={cCCoreOptions.config}
                  Table={cCCoreOptions.Table}
                  TableRows={cCCoreOptions.TableRows}
                  TableAliasRows={cCCoreOptions.TableAliasRows}
                  showTotal={cCCoreOptions.showTotal}
                  rowElements={cCCoreOptions.rowElements}
                  defaultValues={cCCoreOptions.defaultValues}
                  dbData={dbData}
                  postApiUrl='/account_planner/postAccountPlanner'
                  onPostApi={response => onPostApi(response, cCCoreOptions.id)}
                  onReFetchData={() => fetchCcMaster()}
                  cellWidth={cCCoreOptions.cellWidth}
                  ajaxButtonName={intl.formatMessage({
                    id: "submit",
                    defaultMessage: "submit",
                  })}
                  appIdKeyValue={{
                    key: "credit_card_appId",
                    value: userContext.userConfig.appId,
                  }}
                  theme={userContext.userData.theme}
                />
              </>
            )}
            <Row>
              <Col sm={3} className='react-responsive-ajax-data-table pb-2'>
                <FilterSelect
                  placeholder={`${intl.formatMessage({
                    id: "select",
                    defaultMessage: "select",
                  })} ${intl.formatMessage({
                    id: "creditCard",
                    defaultMessage: "creditCard",
                  })}`}
                  onChange={(ind, value, pKey) => {
                    setSelection(prev => ({ ...prev, creditCard: value }));
                  }}
                  element={{
                    fetch: {
                      dropDownList: cCList.map(row => ({
                        id: row.id,
                        value: row.value,
                      })),
                    },
                  }}
                  value={selection.creditCard}
                  type={"single"}
                  searchable={true}
                  theme={userContext.userData.theme}
                />
              </Col>
              <Col
                sm={3}
                className='d-flex align-items-center justify-content-between pb-2'
              >
                <span>
                  <FormattedMessage id='startDate' defaultMessage='startDate' />
                </span>
                <DateTimePicker
                  className='bg-white text-dark'
                  value={selection.startDate}
                  format='yyyy-MM-dd'
                  clearIcon={null}
                  onChange={value => {
                    setSelection(prev => ({ ...prev, startDate: value }));
                  }}
                />
              </Col>
              <Col
                sm={3}
                className='d-flex align-items-center justify-content-between pb-2'
              >
                <span>
                  <FormattedMessage id='endDate' defaultMessage='endDate' />
                </span>
                <DateTimePicker
                  className='bg-white text-dark'
                  value={selection.endDate}
                  format='yyyy-MM-dd'
                  clearIcon={null}
                  onChange={value => {
                    setSelection(prev => ({ ...prev, endDate: value }));
                  }}
                />
              </Col>
              <Col sm={3} className='pb-2'>
                <button
                  className='btn btn-sm btn-bni w-100 border-0'
                  onClick={() => onGenerate()}
                  disabled={ajaxStatus || !selection.creditCard}
                >
                  {ajaxStatus ? (
                    <i className='fa fa-circle-o-notch fa-spin' />
                  ) : (
                    <FormattedMessage id='generate' defaultMessage='generate' />
                  )}
                </button>
              </Col>
            </Row>
          </>
        )}
        {ccData.length > 0 && (
          <>
            <div className='py-2'>
              <span
                className={`badge ${
                  userContext.userData.theme === "dark"
                    ? "bg-secondary text-white"
                    : "bg-light text-dark"
                }`}
              >
                {intl.formatMessage({
                  id: "creditCardTransactions",
                  defaultMessage: "creditCardTransactions",
                })}
              </span>
            </div>
            <BackendCore
              id={master.id}
              config={master.config}
              Table={master.Table}
              TableRows={master.TableRows}
              TableAliasRows={master.TableAliasRows}
              rowElements={master.rowElements}
              showTotal={master.showTotal}
              defaultValues={master.defaultValues}
              dbData={ccData}
              cellWidth={[20, 10, 10, 10, 10, 10, 10]}
              theme={userContext.userData.theme}
            />
          </>
        )}
        {ccData.length === 0 && init && (
          <div className='text-center py-2'>
            <FormattedMessage id='noRecordsGenerated' defaultMessage=' ' />
          </div>
        )}
      </Container>
    </CreditCardContext.Provider>
  );
};

export default CreditCard;
