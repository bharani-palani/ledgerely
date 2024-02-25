import * as d3 from "d3";
import styles from "./scatterplot.module.css";
import AxisLeft from "./AxisLeft";
import AxisBottom from "./AxisBottom";
import React, { useState } from "react";
import { scatterPlotChartProps } from "../propsData";
import PropTypes from "prop-types";

const Scatterplot = ({
  width,
  height,
  data,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  fillColor,
  yTicks,
  innerRadius,
  fontSize,
  fontColor,
  lineColor,
}) => {
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
    const className =
      hoveredGroup && d.group !== hoveredGroup
        ? styles.scatterplotCircle + " " + styles.dimmed
        : styles.scatterplotCircle;

    return (
      <circle
        key={i}
        r={innerRadius}
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        className={className}
        stroke={colorScale(d.group)}
        fill={colorScale(d.group)}
        onMouseOver={() => setHoveredGroup(d.group)}
        onMouseLeave={() => setHoveredGroup(null)}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[marginLeft, marginTop].join(",")})`}
        >
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={yTicks}
            width={boundsWidth}
            fontSize={fontSize}
            fontColor={fontColor}
            lineColor={lineColor}
          />
          <g transform={`translate(0, ${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={yTicks}
              height={boundsHeight}
              fontSize={fontSize}
              fontColor={fontColor}
              lineColor={lineColor}
            />
          </g>
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

Scatterplot.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  data: PropTypes.array,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  yTicks: PropTypes.number,
  innerRadius: PropTypes.number,
  fontSize: PropTypes.number,
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

Scatterplot.defaultProps = scatterPlotChartProps;

export default Scatterplot;
