import React, { useState, useEffect, useRef, useContext } from "react";
import DonutChart from "react-donut-chart";
import helpers from "../../helpers";
import moment from "moment";
import LineChart from "react-linechart";
import { FormattedMessage, injectIntl } from "react-intl";
import { LocaleContext } from "../../contexts/LocaleContext";
import { AccountContext } from "./AccountPlanner";
import { UserContext } from "../../contexts/UserContext";
import { Row, Col } from "react-bootstrap";

// https://www.npmjs.com/package/react-donut-chart

const IncExpChart = props => {
  const { intl } = props;
  const accountContext = useContext(AccountContext);
  const { chartData, bankDetails, onMonthYearSelected, monthYearSelected } =
    accountContext;
  const localeContext = useContext(LocaleContext);
  const userContext = useContext(UserContext);
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [width, setWidth] = useState(0);
  const [metrics, setMetrics] = useState({});
  const height = 250;
  const creditLineColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--bs-indigo");
  const incomeLineColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--bs-pink");

  const svgWrapperId = "debit-card-income";

  useEffect(() => {
    setWidth(ref.current.clientWidth);
  }, []);

  useEffect(() => {
    const massageData = ({ category, total, dated }) => ({
      month: dated,
      label: helpers.shorten(category, 15),
      value: Number(total),
      isEmpty: Number(total) <= 0,
    });

    const Ddata = chartData.category.map(cd => {
      const obj = {
        month: cd.month,
        cData:
          cd?.data?.expense?.length > 0
            ? cd.data.expense.map(ex =>
                massageData({
                  category: ex.category,
                  total: ex.total,
                  dated: cd.month,
                }),
              )
            : [massageData({ category: "No Data", total: 0, dated: null })],
        creditData:
          cd?.data?.income?.length > 0
            ? cd.data.income.map(ex =>
                massageData({
                  category: ex.category,
                  total: ex.total,
                  dated: cd.month,
                }),
              )
            : [massageData({ category: "No Data", total: 0, dated: null })],
      };
      return obj;
    });
    setData(Ddata);

    const lChart = [
      {
        color: creditLineColor,
        points: chartData.income.map(
          ({
            month,
            measureDate,
            monthStart,
            monthEnd,
            totalIncome,
            metricIncome,
          }) => ({
            month,
            x: monthStart,
            z: monthEnd,
            y: totalIncome,
            metricTotal: metricIncome,
            measureDate: new Date(measureDate),
          }),
        ),
      },
      {
        color: incomeLineColor,
        points: chartData.income.map(
          ({ month, monthStart, monthEnd, metricIncome }) => ({
            month,
            x: monthStart,
            z: monthEnd,
            y: metricIncome,
          }),
        ),
      },
    ];

    setLineChartData([]);
    const filt = lChart[1].points.filter(f => f.y !== 0);
    const start = new Date(filt[filt.length - 1]?.x);
    const end = new Date(filt[0]?.z);
    const weekNumber = getWeekNumber(start, end);

    setTimeout(() => {
      setLineChartData(lChart);
      const total = lChart[0].points.reduce((a, b) => a + b.metricTotal, 0);
      const hourly = helpers.countryCurrencyLacSeperator(
        bankDetails[0].bank_locale,
        bankDetails[0].bank_currency,
        total / (5 * 8 * weekNumber) || 0,
        2,
      );
      const daily = helpers.countryCurrencyLacSeperator(
        bankDetails[0].bank_locale,
        bankDetails[0].bank_currency,
        total / (5 * weekNumber) || 0,
        2,
      );

      const weekly = helpers.countryCurrencyLacSeperator(
        bankDetails[0].bank_locale,
        bankDetails[0].bank_currency,
        total / weekNumber || 0,
        2,
      );

      setMetrics({ hourly, daily, weekly });
      if (ref.current?.childNodes[2]?.childNodes[0]) {
        ref.current.childNodes[2].childNodes[0].style.height = height + 10;
      }
    }, 1);
  }, [chartData, localeContext]);

  useEffect(() => {
    if (lineChartData.length > 0 && data.length > 0) {
      const onXClick = e => {
        const value = e.target.id;
        onMonthYearSelected(value);
      };

      const xAxisElement = ref.current
        ?.querySelector(`#${svgWrapperId} svg`)
        ?.getElementsByClassName("axis")[0].children;

      const ticks =
        xAxisElement &&
        Array.from(xAxisElement)
          ?.filter(t => t.classList.contains("tick"))
          .reverse();
      const points = [...lineChartData[1].points];
      for (let i = 0; i < ticks.length; i++) {
        ticks[i].children[1].classList.remove("colored");
        ticks[i].children[1].setAttribute("id", points[i].month);
        ticks[i].children[1].addEventListener("click", onXClick);
      }

      if (monthYearSelected) {
        const g =
          ticks &&
          Array.from(ticks)?.filter(
            t => t.children[1].id === monthYearSelected,
          )[0];

        if (g) g.getElementsByTagName("text")[0].classList.add("colored");
      }

      return () => {
        for (let i = 0; i < ticks.length; i++) {
          ticks[i].children[1].removeEventListener("click", onXClick);
        }
      };
    }
  }, [monthYearSelected, lineChartData, data]);

  const getWeekNumber = (start, end) => {
    const days = Math.floor((end - start) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    return weekNumber || 1;
  };

  // Interface type
  // {dated: "Dec-2020", total: "0.00", category: "Bike petrol"}
  // cData = { label: "Mobile bill", value: 120 },

  const genId = i => `chart-${i}`;
  const colors = helpers.donutChartColors;

  const getMonthString = r => {
    let date = "";
    if (width > 450) {
      date = moment(r).format("MMM");
      const first = date
        .toLocaleString("default", { month: "short" })
        .toLowerCase();
      const last = r.getFullYear();
      date = `${intl.formatMessage({
        id: first,
        defaultMessage: first,
      })} ${last}`;
    } else {
      date = moment(r).format("M");
    }
    return date;
  };

  const getTotalIncome = data => {
    let total = data.reduce((a, b) => a + b.metricTotal, 0);
    total = helpers.countryCurrencyLacSeperator(
      bankDetails[0].bank_locale,
      bankDetails[0].bank_currency,
      total,
      2,
    );
    return total;
  };

  const getMinMax = (data, type) => {
    let total = isFinite(Math[type](...data)) ? Math[type](...data) : 0;
    total = helpers.countryCurrencyLacSeperator(
      bankDetails[0].bank_locale,
      bankDetails[0].bank_currency,
      total,
      2,
    );
    return total;
  };

  const Metric = ({ i18Key, value }) => (
    <div className='position-relative small py-4'>
      {intl.formatMessage({ id: i18Key, defaultMessage: i18Key })}
      <span
        title={value}
        className='position-absolute top-0 start-50 translate-middle rounded-pill bni-bg bni-text w-100 py-2 text-break'
      >
        {value}
      </span>
    </div>
  );
  return (
    <>
      <div ref={ref}>
        {lineChartData.length > 0 && data.length > 0 && (
          <>
            <div className='badge bni-bg bni-text'>
              <FormattedMessage
                id='incomeMetrics'
                defaultMessage='incomeMetrics'
              />
            </div>
            <Row className='mt-3'>
              <Col lg={2} sm={4} xs={6} className='py-2 text-center'>
                <Metric
                  i18Key='total'
                  value={getTotalIncome(lineChartData[0].points)}
                />
              </Col>
              <Col lg={2} sm={4} xs={6} className='py-2 text-center'>
                <Metric
                  i18Key='highest'
                  value={getMinMax(
                    lineChartData[0].points
                      .filter(f => f.metricTotal !== 0)
                      .map(v => v.metricTotal),
                    "max",
                  )}
                />
              </Col>
              <Col lg={2} sm={4} xs={6} className='py-2 text-center'>
                <Metric
                  i18Key='lowest'
                  value={getMinMax(
                    lineChartData[0].points
                      .filter(f => f.metricTotal !== 0)
                      .map(v => v.metricTotal),
                    "min",
                  )}
                />
              </Col>
              <Col lg={2} sm={4} xs={6} className='py-2 text-center'>
                <Metric i18Key='weekly' value={metrics.weekly} />
              </Col>
              <Col lg={2} sm={4} xs={6} className='py-2 text-center'>
                <Metric i18Key='daily' value={metrics.daily} />
              </Col>
              <Col lg={2} sm={4} xs={6} className='py-2 text-center'>
                <Metric i18Key='hourly' value={metrics.hourly} />
              </Col>
            </Row>
            <div className='d-flex justify-content-between'>
              <div>
                <span>
                  <i
                    style={{ color: creditLineColor }}
                    className='fa fa-circle me-2'
                    title={intl.formatMessage({
                      id: "credit",
                      defaultMessage: "credit",
                    })}
                  />
                  {intl.formatMessage({
                    id: "credit",
                    defaultMessage: "credit",
                  })}
                </span>
              </div>
              <div className='fst-italic text-wrap'>
                <sup className='text-danger'>*</sup>
                {intl.formatMessage({
                  id: "CreditInclusiveIncome",
                  defaultMessage: "CreditInclusiveIncome",
                })}
              </div>
              <div>
                <span>
                  <i
                    style={{ color: incomeLineColor }}
                    className='fa fa-circle me-2'
                    title={intl.formatMessage({
                      id: "income",
                      defaultMessage: "income",
                    })}
                  />
                  {intl.formatMessage({
                    id: "income",
                    defaultMessage: "income",
                  })}
                </span>
              </div>
            </div>
            <LineChart
              data={lineChartData}
              id={svgWrapperId}
              margins={{
                top: 50,
                right: width > 450 ? 80 : 30,
                bottom: 50,
                left: 135,
              }}
              width={width}
              isDate={true}
              height={height}
              xLabel={intl.formatMessage({
                id: "month",
                defaultMessage: "month",
              })}
              yLabel={`${intl.formatMessage({
                id: "credit",
                defaultMessage: "credit",
              })} & ${intl.formatMessage({
                id: "income",
                defaultMessage: "income",
              })}`}
              onPointHover={d =>
                helpers.countryCurrencyLacSeperator(
                  bankDetails[0].bank_locale,
                  bankDetails[0].bank_currency,
                  d.y,
                  2,
                )
              }
              tooltipClass={`line-chart-tooltip`}
              ticks={data.length}
              xDisplay={(r, i) => {
                return getMonthString(r);
              }}
              onPointClick={(e, c) => {
                onMonthYearSelected(c.month);
              }}
            />
          </>
        )}
      </div>
      <div className='x-scroll'>
        {data.length > 0 && (
          <div className='d-flex align-items-center pt-2 ps-3'>
            {data.map((d, i) => (
              <div className='chartWrapper' key={genId(i)}>
                <div className='text-center pt-10 pb-10'>
                  <button
                    className={`btn btn-sm btn-bni ${
                      String(monthYearSelected) === String(d.month)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      onMonthYearSelected(d.month);
                    }}
                  >
                    {`${intl.formatMessage({
                      id: d.month.split("-")[0].toLowerCase(),
                      defaultMessage: d.month.split("-")[0].toLowerCase(),
                    })} ${d.month.split("-")[1]}`}
                  </button>
                </div>
                <div className='floatingChartWrapper'>
                  {i < 1 && (
                    <div className='floatingChartHeader btn btn-sm btn-bni'>
                      <FormattedMessage id='expense' defaultMessage='expense' />
                    </div>
                  )}
                  <DonutChart
                    strokeColor={`${
                      userContext.userData.theme === "dark" ? "#000" : "#eee"
                    }`}
                    innerRadius={0.7}
                    outerRadius={0.9}
                    clickToggle={true}
                    colors={colors}
                    height={220}
                    width={220}
                    legend={false}
                    data={d.cData}
                    formatValues={(values, total) =>
                      `${helpers.countryCurrencyLacSeperator(
                        bankDetails[0].bank_locale,
                        bankDetails[0].bank_currency,
                        values,
                        2,
                      )}`
                    }
                  />
                </div>
                <div className='floatingChartWrapper'>
                  {i < 1 && (
                    <div className='floatingChartHeader btn btn-sm btn-bni'>
                      <FormattedMessage id='income' defaultMessage='income' />
                    </div>
                  )}
                  <DonutChart
                    strokeColor={`${
                      userContext.userData.theme === "dark" ? "#000" : "#eee"
                    }`}
                    innerRadius={0.7}
                    outerRadius={0.9}
                    clickToggle={true}
                    colors={colors}
                    height={220}
                    width={220}
                    legend={false}
                    data={d.creditData}
                    formatValues={(values, total) =>
                      `${helpers.countryCurrencyLacSeperator(
                        bankDetails[0].bank_locale,
                        bankDetails[0].bank_currency,
                        values,
                        2,
                      )}`
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default injectIntl(IncExpChart);
