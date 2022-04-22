import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DonutChart from 'react-donut-chart';
import helpers from '../../helpers';
// https://www.npmjs.com/package/react-donut-chart

const IncExpChart = props => {
  const { chartData, onMonthYearSelected } = props;
  const [data, setData] = useState([]);
  const [monthYearSelected, setMonthYearSelected] = useState('');
  const [, setNoRecords] = useState(false);

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
  }, [chartData]);

  // Interface type
  // {dated: "Dec-2020", total: "0.00", category: "Bike petrol"}
  // cData = { label: "Mobile bill", value: 120 },

  const genId = i => `chart-${i}`;
  const colors = helpers.donutChartColors;

  return (
    <>
      {data.length > 0 ? (
        <div className="d-flex align-items-center pt-2">
          {data.map((d, i) => (
            <div className="chartWrapper" key={genId(i)}>
              <div className="text-center pt-10 pb-10">
                <button
                  className={`btn btn-sm btn-bni ${
                    String(monthYearSelected) === String(d.month)
                      ? 'bg-dark text-light'
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
                    Expense
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
                    Income
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
        <div className="py-3 text-center">No Records Generated</div>
      )}
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

export default IncExpChart;
