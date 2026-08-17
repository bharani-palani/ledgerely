import React, { useEffect, useRef, useContext, useCallback } from "react";
import { HorizontalBarChart, PieChart, VerticalBarChart, DonutChart, BoxPlotChart, CircularBarChart, WordCloudChart } from "../shared/D3";
import Carousel from "react-bootstrap/Carousel";
import { UserContext } from "../../contexts/UserContext";
import { useIntl } from "react-intl";
import {
  horizontalBarChartProps,
  pieChartProps,
  verticalBarChartProps,
  donutChartProps,
  boxPlotChartProps,
  circleShapeProps,
  wordCloudChartProps,
} from "../../components/shared/D3/propsData";

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
      setChartData(newData);
    }
  }, [data, params]);

  useEffect(() => {
    if (chartWrapperRef.current) {
      setSize(prev => ({ ...prev, width: (chartWrapperRef?.current?.offsetWidth || 0) - 50 }));
    }
  }, [chartWrapperRef]);

  const dataHasKey = useCallback(
    keys => {
      return (
        chartData &&
        chartData.length > 0 &&
        keys.every(key => Object.keys(chartData[0]).includes(key)) &&
        chartData.every(item => keys.every(key => item[key] !== undefined && item[key] !== null && (key === "value" ? !isNaN(item[key]) : true)))
      );
    },
    [chartData],
  );

  const isValidChartData = useCallback(() => {
    return dataHasKey(["label", "value"]) || dataHasKey(["name", "value"]) || dataHasKey(["text", "value"]);
  }, [dataHasKey]);

  return (
    <div className='table-responsive' ref={chartWrapperRef}>
      <Carousel
        className='chat-carousel'
        indicators={false}
        interval={null}
        prevIcon={
          isValidChartData() ? (
            <button className={`btn btn-sm rounded-circle btn-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}>
              <i className='fa fa-chevron-left' />
            </button>
          ) : null
        }
        nextIcon={
          isValidChartData() ? (
            <button className={`btn btn-sm rounded-circle btn-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}>
              <i className='fa fa-chevron-right' />
            </button>
          ) : null
        }
      >
        {dataHasKey(["label", "value"]) && (
          <Carousel.Item className='text-center'>
            <div className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
              {intl.formatMessage({ id: "verticalBarChart", defaultMessage: "Vertical Bar Chart" })}
            </div>
            <VerticalBarChart
              {...verticalBarChartProps}
              data={chartData}
              width={size.width}
              height={size.height}
              marginLeft={0}
              marginBottom={50}
              xAxisTicksOrientation='vertical'
              showXaxisLabel={false}
              showYaxisLabel={false}
              showXaxis={false}
              showYaxis={false}
            />
          </Carousel.Item>
        )}
        {dataHasKey(["label", "value"]) && (
          <Carousel.Item className='text-center'>
            <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
              {intl.formatMessage({ id: "horizontalBarChart", defaultMessage: "Horizontal Bar Chart" })}
            </h5>
            <HorizontalBarChart
              {...horizontalBarChartProps}
              data={chartData}
              width={size.width}
              height={size.height}
              marginLeft={100}
              marginRight={50}
            />
          </Carousel.Item>
        )}
        {dataHasKey(["label", "value"]) && (
          <Carousel.Item className='py-3 text-center'>
            <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
              {intl.formatMessage({ id: "pieChart", defaultMessage: "Pie Chart" })}
            </h5>
            <PieChart {...pieChartProps} data={chartData} width={size.width} height={size.height} showXaxisLabel={false} showYaxisLabel={false} />
          </Carousel.Item>
        )}
        {dataHasKey(["label", "value"]) && (
          <Carousel.Item className='py-3 text-center'>
            <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
              {intl.formatMessage({ id: "donutChart", defaultMessage: "Donut Chart" })}
            </h5>
            <DonutChart {...donutChartProps} data={chartData} width={size.width} height={size.height} xAxisLabel='' showLegend={false} />
          </Carousel.Item>
        )}
        {dataHasKey(["name", "value"]) && (
          <Carousel.Item className='text-center'>
            <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
              {intl.formatMessage({ id: "boxPlotChart", defaultMessage: "Box Plot Chart" })}
            </h5>
            <BoxPlotChart
              {...boxPlotChartProps}
              data={chartData}
              width={size.width}
              height={size.height}
              showXaxisLabel={false}
              showYaxisLabel={false}
            />
          </Carousel.Item>
        )}
        {dataHasKey(["name", "value"]) && (
          <Carousel.Item className='text-center'>
            <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
              {intl.formatMessage({ id: "circularBarChart", defaultMessage: "Circular Bar Chart" })}
            </h5>
            <CircularBarChart {...circleShapeProps} data={chartData} width={size.width} height={size.height} />
          </Carousel.Item>
        )}
        {dataHasKey(["text", "value"]) && (
          <Carousel.Item className='text-center'>
            <h5 className={`badge bg-${userContext?.userData?.theme === "dark" ? "dark" : "secondary"} mt-2`}>
              {intl.formatMessage({ id: "wordCloudChart", defaultMessage: "Word Cloud Chart" })}
            </h5>
            <WordCloudChart {...wordCloudChartProps} data={chartData} minWidth={size.width} minHeight={size.height} />
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  );
};

export default AiChartWrapper;
