import * as d3 from "d3";
import styles from "./scatterplot.module.css";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import React, { useState } from "react";
import { scatterPlotChartProps } from "../propsData";
import { tooltip } from "../constants";

const Scatterplot = props => {
  const {
    width,
    height,
    data,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    fillColor,
    xTicks,
    yTicks,
    markerSize,
    fontSize,
    fontColor,
    lineColor,
    showTooltip,
    tooltipPrefix,
    tooltipSuffix,
    yAxisLabel,
    xAxisLabel,
    showYaxisLabel,
    showXaxisLabel,
    showYaxisLine,
    showXaxisLine,
    showAnimation,
    animationClass,
    showXaxis,
    showYaxis,
  } = { ...scatterPlotChartProps, ...props };
  const boundsWidth = width - marginRight - marginLeft;
  const boundsHeight = height - marginTop - marginBottom;
  const [hoveredGroup, setHoveredGroup] = useState(null);

  // Scales
  const yScale = d3
    .scaleLinear()
    .domain([Math.min(...data.map(v => v.y)), Math.max(...data.map(v => v.y))])
    .range([boundsHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map(v => v.x))])
    .range([0, boundsWidth]);
  const allGroups = data.map(d => String(d.group));
  const colorScale = d3.scaleOrdinal().domain(allGroups).range(fillColor);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    const className = hoveredGroup && d.group !== hoveredGroup ? styles.scatterplotCircle + " " + styles.dimmed : styles.scatterplotCircle;

    return (
      <circle
        key={i}
        r={markerSize}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        className={`${className} ${showAnimation ? animationClass : ""}`}
        stroke={colorScale(d.group)}
        fill={colorScale(d.group)}
        onMouseOver={e => {
          setHoveredGroup(d.group);
          if (showTooltip) {
            tooltip.style("padding", "5px");
            tooltip.style("opacity", 0.9);
            tooltip
              .html(`${tooltipPrefix}  ${d.group} → ${d.subGroup} → ${d.size} ${tooltipSuffix}`)
              .style("left", e.pageX + 5 + "px")
              .style("top", e.pageY - 30 + "px");
          }
        }}
        onMouseLeave={() => {
          setHoveredGroup(null);
          tooltip.style("padding", 0);
          tooltip.style("opacity", 0);
        }}
      />
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
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={yTicks}
            width={boundsWidth}
            fontSize={fontSize}
            fontColor={fontColor}
            lineColor={lineColor}
            xTicks={xTicks}
            showXaxisLine={showXaxisLine}
            showYaxis={showYaxis}
          />
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={yTicks}
              height={boundsHeight}
              fontSize={fontSize}
              fontColor={fontColor}
              lineColor={lineColor}
              yTicks={yTicks}
              showYaxisLine={showYaxisLine}
              showXaxis={showXaxis}
            />
          </g>
          {allShapes}
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

export default Scatterplot;
