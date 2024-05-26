import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import IncExpChart from "./IncExpChart";
import CreditCardChart from "./CreditCardChart";
import MonthExpenditureTable from "./MonthExpenditureTable";
import SetBank from "./SetBank";
import SetYear from "./SetYear";
import SetCcYear from "./SetCcYear";
import SetCcBank from "./SetCcBank";
import CreateModule from "./CreateModule";
import TypeCreditCardExpenditure from "./TypeCreditCardExpenditure";
import FastShopping from "./FastShopping";
import apiInstance from "../../services/apiServices";
import CheckCardCycleDate from "./CheckCardCycleDate";
import ConfirmQBModal from "./ConfirmQBModal";
import { UserContext } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import BulkImportIncExp from "./BulkImportIncExp";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage, useIntl } from "react-intl";
import TemplateClone from "./TemplateClone";
import { useQuery } from "../GlobalHeader/queryParamHook";
import moment from "moment";

export const AccountContext = React.createContext();

const AccountPlanner = props => {
  const intl = useIntl();
  document.title = intl.formatMessage({
    id: "moneyPlanner",
    defaultMessage: "moneyPlanner",
  });
  const userContext = useContext(UserContext);

  const renderToast = ({
    autoClose = 5000,
    type = "success",
    icon = "fa fa-check-circle",
    message,
  }) =>
    toast[type](
      <div>
        <span>
          <i className={icon} />{" "}
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </span>
      </div>,
      {
        autoClose,
      },
    );

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
  const [toggleCoreSettings, setToggleCoreSettings] = useState(false);

  const [openModal, setOpenModal] = useState(false); // change to false
  const [openFastShopModal, setOpenFastShopModal] = useState(false); // change to false
  const [openBulkImportModal, setOpenBulkImportModal] = useState(false); // change to false
  const [openQBModal, setOpenQBModal] = useState(false); // change to false
  const [templateClone, setTemplateClone] = useState(false);
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

  const getCreditCardChartData = (sDate, eDate, bank) => {
    const formdata = new FormData();
    formdata.append("startDate", sDate);
    formdata.append("endDate", eDate);
    formdata.append("bank", bank);
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
              id: intl.formatMessage({ id: "null", defaultMessage: "null" }),
              value: intl.formatMessage({ id: "null", defaultMessage: "null" }),
            },
          ]);
      r[0]?.length > 0 && r[0][0].id
        ? setYearSelected(r[0][0].id)
        : setYearSelected("");
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
        : setBankSelected("");
      r[2]?.length > 0
        ? setCcYearList(r[2])
        : setCcYearList([
            {
              id: intl.formatMessage({ id: "null", defaultMessage: "null" }),
              value: intl.formatMessage({ id: "null", defaultMessage: "null" }),
            },
          ]);
      r[2]?.length > 0 && r[2][0].id
        ? setCcYearSelected(r[2][0].id)
        : setCcYearSelected("");
      r[3]?.length > 0
        ? setCcBankList(r[3])
        : setCcBankList([
            {
              id: intl.formatMessage({ id: "null", defaultMessage: "null" }),
              value: intl.formatMessage({ id: "null", defaultMessage: "null" }),
            },
          ]);
      r[3]?.length > 0 && r[3][0].id
        ? setCcBankSelected(r[3][0].id)
        : setCcBankSelected("");
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
              ? await cb(cData[0]?.dated)
              : await cb();
          })
          .catch(error => {
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
    setMonthYearSelected("");
    setTimeout(() => {
      setMonthYearSelected(monthYear);
    }, 1);
  };

  const onChangeCcYear = year => {
    // setCcChartData([]);
    setCcYearSelected(year);
  };

  const onChangeCcBank = bank => {
    // setCcChartData([]);
    setCcBankSelected(bank);
  };

  const onCcMonthYearSelected = monthYear => {
    setCcMonthYearSelected(monthYear);
  };

  const generateCreditCards = () => {
    setCcChartLoader(true);
    setCcChartData([]);
    setCcDetails([]);
    setCcMonthYearSelected(null);
    getCreditCardDetails(ccBankSelected)
      .then(res => {
        const data = res.data.response[0];
        setCcDetails(data);
        const sDate =
          typeof data !== "undefined"
            ? `${ccYearSelected - 1}-12-${data.credit_card_start_date}`
            : `${ccYearSelected - 1}-12-1`;
        const eDate =
          typeof data !== "undefined"
            ? `${ccYearSelected}-12-${data.credit_card_end_date}`
            : `${ccYearSelected}-12-31`;
        getCreditCardChartData(sDate, eDate, ccBankSelected)
          .then(res => {
            const data = res.data.response;
            const recentMonth =
              data.length > 0 ? new Date(data[0].month) : new Date();
            const recentDate = recentMonth.getDate();
            const lastCycleDate = new Date(eDate).getDate();
            const recMonth =
              recentDate > lastCycleDate
                ? helpers.addMonths(recentMonth, 1)
                : helpers.addMonths(recentMonth, 0);
            setCcChartData(data);
            setCcMonthYearSelected(helpers.dateToMonthYear(recMonth));
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
  /*
   * Query params landing feature
   */
  const searchParams = useQuery();
  const params = {
    fetch: searchParams.get("fetch"),
    date: searchParams.get("date"),
    bank: searchParams.get("bank"),
    card: searchParams.get("card"),
  };
  const [paramFetch, setParamFetch] = useState(false);

  useEffect(() => {
    if (
      yearList.length > 0 &&
      bankList.length > 0 &&
      params.fetch === "bankTransactions"
    ) {
      const paramYear = moment(params.date).format("YYYY").toString();
      setYearSelected(paramYear);
      setBankSelected(params.bank);
      setParamFetch(true);
    }
  }, [JSON.stringify(params), yearList, bankList]);

  useEffect(() => {
    if (yearSelected && bankSelected && paramFetch) {
      const paramMonthYear = moment(params.date).format("MMM-YYYY").toString();
      generateExpenses(false, () => {
        setMonthYearSelected(paramMonthYear);
        setParamFetch(false);
      });
    }
  }, [JSON.stringify(params), paramFetch, yearSelected, bankSelected]);

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
        ccYearSelected,
        ccYearList,
        setCcBankList,
        onChangeCcBank,
        onChangeCcYear,
        chartData,
        ccChartData,
        ccDetails,
        ccMonthYearSelected,
        onCcMonthYearSelected,
        insertData,
        setInsertData,
      }}
    >
      <ToastContainer className='bniToaster' />
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
              setToggleQueryBuilder(false);
            }}
            onYes={() => {
              setOpenQBModal(false);
              setToggleQueryBuilder(true);
            }}
            size='md'
            animation={false}
          />
        )}
        <div className='m-2'>
          <div
            className={`bg-gradient ${
              userContext.userData.theme === "dark"
                ? "bg-dark darkBoxShadow"
                : "bg-light lightBoxShadow"
            } mt-2 ps-3 py-2 rounded-pill mb-2`}
          >
            <div className='d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center'>
                <i className={`fa fa-cubes fa-1x`}></i>
                <div className='ps-2 mb-0'>
                  <FormattedMessage
                    id='moneyPlanner'
                    defaultMessage='moneyPlanner'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=''>
            <div className={`accountPlanner ${userContext.userData.theme}`}>
              {bankList.length > 0 &&
              yearList.length &&
              ccYearList.length > 0 &&
              ccBankList.length > 0 > 0 ? (
                <>
                  <div className='row py-2'>
                    <div className='col-md-12 d-grid gap-2 py-2'>
                      <button
                        className='btn btn-bni d-flex align-items-center justify-content-between'
                        onClick={() =>
                          setToggleCoreSettings(!toggleCoreSettings)
                        }
                      >
                        <FormattedMessage
                          id='coreSettings'
                          defaultMessage='coreSettings'
                        />
                        <i className={`fa fa-cog ps-2`} />
                      </button>
                    </div>
                    {toggleCoreSettings && (
                      <div className='col-md-12'>
                        <CreateModule />
                      </div>
                    )}
                  </div>
                  <div className='badge bni-bg bni-text'>
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
                    <div className='col-lg-1 col-sm-4 py-2 mb-2'>
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
                    <div className='col-lg-1 col-sm-4 py-2 mb-2'>
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
                    <div className='col-lg-1 col-sm-4 py-2 mb-2'>
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
                        // incExpList.length > 0 &&
                        // bankList.length > 0 &&
                        // monthYearSelected &&
                        bankDetails.length > 0 && <MonthExpenditureTable />
                      }
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='badge bni-bg bni-text'>
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
                          onClick={() => generateCreditCards()}
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
                      {ccChartData.length > 0 &&
                        ccBankSelected &&
                        ccMonthYearSelected && <TypeCreditCardExpenditure />}
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

AccountPlanner.propTypes = {
  property: PropTypes.string,
};
AccountPlanner.defaultProps = {
  property: "String name",
};

export default AccountPlanner;
