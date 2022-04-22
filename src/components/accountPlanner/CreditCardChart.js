import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DonutChart from 'react-donut-chart';
import helpers from '../../helpers';
// https://www.npmjs.com/package/react-donut-chart

const CreditCardChart = props => {
  const {
    ccChartData,
    onCcMonthYearSelected,
    ccDetails,
    ccYearSelected,
    ccMonthYearSelected,
  } = props;
  const [data, setData] = useState([]);
  const [ccm, setMonthYearSelected] = useState(ccMonthYearSelected);

  useEffect(() => {
    if (ccChartData.length > 0) {
      const loopMonths = Array.from({ length: 12 }, (_, idx) => ++idx);
      const data = loopMonths
        .map(l => {
          const startDate = helpers.addMonths(
            new Date(
              `${ccYearSelected - 1}-11-${ccDetails.credit_card_start_date}`
            ),
            l
          ); // from Dec
          const endDate = helpers.addMonths(
            new Date(
              `${ccYearSelected - 1}-12-${ccDetails.credit_card_end_date}`
            ),
            l
          ); // to Jan
          const filter = ccChartData.filter(f => {
            const date = new Date(f.month);
            return date >= startDate && date <= endDate;
          });
          return (
            filter
              // .sort(
              //   (a, b) =>
              //     new Date(b.month).getTime() - new Date(a.month).getTime()
              // )
              .reduce(
                (x, y) => {
                  const loopDate = new Date(ccYearSelected, l - 1, 1);
                  const loopMonth = helpers.dateToMonthYear(loopDate);
                  return {
                    month: loopMonth,
                    cData: [
                      {
                        label: `${
                          x.cData[0].value + Number(y.ob) > 0
                            ? 'Opening Balance'
                            : '(Opening Balance)'
                        }`,
                        value: Math.abs(x.cData[0].value + Number(y.ob)),
                      },
                      {
                        label: `${
                          x.cData[1].value + Number(y.paid) > 0
                            ? 'Paid'
                            : '(Paid)'
                        }`,
                        value: Math.abs(x.cData[1].value + Number(y.paid)),
                      },
                      {
                        label: `${
                          x.cData[2].value + Number(y.purchases) > 0
                            ? 'Purchases'
                            : '(Purchases)'
                        }`,
                        value: Math.abs(x.cData[2].value + Number(y.purchases)),
                      },
                      {
                        label: `${
                          x.cData[3].value + Number(y.taxesInterest) > 0
                            ? 'Taxes & Interest'
                            : '(Taxes & Interest)'
                        }`,
                        value: Math.abs(
                          x.cData[3].value + Number(y.taxesInterest)
                        ),
                      },
                      {
                        label: `${
                          x.cData[4].value + Number(y.balance) > 0
                            ? 'Balance'
                            : '(Balance)'
                        }`,
                        value: Math.abs(x.cData[4].value + Number(y.balance)),
                      },
                    ],
                  };
                },
                {
                  cData: [
                    { label: 'Opening Balance', value: 0 },
                    { label: 'Paid', value: 0 },
                    { label: 'Purchases', value: 0 },
                    { label: 'Taxes & Interest', value: 0 },
                    { label: 'Balance', value: 0 },
                  ],
                }
              )
          );
        })
        .filter(ff => ff.month)
        .reverse();
      setData(data);
    }
  }, [ccChartData, ccDetails, ccYearSelected, onCcMonthYearSelected, ccm]);

  // Interface
  // {month: "Dec-2020", total: "0.00", category: "Bike petrol"}
  // cData = { label: "Mobile bill", value: 120 },

  const genId = i => `chart-${i}`;
  const colors = helpers.donutChartColors;
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((d, i) => {
          return (
            <div className="chartWrapper" key={genId(i)}>
              <div className="text-center pt-10">
                <button
                  className={`btn btn-sm btn-bni ${
                    String(ccm) === String(d.month) ? 'bg-dark text-light' : ''
                  }`}
                  onClick={() => {
                    setMonthYearSelected(d.month);
                    onCcMonthYearSelected(d.month);
                  }}
                >
                  {d.month}
                </button>
              </div>
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
                formatValues={values =>
                  helpers.countryCurrencyLacSeperator('en-IN', 'INR', values, 2)
                }
              />
            </div>
          );
        })}
    </>
  );
};

CreditCardChart.propTypes = {
  property: PropTypes.string,
};
CreditCardChart.defaultProps = {
  property: 'String name',
};

export default CreditCardChart;
