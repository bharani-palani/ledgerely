import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  Suspense,
} from "react";
import apiInstance from "../../../services/apiServices";
import { AccountContext } from "../../accountPlanner/AccountPlanner";
import { UserContext } from "../../../contexts/UserContext";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { FormattedMessage, useIntl } from "react-intl";
import moment from "moment";
import Loader from "../../resuable/Loader";
import RecentTransaction from "./RecentTransaction";
import BankHoldings from "./BankHoldings";
import TopTrendsBanking from "./TopTrendsBanking";
import TopTrendsCreditCard from "./TopTrendsCreditCard";
import { Dropdown } from "react-bootstrap";
import {
  BANK_HOLD,
  REC_TRX,
  TOP_BANKINGS,
  TOP_CREDIT_CARDS,
} from "./dashboardConstants";
import Switch from "react-switch";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../../resuable/SortableItem";

export const NoContent = ({ theme }) => (
  <div
    className={`dashboardCard d-flex align-items-center rounded border border-${
      theme === "dark" ? "secondary" : "1"
    }`}
  >
    <div className='text-center w-100'>
      <FormattedMessage
        id='noRecordsGenerated'
        defaultMessage='noRecordsGenerated'
      />
    </div>
  </div>
);

export const DraggerText = ({ children }) => {
  const userContext = useContext(UserContext);
  return (
    <div
      className={`badge ${
        userContext.userData.theme === "dark"
          ? "bg-secondary text-white"
          : "bg-light text-dark"
      }`}
      style={{ cursor: "grabbing" }}
    >
      <span className='pe-1'>:::</span>
      {children}
    </div>
  );
};

const Dashboard = props => {
  const ref = useRef(null);
  const intl = useIntl();
  const globalContext = useContext(GlobalContext);
  document.title = `${globalContext.appName} - ${intl.formatMessage({
    id: "dashboard",
    defaultMessage: "dashboard",
  })}`;
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
    { id: TOP_BANKINGS, intlHeader: "topBankingTrends", isActive: true },
    { id: TOP_CREDIT_CARDS, intlHeader: "topCreditCardTrends", isActive: true },
  ]);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

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
        <Loader />
      </div>
    );
  };

  useEffect(() => {
    if (userContext?.userConfig?.appId) {
      setLoader(true);
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
    }
  }, [userContext]);

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
          id: TOP_BANKINGS,
          component: TopTrendsBanking,
          props: {
            chartData: chartData.donutChartData,
            intlHeader: "topBankingTrends",
            theme: userContext.userData.theme,
          },
          order: 2,
        },
        {
          id: TOP_CREDIT_CARDS,
          component: TopTrendsCreditCard,
          props: {
            chartData: chartData.pieChartData,
            intlHeader: "topCreditCardTrends",
            theme: userContext.userData.theme,
          },
          order: 3,
        },
      ];
      setList(dashList);
      setFilteredList(dashList);
    }
  }, [
    loader,
    recentData,
    bankList,
    totalHoldings,
    ccOutstandingList,
    chartData,
    intl,
    userContext,
  ]);

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

    setFilteredList(newList);
  }, [list, dashFilterList]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onSortEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = filteredList.findIndex(({ id }) => id === active.id);
      const newIndex = filteredList.findIndex(({ id }) => id === over.id);
      const movedArray = arrayMove(filteredList, oldIndex, newIndex);
      setFilteredList(movedArray);
    }
  };

  return loader ? (
    <LoaderComp />
  ) : (
    <div className='mb-2 container-fluid' ref={ref}>
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
          <div className=''>
            <Dropdown
              show={isDropDownOpen}
              drop='end'
              onToggle={onToggleHandler}
            >
              <Dropdown.Toggle as='div' className='pe-2'>
                <i className={`fa fa-cog icon-bni cursor-pointer pe-1`} />
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
                      className='ps-2'
                      style={
                        filteredList.length === 1 && d.isActive
                          ? {
                              opacity: "0.25",
                              cursor: "not-allowed",
                            }
                          : { cursor: "pointer" }
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

      <Suspense fallback={<LoaderComp />}>
        {ref?.current?.clientWidth > 450 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onSortEnd}
          >
            <SortableContext
              items={filteredList}
              strategy={verticalListSortingStrategy}
            >
              {filteredList.map((l, i) => {
                const Component = l.component;
                return (
                  <SortableItem key={l.id} id={l.id}>
                    <Component index={i} {...l.props} />
                  </SortableItem>
                );
              })}
            </SortableContext>
          </DndContext>
        ) : (
          filteredList.map((l, i) => {
            const Component = l.component;
            return <Component key={l.id} index={i} {...l.props} />;
          })
        )}
      </Suspense>
    </div>
  );
};

export default Dashboard;
