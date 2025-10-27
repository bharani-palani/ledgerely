import React, { useEffect } from "react";
import { HorizontalBarChart, PieChart, VerticalBarChart } from "../../components/shared/D3";

const AiChartWrapper = props => {
  const { data, params } = props;
  const [chartData, setChartData] = React.useState([]);

  useEffect(() => {
    if (params && data && data.length > 0) {
      const invertedArray = Object.entries(params).map(([key, value]) => [value, key]);
      const newData = data.map(item => {
        return Object.assign(
          {},
          ...invertedArray.map(originalKey => {
            return { [originalKey[1]]: item[originalKey[0]] };
          }),
        );
      });
      setChartData(newData);
    }
  }, [data, params]);

  return (
    <div className='table-responsive'>
      <div
        className=''
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
        }}
      >
        <HorizontalBarChart data={chartData} marginLeft={100} marginTop={50} marginRight={50} marginBottom={50} />
        <PieChart data={chartData} marginLeft={50} marginTop={50} marginRight={50} marginBottom={50} />
        <VerticalBarChart data={chartData} marginLeft={50} marginTop={50} marginRight={50} marginBottom={50} />
      </div>
    </div>
  );
};

export default AiChartWrapper;
