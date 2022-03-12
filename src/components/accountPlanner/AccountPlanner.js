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
import AppContext from "../../contexts/AppContext";
import apiInstance from "../../services/apiServices";
import CheckCardCycleDate from "./CheckCardCycleDate";
import ConfirmQBModal from "./ConfirmQBModal";
import TotalHoldings from "./TotalHoldings";
import QueryBuilderAccordion from "./QueryBuilderAccordion";

const AccountPlanner = (props) => {
  const [appData] = useContext(AppContext);
  document.title = `${appData.web} | Account planner`;

  const [yearList, setYearList] = useState([]);
  const [ccYearList, setCcYearList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [ccChartData, setCcChartData] = useState([]);

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
  const [toggleTotalHoldings, setToggleTotalHoldings] = useState(false);

  const [openModal, setOpenModal] = useState(false); // change to false
  const [openFastShopModal, setOpenFastShopModal] = useState(false); // change to false
  const [openQBModal, setOpenQBModal] = useState(false); // change to false
  const [toggleQueryBuilder, setToggleQueryBuilder] = useState(false); // change to false

  const getCreditCardDetails = (bank) => {
    const formdata = new FormData();
    formdata.append("bank", bank);
    return apiInstance.post("/account_planner/credit_card_details", formdata);
  };

  const getIncExpChartData = (sDate, eDate, bank) => {
    const formdata = new FormData();
    formdata.append("startDate", sDate);
    formdata.append("endDate", eDate);
    formdata.append("bank", bank);
    return apiInstance.post("/account_planner/getIncExpChartData", formdata);
  };

  const getCreditCardChartData = (sDate, eDate, bank) => {
    const formdata = new FormData();
    formdata.append("startDate", sDate);
    formdata.append("endDate", eDate);
    formdata.append("bank", bank);
    return apiInstance.post(
      "/account_planner/getCreditCardChartData",
      formdata
    );
  };
  const getYearList = () => {
    return apiInstance
      .get("/account_planner/year_list")
      .then((res) => res.data.response)
      .catch((error) => {
        console.log(error);
      });
  };

  const getCcYearList = () => {
    return apiInstance
      .get("/account_planner/cc_year_list")
      .then((res) => res.data.response)
      .catch((error) => {
        console.log(error);
      });
  };

  const getBankList = () => {
    return apiInstance
      .get("/account_planner/bank_list")
      .then((res) => res.data.response)
      .catch((error) => {
        console.log(error);
      });
  };
  const getCcBankList = () => {
    return apiInstance
      .get("/account_planner/credit_card_list")
      .then((res) => res.data.response)
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const a = getYearList();
    const b = getBankList();
    const c = getCcYearList();
    const d = getCcBankList();
    Promise.all([a, b, c, d]).then((r) => {
      setYearList(r[0]);
      r[0][0].id && setYearSelected(r[0][0].id);
      r[1] && setBankList(r[1]);
      r[1][0].id && setBankSelected(r[1][0].id);
      r[2] && setCcYearList(r[2]);
      r[2][0].id && setCcYearSelected(r[2][0].id);
      r[3] && setCcBankList(r[3]);
      r[3][0].id && setCcBankSelected(r[3][0].id);
    });
  }, []);

  // useEffect(() => {
  //   generateExpenses();
  // }, [yearSelected, bankSelected]);

  const onChangeYear = (year) => {
    setChartData([]);
    setYearSelected(year);
    setMonthYearSelected("");
  };

  const onChangeBank = (bank) => {
    setChartData([]);
    setBankSelected(bank);
  };

  const generateExpenses = () => {
    setChartLoader(true);
    setChartData([]);
    const sDate = `${yearSelected}-01-01`;
    const eDate = `${yearSelected}-12-31`;
    getIncExpChartData(sDate, eDate, bankSelected)
      .then((res) => {
        setChartData(res.data.response);
      })
      .catch((error) => {
        setChartData([]);
        console.log(error);
      })
      .finally(() => {
        setChartLoader(false);
      });
  };

  const onMonthYearSelected = (monthYear) => {
      setMonthYearSelected(monthYear);
  };

  const onChangeCcYear = (year) => {
    setCcChartData([]);
    setCcYearSelected(year);
  };

  const onChangeCcBank = (bank) => {
    setCcChartData([]);
    setCcBankSelected(bank);
  };

  const onCcMonthYearSelected = (monthYear) => {
    setCcMonthYearSelected(monthYear);
  };

  const generateCreditCards = () => {
    setCcChartLoader(true);
    setCcChartData([]);
    setCcDetails([]);
    setCcMonthYearSelected(null);
    getCreditCardDetails(ccBankSelected)
      .then((res) => {
        const data = res.data.response[0];
        setCcDetails(data);
        const sDate = `${ccYearSelected - 1}-12-${data.credit_card_start_date}`;
        const eDate = `${ccYearSelected}-12-${data.credit_card_end_date}`;
        getCreditCardChartData(sDate, eDate, ccBankSelected)
          .then((res) => {
            let data = res.data.response;
            let recentMonth = new Date(data[0].month);
            const recentDate = recentMonth.getDate();
            const lastCycleDate = new Date(eDate).getDate();
            const recMonth =
              recentDate > lastCycleDate
                ? helpers.addMonths(recentMonth, 1)
                : helpers.addMonths(recentMonth, 0);
            setCcChartData(data);
            setCcMonthYearSelected(helpers.dateToMonthYear(recMonth));
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setCcChartLoader(false);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loaderComp = () => {
    return (
      <div className="relativeSpinner">
        <Loader
          type={helpers.LoadRandomSpinnerIcon()}
          color={helpers.fluorescentColor}
          height={100}
          width={100}
        />
      </div>
    );
  };

  const onToggleQueryBuilder = () => {
    const bool = localStorage.getItem("query");
    if (bool) {
      setToggleQueryBuilder(!toggleQueryBuilder);
    } else {
      setOpenQBModal(true);
    }
  };

  return (
    <section className="bg-dark text-white" style={{ minHeight: "100vh" }}>
      {openModal && (
        <CheckCardCycleDate
          show={openModal}
          onHide={() => setOpenModal(false)}
          size="sm"
          animation={false}
        />
      )}
      {openFastShopModal && (
        <FastShopping
          className="accountPlanner fastShopping"
          show={openFastShopModal}
          onHide={() => setOpenFastShopModal(false)}
          size="sm"
          animation={false}
        />
      )}
      {openQBModal && (
        <ConfirmQBModal
          className="confirmQBModal"
          show={openQBModal}
          onHide={() => {
            setOpenQBModal(false);
            setToggleQueryBuilder(false);
          }}
          onYes={() => {
            setOpenQBModal(false);
            setToggleQueryBuilder(true);
          }}
          size="md"
          animation={false}
        />
      )}
      <div className="pt-5">
        <div className="pt-4">
          <div className="text-center">
            <h2 className="">Money planner</h2>
            <hr className="hr" />
            <i className={`fa fa-${appData.currency === "INR" ? "inr" : "usd"} fa-5x py-3`}></i>
            <p className="p-10">
              Plan / handle income, expense and credit card transactions with
              analysis & visualizationss
            </p>
          </div>
        </div>
        <div className="container-fluid">
          <div className="accountPlanner">
            {bankList.length > 0 &&
            yearList.length &&
            ccYearList.length > 0 &&
            ccBankList.length > 0 > 0 ? (
              <>
                <div className="row py-2">
                  <div className="col-md-4 d-grid gap-2 py-2">
                    <button
                      className="btn btn-bni d-flex align-items-center justify-content-between"
                      onClick={() => setToggleCoreSettings(!toggleCoreSettings)}
                    >
                      Core Settings
                      <i className={`fa fa-cog ps-2`} />
                    </button>
                  </div>
                  <div className="col-md-4 d-grid gap-2 py-2">
                    <button
                      className="btn btn-bni d-flex align-items-center justify-content-between ps-2"
                      onClick={() =>
                        setToggleTotalHoldings(!toggleTotalHoldings)
                      }
                    >
                      Total Holdings
                      <i className={`fa fa-cubes ps-2`} />
                    </button>
                  </div>
                  <div className="col-md-4 d-grid gap-2 py-2">
                    <button
                      className="btn btn-bni d-flex align-items-center justify-content-between"
                      onClick={() => onToggleQueryBuilder()}
                    >
                      Query Builder
                      <i className={`fa fa-database ps-2`} />
                    </button>
                  </div>
                  {toggleCoreSettings && (
                    <div className="col-md-12">
                      <CreateModule />
                    </div>
                  )}
                  {toggleTotalHoldings && (
                    <div className="col-md-12">
                      <TotalHoldings />
                    </div>
                  )}
                  {toggleQueryBuilder && (
                    <div className="col-md-12">
                      <div>
                        <QueryBuilderAccordion />
                      </div>
                    </div>
                  )}
                </div>
                <div className="h5">Bank Transactions</div>
                <div className="row mt-10">
                  <div className="col-md-4 py-2">
                    <SetBank
                      bankList={bankList}
                      onSelectBank={(bank) => onChangeBank(bank)}
                      title={"Select Bank"}
                    />
                  </div>
                  
                  <div className="col-md-4 py-2">
                    <SetYear
                      yearList={yearList}
                      onSelectYear={(year) => onChangeYear(year)}
                      title={"Select Year"}
                    />
                  </div>
                  <div className="col-md-3 py-2">
                      <div className="d-grid gap-2">
                        <button
                          onClick={() => generateExpenses()}
                          className="btn btn-bni"
                        >
                          Generate
                        </button>
                      </div>
                  </div>
                  <div className="col-md-1 py-2 mb-2 d-flex align-items-end">
                    <i
                      onClick={() => setOpenFastShopModal(true)}
                      className="fa fa-cart-plus roundedButton"
                    />
                  </div>
                </div>
                <div className="x-scroll">
                  {chartLoader ? (
                    loaderComp()
                  ) : (
                    <IncExpChart
                      chartData={chartData}
                      onMonthYearSelected={onMonthYearSelected}
                    />
                  )}
                </div>
                <div className="row">
                  <div className="col-md-12 b-0 mb-10 pr-0 pl-0">
                    {chartData.length > 0 &&
                      bankSelected &&
                      monthYearSelected &&
                        <MonthExpenditureTable
                          bankSelected={bankSelected}
                          monthYearSelected={monthYearSelected}
                        />
                      }
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="h5">Credit Card Transactions</div>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-md-4 py-2">
                    <SetCcBank
                      ccBankList={ccBankList}
                      onSelectCcBank={(bank) => onChangeCcBank(bank)}
                      title={"Select Card"}
                    />
                  </div>
                  <div className="col-md-4 py-2">
                    <SetCcYear
                      ccYearList={ccYearList}
                      onSelectCcYear={(year) => onChangeCcYear(year)}
                      title={"Select Year"}
                    />
                  </div>
                  <div className="col-md-3 py-2">
                    <div className="d-grid gap-2">
                      <button
                        onClick={() => generateCreditCards()}
                        className="btn btn-bni"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                  <div className="col-md-1 py-2">
                    <i
                      onClick={() => setOpenModal(true)}
                      className="fa fa-calendar-o roundedButton mt-20"
                    />
                  </div>
                </div>
                <div className="x-scroll py-2">
                  {ccChartLoader ? (
                    loaderComp()
                  ) : ccChartData && ccChartData.length > 0 ? (
                    <div className="d-flex align-items-center">
                    <CreditCardChart
                      ccChartData={ccChartData}
                      onCcMonthYearSelected={onCcMonthYearSelected}
                      ccDetails={ccDetails}
                      ccYearSelected={ccYearSelected}
                      ccMonthYearSelected={ccMonthYearSelected}
                    />
                    </div>
                  ) : (
                    <div className="py-3 text-center">
                      No Records Generated
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-12 pt-2">
                    {ccChartData.length > 0 &&
                      ccBankSelected &&
                      // new Date(ccMonthYearSelected) instanceof Date &&
                      // !isNaN(new Date(ccMonthYearSelected)) && (
                      ccMonthYearSelected && (
                        <TypeCreditCardExpenditure
                          ccMonthYearSelected={ccMonthYearSelected}
                          ccBankSelected={ccBankSelected}
                          ccDetails={ccDetails}
                        />
                      )}
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
  );
};

AccountPlanner.propTypes = {
  property: PropTypes.string,
};
AccountPlanner.defaultProps = {
  property: "String name",
};

export default AccountPlanner;
