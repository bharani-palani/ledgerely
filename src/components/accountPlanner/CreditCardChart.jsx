import React, { useState, useEffect, useContext } from "react";
// https://www.npmjs.com/package/react-donut-chart
import CreditCardUsage from "./CreditCardUsage";
import { AccountContext } from "./AccountPlanner";

const CreditCardChart = () => {
  const accountContext = useContext(AccountContext);
  const { ccChartData, ccYearSelected, ccDetails, onCcMonthYearSelected } = accountContext;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (ccChartData.length > 0) {
      const data = ccChartData.map(l => {
        return {
          month: l.month,
          cData: [
            {
              label: "Opening Balance",
              value: l.data.ob,
            },
            {
              label: "Paid",
              value: l.data.paid,
            },
            {
              label: "Purchases",
              value: l.data.purchases,
            },
            {
              label: "Taxes & Interest",
              value: l.data.taxesInterest,
            },
            {
              label: "Balance",
              value: l.data.balance,
            },
          ],
        };
      });
      setData(data);
    }
  }, [ccChartData, ccDetails, ccYearSelected, onCcMonthYearSelected]);

  // Interface
  // {month: "Dec-2020", total: "0.00", category: "Bike petrol"}
  // cData = { label: "Mobile bill", value: 120 },

  return <CreditCardUsage data={data} />;
};

export default React.memo(CreditCardChart);
