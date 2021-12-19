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
import "./AccountPlanner.scss";
import AppContext from "../../contexts/AppContext";
import apiInstance from "../../services/apiServices";
import CheckCardCycleDate from "./CheckCardCycleDate";
import ConfirmQBModal from "./ConfirmQBModal";
import TotalHoldings from "./TotalHoldings";
import QueryBuilderAccordion from "./QueryBuilderAccordion";

const AccountPlanner = (props) => {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | Account planner`;

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
    <section className="section lb" style={{ minHeight: window.screen.height }}>
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
          className="fastShopping"
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
      <div className="section-title">
        <div className="process-box">
          <div className="process-front text-center">
            <h2 className="grey-color">Account planner</h2>
            <hr />
            <i className="fa fa-credit-card-alt"></i>
            <p className="p-10">
              Plan and handle income, expense and credit card transactions with
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
                <div className="row">
                  <div className="col-md-4 m-reduce-padding mb-15">
                    <button
                      className="btn btn-bni sm btn-block"
                      onClick={() => setToggleCoreSettings(!toggleCoreSettings)}
                    >
                      Core Settings
                      <i className={`fa fa-cog pull-right`} />
                    </button>
                  </div>
                  <div className="col-md-4 m-reduce-padding mb-15">
                    <button
                      className="btn btn-bni sm btn-block"
                      onClick={() =>
                        setToggleTotalHoldings(!toggleTotalHoldings)
                      }
                    >
                      Total Holdings
                      <i className={`fa fa-cubes pull-right`} />
                    </button>
                  </div>
                  <div className="col-md-4 m-reduce-padding">
                    <button
                      className="btn btn-bni sm btn-block"
                      onClick={() => onToggleQueryBuilder()}
                    >
                      Query Builder
                      <i className={`fa fa-database pull-right`} />
                    </button>
                  </div>
                  {toggleCoreSettings && (
                    <div className="col-md-12 m-reduce-padding">
                      <CreateModule />
                    </div>
                  )}
                  {toggleTotalHoldings && (
                    <div className="col-md-12 m-reduce-padding">
                      <TotalHoldings />
                    </div>
                  )}
                  {toggleQueryBuilder && (
                    <div className="col-md-12 m-reduce-padding">
                      <div>
                        <QueryBuilderAccordion />
                      </div>
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-12 m-reduce-padding">
                    <div className="headLine">Bank Transactions</div>
                  </div>
                </div>
                <div className="row mt-10">
                  <div className="col-md-4 m-reduce-padding">
                    <span>Select Bank</span>
                    <SetBank
                      bankList={bankList}
                      onSelectBank={(bank) => onChangeBank(bank)}
                    />
                  </div>
                  <div className="col-md-4 m-reduce-padding">
                    <SetYear
                      yearList={yearList}
                      onSelectYear={(year) => onChangeYear(year)}
                    />
                  </div>
                  <div className="col-md-3 m-reduce-padding">
                    <span>&nbsp;</span>
                    <button
                      onClick={() => generateExpenses()}
                      className="btn btn-bni btn-block sm"
                    >
                      Generate
                    </button>
                  </div>
                  <div className="col-md-1 m-reduce-padding">
                    <i
                      onClick={() => setOpenFastShopModal(true)}
                      className="fa fa-cart-plus roundedButton mt-20"
                    />
                  </div>
                </div>
                <div className="flex bigWidth m-reduce-padding">
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
                  <div className="col-md-12 m-reduce-padding">
                    <div className="headLine">Credit Card Transactions</div>
                  </div>
                </div>
                <div className="row mt-10">
                  <div className="col-md-4 m-reduce-padding">
                    <SetCcBank
                      ccBankList={ccBankList}
                      onSelectCcBank={(bank) => onChangeCcBank(bank)}
                    />
                  </div>
                  <div className="col-md-4 m-reduce-padding">
                    <SetCcYear
                      ccYearList={ccYearList}
                      onSelectCcYear={(year) => onChangeCcYear(year)}
                    />
                  </div>
                  <div className="col-md-3 m-reduce-padding">
                    <span>&nbsp;</span>
                    <button
                      onClick={() => generateCreditCards()}
                      className="btn btn-bni btn-block sm"
                    >
                      Generate
                    </button>
                  </div>
                  <div className="col-md-1 m-reduce-padding">
                    <i
                      onClick={() => setOpenModal(true)}
                      className="fa fa-calendar-o roundedButton mt-20"
                    />
                  </div>
                </div>
                <div className="flex bigWidth m-reduce-padding">
                  {ccChartLoader ? (
                    loaderComp()
                  ) : ccChartData && ccChartData.length > 0 ? (
                    <CreditCardChart
                      ccChartData={ccChartData}
                      onCcMonthYearSelected={onCcMonthYearSelected}
                      ccDetails={ccDetails}
                      ccYearSelected={ccYearSelected}
                      ccMonthYearSelected={ccMonthYearSelected}
                    />
                  ) : (
                    <div className="noRecords text-center block mt-10">
                      No Records Generated
                    </div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-12 m-reduce-padding">
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
