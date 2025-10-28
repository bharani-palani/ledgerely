import React, { useEffect, useRef, useContext } from "react";
import { HorizontalBarChart, PieChart, VerticalBarChart, DonutChart, BoxPlotChart, CircularBarChart, WordCloudChart } from "../shared/D3";
import Carousel from "react-bootstrap/Carousel";
import { UserContext } from "../../contexts/UserContext";
import { useIntl, FormattedMessage } from "react-intl";
import { appThemeBgColor } from "../shared/D3/constants";

const AiChartWrapper = props => {
  const intl = useIntl();
  const { data, params } = props;
  const userContext = useContext(UserContext);
  const chartWrapperRef = useRef(null);
  const [chartData, setChartData] = React.useState([]);
  const [size, setSize] = React.useState({ width: 0, height: 200 });

  useEffect(() => {
    if (params && data && data.length > 0) {
      const invertedArray = Object.entries(params).map(([key, value]) => [value, key]);
      const newData = data.map(item => {
        return Object.assign(
          {},
          ...invertedArray.map(originalKey => {
            return { [originalKey[1]]: !isNaN(item[originalKey[0]]) ? Number(item[originalKey[0]]) : item[originalKey[0]] };
          }),
        );
      });
      console.log("bbb", newData);
      setChartData(newData);
    }
  }, [data, params]);

  useEffect(() => {
    if (chartWrapperRef.current) {
      setSize(prev => ({ ...prev, width: chartWrapperRef.current.offsetWidth - 50 }));
    }
  }, [chartWrapperRef]);

  const dataHasKey = keys => {
    return chartData && chartData.length > 0 && keys.every(key => Object.keys(chartData[0]).includes(key));
  };

  return (
    <>
      <div className='table-responsive' ref={chartWrapperRef}>
        <Carousel
          indicators={false}
          interval={null}
          prevIcon={
            <button className={`btn btn-sm rounded-circle btn-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"}`}>
              <i className='fa fa-chevron-left' />
            </button>
          }
          nextIcon={
            <button className={`btn btn-sm rounded-circle btn-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"}`}>
              <i className='fa fa-chevron-right' />
            </button>
          }
        >
          {dataHasKey(["label", "value"]) && (
            <Carousel.Item>
              <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
                {intl.formatMessage({ id: "verticalBarChart", defaultMessage: "Vertical Bar Chart" })}
              </h5>
              <VerticalBarChart
                data={chartData}
                width={size.width}
                height={size.height}
                marginLeft={50}
                marginBottom={50}
                xAxisTicksOrientation='vertical'
                showXaxisLabel={false}
                showYaxisLabel={false}
              />
            </Carousel.Item>
          )}
          {dataHasKey(["label", "value"]) && (
            <Carousel.Item>
              <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
                {intl.formatMessage({ id: "horizontalBarChart", defaultMessage: "Horizontal Bar Chart" })}
              </h5>
              <HorizontalBarChart data={chartData} width={size.width} height={size.height} marginLeft={100} marginRight={50} />
            </Carousel.Item>
          )}
          {dataHasKey(["label", "value"]) && (
            <Carousel.Item className='py-3'>
              <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
                {intl.formatMessage({ id: "pieChart", defaultMessage: "Pie Chart" })}
              </h5>
              <PieChart data={chartData} width={size.width} height={size.height} />
            </Carousel.Item>
          )}
          {dataHasKey(["label", "value"]) && (
            <Carousel.Item className='py-3'>
              <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
                {intl.formatMessage({ id: "donutChart", defaultMessage: "Donut Chart" })}
              </h5>
              <DonutChart
                data={chartData}
                width={size.width}
                height={size.height}
                xAxisLabel={intl.formatMessage({
                  id: "donutChart",
                  defaultMessage: "Donut Chart",
                })}
              />
            </Carousel.Item>
          )}
          {dataHasKey(["name", "value"]) && (
            <Carousel.Item>
              <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
                {intl.formatMessage({ id: "boxPlotChart", defaultMessage: "Box Plot Chart" })}
              </h5>
              <BoxPlotChart data={chartData} width={size.width} height={size.height} />
            </Carousel.Item>
          )}
          {dataHasKey(["name", "value"]) && (
            <Carousel.Item>
              <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
                {intl.formatMessage({ id: "circularBarChart", defaultMessage: "Circular Bar Chart" })}
              </h5>
              <CircularBarChart data={chartData} width={size.width} height={size.height} />
            </Carousel.Item>
          )}
          {dataHasKey(["text", "value"]) && (
            <Carousel.Item>
              <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
                {intl.formatMessage({ id: "wordCloudChart", defaultMessage: "Word Cloud Chart" })}
              </h5>
              <WordCloudChart data={chartData} minWidth={size.width} minHeight={size.height} fontColor={chartData.map(() => appThemeBgColor)} />
            </Carousel.Item>
          )}
        </Carousel>
      </div>
    </>
  );
};

export default AiChartWrapper;
