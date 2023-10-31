import React, { useContext, useEffect, useState, useRef } from "react";
import apiInstance from "../../../services/apiServices";
import { AccountContext } from "../../accountPlanner/AccountPlanner";
import { UserContext } from "../../../contexts/UserContext";
import { FormattedMessage, useIntl } from "react-intl";
import moment from "moment";
import helpers from "../../../helpers";
import Loader from "react-loader-spinner";
import RecentTransaction from "./RecentTransaction";
import BankHoldings from "./BankHoldings";
import TopTrendsDonut from "./TopTrendsDonut";
import TopTrendsPie from "./TopTrendsPie";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { Dropdown } from "react-bootstrap";
import { BANK_HOLD, REC_TRX, TOP_DONUTS, TOP_PIES } from "./dashboardConstants";
import Switch from "react-switch";

export const NoContent = () => (
  <div className='dashboardCard bni-bg d-flex align-items-center rounded'>
    <div className='text-center w-100'>
      <FormattedMessage
        id='noRecordsGenerated'
        defaultMessage='noRecordsGenerated'
      />
    </div>
  </div>
);

export const DraggerText = ({ children }) => (
  <div className={`badge bni-bg bni-text`} style={{ cursor: "grabbing" }}>
    <span className='pe-1'>:::</span>
    {children}
  </div>
);

const Dashboard = props => {
  const ref = useRef(null);
  const intl = useIntl();
  const accountContext = useContext(AccountContext);
  const userContext = useContext(UserContext);
  const [bankList, setBankList] = useState([]);
  const [ccOutstandingList, setCcOutstandingList] = useState([]);
  const [totalHoldings, setTotalHoldings] = useState([]);
  const [topTrends, setTopTrends] = useState([]);
  const [topCcTrends, setTopCcTrends] = useState([]);
  const [chartData, setChartData] = useState({});
  const [recentData, setRecentData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dashFilterList, setDashFilterList] = useState([
    { id: BANK_HOLD, intlHeader: "bankHoldings", isActive: true },
    { id: REC_TRX, intlHeader: "recentTransactions", isActive: true },
    { id: TOP_DONUTS, intlHeader: "topTrendsDonutChart", isActive: true },
    { id: TOP_PIES, intlHeader: "topTrendsPieChart", isActive: true },
  ]);
  const [list, setList] = useState([]);
  const [filteredList, setfilteredList] = useState([]);

  const multiTotal = () => {
    const grouped = _.chain(bankList)
      .groupBy(item => `${item.Currency}{-}${item.Locale}`)
      .map((value, key) => ({
        currency: key.split("{-}")[0],
        locale: key.split("{-}")[1],
        data: value,
      }))
      .value();
    return grouped;
  };

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

  useEffect(() => {
    const holdingsFormdata = new FormData();
    holdingsFormdata.append("appId", userContext.userConfig.appId);
    const a = apiInstance.post(
      "/account_planner/getTotalHoldings",
      holdingsFormdata,
    );
    const topTrendsFormdata = new FormData();
    topTrendsFormdata.append("appId", userContext.userConfig.appId);
    topTrendsFormdata.append("month", moment().format("M"));
    topTrendsFormdata.append("year", moment().format("YYYY"));
    const b = apiInstance.post("/dashboard/topTrends", topTrendsFormdata);
    const c = apiInstance.post(
      "/dashboard/recentTransactions",
      holdingsFormdata,
    );
    const d = apiInstance.post("/dashboard/topCcTrends", topTrendsFormdata);
    Promise.all([a, b, c, d])
      .then(res => {
        setBankList(res[0].data.response.result.bankBalance);
        setCcOutstandingList(res[0].data.response.result.creditBalance);
        setTopTrends(res[1].data.response);
        setRecentData(res[2].data.response);
        setTopCcTrends(res[3].data.response);
      })
      .catch(() => {
        accountContext.renderToast({
          type: "error",
          icon: "fa fa-times-circle",
          message: intl.formatMessage({
            id: "unableToReachServer",
            defaultMessage: "unableToReachServer",
          }),
        });
      })
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    const mTotal = multiTotal();
    setTotalHoldings(mTotal);
  }, [bankList]);

  useEffect(() => {
    const donutChartData = Object.entries(topTrends).map(top => {
      return {
        key: intl.formatMessage({
          id: top[0],
          defaultMessage: top[0],
        }),
        data: top[1].map(d => ({ label: d.name, value: Number(d.total) })),
      };
    });

    const pieChartData = Object.entries(topCcTrends).map(top => ({
      key: intl.formatMessage({
        id: top[0],
        defaultMessage: top[0],
      }),
      data: top[1].map(d => ({ label: d.name, value: Number(d.total) })),
    }));
    setChartData({ donutChartData, pieChartData });
  }, [topTrends, topCcTrends, intl]);

  useEffect(() => {
    if (!loader) {
      const dashList = [
        {
          id: BANK_HOLD,
          component: BankHoldings,
          props: {
            bankList,
            totalHoldings,
            ccOutstandingList,
            intlHeader: "bankHoldings",
          },
          order: 0,
        },
        {
          id: REC_TRX,
          component: RecentTransaction,
          props: {
            recentData,
            width: ref.current.offsetWidth,
            intlHeader: "recentTransactions",
          },
          order: 1,
        },
        {
          id: TOP_DONUTS,
          component: TopTrendsDonut,
          props: {
            chartData: chartData.donutChartData,
            intlHeader: "topBankingTrends",
          },
          order: 2,
        },
        {
          id: TOP_PIES,
          component: TopTrendsPie,
          props: {
            chartData: chartData.pieChartData,
            intlHeader: "topCreditCardTrends",
          },
          order: 3,
        },
      ];
      setList(dashList);
      setfilteredList(dashList);
    }
  }, [
    loader,
    recentData,
    bankList,
    totalHoldings,
    ccOutstandingList,
    chartData,
    intl,
  ]);

  const SortableContainer = sortableContainer(({ children }) => {
    return <div className=''>{children}</div>;
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setfilteredList(prevState => {
      const newItems = [...prevState];
      newItems[newIndex].order = oldIndex;
      newItems[oldIndex].order = newIndex;
      return newItems.sort((a, b) => a.order - b.order);
    });
  };

  const onToggleHandler = (isOpen, e) => {
    if (e.source !== "select") {
      setIsDropDownOpen(isOpen);
    }
  };

  const onDashFilterChange = id => {
    const bFilter = dashFilterList.map(m => {
      if (m.id === id) {
        m.isActive = !m.isActive;
      }
      return m;
    });
    setDashFilterList(bFilter);
  };

  useEffect(() => {
    const filteredSelections = dashFilterList
      .filter(f => f.isActive)
      .map(m => m.id);
    const newList = [...list]
      .filter(f => filteredSelections.includes(f.id))
      .map((m, i) => ({ ...m, order: i }));

    setfilteredList(newList);
  }, [dashFilterList]);

  return loader ? (
    <LoaderComp />
  ) : (
    <div className='mb-2' ref={ref}>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-pie-chart fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='dashboard' defaultMessage='dashboard' />
            </div>
          </div>
          <div className='globalHeader'>
            <Dropdown
              show={isDropDownOpen}
              drop='end'
              onToggle={onToggleHandler}
            >
              <Dropdown.Toggle as='div' className='pe-2'>
                <i className={`fa fa-cog icon-bni cursor-pointer`} />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className={`mt-3 pe-3 ${
                  userContext.userData.theme === "dark"
                    ? "bg-dark text-white-50"
                    : "bg-white text-black"
                }`}
              >
                {dashFilterList.map((d, i) => (
                  <Dropdown.Item
                    key={i}
                    as='div'
                    className={`${
                      userContext.userData.theme === "dark"
                        ? "bg-dark text-white-50"
                        : "bg-white text-black"
                    }`}
                  >
                    <Switch
                      onColor={document.documentElement.style.getPropertyValue(
                        "--app-theme-bg-color",
                      )}
                      offColor={document.documentElement.style.getPropertyValue(
                        "--app-theme-color",
                      )}
                      offHandleColor={
                        userContext.userData.theme === "dark" ? "#555" : "#ddd"
                      }
                      onHandleColor={
                        userContext.userData.theme === "dark" ? "#555" : "#ddd"
                      }
                      handleDiameter={15}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      height={10}
                      width={30}
                      onChange={e => {
                        onDashFilterChange(d.id);
                      }}
                      checked={d.isActive}
                      disabled={filteredList.length === 1 && d.isActive}
                    />
                    <span
                      className='ps-2 cursor-pointer'
                      style={
                        filteredList.length === 1 && d.isActive
                          ? { textDecoration: "line-through" }
                          : {}
                      }
                      onClick={e => {
                        !(filteredList.length === 1 && d.isActive) &&
                          onDashFilterChange(d.id);
                      }}
                    >
                      {intl.formatMessage({
                        id: d.intlHeader,
                        defaultMessage: d.intlHeader,
                      })}
                    </span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {document.body.clientWidth > 450 ? (
        <SortableContainer onSortEnd={onSortEnd} lockAxis={"y"}>
          {filteredList.map((l, i) => {
            const Component = sortableElement(l.component);
            return <Component key={i} index={i} {...l.props} />;
          })}
        </SortableContainer>
      ) : (
        filteredList.map((l, i) => {
          const Component = l.component;
          return <Component key={i} index={i} {...l.props} />;
        })
      )}
    </div>
  );
};

export default Dashboard;
