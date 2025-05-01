import React, { useState, useEffect, useContext } from "react";
import Loader from "../resuable/Loader";
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
import CheckCardCycleDate from "./CheckCardCycleDate";
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

export const AccountContext = React.createContext();

const AccountPlanner = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "moneyPlanner",
    defaultMessage: "moneyPlanner",
  })}`;
  const userContext = useContext(UserContext);

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

  const [openModal, setOpenModal] = useState(false); // change to false
  const [openFastShopModal, setOpenFastShopModal] = useState(false); // change to false
  const [openBulkImportModal, setOpenBulkImportModal] = useState(false); // change to false
  const [openQBModal, setOpenQBModal] = useState(false); // change to false
  const [templateClone, setTemplateClone] = useState(false);
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
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/account_planner/credit_card_details", formdata);
  };

  const getIncExpChartData = (sDate, eDate, bank) => {
    const formdata = new FormData();
    formdata.append("startDate", sDate);
    formdata.append("endDate", eDate);
    formdata.append("bank", bank);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/account_planner/getIncExpChartData", formdata);
  };

  const getCreditCardChartData = (sDate, eDate, card) => {
    const formdata = new FormData();
    formdata.append("startDate", sDate);
    formdata.append("endDate", eDate);
    formdata.append("card", card);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post(
      "/account_planner/getCreditCardChartData",
      formdata,
    );
  };
  const getYearList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
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
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/cc_year_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };

  const getBankList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/bank_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };
  const getCcBankList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/credit_card_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };
  const getIncExpList = () => {
    const formdata = new FormData();
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance
      .post("/account_planner/inc_exp_list", formdata)
      .then(res => res.data.response)
      .catch(error => {
        console.log(error);
      });
  };
  const getBankDetails = bankId => {
    const formdata = new FormData();
    formdata.append("bank", bankId);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/account_planner/getBankDetails", formdata);
  };

  useEffect(() => {
    const a = getYearList();
    const b = getBankList();
    const c = getCcYearList();
    const d = getCcBankList();
    const e = getIncExpList();
    Promise.all([a, b, c, d, e]).then(r => {
      r[0]?.length > 0
        ? setYearList(r[0])
        : setYearList([
            {
              id: moment(new Date()).format("YYYY").toString(),
              value: moment(new Date()).format("YYYY").toString(),
            },
          ]);
      r[0]?.length > 0 && r[0][0].id
        ? setYearSelected(r[0][0].id)
        : setYearSelected("Null");
      r[1]?.length > 0
        ? setBankList(r[1])
        : setBankList([
            {
              id: intl.formatMessage({ id: "null", defaultMessage: "null" }),
              value: intl.formatMessage({ id: "null", defaultMessage: "null" }),
            },
          ]);
      r[1]?.length > 0 && r[1][0].id
        ? setBankSelected(r[1][0].id)
        : setBankSelected("Null");
      r[2]?.length > 0
        ? setCcYearList(r[2])
        : setCcYearList([
            {
              id: moment(new Date()).format("YYYY").toString(),
              value: moment(new Date()).format("YYYY").toString(),
            },
          ]);
      r[2]?.length > 0 && r[2][0].id
        ? setCcYearSelected(moment(new Date()).format("YYYY").toString())
        : setCcYearSelected("Null");
      r[3]?.length > 0
        ? setCcBankList(r[3])
        : setCcBankList([
            {
              id: intl.formatMessage({ id: "null", defaultMessage: "null" }),
              value: intl.formatMessage({ id: "null", defaultMessage: "null" }),
            },
          ]);

      r[3]?.length > 0 && r[3][0].id
        ? setCcBankSelected(params?.card ? params?.card : r[3][0].id)
        : setCcBankSelected("Null");
      r[4]?.length > 0
        ? setIncExpList(r[4])
        : setIncExpList([{ id: null, value: null, isIncomeMetric: null }]);
    });
    setCcChartData([]);
  }, []);

  const generateExpenses = async (isGeneratedOnClick, cb) => {
    setChartLoader(true);
    setChartData([]);
    setInsertData([]);
    const sDate = `${yearSelected}-01-01`;
    const eDate = `${yearSelected}-12-31`;
    await getIncExpChartData(sDate, eDate, bankSelected)
      .then(async res => {
        const cData = res.data.response;
        setChartData(cData);
        await getBankDetails(bankSelected)
          .then(async res => {
            setBankDetails(res.data.response);
            typeof cb === "function" && isGeneratedOnClick
              ? await cb(cData?.category[0]?.month)
              : await cb();
          })
          .catch(error => {
            console.error(error);
            setBankDetails([]);
          });
      })
      .catch(error => {
        setChartData([]);
        console.log(error);
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
    setCcChartLoader(true);
    setCcChartData([]);
    setCcDetails([]);
    setCcMonthYearSelected(null);
    await getCreditCardDetails(ccBankSelected)
      .then(async res => {
        const data = res.data.response[0];
        setCcDetails(data);
        const sDate = `${ccYearSelected}-01-01`;
        const eDate = `${ccYearSelected}-12-31`;
        await getCreditCardChartData(sDate, eDate, ccBankSelected)
          .then(async res => {
            const cdata = res.data.response;
            const months = cdata.map(cm => cm.month);
            const currentMonthIndex = months.findIndex(
              f => f === moment().format("MMM-YYYY").toString(),
            );
            const selMonth =
              currentMonthIndex > -1
                ? months[currentMonthIndex]
                : cdata[11].month;
            setCcChartData(cdata);
            typeof cb === "function" && isGeneratedOnClick
              ? await cb(selMonth)
              : await cb(data);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setCcChartLoader(false);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const loaderComp = () => {
    return (
      <div className='relativeSpinner'>
        <Loader />
      </div>
    );
  };
  /*
   * Query params landing feature starts
   */
  useEffect(() => {
    const paramYear = moment(params.date).format("YYYY").toString();
    if (
      yearList.length > 0 &&
      bankList.length > 0 &&
      params.fetch === "bankTransactions"
    ) {
      setYearSelected(paramYear);
      setBankSelected(params.bank);
      setParamBankFetch(true);
    }
  }, [JSON.stringify(params), yearList, bankList]);

  useEffect(() => {
    if (
      ccBankList.length > 0 &&
      ccYearList.length > 0 &&
      params.fetch === "ccTransactions"
    ) {
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
          Number(ccDet.credit_card_start_date) >=
          Number(moment(params.date).format("D").toString())
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
        onCcMonthYearSelected,
        insertData,
        setInsertData,
      }}
    >
      <ToastContainer containerId='A' />
      <section className=''>
        {openModal && (
          <CheckCardCycleDate
            show={openModal}
            onHide={() => setOpenModal(false)}
            size='sm'
            animation={false}
          />
        )}
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
              {bankList.length > 0 &&
              yearList.length &&
              ccYearList.length > 0 &&
              ccBankList.length > 0 > 0 ? (
                <>
                  <div
                    className={`badge ${
                      userContext.userData.theme === "dark"
                        ? "bg-secondary text-white"
                        : "bg-light text-dark"
                    }`}
                  >
                    <FormattedMessage
                      id='bankTransactions'
                      defaultMessage='bankTransactions'
                    />
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
                              setMonthYearSelected(val);
                            })
                          }
                          className='btn btn-bni'
                        >
                          <FormattedMessage
                            id='generate'
                            defaultMessage='generate'
                          />
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
                        disabled={
                          userContext?.userConfig?.planIsBulkImport !== "1"
                        }
                      >
                        <i className='fa fa-cloud-upload' />
                      </button>
                    </div>
                    <div className='col-lg-1 col-4 py-2 mb-2'>
                      <button
                        onClick={() => setTemplateClone(!templateClone)}
                        className='btn btn-bni w-100'
                        title={intl.formatMessage({
                          id: "planFromTemplate",
                          defaultMessage: "planFromTemplate",
                        })}
                      >
                        <i className='fa fa-clone' />
                      </button>
                    </div>
                  </div>
                  {bankList.length > 0 && templateClone && <TemplateClone />}
                  {chartLoader ? (
                    loaderComp()
                  ) : (
                    <>
                      {incExpList.length > 0 && bankDetails.length > 0 && (
                        <IncExpChart />
                      )}
                    </>
                  )}
                  <div className='row'>
                    <div className='col-md-12 b-0 mb-10 pr-0 pl-0'>
                      {
                        // bankSelected &&
                        //   incExpList.length > 0 &&
                        //   bankList.length > 0 &&
                        // monthYearSelected &&
                        bankDetails.length > 0 && <MonthExpenditureTable />
                      }
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div
                        className={`badge ${
                          userContext.userData.theme === "dark"
                            ? "bg-secondary text-white"
                            : "bg-light text-dark"
                        }`}
                      >
                        <FormattedMessage
                          id='creditCardTransactions'
                          defaultMessage='creditCardTransactions'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-4 py-2'>
                      <SetCcBank />
                    </div>
                    <div className='col-md-4 py-2'>
                      <SetCcYear />
                    </div>
                    <div className='col-md-3 py-2'>
                      <div className='d-grid gap-2'>
                        <button
                          onClick={() =>
                            generateCreditCards(true, val => {
                              setCcMonthYearSelected(val);
                            })
                          }
                          className='btn btn-bni'
                        >
                          <FormattedMessage
                            id='generate'
                            defaultMessage='generate'
                          />
                        </button>
                      </div>
                    </div>
                    <div className='col-md-1 py-2'>
                      <button
                        onClick={() => setOpenModal(true)}
                        className='btn btn-bni w-100'
                      >
                        <i className='fa fa-calendar-o mt-20' />
                      </button>
                    </div>
                  </div>
                  {ccChartLoader ? (
                    loaderComp()
                  ) : ccChartData && ccChartData.length > 0 ? (
                    <CreditCardChart />
                  ) : (
                    <div className='py-3 text-center'>
                      <FormattedMessage
                        id='noRecordsGenerated'
                        defaultMessage='noRecordsGenerated'
                      />
                    </div>
                  )}
                  <div className='row'>
                    <div className='col-md-12 pt-2'>
                      {ccMonthYearSelected &&
                        ccBankSelected &&
                        incExpList.length &&
                        ccBankList.length &&
                        ccDetails && <TypeCreditCardExpenditure />}
                    </div>
                  </div>
                </>
              ) : (
                loaderComp()
              )}
            </div>
          </div>
        </div>
      </section>
    </AccountContext.Provider>
  );
};

export default AccountPlanner;
