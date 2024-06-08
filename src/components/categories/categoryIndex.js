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
import BackendCore from "../../components/configuration/backend/BackendCore";
import { useQuery } from "../GlobalHeader/queryParamHook";
import { crudFormArray } from "../configuration/backendTableConfig";
import { LocaleContext } from "../../contexts/LocaleContext";
import { UpgradeHeading, UpgradeContent } from "../payment/Upgrade";
import { MyAlertContext } from "../../contexts/AlertContext";

const CategoryContext = React.createContext(undefined);

const Categories = () => {
  const intl = useIntl();
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
    showTotal: [
      {
        whichKey: "amount",
        forKey: "type",
        forCondition: "equals", // includes or equals
        forValue: [
          { key: "+", value: "Cr" },
          { key: "-", value: "Dr" },
        ],
        showDifference: { indexes: [0, 1], showStability: true },
        // Ex:
        // 1. difference result = "Cr - Dr = Balance" Ex: "1000 - 750 = 250"
        // 2. showStability: (Settled), (Ahead), (YetTo) strings will be shown
      },
    ],
    id: "intlMaster",
    Table: "categorizedBankTrx",
    label: "Locale master",
    TableRows: ["name", "date", "amount", "type", "comments"],
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
    id: "catCreditCardTrx",
    Table: "categorizedCreditCardTrx",
    label: "Category credit card trx",
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
    showTotal: ["credits", "purchases", "interest"],
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
    formdata.append(
      "TableRows",
      `a.inc_exp_name as name,a.inc_exp_date as date, a.inc_exp_amount as amount, a.inc_exp_type as type, a.inc_exp_comments as comments`,
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
    formdata.append(
      "TableRows",
      `a.cc_transaction as name, a.cc_date as date, d.credit_card_name as creditCard, a.cc_payment_credits as credits, a.cc_purchases as purchases, a.cc_taxes_interest as interest, a.cc_comments as comments`,
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
          setBankData(r[0].data.response);
          setCcData(r[1].data.response);
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
    getIncExpList();
  }, []);

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
      onGenerate(() => {
        setParamCatFetch(false);
      });
    }
  }, [JSON.stringify(params), selection.category, paramCatFetch]);

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
  const shTotal = [
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
      crud.TableAliasRows = incExpCat.map(al =>
        intl.formatMessage({ id: al, defaultMessage: al }),
      );
      crud.rowElements = rElements;
      crud.showTotal = shTotal;
      return crud;
    })[0];
  console.log("bbb", incExpCoreOptions);

  const getBackendAjax = (Table, TableRows) => {
    const formdata = new FormData();
    formdata.append("TableRows", TableRows);
    formdata.append("Table", Table);
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
  useEffect(() => {
    fetchCatMaster();
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
    <CategoryContext.Provider value={{ incExpList, selection }}>
      <Container fluid>
        <PageHeader icon='fa fa-sitemap' intlId='category' />
        {loader ? (
          <LoaderComp />
        ) : (
          <>
            {dbData.length > 0 && (
              <>
                <div className='py-2 text-center'>
                  <span
                    className={`badge ${
                      userContext.userData.theme === "dark"
                        ? "bg-secondary text-white"
                        : "bg-light text-dark"
                    }`}
                  >
                    <FormattedMessage
                      id='incExpCat'
                      defaultMessage='incExpCat'
                    />
                  </span>
                </div>
                <BackendCore
                  config={incExpCoreOptions.config}
                  Table={incExpCoreOptions.Table}
                  TableRows={incExpCoreOptions.TableRows}
                  TableAliasRows={incExpCoreOptions.TableAliasRows}
                  showTotal={incExpCoreOptions.showTotal}
                  rowElements={incExpCoreOptions.rowElements}
                  defaultValues={incExpCoreOptions.defaultValues}
                  dbData={dbData}
                  postApiUrl='/account_planner/postAccountPlanner'
                  onPostApi={response =>
                    onPostApi(response, incExpCoreOptions.id)
                  }
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
            <div className='py-2 text-center'>
              <span
                className={`badge ${
                  userContext.userData.theme === "dark"
                    ? "bg-secondary text-white"
                    : "bg-light text-dark"
                }`}
              >
                <FormattedMessage
                  id='recentTransactions'
                  defaultMessage='recentTransactions'
                />
              </span>
            </div>
            <Row>
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
                  disabled={ajaxStatus || !selection.category}
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
        {bankData.length > 0 && (
          <>
            <div className='py-2 text-center'>
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
              key={"cat-bank-table"}
              config={master.config}
              Table={master.Table}
              TableRows={master.TableRows}
              TableAliasRows={master.TableAliasRows}
              rowElements={master.rowElements}
              showTotal={master.showTotal}
              defaultValues={master.defaultValues}
              dbData={bankData}
              cellWidth={[20, 7, 10, 5, 20]}
              theme={userContext.userData.theme}
            />
          </>
        )}
        {ccData.length > 0 && (
          <>
            <div className='py-2 text-center'>
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
              key={"cat-cc-table"}
              config={cCmaster.config}
              Table={cCmaster.Table}
              TableRows={cCmaster.TableRows}
              TableAliasRows={cCmaster.TableAliasRows}
              rowElements={cCmaster.rowElements}
              showTotal={cCmaster.showTotal}
              defaultValues={cCmaster.defaultValues}
              dbData={ccData}
              cellWidth={[20, 7, 10, 10, 10, 10, 20]}
              theme={userContext.userData.theme}
            />
          </>
        )}
        {ccData.length === 0 && bankData.length === 0 && init && (
          <div className='text-center py-2'>
            <FormattedMessage id='noRecordsGenerated' defaultMessage=' ' />
          </div>
        )}
      </Container>
    </CategoryContext.Provider>
  );
};

export default Categories;
