import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../shared/PageHeader";
import { Col, Row, Container } from "react-bootstrap";
import apiInstance from "../../services/apiServices";
import { GlobalContext } from "../../contexts/GlobalContext";
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

const CategoryContext = React.createContext(undefined);

const Categories = () => {
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "category",
    defaultMessage: "category",
  })}`;
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const myAlertContext = useContext(MyAlertContext);
  const [init, setInit] = useState(false);
  const [ajaxStatus, setAjaxStatus] = useState(false);
  const [loader, setLoader] = useState(true);
  const [incExpList, setIncExpList] = useState([]);
  const [selection, setSelection] = useState({
    category: "",
    startDate: moment().startOf("month").toDate(), // new Date("2020-01-01")
    endDate: moment().endOf("month").toDate(),
  });
  const [bankData, setBankData] = useState([]);
  const [ccData, setCcData] = useState([]);
  const defApiParam = {
    start: 0,
    limit: 10,
    searchString: "",
  };
  const [apiParams, setApiParams] = useState(defApiParam);
  const [apiCatBankParams, setApiCatBankParams] = useState(defApiParam);
  const [apiCatCcParams, setApiCatCcParams] = useState(defApiParam);

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
    id: "categorizedBankTrx",
    Table: "categorizedBankTrx",
    label: "Categorized bank trx",
    TableRows: [
      "inc_exp_name",
      "inc_exp_date",
      "inc_exp_amount",
      "inc_exp_type",
      "inc_exp_comments",
    ],
    TableAliasRows: [
      intl.formatMessage({ id: "name", defaultMessage: "name" }),
      intl.formatMessage({
        id: "date",
        defaultMessage: "date",
      }),
      intl.formatMessage({
        id: "amount",
        defaultMessage: "amount",
      }),
      intl.formatMessage({
        id: "type",
        defaultMessage: "type",
      }),
      intl.formatMessage({ id: "comments", defaultMessage: "comments" }),
    ],
    defaultValues: [],
    rowElements: ["label", "label", "label", "label", "label"],
  };

  const cCmaster = {
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
    id: "catCreditCardTrx",
    Table: "categorizedCreditCardTrx",
    TableRows: [
      "cc_transaction",
      "cc_date",
      "credit_card_name",
      "cc_payment_credits",
      "cc_purchases",
      "cc_taxes_interest",
      "cc_comments",
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

  const getIncExpList = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("limit", apiParams.limit);
    formdata.append("start", apiParams.start);
    formdata.append("searchString", apiParams.searchString);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/inc_exp_list", formdata)
      .then(res => setIncExpList(res.data.response))
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  };

  const getCatBankTable = () => {
    const formdata = new FormData();
    formdata.append("limit", apiCatBankParams.limit);
    formdata.append("start", apiCatBankParams.start);
    formdata.append("searchString", apiCatBankParams.searchString);
    formdata.append(
      "TableRows",
      `a.inc_exp_name, a.inc_exp_date, a.inc_exp_amount, a.inc_exp_type, a.inc_exp_comments`,
    );
    formdata.append("Table", "categorizedBankTrx");
    formdata.append(
      "WhereClause",
      `a.inc_exp_appId = '${
        userContext.userConfig.appId
      }' && b.inc_exp_cat_id = '${selection.category}' && d.bank_appId = '${
        userContext.userConfig.appId
      }' && a.inc_exp_date >= '${moment(selection.startDate)
        .format("YYYY-MM-DD")
        .toString()}' && a.inc_exp_date <= '${moment(selection.endDate)
        .format("YYYY-MM-DD")
        .toString()}'`,
    );
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const getCatCreditCardTable = () => {
    const formdata = new FormData();
    formdata.append("limit", apiCatCcParams.limit);
    formdata.append("start", apiCatCcParams.start);
    formdata.append("searchString", apiCatCcParams.searchString);
    formdata.append(
      "TableRows",
      `a.cc_transaction, a.cc_date, d.credit_card_name, a.cc_payment_credits, a.cc_purchases, a.cc_taxes_interest, a.cc_comments`,
    );
    formdata.append("Table", "categorizedCreditCardTrx");
    formdata.append(
      "WhereClause",
      `a.cc_appId = '${userContext.userConfig.appId}' && b.inc_exp_cat_id = '${
        selection.category
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
    setBankData([]);
    setCcData([]);
    setTimeout(() => {
      const a = getCatBankTable();
      const b = getCatCreditCardTable();
      Promise.all([a, b])
        .then(r => {
          const bData = r[0].data.response;
          const cData = r[1].data.response;
          setBankData(bData);
          setCcData(cData);
          const dataFrom = bData?.table.length > 0 ? "bank" : "creditCard";
          typeof cb === "function" && cb(dataFrom);
        })
        .catch(e => console.log("bbb", e))
        .finally(() => {
          setAjaxStatus(false);
          setInit(true);
        });
    }, 100);
  };

  useEffect(() => {
    getIncExpList();
  }, [apiParams]);

  /*
   * Query params landing feature starts
   */
  const searchParams = useQuery();
  const params = {
    fetch: searchParams.get("fetch"),
    categoryId: searchParams.get("categoryId"),
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  };
  const [paramCatFetch, setParamCatFetch] = useState(false);

  useEffect(() => {
    if (params.fetch === "category" && params.categoryId) {
      setParamCatFetch(true);
      setSelection(prev => ({
        ...prev,
        category: params.categoryId,
        startDate: moment(params.startDate).toDate(),
        endDate: moment(params.endDate).toDate(),
      }));
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (
      params.fetch === "category" &&
      selection.category &&
      selection.startDate &&
      selection.endDate &&
      paramCatFetch
    ) {
      onGenerate(dataFrom => {
        setParamCatFetch(false);
        setTimeout(() => {
          const target =
            dataFrom === "bank" ? "categorizedBankTrx" : "catCreditCardTrx";
          document.getElementById(target)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
          });
        }, 1000);
      });
    }
  }, [JSON.stringify(params), selection.category, paramCatFetch]);

  /*
   * Query params landing feature ends
   */

  const LoaderComp = () => {
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
  const incExpCat = ["id", "name", "isIncomeMetric", "isPlanMetric"];
  const rElements = [
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
  ];

  const incExpCoreOptions = crudFormArray
    .filter(f => f.id === "incExpCat")
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
      crud.TableAliasRows = incExpCat.map(al =>
        intl.formatMessage({ id: al, defaultMessage: al }),
      );
      crud.rowElements = rElements;
      return crud;
    })[0];

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
  const fetchCatMaster = () => {
    setDbData([]);
    const a = getBackendAjax(
      incExpCoreOptions.Table,
      incExpCoreOptions.TableRows,
    );
    Promise.all([a]).then(async r => {
      setDbData(r[0].data.response);
    });
  };

  const onPostApi = (response, id) => {
    const { status, data } = response;
    if (status === 200) {
      if (
        response &&
        data &&
        typeof data.response === "boolean" &&
        data.response !== null &&
        data.response
      ) {
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
        typeof data.response === "boolean" &&
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
      if (
        response &&
        data &&
        typeof data.response === "object" &&
        data.response !== null
      ) {
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

  const onChangeParams = obj => {
    setApiParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    fetchCatMaster();
  }, [apiParams]);

  const onChangeCatBankParams = obj => {
    setApiCatBankParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  const onChangeCatCcParams = obj => {
    setApiCatCcParams(prev => ({
      ...prev,
      ...obj,
    }));
  };

  useEffect(() => {
    if (init) {
      onGenerate();
    }
  }, [apiCatBankParams, apiCatCcParams, init]);

  return (
    <CategoryContext.Provider value={{ incExpList, selection }}>
      <Container fluid>
        <PageHeader icon='fa fa-sitemap' intlId='category' />
        {loader ? (
          <LoaderComp />
        ) : (
          <>
            {dbData && Object.keys(dbData).length > 0 && (
              <>
                <BackendCore
                  className='pt-3'
                  config={incExpCoreOptions.config}
                  Table={incExpCoreOptions.Table}
                  TableRows={incExpCoreOptions.TableRows}
                  TableAliasRows={incExpCoreOptions.TableAliasRows}
                  rowElements={incExpCoreOptions.rowElements}
                  defaultValues={incExpCoreOptions.defaultValues}
                  dbData={dbData}
                  postApiUrl='/account_planner/postAccountPlanner'
                  onPostApi={response =>
                    onPostApi(response, incExpCoreOptions.id)
                  }
                  apiParams={apiParams}
                  onChangeParams={obj => onChangeParams(obj)}
                  onReFetchData={() => fetchCatMaster()}
                  cellWidth={incExpCoreOptions.cellWidth}
                  ajaxButtonName={intl.formatMessage({
                    id: "submit",
                    defaultMessage: "submit",
                  })}
                  appIdKeyValue={{
                    key: "inc_exp_cat_appId",
                    value: userContext.userConfig.appId,
                  }}
                  theme={userContext.userData.theme}
                />
              </>
            )}
            <Row
              className={`align-items-center ${
                !(
                  Object.keys(bankData).length > 0 ||
                  Object.keys(ccData).length > 0
                )
                  ? "pb-5"
                  : ""
              }`}
            >
              <Col sm={3} className='react-responsive-ajax-data-table pb-2'>
                <FilterSelect
                  placeholder={`${intl.formatMessage({
                    id: "select",
                    defaultMessage: "select",
                  })} ${intl.formatMessage({
                    id: "category",
                    defaultMessage: "category",
                  })}`}
                  onChange={(ind, value, pKey) => {
                    setSelection(prev => ({ ...prev, category: value }));
                  }}
                  element={{
                    fetch: {
                      dropDownList: incExpList.map(row => ({
                        id: row.id,
                        value: row.value,
                      })),
                    },
                    searchable: true,
                  }}
                  value={selection.category}
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
                  // minDate={moment().subtract(1, "year").toDate()}
                  maxDate={new Date()}
                  onKeyDown={e => {
                    e.preventDefault();
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
                  // minDate={moment().subtract(1, "year").toDate()}
                  maxDate={new Date()}
                  onKeyDown={e => {
                    e.preventDefault();
                  }}
                />
              </Col>
              <Col sm={3} className='pb-2'>
                <button
                  className='btn btn-sm btn-bni w-100 border-0'
                  onClick={() => onGenerate()}
                  disabled={ajaxStatus || !selection.category}
                >
                  <FormattedMessage id='generate' defaultMessage='generate' />
                </button>
              </Col>
            </Row>
          </>
        )}
        {ajaxStatus && <LoaderComp />}
        {bankData && Object.keys(bankData).length > 0 && (
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
                  id: "bankTransactions",
                  defaultMessage: "bankTransactions",
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
              dbData={bankData}
              cellWidth={[20, 7, 10, 5, 20]}
              theme={userContext.userData.theme}
              apiParams={apiCatBankParams}
              onChangeParams={obj => onChangeCatBankParams(obj)}
            />
          </>
        )}
        {ccData && Object.keys(ccData).length > 0 > 0 && (
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
              id={cCmaster.id}
              config={cCmaster.config}
              Table={cCmaster.Table}
              TableRows={cCmaster.TableRows}
              TableAliasRows={cCmaster.TableAliasRows}
              rowElements={cCmaster.rowElements}
              defaultValues={cCmaster.defaultValues}
              dbData={ccData}
              cellWidth={[20, 7, 10, 10, 10, 10, 20]}
              theme={userContext.userData.theme}
              apiParams={apiCatCcParams}
              onChangeParams={obj => onChangeCatCcParams(obj)}
            />
          </>
        )}
        {Object.keys(ccData).length === 0 &&
          Object.keys(bankData).length === 0 &&
          init && (
            <div className='text-center py-2'>
              <FormattedMessage id='noRecordsGenerated' defaultMessage=' ' />
            </div>
          )}
      </Container>
    </CategoryContext.Provider>
  );
};

export default Categories;
