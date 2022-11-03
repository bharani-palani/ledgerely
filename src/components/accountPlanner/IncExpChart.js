import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DonutChart from 'react-donut-chart';
import helpers from '../../helpers';
import moment from 'moment';
import LineChart from 'react-linechart';
import { FormattedMessage, injectIntl } from 'react-intl'

// https://www.npmjs.com/package/react-donut-chart

const IncExpChart = props => {
  const { chartData, onMonthYearSelected, intl } = props;
  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [width, setWidth] = useState(0);
  const [monthYearSelected, setMonthYearSelected] = useState('');
  const [, setNoRecords] = useState(false);
  const incomeLineColor = getComputedStyle(document.documentElement).getPropertyValue('--app-theme-bg-color');

  useEffect(() => {
    setWidth(ref.current.clientWidth)
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
      setMonthYearSelected(Ddata[0].month);
      onMonthYearSelected(Ddata[0].month);
    } else {
      setNoRecords(true);
    }
    if (chartData.length > 0) {
      const lChart = [{
        color: incomeLineColor,
        points: myFilter(chartData, "type", "Cr").reduce((acc, cur) => {
          const item = acc.length > 0 && acc.find(({
            dated
          }) => dated === cur.dated)
          if (item) {
            item.y += Number(cur.total)
          } else {
            acc.push({
              dated: cur.dated,
              x: moment(cur.dated.replace(/-/g, " 01, ")).format('YYYY-MM-DD'),
              y: Number(cur.total)
            });
          }
          return acc;
        }, []).map(({ dated, x, y }) => ({ month: dated, x, y: Math.round(y * 100) / 100 }))
      }];
      setLineChartData(lChart);
    }
  }, [chartData, intl]);


  const myFilter = (objectArray, property, value) => {
    return objectArray.filter(f => f[property] === value);
  }

  // Interface type
  // {dated: "Dec-2020", total: "0.00", category: "Bike petrol"}
  // cData = { label: "Mobile bill", value: 120 },

  const genId = i => `chart-${i}`;
  const colors = helpers.donutChartColors;

  const getMonthLocale = (r) => {
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

  return (
    <>
      <div ref={ref}>
        {lineChartData.length > 0 && data.length > 0 && <LineChart
          data={lineChartData}
          id="debit-card-income-1"
          margins={{ top: 0, right: width > 400 ? 80 : 30, bottom: 0, left: 80 }}
          width={width}
          isDate={true}
          height={250}
          xLabel={intl.formatMessage({ id: 'month' })}
          yLabel={intl.formatMessage({ id: 'income' })}
          onPointHover={d => helpers.indianLacSeperator(d.y, 2)}
          tooltipClass={`line-chart-tooltip`}
          ticks={lineChartData[0].points.length}
          xDisplay={(r, i) => {
            return getMonthLocale(r);
          }}
          onPointClick={(e, c) => {
            setMonthYearSelected(c.month);
            onMonthYearSelected(c.month);
          }}
        />
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
                      setMonthYearSelected(d.month);
                      onMonthYearSelected(d.month);
                    }}
                  >
                    {d.month}
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
                        'en-IN',
                        'INR',
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
                        'en-IN',
                        'INR',
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

IncExpChart.propTypes = {
  chartData: PropTypes.array,
  onMonthYearSelected: PropTypes.func,
};
IncExpChart.defaultProps = {
  chartData: [],
};

export default injectIntl(IncExpChart);
