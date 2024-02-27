import React, { useMemo } from "react";
import * as d3 from "d3";
import AxisBottom from "./AxisBottom";
import { DensityChartData } from "../mockData";
import PropTypes from "prop-types";

function kernelDensityEstimator(kernel, X) {
  return function (V) {
    return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
  };
}

function kernelEpanechnikov(k) {
  return function (v) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
}

const DensityChart = ({
  width,
  height,
  data,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  fillColor,
  fontColor,
  lineColor,
  showXaxisLabel,
  fontSize,
  xAxisLabel,
  showXaxis,
  animationClass,
  showAnimation,
}) => {
  const boundsWidth = width - marginRight - marginLeft;
  const boundsHeight = height - marginTop - marginBottom;

  const xScale = useMemo(() => {
    const max = Math.max(...data.map(v => v.x));
    return d3
      .scaleLinear()
      .domain([0, max])
      .range([10, boundsWidth - 10]);
  }, [data, boundsWidth]);

  // Compute kernel density estimation
  const density = useMemo(() => {
    const kde = kernelDensityEstimator(kernelEpanechnikov(7), xScale.ticks(40));
    return kde(data.map(v => v.x));
  }, [xScale]);

  const yScale = useMemo(() => {
    const max = Math.max(...density.map(d => d[1]));
    return d3.scaleLinear().range([boundsHeight, 0]).domain([0, max]);
  }, [data, boundsHeight]);

  const path = useMemo(() => {
    const lineGenerator = d3
      .line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .curve(d3.curveBasis);
    return lineGenerator(density);
  }, [density, xScale, yScale]);

  return (
    <svg
      width={width}
      height={height}
      className={`${showAnimation ? animationClass : ""}`}
    >
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[marginLeft, marginTop].join(",")})`}
      >
        <path
          d={path}
          fill={fillColor}
          stroke={fillColor}
          strokeWidth={1}
          strokeLinejoin='round'
        />
        {showXaxis && (
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={40}
              fontColor={fontColor}
              lineColor={lineColor}
            />
          </g>
        )}
      </g>
      {showXaxisLabel && (
        <text
          fontSize={fontSize}
          x={width / 2}
          y={height - 10}
          fill={fontColor}
          style={{ textAnchor: "middle" }}
        >
          {xAxisLabel}
        </text>
      )}
    </svg>
  );
};

DensityChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  showXaxisLabel: PropTypes.bool,
  fontSize: PropTypes.number,
  xAxisLabel: PropTypes.string,
  showXaxis: PropTypes.bool,
  animationClass: PropTypes.string,
  showAnimation: PropTypes.bool,
};
DensityChart.defaultProps = DensityChartData;

export default DensityChart;
