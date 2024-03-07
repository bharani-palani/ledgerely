import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { tooltip } from "./constants";
import { divergingBarChartProps } from "./propsData";
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
    lineColor,
    fontSize,
    data,
    showAnimation,
    onClick,
    showTooltip,
    showXaxisLabel,
    tooltipPrefix,
    tooltipSuffix,
    showXaxis,
    showYaxis,
    padding,
    animationClass,
    fontColor,
    yTicks,
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
      .padding(padding);

    // Create the format function.
    const format = d3.format(metric === "absolute" ? "+,d" : "+.1%");
    const tickFormat =
      metric === "absolute" ? d3.formatPrefix("+.1", 1e6) : d3.format("+.0%");

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    // .attr("viewBox", [0, 0, width, height]);

    // Add a rect for each label.
    svg.selectAll(`g`).remove();
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
          tooltip.style("padding", "5px");
          tooltip.style("opacity", 0.9);
          tooltip
            .html(`${tooltipPrefix} ${i.before} → ${i.after} ${tooltipSuffix}`)
            .style("left", d.pageX + 5 + "px")
            .style("top", d.pageY - 30 + "px");
        }
      })
      .on("mouseout", d => {
        tooltip.style("padding", 0);
        tooltip.style("opacity", 0);
      })
      .attr("fill", d => [d.value > 0 ? fillColor : fillColor])
      .attr("x", d => x(Math.min(d.value, 0)))
      .attr("class", showAnimation ? animationClass : "")
      .attr("y", d => y(d.label))
      .attr("width", d => Math.abs(x(d.value) - x(0)))
      .attr("height", y.bandwidth());

    // Add a text label for each label.
    if (showXaxis) {
      svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", fontSize)
        .attr("fill", fontColor)
        .selectAll()
        .data(massageData)
        .join("text")
        .attr("text-anchor", d => (d.value < 0 ? "end" : "start"))
        .attr("class", showAnimation ? animationClass : "")
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
        .call(d3.axisTop(x).ticks(yTicks).tickFormat(tickFormat))
        .call(g =>
          g
            .selectAll(".tick line")
            .attr("stroke", lineColor)
            .clone()
            .attr("y2", height - marginTop - marginBottom)
            .attr("stroke", lineColor)
            .attr("stroke-opacity", 0.1),
        )
        .call(g =>
          g
            .selectAll(".tick text")
            .attr("font-size", fontSize)
            .attr("fill", fontColor),
        )
        .call(g => g.select(".domain").remove());
    }

    if (showXaxisLabel) {
      svg
        .append("g")
        .attr("transform", `translate(${x(0)},0)`)
        .call(d3.axisLeft(y).tickSize(0).tickPadding(6))
        .call(g =>
          g
            .selectAll(".tick text")
            .attr("font-size", fontSize)
            .attr("fill", fontColor)
            .filter((d, i) => massageData[i].value < 0)
            .attr("text-anchor", "start")
            .attr("x", 6),
        );
    }
  }, [JSON.stringify(props)]);

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
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontSize: PropTypes.number,
  data: PropTypes.array,
  showTooltip: PropTypes.bool,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  showAnimation: PropTypes.bool,
  showXaxis: PropTypes.bool,
  showYaxis: PropTypes.bool,
  onClick: PropTypes.func,
  padding: PropTypes.number,
  animationClass: PropTypes.string,
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  yTicks: PropTypes.number,
  showXaxisLabel: PropTypes.bool,
};

DivergingBarChart.defaultProps = divergingBarChartProps;

export default DivergingBarChart;
