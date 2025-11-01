import React, { useMemo } from "react";
import * as d3 from "d3";
import { getSummaryStats } from "./summary-stats";
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottomCategoric";
import { VerticalBox } from "./VerticalBox";
import { boxPlotChartProps } from "../propsData";

const BoxPlotChart = props => {
  const {
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
    padding,
    markerSize,
    fontSize,
    showXaxis,
    showYaxis,
    showYaxisLabel,
    showXaxisLabel,
    yAxisLabel,
    xAxisLabel,
    animationClass,
    showYaxisLine,
    showXaxisLine,
    showAnimation,
    xAxisTicksOrientation,
  } = { ...boxPlotChartProps, ...props };
  const boundsWidth = width - marginRight - marginLeft;
  const boundsHeight = height - marginTop - marginBottom;

  // Compute everything derived from the dataset:
  const { chartMin, chartMax, groups } = useMemo(() => {
    const [chartMin, chartMax] = d3.extent(data.map(d => d.value));
    const groups = [...new Set(data.map(d => d.name))];
    return { chartMin, chartMax, groups };
  }, [data]);

  // Compute scales
  const yScale = d3.scaleLinear().domain([chartMin, chartMax]).range([boundsHeight, 0]);
  const xScale = d3.scaleBand().range([0, boundsWidth]).domain(groups).padding(padding);

  // Build the box shapes
  const allShapes = groups.map((group, i) => {
    const groupData = data.filter(d => d.name === group).map(d => d.value);
    const sumStats = getSummaryStats(groupData);

    if (!sumStats) {
      return null;
    }

    const { min, q1, median, q3, max } = sumStats;

    return (
      <g key={i} transform={`translate(${xScale(group)},0)`}>
        <VerticalBox
          width={xScale.bandwidth()}
          q1={yScale(q1)}
          median={yScale(median)}
          q3={yScale(q3)}
          min={yScale(min)}
          max={yScale(max)}
          stroke={lineColor}
          strokeWidth={markerSize}
          fill={fillColor}
          showAnimation={showAnimation}
          animationClass={animationClass}
        />
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {showYaxisLabel && (
          <text fontSize={fontSize} x={-height / 2} y='20' fill={fontColor} transform='rotate(270)' style={{ textAnchor: "middle" }}>
            {yAxisLabel}
          </text>
        )}
        <g width={boundsWidth} height={boundsHeight} transform={`translate(${[marginLeft, marginTop].join(",")})`}>
          {allShapes}
          {showYaxis && (
            <AxisLeft
              yScale={yScale}
              pixelsPerTick={30}
              lineColor={lineColor}
              fontColor={fontColor}
              fontSize={fontSize}
              showYaxisLine={showYaxisLine}
            />
          )}
          {showXaxis && (
            <g transform={`translate(0, ${boundsHeight})`}>
              <AxisBottom
                xScale={xScale}
                lineColor={lineColor}
                fontColor={fontColor}
                fontSize={fontSize}
                showXaxisLine={showXaxisLine}
                xAxisTicksOrientation={xAxisTicksOrientation}
              />
            </g>
          )}
        </g>
        {showXaxisLabel && (
          <text fontSize={fontSize} x={width / 2} y={height - 10} fill={fontColor} style={{ textAnchor: "middle" }}>
            {xAxisLabel}
          </text>
        )}
      </svg>
    </div>
  );
};

export default BoxPlotChart;
