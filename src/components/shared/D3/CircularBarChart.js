import React, { useMemo } from "react";
import * as d3 from "d3";
import { circularBarChartProps } from "./propsData";
import PropTypes from "prop-types";
import { tooltip } from "./constants";

const CircularBarChart = props => {
  const {
    width,
    height,
    data,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    fontSize,
    fillColor,
    fontColor,
    lineColor,
    innerRadius,
    padding,
    opacity,
    showTooltip,
    tooltipPrefix,
    tooltipSuffix,
    sortClause,
    showLegend,
    showAnimation,
    animationClass,
  } = props;

  const sortBy = (clause = null) => {
    switch (clause) {
      case "desc":
        return d3.groupSort(
          data,
          ([d]) => -d.value,
          d => d.name,
        );
      case "asc":
        return d3.groupSort(
          data,
          ([d]) => d.value,
          d => d.name,
        );
      default:
        return data.map(d => d.name);
    }
  };

  const outerRadius =
    Math.min(
      width - marginLeft - marginRight,
      height - marginTop - marginBottom,
    ) / 2;

  const groups = sortBy(sortClause);
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, 2 * Math.PI])
      .padding(padding);
  }, [data, height, width, padding, groups]);

  const yScale = useMemo(() => {
    const [, max] = d3.extent(data.map(d => d.value));
    return d3
      .scaleRadial()
      .domain([0, max || 10])
      .range([innerRadius, outerRadius]);
  }, [data, width, height, innerRadius, outerRadius]);

  // Build the shapes
  const arcPathGenerator = d3.arc();
  const allShapes = data.map((group, i) => {
    const path = arcPathGenerator({
      innerRadius: innerRadius,
      outerRadius: yScale(group.value),
      startAngle: xScale(group.name),
      endAngle: xScale(group.name) + xScale.bandwidth(),
    });

    const barAngle = xScale(group.name) + xScale.bandwidth() / 2; // (in Radian)
    const turnLabelUpsideDown = (barAngle + Math.PI) % (2 * Math.PI) < Math.PI;
    const labelRotation = (barAngle * 180) / Math.PI - 90; // (convert radian to degree)
    const labelXTranslation = yScale(group.value) + 5;
    const labelTransform =
      "rotate(" +
      labelRotation +
      ")" +
      ",translate(" +
      labelXTranslation +
      ",0)";

    return (
      <g
        key={i}
        className={showAnimation ? animationClass : ""}
        onMouseOver={e => {
          if (showTooltip) {
            tooltip.style("padding", "5px");
            tooltip.style("opacity", 0.9);
            tooltip
              .html(
                `${tooltipPrefix} ${group.name} → ${group.value} ${tooltipSuffix}`,
              )
              .style("left", e.pageX + 5 + "px")
              .style("top", e.pageY - 30 + "px");
          }
        }}
        onMouseLeave={() => {
          tooltip.style("padding", 0);
          tooltip.style("opacity", 0);
        }}
      >
        <path
          d={path}
          opacity={opacity}
          stroke={lineColor}
          fill={fillColor}
          fillOpacity={opacity}
          strokeWidth={1}
          rx={1}
        />
        {showLegend && (
          <g transform={labelTransform}>
            <text
              textAnchor={turnLabelUpsideDown ? "end" : "start"}
              alignmentBaseline='middle'
              fontSize={fontSize}
              transform={turnLabelUpsideDown ? "rotate(180)" : "rotate(0)"}
              fill={fontColor}
            >
              {group.name}
            </text>
          </g>
        )}
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

CircularBarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.array,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  fontSize: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  innerRadius: PropTypes.number,
  padding: PropTypes.number,
  opacity: PropTypes.number,
  showTooltip: PropTypes.bool,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  sortClause: PropTypes.string,
  showLegend: PropTypes.bool,
  showAnimation: PropTypes.bool,
  onClick: PropTypes.func,
  animationClass: PropTypes.string,
};

CircularBarChart.defaultProps = circularBarChartProps;

export default CircularBarChart;
