import React, { useState, useEffect, useContext } from "react";
import IncExpChart from "./IncExpChart";
import CreditCardChart from "./CreditCardChart";
import MonthExpenditureTable from "./MonthExpenditureTable";
import SetBank from "./SetBank";
import SetYear from "./SetYear";
import SetCcYear from "./SetCcYear";
import SetCcBank from "./SetCcBank";
import TypeCreditCardExpenditure from "./TypeCreditCardExpenditure";
import FastShopping from "./FastShopping";
import useAxios from "../../services/apiServices";
import ConfirmQBModal from "./ConfirmQBModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserContext } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import BulkImportIncExp from "./BulkImportIncExp";
import { FormattedMessage, useIntl } from "react-intl";
import TemplateClone from "./TemplateClone";
import { useQuery } from "../GlobalHeader/queryParamHook";
import moment from "moment";
import PageHeader from "../shared/PageHeader";
import Dropdown from "react-bootstrap/Dropdown";
import { Container } from "react-bootstrap";
import _ from "lodash";
import { db } from "../../services/indexedDb";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

export const AccountContext = React.createContext();

const AccountPlanner = () => {
  const { isOnline } = useNetworkStatus();
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "moneyPlanner",
    defaultMessage: "moneyPlanner",
  })}`;
  const userContext = useContext(UserContext);
  const tenantId = userContext.userConfig.tenantId;
  const renderToast = ({
    autoClose = 5000,
    type = "success",
    position = "top-right",
    message,
    theme = "colored",
    hideProgressBar = false,
    closeOnClick = false,
    pauseOnHover = true,
    draggable = true,
  }) =>
    toast[type](message, {
      autoClose,
      position,
      theme,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
    });

  const [yearList, setYearList] = useState([]);
  const [ccYearList, setCcYearList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [ccChartData, setCcChartData] = useState([]);
  const [incExpList, setIncExpList] = useState([]);
  const [bankDetails, setBankDetails] = useState([]);
  const [insertData, setInsertData] = useState([]);

  const [ccYearSelected, setCcYearSelected] = useState("");
  const [ccBankList, setCcBankList] = useState([]);
  const [ccBankSelected, setCcBankSelected] = useState("");

  const [yearSelected, setYearSelected] = useState("");
  const [bankSelected, setBankSelected] = useState("");
  const [monthYearSelected, setMonthYearSelected] = useState("");
  const [ccMonthYearSelected, setCcMonthYearSelected] = useState("");

  const [ccDetails, setCcDetails] = useState({});

  const [chartLoader, setChartLoader] = useState(false);
  const [ccChartLoader, setCcChartLoader] = useState(false);

  const [openFastShopModal, setOpenFastShopModal] = useState(false); // change to false
  const [openBulkImportModal, setOpenBulkImportModal] = useState(false); // change to false
  const [openQBModal, setOpenQBModal] = useState(false); // change to false
  const [templateClone, setTemplateClone] = useState(false);
  const [scheduleMonth, setScheduleMonth] = useState(null);
  const searchParams = useQuery();
  const params = {
    fetch: searchParams.get("fetch"),
    date: searchParams.get("date"),
    bank: searchParams.get("bank"),
    card: searchParams.get("card"),
  };
  const [paramBankFetch, setParamBankFetch] = useState(false);
  const [paramCcFetch, setParamCcFetch] = useState(false);

  const getCreditCardDetails = bank => {
    const formdata = new FormData();
    formdata.append("bank", bank);
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance.post("/account_planner/credit_card_details", formdata);
  };

  const getIncExpChartData = (sDate, eDate, bank) => {
    const formdata = new FormData();
    formdata.append("startDate", sDate);
    formdata.append("endDate", eDate);
    formdata.append("bank", bank);
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance.post("/account_planner/getIncExpChartData", formdata);
  };

  const getCreditCardChartData = (sDate, eDate, card) => {
    const formdata = new FormData();
    formdata.append("startDate", sDate);
    formdata.append("endDate", eDate);
    formdata.append("card", card);
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance.post("/account_planner/getCreditCardChartData", formdata);
  };
  const getYearList = () => {
    const formdata = new FormData();
    formdata.append("tenantId", userContext.userConfig.tenantId);
    0;
    return apiInstance
      .post("/account_planner/year_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const getCcYearList = () => {
    const formdata = new FormData();
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance
      .post("/account_planner/cc_year_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const getBankList = async () => {
    return await db.bankList.where("tenantId").equals(tenantId).toArray();
  };
  const getCcBankList = async () => {
    return await db.creditCardList.where("tenantId").equals(tenantId).toArray();
  };
  const getIncExpList = async () => {
    return await db.categoryList.where("tenantId").equals(tenantId).toArray();
  };
  const getBankDetails = bankId => {
    const formdata = new FormData();
    formdata.append("bank", bankId);
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance.post("/account_planner/getBankDetails", formdata);
  };

  useEffect(() => {
    const a = getYearList();
    const b = getBankList();
    const c = getCcYearList();
    const d = getCcBankList();
    const e = getIncExpList();
    Promise.all([a, b, c, d, e])
      .then(async r => {
        const yearData = r[0] && r[0].length > 0 && r[0];
        yearData?.length > 0
          ? setYearList(yearData)
          : setYearList([
              {
                id: moment(new Date()).format("YYYY").toString(),
                value: moment(new Date()).format("YYYY").toString(),
              },
            ]);
        await db.bankYearList.bulkPut(yearData.map(d => ({ ...d, tenantId })));
        yearData?.length > 0 && yearData[0].id ? setYearSelected(yearData[0].id) : setYearSelected("Null");
        const bankData = r[1] && r[1].length > 0 && r[1];
        bankData?.length > 0
          ? setBankList(bankData)
          : setBankList([
              {
                id: intl.formatMessage({ id: "null", defaultMessage: "null" }),
                value: intl.formatMessage({ id: "null", defaultMessage: "null" }),
              },
            ]);
        await db.bankList.bulkPut(bankData.map(d => ({ ...d, tenantId })));
        bankData?.length > 0 && bankData[0].id ? setBankSelected(bankData[0].id) : setBankSelected("Null");
        const ccYearData = r[2] && r[2].length > 0 && r[2];
        ccYearData?.length > 0
          ? setCcYearList(ccYearData)
          : setCcYearList([
              {
                id: moment(new Date()).format("YYYY").toString(),
                value: moment(new Date()).format("YYYY").toString(),
              },
            ]);
        await db.ccYearList.bulkPut(ccYearData.map(d => ({ ...d, tenantId })));
        ccYearData?.length > 0 && ccYearData[0].id ? setCcYearSelected(moment(new Date()).format("YYYY").toString()) : setCcYearSelected("Null");
        const ccBankData = r[3] && r[3].length > 0 && r[3];
        ccBankData?.length > 0
          ? setCcBankList(ccBankData)
          : setCcBankList([
              {
                id: intl.formatMessage({ id: "null", defaultMessage: "null" }),
                value: intl.formatMessage({ id: "null", defaultMessage: "null" }),
              },
            ]);
        await db.creditCardList.bulkPut(ccBankData.map(d => ({ ...d, tenantId })));
        ccBankData?.length > 0 && ccBankData[0].id ? setCcBankSelected(params?.card ? params?.card : ccBankData[0].id) : setCcBankSelected("Null");
        const incExpData = r[4] && r[4].length > 0 && r[4];
        await db.categoryList.bulkPut(incExpData.map(d => ({ ...d, tenantId })));
        incExpData?.length > 0 ? setIncExpList(incExpData) : setIncExpList([{ id: null, value: null, isIncomeMetric: null }]);
      })
      .catch(async () => {
        const bylist = await db.bankYearList.where("tenantId").equals(tenantId).toArray();
        const ccylist = await db.ccYearList.where("tenantId").equals(tenantId).toArray();
        const bankList = await db.bankList.where("tenantId").equals(tenantId).toArray();
        const creditCardList = await db.creditCardList.where("tenantId").equals(tenantId).toArray();
        const incExpList = await db.categoryList.where("tenantId").equals(tenantId).toArray();
        const bankTransactionList = await db.bankTransactionTable.where("tenantId").equals(tenantId).toArray();
        const bankMYSelected = moment(bankTransactionList[0]?.inc_exp_date).format("MMM-YYYY");
        const bankDetails = await db.statics.where("[tenantId+key]").equals([tenantId, "bankDetails"]).toArray();
        const ccTransactionList = await db.creditCardTransactionTable.where("tenantId").equals(tenantId).toArray();
        const ccMYSelected = moment(ccTransactionList[0]?.cc_date).format("MMM-YYYY");
        setYearList(bylist);
        setCcYearList(ccylist);
        setBankList(bankList);
        setCcBankList(creditCardList);
        setIncExpList(incExpList);
        setMonthYearSelected(bankMYSelected);
        setBankDetails(bankDetails[0]?.data);
        setCcMonthYearSelected(ccMYSelected);
      });
  }, []);

  const generateExpenses = async (isGeneratedOnClick, cb) => {
    setChartData([]);
    setInsertData([]);
    setChartLoader(true);
    const sDate = `${yearSelected}-01-01`;
    const eDate = `${yearSelected}-12-31`;
    await getIncExpChartData(sDate, eDate, bankSelected)
      .then(async res => {
        const cData = res.data.response;
        setChartData(cData);
        await db.statics.bulkPut([
          {
            key: "incExpChartData",
            data: cData,
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            tenantId,
          },
        ]);
        await getBankDetails(bankSelected).then(async res => {
          setBankDetails(res.data.response);
          await db.statics.bulkPut([
            {
              key: "bankDetails",
              data: res.data.response,
              updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
              tenantId,
            },
          ]);
          typeof cb === "function" && isGeneratedOnClick ? await cb(cData?.category[0]?.month) : await cb();
        });
      })
      .finally(() => {
        setChartLoader(false);
      });
  };

  const onMonthYearSelected = monthYear => {
    setMonthYearSelected(monthYear);
  };

  const onCcMonthYearSelected = monthYear => {
    setCcMonthYearSelected(monthYear);
  };

  const generateCreditCards = async (isGeneratedOnClick, cb) => {
    setCcChartData([]);
    setCcDetails([]);
    setCcMonthYearSelected(null);
    setCcChartLoader(true);
    await getCreditCardDetails(ccBankSelected)
      .then(async res => {
        const data = res.data.response[0];
        setCcDetails(data);
        await db.statics.bulkPut([
          {
            key: "creditCardDetails",
            data: data,
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            tenantId,
          },
        ]);
        const sDate = `${ccYearSelected}-01-01`;
        const eDate = `${ccYearSelected}-12-31`;
        await getCreditCardChartData(sDate, eDate, ccBankSelected).then(async res => {
          const cdata = res.data.response;
          const months = cdata.map(cm => cm.month);
          const currentMonthIndex = months.findIndex(f => f === moment().format("MMM-YYYY").toString());
          const selMonth = currentMonthIndex > -1 ? months[currentMonthIndex] : cdata[11].month;
          setCcChartData(cdata);
          await db.statics.bulkPut([
            {
              key: "creditCardChartData",
              data: cdata,
              updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
              tenantId,
            },
          ]);
          typeof cb === "function" && isGeneratedOnClick ? await cb(selMonth) : await cb(data);
        });
      })
      .finally(() => {
        setCcChartLoader(false);
      });
  };

  useEffect(() => {
    const fetchCCdata = async () => {
      const creditCardChartData = await db.statics.where("[tenantId+key]").equals([tenantId, "creditCardChartData"]).toArray();
      const creditCardDetails = await db.statics.where("[tenantId+key]").equals([tenantId, "creditCardDetails"]).toArray();
      const incExpChartData = await db.statics.where("[tenantId+key]").equals([tenantId, "incExpChartData"]).toArray();
      const bankDetails = await db.statics.where("[tenantId+key]").equals([tenantId, "bankDetails"]).toArray();
      setCcChartData(creditCardChartData[0]?.data);
      setCcDetails(creditCardDetails[0]?.data);
      setCcBankSelected(creditCardDetails[0]?.data?.credit_card_id);
      setChartData(incExpChartData[0]?.data || []);
      setBankDetails(bankDetails[0]?.data || []);
    };
    if (!isOnline) {
      fetchCCdata();
    }
  }, [isOnline]);
  /*
   * Query params landing feature starts
   */
  useEffect(() => {
    const paramYear = moment(params.date).format("YYYY").toString();
    if (yearList.length > 0 && bankList.length > 0 && params.fetch === "bankTransactions") {
      setYearSelected(paramYear);
      setBankSelected(params.bank);
      setParamBankFetch(true);
    }
  }, [JSON.stringify(params), yearList, bankList]);

  useEffect(() => {
    if (ccBankList.length > 0 && ccYearList.length > 0 && params.fetch === "ccTransactions") {
      const paramYear = moment(params.date).format("YYYY").toString();
      setCcYearSelected(paramYear);
      setCcBankSelected(params.card);
      setParamCcFetch(true);
    }
  }, [JSON.stringify(params), ccBankList, ccYearList]);

  useEffect(() => {
    if (yearSelected && bankSelected && paramBankFetch) {
      const paramMonthYear = moment(params.date).format("MMM-YYYY").toString();
      generateExpenses(false, () => {
        setMonthYearSelected(paramMonthYear);
        setParamBankFetch(false);
        setTimeout(() => {
          document.getElementById("incExpTable")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start",
          });
        }, 200);
      });
    }
  }, [JSON.stringify(params), paramBankFetch, yearSelected, bankSelected]);

  useEffect(() => {
    if (ccYearSelected && ccBankSelected && paramCcFetch) {
      generateCreditCards(false, ccDet => {
        const paramMonthYear =
          Number(ccDet.credit_card_start_date) >= Number(moment(params.date).format("D").toString())
            ? moment(params.date).format("MMM-YYYY").toString()
            : moment(params.date).add(1, "M").format("MMM-YYYY").toString();

        setCcMonthYearSelected(paramMonthYear);
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
  }, [JSON.stringify(params), paramCcFetch, ccYearSelected, ccBankSelected]);

  /*
   * Query params landing feature ends
   */
  const [newRequest, setNewRequest] = useState(false);
  useEffect(() => {
    if (newRequest) {
      setTimeout(() => {
        setNewRequest(false);
      }, 100);
    }
  }, [newRequest]);

  return (
    <AccountContext.Provider
      value={{
        renderToast,
        bankSelected,
        setBankSelected,
        bankDetails,
        bankList,
        setBankList,
        yearSelected,
        setYearSelected,
        yearList,
        monthYearSelected,
        onMonthYearSelected,
        incExpList,
        setIncExpList,
        ccBankList,
        ccBankSelected,
        setCcBankSelected,
        ccYearSelected,
        setCcYearSelected,
        ccYearList,
        setCcBankList,
        chartData,
        ccChartData,
        ccDetails,
        setCcDetails,
        ccMonthYearSelected,
        setCcMonthYearSelected,
        onCcMonthYearSelected,
        insertData,
        setInsertData,
        newRequest,
      }}
    >
      <ToastContainer containerId='A' />
      <section className=''>
        {openFastShopModal && (
          <FastShopping
            className='accountPlanner fastShopping'
            show={openFastShopModal}
            onHide={() => setOpenFastShopModal(false)}
            size='sm'
            animation={false}
          />
        )}
        {openBulkImportModal && (
          <BulkImportIncExp
            className='accountPlanner'
            show={openBulkImportModal}
            onHide={() => setOpenBulkImportModal(false)}
            centered
            size='lg'
            backdrop='static'
          />
        )}
        {openQBModal && (
          <ConfirmQBModal
            className='confirmQBModal'
            show={openQBModal}
            onHide={() => {
              setOpenQBModal(false);
            }}
            onYes={() => {
              setOpenQBModal(false);
            }}
            size='md'
            animation={false}
          />
        )}
        <div className='m-2'>
          <PageHeader icon='fa fa-cubes' intlId='moneyPlanner' />
          <div className='pt-2'>
            <div className={`accountPlanner ${userContext.userData.theme}`}>
              <div className={`badge ${userContext.userData.theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}>
                <FormattedMessage id='bankTransactions' defaultMessage='bankTransactions' />
              </div>
              <div className='row mt-10'>
                <div className='col-lg-3 col-sm-4 py-2'>
                  <SetBank />
                </div>
                <div className='col-lg-3 col-sm-4 py-2'>
                  <SetYear />
                </div>
                <div className='col-lg-3 col-sm-4 py-2'>
                  <div className='d-grid gap-2'>
                    <button
                      onClick={() =>
                        generateExpenses(true, val => {
                          setNewRequest(true);
                          setMonthYearSelected(val);
                        })
                      }
                      className='btn btn-bni border-0'
                      disabled={chartLoader}
                    >
                      {chartLoader ? <i className='fa fa-cog fa-spin' /> : <FormattedMessage id='generate' defaultMessage='generate' />}
                    </button>
                  </div>
                </div>
                <div className='col-lg-1 col-4 py-2 mb-2'>
                  <button
                    onClick={() => setOpenFastShopModal(true)}
                    className='btn btn-bni w-100'
                    title={intl.formatMessage({
                      id: "fastShopping",
                      defaultMessage: "fastShopping",
                    })}
                  >
                    <i className='fa fa-cart-plus' />
                  </button>
                </div>
                <div className='col-lg-1 col-4 py-2 mb-2'>
                  <button
                    onClick={() => setOpenBulkImportModal(true)}
                    className='btn btn-bni w-100'
                    title={intl.formatMessage({
                      id: "bulkImport",
                      defaultMessage: "bulkImport",
                    })}
                    disabled={userContext?.userConfig?.planIsBulkImport !== "1"}
                  >
                    <i className='fa fa-cloud-upload' />
                  </button>
                </div>
                <div className='col-lg-1 col-4 py-2 mb-2'>
                  <div className={`btn-group ${insertData.length > 0 ? "d-flex" : "d-block"}`}>
                    <Dropdown as={"div"} className={`${insertData.length > 0 ? "w-75" : "w-100"}`}>
                      <Dropdown.Toggle
                        variant='bni'
                        className={`px-1 d-flex align-items-center justify-content-between w-100 ${insertData.length > 0 ? "rounded-end-0" : ""}`}
                      >
                        <span
                          className='text-truncate'
                          title={intl.formatMessage({
                            id: "plan",
                            defaultMessage: "plan",
                          })}
                        >
                          <FormattedMessage id='plan' defaultMessage='plan' />
                        </span>
                        <i className='fa fa-caret-down ps-1' style={{ transform: "none" }} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: "12rem" }}>
                        <Container
                          className={`overflow-auto px-0 border border-1 ${userContext?.userData?.theme === "dark" ? "border-secondary" : "border"} rounded`}
                          style={{ maxHeight: "15rem" }}
                        >
                          {_.range(1, 61).map((_, i) => {
                            const month = moment().add(_, "M").format("MMM").toLowerCase();
                            const year = moment().add(_, "M").format("YYYY");
                            const monthYearNumeric = moment().add(_, "M").format("YYYY-M");
                            return (
                              <Dropdown.Item
                                key={_}
                                eventKey={_}
                                onClick={() => {
                                  setTemplateClone(true);
                                  setScheduleMonth(monthYearNumeric);
                                }}
                                className={`user-select-none border-start-0 d-flex align-items-center justify-content-between ${userContext?.userData?.theme === "dark" ? "bg-dark text-white border-secondary" : "bg-light text-dark border"}`}
                              >
                                <span>
                                  <FormattedMessage id={month} defaultMessage={month} /> {year}
                                </span>
                                <span className='small text-secondary'>{i + 1}</span>
                              </Dropdown.Item>
                            );
                          })}
                        </Container>
                      </Dropdown.Menu>
                    </Dropdown>
                    {insertData.length > 0 && (
                      <button
                        className='btn btn-sm btn-danger px-0'
                        onClick={() => {
                          setTemplateClone(false);
                          setInsertData([]);
                        }}
                      >
                        <i className='fa fa-times-circle' style={{ transform: "none" }} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {bankList.length > 0 && templateClone && <TemplateClone scheduleMonth={scheduleMonth} />}
              {incExpList && bankDetails && incExpList.length > 0 && bankDetails.length > 0 && <IncExpChart />}
              <div className='row'>
                <div className='col-md-12 b-0 mb-10 pr-0 pl-0'>
                  <MonthExpenditureTable />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className={`badge ${userContext.userData.theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}>
                    <FormattedMessage id='creditCardTransactions' defaultMessage='creditCardTransactions' />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4 py-2'>{ccBankList && <SetCcBank />}</div>
                <div className='col-md-4 py-2'>
                  <SetCcYear />
                </div>
                <div className='col-md-4 py-2'>
                  <div className='d-grid gap-2'>
                    <button
                      onClick={() =>
                        generateCreditCards(true, val => {
                          setCcMonthYearSelected(val);
                        })
                      }
                      className='btn btn-bni border-0'
                      disabled={ccChartLoader}
                    >
                      {ccChartLoader ? <i className='fa fa-cog fa-spin' /> : <FormattedMessage id='generate' defaultMessage='generate' />}
                    </button>
                  </div>
                </div>
              </div>
              {ccChartData && ccChartData.length > 0 && ccMonthYearSelected && ccDetails && <CreditCardChart />}
              <div className='row'>
                <div className='col-md-12 pt-2'>{ccMonthYearSelected && ccDetails && <TypeCreditCardExpenditure />}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AccountContext.Provider>
  );
};

export default AccountPlanner;
