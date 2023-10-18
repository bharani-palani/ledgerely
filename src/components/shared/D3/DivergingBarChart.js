import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { appThemeBgColor, tooltip } from "./constants";
import { divergingBarChartData } from "./mockData";
import PropTypes from "prop-types";

const DivergingBarChart = props => {
  const svgRef = useRef(null);
  const {
    width,
    barHeight,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    metric,
    style,
    fillColor,
    fontSize,
    data,
    showAnimation,
    onClick,
    showTooltip,
    tooltipPrefix,
    tooltipSuffix,
    showXaxis,
    showYaxis,
  } = props;

  useEffect(() => {
    const massageData = d3
      .sort(data, d => d.after - d.before)
      .map(d => ({
        ...d,
        value:
          metric === "absolute"
            ? d.after - d.before
            : (d.after - d.before) / d.before,
      }));

    const height =
      Math.ceil((massageData.length + 0.1) * barHeight) +
      marginTop +
      marginBottom;

    // Create the positional scales.
    const x = d3
      .scaleLinear()
      .domain(d3.extent(massageData, d => d.value))
      .rangeRound([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(massageData.map(d => d.label))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1);

    // Create the format function.
    const format = d3.format(metric === "absolute" ? "+,d" : "+.1%");
    const tickFormat =
      metric === "absolute" ? d3.formatPrefix("+.1", 1e6) : d3.format("+.0%");

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Add a rect for each label.
    svg
      .append("g")
      .selectAll()
      .data(massageData)
      .join("rect")
      .on("click", (d, i) => {
        onClick(d, i);
      })
      .on("mousemove", (d, i) => {
        if (showTooltip) {
          tooltip.style("opacity", 0.9);
          tooltip
            .html(`${tooltipPrefix} ${i.before} → ${i.after} ${tooltipSuffix}`)
            .style("left", d.pageX + 5 + "px")
            .style("top", d.pageY - 30 + "px");
        }
      })
      .on("mouseout", d => {
        tooltip.style("opacity", 0);
      })
      .attr("fill", d => [d.value > 0 ? fillColor : fillColor])
      .attr("x", d => x(Math.min(d.value, 0)))
      .transition()
      .delay(200)
      .duration((d, i) => (showAnimation ? i * 100 : i))
      .attr("y", d => y(d.label))
      .attr("width", d => Math.abs(x(d.value) - x(0)))
      .attr("height", y.bandwidth());

    // Add a text label for each label.
    if (showXaxis) {
      svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", fontSize)
        .attr("fill", "currentColor")
        .selectAll()
        .data(massageData)
        .join("text")
        .attr("text-anchor", d => (d.value < 0 ? "end" : "start"))
        .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 4)
        .attr("y", d => y(d.label) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .text(d => format(d.value));
    }

    // Add the axes and grid lines.
    if (showYaxis) {
      svg
        .append("g")
        .attr("transform", `translate(0,${marginTop})`)
        .call(
          d3
            .axisTop(x)
            .ticks(width / 80)
            .tickFormat(tickFormat),
        )
        .call(g =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("y2", height - marginTop - marginBottom)
            .attr("stroke-opacity", 0.1),
        )
        .call(g => g.selectAll(".tick text").attr("font-size", fontSize))
        .call(g => g.select(".domain").remove());
    }

    if (showXaxis) {
      svg
        .append("g")
        .attr("transform", `translate(${x(0)},0)`)
        .call(d3.axisLeft(y).tickSize(0).tickPadding(6))
        .call(g =>
          g
            .selectAll(".tick text")
            .attr("font-size", fontSize)
            .filter((d, i) => massageData[i].value < 0)
            .attr("text-anchor", "start")
            .attr("x", 6),
        );
    }
  }, []);

  return <svg style={style} ref={svgRef} />;
};

DivergingBarChart.propTypes = {
  width: PropTypes.number,
  barHeight: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  metric: PropTypes.string,
  style: PropTypes.object,
  fillColor: PropTypes.string,
  fontSize: PropTypes.number,
  data: PropTypes.array,
  showTooltip: PropTypes.bool,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  showAnimation: PropTypes.bool,
  showXaxis: PropTypes.bool,
  showYaxis: PropTypes.bool,
  onClick: PropTypes.func,
};

DivergingBarChart.defaultProps = {
  width: 400,
  barHeight: 15,
  marginTop: 30,
  marginRight: 60,
  marginBottom: 10,
  marginLeft: 60,
  metric: "relative",
  style: {
    maxWidth: "100%",
    font: "10px sans-serif",
    height: "auto",
    boxShadow: "0px 0 10px #000",
    borderRadius: "10px",
  },
  fillColor: appThemeBgColor,
  fontSize: 8,
  data: divergingBarChartData,
  showAnimation: true,
  showTooltip: true,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showXaxis: true,
  showYaxis: true,
  onClick: () => {},
};

export default DivergingBarChart;
