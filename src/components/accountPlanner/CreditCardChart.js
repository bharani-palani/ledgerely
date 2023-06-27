import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import helpers from "../../helpers";
// https://www.npmjs.com/package/react-donut-chart
import CreditCardUsage from "./CreditCardUsage";
import { AccountContext } from "./AccountPlanner";

const CreditCardChart = props => {
  const accountContext = useContext(AccountContext);
  const { ccChartData, ccYearSelected, ccDetails, onCcMonthYearSelected } =
    accountContext;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (ccChartData.length > 0) {
      const loopMonths = Array.from({ length: 12 }, (_, idx) => ++idx);
      const data = loopMonths
        .map(l => {
          const startDate = helpers.addMonths(
            new Date(
              `${ccYearSelected - 1}-11-${ccDetails.credit_card_start_date}`,
            ),
            l,
          ); // from Dec
          const endDate = helpers.addMonths(
            new Date(
              `${ccYearSelected - 1}-12-${ccDetails.credit_card_end_date}`,
            ),
            l,
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
                        label: "Opening Balance",
                        value: x.cData[0].value + Number(y.ob),
                      },
                      {
                        label: "Paid",
                        value: x.cData[1].value + Number(y.paid),
                      },
                      {
                        label: "Purchases",
                        value: x.cData[2].value + Number(y.purchases),
                      },
                      {
                        label: "Taxes & Interest",
                        value: x.cData[3].value + Number(y.taxesInterest),
                      },
                      {
                        label: "Balance",
                        value: x.cData[4].value + Number(y.balance),
                      },
                    ],
                  };
                },
                {
                  cData: [
                    { label: "Opening Balance", value: 0 },
                    { label: "Paid", value: 0 },
                    { label: "Purchases", value: 0 },
                    { label: "Taxes & Interest", value: 0 },
                    { label: "Balance", value: 0 },
                  ],
                },
              )
          );
        })
        .filter(ff => ff.month)
        .reverse();
      setData(data);
    }
  }, [ccChartData, ccDetails, ccYearSelected, onCcMonthYearSelected]);

  // Interface
  // {month: "Dec-2020", total: "0.00", category: "Bike petrol"}
  // cData = { label: "Mobile bill", value: 120 },

  return (
    <div>
      <CreditCardUsage data={data} />
    </div>
  );
};

CreditCardChart.propTypes = {
  property: PropTypes.string,
};
CreditCardChart.defaultProps = {
  property: "String name",
};

export default CreditCardChart;
