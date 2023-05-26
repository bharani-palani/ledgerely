import React, { useState, useEffect, useRef, useContext } from 'react';
import DonutChart from 'react-donut-chart';
import helpers from '../../helpers';
import moment from 'moment';
import LineChart from 'react-linechart';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LocaleContext } from '../../contexts/LocaleContext';
import { AccountContext } from './AccountPlanner';
import { Row, Col } from 'react-bootstrap';

// https://www.npmjs.com/package/react-donut-chart

const IncExpChart = props => {
  const { intl } = props;
  const accountContext = useContext(AccountContext);
  const {chartData, incExpList, bankDetails, onMonthYearSelected, monthYearSelected} = accountContext;
  const localeContext = useContext(LocaleContext);
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [width, setWidth] = useState(0);
  const [metrics, setMetrics] = useState({});
  const height = 250;
  const [, setNoRecords] = useState(false);
  const incomeLineColor = getComputedStyle(document.documentElement).getPropertyValue('--app-theme-bg-color');
  const svgWrapperId = "debit-card-income";

  useEffect(() => {
    setWidth(ref.current.clientWidth);
  }, []);

  useEffect(() => {
    let monthArray = chartData.map(d => String(d.dated));
    monthArray = [...new Set(monthArray)];

    const massageData = ({ category, total, dated }) => ({
      month: dated,
      label: category,
      value: Number(total),
      isEmpty: Number(total) <= 0,
    });

    const Ddata = monthArray.map(m => {
      let debitData = chartData
        .filter(cd => String(cd.dated) === String(m) && cd.type === 'Dr')
        .map(data => massageData(data));
      debitData =
        debitData.length === 0
          ? [massageData({ category: 'No Data', total: 0, dated: null })]
          : debitData;

      let creditData = chartData
        .filter(cd => String(cd.dated) === String(m) && cd.type === 'Cr')
        .map(data => massageData(data));
      creditData =
        creditData.length === 0
          ? [massageData({ category: 'No Data', total: 0, dated: null })]
          : creditData;

      const obj = {
        month: m,
        cData: debitData,
        creditData,
      };
      return obj;
    });

    setData(Ddata);

    if (Ddata.length > 0) {
      onMonthYearSelected(Ddata[0].month);
    } else {
      setNoRecords(true);
    }
    const calDaysInMonth = (str, index) => {
      const isThisMonth = moment().isSame(str, 'month');
      const daysInMonth = index !== 0 ? 1 : moment(str).daysInMonth();
      const daysInMonthDateObject = moment(`${str.split("-")[0]}-${str.split("-")[1]}-${daysInMonth}`).toDate();
      const date = isThisMonth ? new Date() : daysInMonthDateObject;
      return date;
    };
    const yyyy = accountContext.yearSelected;
    const lChart = [{
      color: incomeLineColor,
      points: helpers.threeDigitMonthNames.map(mmm => {
        const row = chartData.filter(c => c.type === "Cr" && c.dated.split("-")[0].includes(mmm) )
        return {
          month: moment(`${mmm}-${yyyy}`).format('MMM-YYYY'),
          x: moment(`${mmm}-${yyyy}`).format('YYYY-MM-DD'),
          y: row.length > 0 ? row.reduce((acc, cur) => Number((Number(acc) + Number(cur.total)).toFixed(2)),0) : 0,
          metricTotal: row
          .filter(c => (
            incExpList.filter(f => f.isMetric === '1').map(m => m.value)
            .includes(c.category))
          )
          .reduce((a,b) => (Number(a) + Number(b.total)),0),
          measureDate: calDaysInMonth(moment(`${mmm}-${yyyy}`).format('YYYY-MM-DD'), 1),
        }
      })
    }];

    setLineChartData([]);
    const filt = lChart[0].points.filter(f => f.y !== 0);
    const end = filt[filt.length - 1]?.measureDate;
    const start = filt[0]?.measureDate;
    const weekNumber = getWeekNumber(start, end);

    setTimeout(() => {
      setLineChartData(lChart);
      const total = lChart[0].points.reduce((a, b) => (a + b.metricTotal), 0);
      const hourly = helpers.countryCurrencyLacSeperator(
        bankDetails[0].bank_locale,
        bankDetails[0].bank_currency,
        total / (5 * 8 * weekNumber),
        2
      );
      const daily = helpers.countryCurrencyLacSeperator(
        bankDetails[0].bank_locale,
        bankDetails[0].bank_currency,
        total / (5 * weekNumber),
        2
      );

      const weekly = helpers.countryCurrencyLacSeperator(
        bankDetails[0].bank_locale,
        bankDetails[0].bank_currency,
        total / (weekNumber),
        2
      );
      setMetrics({ hourly, daily, weekly })

      if (ref.current?.childNodes[2]?.childNodes[0]) {
        ref.current.childNodes[2].childNodes[0].style.height = height + 10;
      }
      
    }, 1);
  }, [chartData, intl, localeContext, incExpList]);

  useEffect(() => {
    if(lineChartData.length > 0 && data.length > 0) {
      const onXClick = (e) => {
        const value = e.target.id;
        onMonthYearSelected(value)
      }

      const xAxisElement = ref.current
      ?.querySelector(`#${svgWrapperId} svg`)
      ?.getElementsByClassName('axis')[0].children;
  
      const ticks = xAxisElement && Array.from(xAxisElement)
        ?.filter(t => t.classList.contains("tick"));

      for (let i = 0; i < ticks.length; i++) {
        ticks[i].children[1].classList.remove('colored');
        ticks[i].children[1].setAttribute('id', lineChartData[0].points[i].month);
        ticks[i].children[1].addEventListener('click', onXClick);    
      }

      if(monthYearSelected) {
        const g = ticks && Array.from(ticks)
          ?.filter(t => t.children[1].id === monthYearSelected)[0]
  
        if(g) g.getElementsByTagName('text')[0].classList.add('colored');
      }

      return () => {
        for (let i = 0; i < ticks.length; i++) {
          ticks[i].children[1].removeEventListener('click', onXClick);    
        }
      }
    }
  },[monthYearSelected, lineChartData, data])

  const getWeekNumber = (start, end) => {
    const days = Math.floor((end - start) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
  };

  // Interface type
  // {dated: "Dec-2020", total: "0.00", category: "Bike petrol"}
  // cData = { label: "Mobile bill", value: 120 },

  const genId = i => `chart-${i}`;
  const colors = helpers.donutChartColors;

  const getMonthString = (r) => {
    let date = "";
    if (width > 400) {
      date = moment(r).format('MMM');;
      const first = date.toLocaleString('default', { month: "short" }).toLowerCase();
      const last = r.getFullYear();
      date = `${intl.formatMessage({ id: first })} ${last}`
    } else {
      date = moment(r).format('M');
    }
    return date;
  }

  const getTotalIncome = (data) => {
    let total = data.reduce((a, b) => (a + b.metricTotal), 0);
    total = helpers.countryCurrencyLacSeperator(
      bankDetails[0].bank_locale,
      bankDetails[0].bank_currency,
      total,
      2
    );
    return total;
  };

  const getMinMax = (data, type) => {
    let total = Math[type](...data);
    total = helpers.countryCurrencyLacSeperator(
      bankDetails[0].bank_locale,
      bankDetails[0].bank_currency,
      total,
      2
    );
    return total;
  };

  const Metric = ({ i18Key, value }) => (
    <div className="position-relative small py-4 animate__animated animate__pulse infiniteAnimation">
      {intl.formatMessage({ id: i18Key })}
      <span title={value} className="position-absolute top-0 start-50 translate-middle rounded-pill bni-bg bni-text w-100 py-2 text-break">
        {value}
      </span>
    </div>
  )
  return (
    <>
      <div ref={ref}>
        {lineChartData.length > 0 && data.length > 0 &&
          <>
            <h6 className="">
              <FormattedMessage id="incomeMetrics" />
            </h6>
            <Row className="mt-3">
              <Col md={2} xs={6} className="py-2 text-center">
                <Metric i18Key='total' value={getTotalIncome(lineChartData[0].points)} />
              </Col>
              <Col md={2} xs={6} className="py-2 text-center">
                <Metric i18Key='highest' value={getMinMax(lineChartData[0].points.filter(f => f.y !== 0).map(v => v.metricTotal), 'max')} />
              </Col>
              <Col md={2} xs={6} className="py-2 text-center">
                <Metric i18Key='lowest' value={getMinMax(lineChartData[0].points.filter(f => f.y !== 0).map(v => v.metricTotal), 'min')} />
              </Col>
              <Col md={2} xs={6} className="py-2 text-center">
                <Metric i18Key='weekly' value={metrics.weekly} />
              </Col>
              <Col md={2} xs={6} className="py-2 text-center">
                <Metric i18Key='daily' value={metrics.daily} />
              </Col>
              <Col md={2} xs={6} className="py-2 text-center">
                <Metric i18Key='hourly' value={metrics.hourly} />
              </Col>
            </Row>
            <LineChart
              data={lineChartData}
              id={svgWrapperId}
              margins={{ top: 50, right: width > 400 ? 80 : 30, bottom: 50, left: 135 }}
              width={width}
              isDate={true}
              height={height}
              xLabel={intl.formatMessage({ id: 'month' })}
              yLabel={intl.formatMessage({ id: 'income' })}
              onPointHover={d => helpers.countryCurrencyLacSeperator(
                bankDetails[0].bank_locale,
                bankDetails[0].bank_currency,
                d.y,
                2
              )}
              tooltipClass={`line-chart-tooltip`}
              ticks={12}
              xDisplay={(r, i) => {
                return getMonthString(r);
              }}
              onPointClick={(e, c) => {
                onMonthYearSelected(c.month);
              }}
            />
          </>
        }
      </div>
      <div className="x-scroll">
        {data.length > 0 ? (
          <div className="d-flex align-items-center pt-2 ps-3">
            {data.map((d, i) => (
              <div className="chartWrapper" key={genId(i)}>
                <div className="text-center pt-10 pb-10">
                  <button
                    className={`btn btn-sm btn-bni ${String(monthYearSelected) === String(d.month)
                      ? 'active'
                      : ''
                      }`}
                    onClick={() => {
                      onMonthYearSelected(d.month);
                    }}
                  >
                    {`${intl.formatMessage({ id: d.month.split("-")[0].toLowerCase() })} ${d.month.split("-")[1]}`}
                  </button>
                </div>
                <div className="floatingChartWrapper">
                  {i < 1 && (
                    <div className="floatingChartHeader btn btn-sm btn-bni">
                      <FormattedMessage id="expense" />
                    </div>
                  )}
                  <DonutChart
                    strokeColor={`#000`}
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
                        2
                      )}`
                    }
                  />
                </div>
                <div className="floatingChartWrapper">
                  {i < 1 && (
                    <div className="floatingChartHeader btn btn-sm btn-bni">
                      <FormattedMessage id="income" />
                    </div>
                  )}
                  <DonutChart
                    strokeColor={`#000`}
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
                        2
                      )}`
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-3 text-center"><FormattedMessage id="noRecordsGenerated" /></div>
        )}
      </div>
    </>
  );
};

export default injectIntl(IncExpChart);
