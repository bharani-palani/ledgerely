import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Col, Row, Container } from "react-bootstrap";
import useAxios from "../../services/apiServices";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import FilterSelect from "../configuration/backend/FormElements/FilterSelect";
import { FormattedMessage, useIntl } from "react-intl";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Loader from "../resuable/Loader";
import BackendCore from "../configuration/backend/BackendCore";
import { useQuery } from "../GlobalHeader/queryParamHook";
import { crudFormArray } from "../configuration/backendTableConfig";
import { LocaleContext } from "../../contexts/LocaleContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import { MyAlertContext } from "../../contexts/AlertContext";
import { currencyList, localeTagList } from "../../helpers/static";

const CreditCardContext = React.createContext(undefined);

const CreditCard = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "creditCard",
    defaultMessage: "creditCard",
  })}`;
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const myAlertContext = useContext(MyAlertContext);
  const [init, setInit] = useState(false);
  const [ajaxStatus, setAjaxStatus] = useState(false);
  const [loader, setLoader] = useState(true);
  const [cCList, setCcList] = useState({});
  const [selection, setSelection] = useState({
    creditCard: "",
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
  });
  const [ccData, setCcData] = useState({});
  const defApiParam = {
    start: 0,
    limit: 10,
    searchString: "",
  };
  const [apiParams, setApiParams] = useState(defApiParam);
  const [ccApiParams, setCcApiParams] = useState(defApiParam);

  const master = {
    config: {
      header: {
        searchPlaceholder: intl.formatMessage({
          id: "searchHere",
          defaultMessage: "searchHere",
        }),
        searchable: true,
      },
      footer: {
        total: {
          title: intl.formatMessage({ id: "total", defaultMessage: "total" }),
          maxDecimal: 2,
        },
        pagination: {
          currentPage: "first",
          maxPagesToShow: 5,
        },
      },
    },
    id: "cCTable",
    Table: "creditCardTrx",
    TableRows: ["cc_transaction", "cc_date", "credit_card_name", "cc_payment_credits", "cc_purchases", "cc_taxes_interest", "cc_comments"],
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
      intl.formatMessage({ id: "limit", defaultMessage: "limit" }),
      intl.formatMessage({ id: "comments", defaultMessage: "comments" }),
    ],
    defaultValues: [],
    rowElements: ["label", "label", "label", "label", "label", "label", "label"],
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
    formdata.append("limit", ccApiParams.limit);
    formdata.append("start", ccApiParams.start);
    formdata.append("searchString", ccApiParams.searchString);
    formdata.append(
      "TableRows",
      `a.cc_transaction, a.cc_date, d.credit_card_name, a.cc_payment_credits, a.cc_purchases, a.cc_taxes_interest, a.cc_comments`,
    );
    formdata.append("Table", "creditCardTrx");
    formdata.append(
      "WhereClause",
      `a.cc_appId = '${userContext.userConfig.appId}' && a.cc_for_card = '${selection.creditCard}' && d.credit_card_appId = '${
        userContext.userConfig.appId
      }' && a.cc_date >= '${moment(selection.startDate).format("YYYY-MM-DD").toString()}' && a.cc_date <= '${moment(selection.endDate)
        .format("YYYY-MM-DD")
        .toString()}'`,
    );
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onGenerate = cb => {
    setAjaxStatus(true);
    setCcData({});
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

  const onChangeParams = obj => {
    setApiParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    fetchCcMaster();
  }, [apiParams]);
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
      setCcApiParams(defApiParam);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (params.fetch === "creditCard" && selection.creditCard && selection.startDate && selection.endDate && paramCcFetch) {
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
      <div className='relativeSpinner'>
        <Loader />
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
    "limit",
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
    "number",
    {
      fetch: {
        dropDownList: localeTagList,
      },
      searchable: true,
    },
    {
      fetch: {
        dropDownList: currencyList,
      },
      searchable: true,
    },
  ];
  const cCCoreOptions = crudFormArray
    .filter(f => f.id === "creditCardAccounts")
    .map(crud => {
      const obj = {
        header: {
          searchPlaceholder: intl.formatMessage({
            id: "searchHere",
            defaultMessage: "searchHere",
          }),
          searchable: true,
        },
        footer: {
          total: {
            locale: localeContext.localeLanguage,
            currency: localeContext.localeCurrency,
            maxDecimal: 2,
          },
          pagination: {
            currentPage: "last",
            maxPagesToShow: 5,
          },
        },
      };
      crud.config = obj;
      crud.TableAliasRows = cCFields.map(al => intl.formatMessage({ id: al, defaultMessage: al }));
      crud.rowElements = rElements;
      return crud;
    })[0];
  console.log("bbb", cCCoreOptions);

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
    formdata.append("limit", apiParams.limit);
    formdata.append("start", apiParams.start);
    formdata.append("searchString", apiParams.searchString);
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

  const onPostApi = response => {
    const { status, data } = response;
    if (status === 200) {
      if (response && data && typeof data.response === "boolean" && data.response !== null && data.response) {
        userContext.renderToast({
          message: intl.formatMessage({
            id: "transactionSavedSuccessfully",
            defaultMessage: "transactionSavedSuccessfully",
          }),
        });
      }
      if (response && data && typeof data.response === "boolean" && data.response !== null && data.response === false) {
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
      if (response && data && typeof data.response === "object" && data.response !== null) {
        let intlKey;
        switch (data.response.number) {
          case 1451:
            intlKey = "foreignKeyDeleteMessage";
            break;
          default:
            intlKey = "";
        }
        userContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: intlKey,
            defaultMessage: intlKey,
          }),
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

  const onChangeCcParams = obj => {
    setCcApiParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    if (init) {
      onGenerate();
    }
  }, [ccApiParams, init]);

  return (
    <CreditCardContext.Provider value={{ cCList, selection }}>
      <Container fluid className='pb-5'>
        <PageHeader icon='fa fa-credit-card' intlId='creditCard' />
        {loader ? (
          <LoaderComp />
        ) : (
          <>
            {dbData && Object.keys(dbData)?.length > 0 && (
              <>
                <BackendCore
                  className='pt-3'
                  config={cCCoreOptions.config}
                  Table={cCCoreOptions.Table}
                  TableRows={cCCoreOptions.TableRows}
                  TableAliasRows={cCCoreOptions.TableAliasRows}
                  rowElements={cCCoreOptions.rowElements}
                  defaultValues={cCCoreOptions.defaultValues}
                  dbData={dbData}
                  postApiUrl='/account_planner/postAccountPlanner'
                  onPostApi={response => onPostApi(response, cCCoreOptions.id)}
                  apiParams={apiParams}
                  onChangeParams={obj => onChangeParams(obj)}
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
            <Row className={`align-items-center ${!Object.keys(ccData).length > 0 ? "pb-5" : ""}`}>
              <Col sm={3} className='react-responsive-ajax-data-table pb-2'>
                <FilterSelect
                  placeholder={`${intl.formatMessage({
                    id: "select",
                    defaultMessage: "select",
                  })} ${intl.formatMessage({
                    id: "creditCard",
                    defaultMessage: "creditCard",
                  })}`}
                  onChange={(ind, value) => {
                    setSelection(prev => ({ ...prev, creditCard: value }));
                  }}
                  element={{
                    fetch: {
                      dropDownList: cCList.map(row => ({
                        id: row.id,
                        value: row.value,
                      })),
                    },
                    searchable: true,
                  }}
                  value={selection.creditCard}
                  type={"single"}
                  searchable={true}
                  theme={userContext.userData.theme}
                />
              </Col>
              <Col sm={3} className='d-flex align-items-center justify-content-between pb-2'>
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
                  // minDate={moment().subtract(1, "year").toDate()}
                  maxDate={new Date()}
                  onKeyDown={e => {
                    e.preventDefault();
                  }}
                />
              </Col>
              <Col sm={3} className='d-flex align-items-center justify-content-between pb-2'>
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
                  // minDate={moment().subtract(1, "year").toDate()}
                  maxDate={new Date()}
                  onKeyDown={e => {
                    e.preventDefault();
                  }}
                />
              </Col>
              <Col sm={3} className='pb-2'>
                <button className='btn btn-sm btn-bni w-100 border-0' onClick={() => onGenerate()} disabled={!selection.creditCard}>
                  <FormattedMessage id='generate' defaultMessage='generate' />
                </button>
              </Col>
            </Row>
          </>
        )}
        {ajaxStatus && <LoaderComp />}
        {ccData && Object.keys(ccData).length > 0 && (
          <>
            <div className='py-2'>
              <span className={`badge ${userContext.userData.theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}>
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
              defaultValues={master.defaultValues}
              dbData={ccData}
              cellWidth={[20, 10, 10, 10, 10, 10, 10]}
              theme={userContext.userData.theme}
              apiParams={ccApiParams}
              onChangeParams={obj => onChangeCcParams(obj)}
            />
          </>
        )}
        {Object.keys(ccData).length === 0 && init && !ajaxStatus && (
          <div className='text-center py-2'>
            <i className='fa fa-archive' />
            <FormattedMessage id='noRecordsGenerated' defaultMessage=' ' />
          </div>
        )}
      </Container>
    </CreditCardContext.Provider>
  );
};

export default CreditCard;
