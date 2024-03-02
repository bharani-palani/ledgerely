import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { lineChartProps } from "./propsData";
import PropTypes from "prop-types";

const LineChart = ({
  width,
  height,
  data,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  markerSize,
  fillColor,
  fontColor,
  lineColor,
  fontSize,
  showYaxisLabel,
  showXaxisLabel,
  showYaxisLine,
  showXaxisLine,
  xAxisLabel,
  yAxisLabel,
  showXaxis,
  showYaxis,
  animationClass,
  showAnimation,
  xAxisTicksOrientation,
}) => {
  const axesRef = useRef(null);
  const boundsWidth = width - marginRight - marginLeft;
  const boundsHeight = height - marginTop - marginBottom;

  const [, max] = d3.extent(data, d => d.y);
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, boundsHeight]);

  const [, xMax] = d3.extent(data, d => d.x);
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, xMax || 0])
      .range([0, boundsWidth]);
  }, [data, boundsWidth]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    if (showXaxis) {
      const xAxisGenerator = d3.axisBottom(xScale);
      svgElement
        .append("g")
        .attr("class", "xDomain")
        .attr("transform", "translate(0," + boundsHeight + ")")
        .call(xAxisGenerator)
        .call(g =>
          g
            .selectAll(".tick text")
            .attr("font-size", fontSize)
            .attr("fill", fontColor)
            .style(
              "transform",
              xAxisTicksOrientation === "vertical"
                ? "translate(-1em, 1em) rotate(270deg)"
                : "none",
            )
            .style(
              "text-anchor",
              xAxisTicksOrientation === "vertical" ? "end" : "middle",
            ),
        )
        .call(g => g.selectAll(".domain").attr("stroke", lineColor))
        .call(g => g.selectAll(".tick line").attr("stroke", lineColor));
      if (!showXaxisLine) {
        svgElement.selectAll(".xDomain .domain").remove();
        svgElement.selectAll(".xDomain .tick line").remove();
      }
    }

    if (showYaxis) {
      const yAxisGenerator = d3.axisLeft(yScale);
      svgElement
        .append("g")
        .attr("class", "yDomain")
        .call(yAxisGenerator)
        .call(g =>
          g
            .selectAll(".tick text")
            .attr("font-size", fontSize)
            .attr("fill", fontColor),
        )
        .call(g => g.selectAll(".domain").attr("stroke", lineColor))
        .call(g => g.selectAll(".tick line").attr("stroke", lineColor));

      if (!showYaxisLine) {
        svgElement.selectAll(".yDomain .domain").remove();
        svgElement.selectAll(".yDomain .tick line").remove();
      }
    }
  }, [
    xScale,
    yScale,
    boundsHeight,
    fontColor,
    fontSize,
    lineColor,
    showXaxisLine,
    showYaxisLine,
    showXaxis,
    showYaxis,
    xAxisTicksOrientation,
  ]);

  // Build the line
  const lineBuilder = d3
    .line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));
  const linePath = lineBuilder(data);
  if (!linePath) {
    return null;
  }

  return (
    <div>
      <svg width={width} height={height}>
        {showYaxisLabel && (
          <text
            fontSize={fontSize}
            x={-height / 2}
            y='20'
            fill={fontColor}
            transform='rotate(270)'
            style={{ textAnchor: "middle" }}
          >
            {yAxisLabel}
          </text>
        )}
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[marginLeft, marginTop].join(",")})`}
        >
          <path
            d={linePath}
            opacity={1}
            stroke={fillColor}
            fill='none'
            strokeWidth={markerSize}
            className={showAnimation ? animationClass : ""}
          />
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[marginLeft, marginTop].join(",")})`}
        />
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
    </div>
  );
};
LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  markerSize: PropTypes.number,
  fontSize: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object,
  data: PropTypes.array,
  yTicks: PropTypes.number,
  showXaxis: PropTypes.bool,
  showYaxis: PropTypes.bool,
  showYaxisLabel: PropTypes.bool,
  showXaxisLabel: PropTypes.bool,
  showYaxisLine: PropTypes.bool,
  showXaxisLine: PropTypes.bool,
  xAxisLabel: PropTypes.string,
  yAxisLabel: PropTypes.string,
  animationClass: PropTypes.string,
  showAnimation: PropTypes.bool,
  xAxisTicksOrientation: PropTypes.string,
};
LineChart.defaultProps = lineChartProps;

export default LineChart;
