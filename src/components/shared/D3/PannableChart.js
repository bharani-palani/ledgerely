import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import { pannableChartProps } from "./propsData";

const PannableChart = props => {
  const svgRef = useRef(null);
  const {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    fillColor,
    yAxisLabel,
    style,
    data,
    showYaxisLine,
    showXaxis,
    showYaxis,
    showYaxisLabel,
    yTicks,
  } = props;

  useEffect(() => {
    if (data.length > 0) {
      const parent = d3.select(svgRef.current);
      if (parent.select("svg").nodes().length === 0) {
        const totalWidth = width * 6;

        // Create the horizontal (x) scale over the total width.
        const x = d3
          .scaleUtc()
          .domain(d3.extent(data, d => d.label))
          .range([marginLeft, totalWidth - marginRight]);
        // Create the vertical (x) scale.
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, d => d.value)])
          .nice(6)
          .range([height - marginBottom, marginTop]);

        // Define an area shape generator.
        const area = d3
          .area()
          .curve(d3.curveStep)
          .x(d => x(d.label))
          .y0(y(0))
          .y1(d => y(d.value));

        parent
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .style("position", "absolute")
          .style("pointer-events", "none")
          .style("z-index", 1)
          .append("g")
          .attr("transform", `translate(${marginLeft},0)`)
          .call(showYaxis ? d3.axisLeft(y).ticks(yTicks) : () => {})
          .call(g => (!showYaxisLine ? g.select(".domain").remove() : g))
          .call(g =>
            showYaxisLabel
              ? g
                  .select(".tick:last-of-type text")
                  .clone()
                  .attr("x", 3)
                  .attr("text-anchor", "start")
                  .attr("font-weight", "bold")
                  .text(yAxisLabel)
              : g,
          );

        // Create the svg with the vertical axis.

        // Create a scrolling div containing the area shape and the horizontal axis.
        const body = parent
          .append("div")
          .style("overflow-x", "scroll")
          .style("-webkit-overflow-scrolling", "touch");

        const svg = body
          .append("svg")
          .attr("width", totalWidth)
          .attr("height", height)
          .style("display", "block");

        if (showXaxis) {
          svg
            .append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(
              d3
                .axisBottom(x)
                .ticks(d3.utcMonth.every(data.length / width))
                .tickSizeOuter(0),
            );
        }
        svg
          .append("path")
          .attr("class", "path")
          .datum(data)
          .attr("fill", fillColor)
          .attr("d", area);
      }
    }
  }, [JSON.stringify(props)]);

  return <div style={style} ref={svgRef} />;
};

PannableChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  fillColor: PropTypes.string,
  yAxisLabel: PropTypes.string,
  style: PropTypes.object,
  data: PropTypes.array,
  showYaxisLine: PropTypes.bool,
  showXaxis: PropTypes.bool,
  showYaxis: PropTypes.bool,
  showYaxisLabel: PropTypes.bool,
  yTicks: PropTypes.number,
};
PannableChart.defaultProps = pannableChartProps;

export default PannableChart;
