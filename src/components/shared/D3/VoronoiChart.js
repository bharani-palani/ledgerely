import React, { useMemo, useState } from "react";
import * as d3 from "d3";
import { Delaunay } from "d3";
import PropTypes from "prop-types";
import { voronoiChartProps } from "./propsData";
import { tooltip } from "./constants";

export const VoronoiChart = ({
  width,
  height,
  data,
  markerSize,
  lineColor,
  fillColor,
  showTooltip,
  tooltipPrefix,
  tooltipSuffix,
  className,
  showAnimation,
  animationClass,
}) => {
  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.x)])
      .range([0, width]);
  }, [width, data]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .range([0, height]);
  }, [height, data]);

  const delaunay = useMemo(() => {
    const formattedData = data.map(d => [xScale(d.x), yScale(d.y)]);
    return Delaunay.from(formattedData);
  }, [xScale, yScale, data]);

  const [hoveredItem, setHoveredItem] = useState(null);

  const voronoi = useMemo(() => {
    return delaunay.voronoi([0, 0, width, height]);
  }, [delaunay, width, height]);

  const voronoiCells = data.map((d, i) => {
    const path = voronoi.renderCell(i);
    return (
      <path
        key={i}
        d={path}
        stroke={lineColor}
        fill={"currentColor"}
        opacity={0.1}
        onMouseOver={() => {
          setHoveredItem(i);
        }}
      />
    );
  });

  const allCircles = data.map((d, i) => {
    return (
      <React.Fragment key={i}>
        <circle
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          fill={fillColor}
          r={markerSize}
          className={`${className} ${showAnimation ? animationClass : ""}`}
        />
        {hoveredItem === i && (
          <circle
            cx={xScale(d.x)}
            cy={yScale(d.y)}
            r={markerSize}
            fill='transparent'
            stroke='red'
            style={{ zIndex: 1 }}
            strokeWidth={3}
            onMouseOver={e => {
              if (showTooltip) {
                tooltip.style("padding", "5px");
                tooltip.style("opacity", 0.9);
                tooltip
                  .html(`${tooltipPrefix} ${d.label} ${tooltipSuffix}`)
                  .style("left", e.pageX + 5 + "px")
                  .style("top", e.pageY - 30 + "px");
              }
            }}
            onMouseLeave={() => {
              tooltip.style("padding", 0);
              tooltip.style("opacity", 0);
            }}
          />
        )}
      </React.Fragment>
    );
  });

  return (
    <svg width={width} height={height}>
      {voronoiCells}
      {allCircles}
    </svg>
  );
};

VoronoiChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  markerSize: PropTypes.number,
  fontSize: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
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
  showTooltip: PropTypes.bool,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  className: PropTypes.string,
};
VoronoiChart.defaultProps = voronoiChartProps;

export default VoronoiChart;
