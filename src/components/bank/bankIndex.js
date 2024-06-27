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
import { currencyList, localeTagList, countryList } from "../../helpers/static";

const BankContext = React.createContext(undefined);

const Bank = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const localeContext = useContext(LocaleContext);
  const myAlertContext = useContext(MyAlertContext);
  const [init, setInit] = useState(false);
  const [ajaxStatus, setAjaxStatus] = useState(false);
  const [loader, setLoader] = useState(true);
  const [bankList, setBankList] = useState([]);
  const [selection, setSelection] = useState({
    bank: "",
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
  });
  const [bankData, setBankData] = useState([]);

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
          maxPagesToShow: 5,
        },
      },
    },
    id: "bankTable",
    Table: "bankTrx",
    label: "Bank trx",
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

  const getBankList = async () => {
    setLoader(true);
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/bank_list", formdata)
      .then(res => {
        setBankList(res.data.response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  };

  const getBankTrxTable = () => {
    const formdata = new FormData();
    formdata.append(
      "TableRows",
      `a.inc_exp_name as name,a.inc_exp_date as date, a.inc_exp_amount as amount, a.inc_exp_type as type, a.inc_exp_comments as comments`,
    );
    formdata.append("Table", "bankTrx");
    formdata.append(
      "WhereClause",
      `a.inc_exp_appId = '${
        userContext.userConfig.appId
      }' && a.inc_exp_bank = '${selection.bank}' && d.bank_appId = '${
        userContext.userConfig.appId
      }' && a.inc_exp_date >= '${moment(selection.startDate)
        .format("YYYY-MM-DD")
        .toString()}' && a.inc_exp_date <= '${moment(selection.endDate)
        .format("YYYY-MM-DD")
        .toString()}'`,
    );
    return apiInstance.post("/account_planner/getAccountPlanner", formdata);
  };

  const onGenerate = cb => {
    setAjaxStatus(true);
    setBankData([]);
    setTimeout(() => {
      const a = getBankTrxTable();
      Promise.all([a])
        .then(r => {
          setBankData(r[0].data.response);
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
    getBankList();
  }, []);

  /*
   * Query params landing feature starts
   */
  const searchParams = useQuery();
  const params = {
    fetch: searchParams.get("fetch"),
    bankId: searchParams.get("bankId"),
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  };
  const [paramBankFetch, setParamBankFetch] = useState(false);

  useEffect(() => {
    if (params.fetch === "bank" && params.bankId) {
      setParamBankFetch(true);
      setSelection(prev => ({
        ...prev,
        bank: params.bankId,
        startDate: moment(params.startDate).toDate(),
        endDate: moment(params.endDate).toDate(),
      }));
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    if (
      params.fetch === "bank" &&
      selection.bank &&
      selection.startDate &&
      selection.endDate &&
      paramBankFetch
    ) {
      onGenerate(() => {
        setParamBankFetch(false);
        setTimeout(() => {
          document.getElementById("bankTable")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
          });
        }, 200);
      });
    }
  }, [JSON.stringify(params), selection.bank, paramBankFetch]);

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
  const bankFields = [
    "id",
    "bank",
    "accountNumber",
    "swiftCode",
    "type",
    "country",
    "sort",
    "localeLanguage",
    "localeCurrency",
  ];
  const rElements = [
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
  ];
  const bankCoreOptions = crudFormArray
    .filter(f => f.id === "bankAccounts")
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
            maxPagesToShow: 5,
          },
        },
      };
      crud.config = obj;
      crud.TableAliasRows = bankFields.map(al =>
        intl.formatMessage({ id: al, defaultMessage: al }),
      );
      crud.rowElements = rElements;
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
  const fetchBankMaster = () => {
    setDbData([]);
    const a = getBackendAjax(bankCoreOptions.Table, bankCoreOptions.TableRows);
    Promise.all([a]).then(async r => {
      setDbData(r[0].data.response);
    });
  };
  useEffect(() => {
    fetchBankMaster();
  }, []);

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

  return (
    <BankContext.Provider value={{ bankList, selection }}>
      <Container fluid>
        <PageHeader icon='fa fa-bank' intlId='bank' />
        {loader ? (
          <LoaderComp />
        ) : (
          <>
            {dbData.length > 0 && (
              <>
                <BackendCore
                  className='pt-3'
                  config={bankCoreOptions.config}
                  Table={bankCoreOptions.Table}
                  TableRows={bankCoreOptions.TableRows}
                  TableAliasRows={bankCoreOptions.TableAliasRows}
                  rowElements={bankCoreOptions.rowElements}
                  defaultValues={bankCoreOptions.defaultValues}
                  dbData={dbData}
                  postApiUrl='/account_planner/postAccountPlanner'
                  onPostApi={response =>
                    onPostApi(response, bankCoreOptions.id)
                  }
                  onReFetchData={() => fetchBankMaster()}
                  cellWidth={bankCoreOptions.cellWidth}
                  ajaxButtonName={intl.formatMessage({
                    id: "submit",
                    defaultMessage: "submit",
                  })}
                  appIdKeyValue={{
                    key: "bank_appId",
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
                    id: "bank",
                    defaultMessage: "bank",
                  })}`}
                  onChange={(ind, value, pKey) => {
                    setSelection(prev => ({ ...prev, bank: value }));
                  }}
                  element={{
                    fetch: {
                      dropDownList: bankList.map(row => ({
                        id: row.id,
                        value: row.value,
                      })),
                    },
                  }}
                  value={selection.bank}
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
                  minDate={moment().subtract(1, "year").toDate()}
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
                  minDate={moment().subtract(1, "year").toDate()}
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
                  disabled={ajaxStatus || !selection.bank}
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
            />
          </>
        )}
        {bankData.length === 0 && init && (
          <div className='text-center py-2'>
            <FormattedMessage id='noRecordsGenerated' defaultMessage=' ' />
          </div>
        )}
      </Container>
    </BankContext.Provider>
  );
};

export default Bank;
