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
    <span className='ps-1'>:::</span>
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
  const [chartData, setChartData] = useState({});
  const [recentData, setRecentData] = useState([]);
  const [loader, setLoader] = useState(true);

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
    Promise.all([a, b, c])
      .then(res => {
        setBankList(res[0].data.response.result.bankBalance);
        setCcOutstandingList(res[0].data.response.result.creditBalance);
        setTopTrends(res[1].data.response);
        setRecentData(res[2].data.response);
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

    const pieChartData = Object.entries(topTrends).map(top => ({
      key: intl.formatMessage({
        id: top[0],
        defaultMessage: top[0],
      }),
      data: top[1].map(d => ({ label: d.name, value: Number(d.total) })),
    }));
    setChartData({ donutChartData, pieChartData });
  }, [topTrends, intl]);

  const [list, setList] = useState([]);

  useEffect(() => {
    const nList = [
      {
        component: BankHoldings,
        props: { bankList, totalHoldings, ccOutstandingList },
        order: 0,
      },
      {
        component: RecentTransaction,
        props: { loader, recentData, intl },
        order: 1,
      },
      {
        component: TopTrendsDonut,
        props: { chartData: chartData.donutChartData },
        order: 2,
      },
      {
        component: TopTrendsPie,
        props: { chartData: chartData.pieChartData },
        order: 3,
      },
    ];
    setList(nList);
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
    setList(prevState => {
      const newItems = [...prevState];
      newItems[newIndex].order = oldIndex;
      newItems[oldIndex].order = newIndex;
      return newItems.sort((a, b) => a.order - b.order);
    });
  };

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
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-pie-chart fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='dashboard' defaultMessage='dashboard' />
            </div>
          </div>
        </div>
      </div>
      {document.body.clientWidth > 450 ? (
        <SortableContainer onSortEnd={onSortEnd}>
          {list.map((l, i) => {
            const Component = sortableElement(l.component);
            return <Component key={i} index={i} {...l.props} />;
          })}
        </SortableContainer>
      ) : (
        list.map((l, i) => {
          const Component = l.component;
          return <Component key={i} index={i} {...l.props} />;
        })
      )}
    </div>
  );
};

export default Dashboard;
