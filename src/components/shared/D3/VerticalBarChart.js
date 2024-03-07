import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { tooltip } from "./constants";
import PropTypes from "prop-types";
import { verticalBarChartProps } from "./propsData";

const VerticalBarChart = props => {
  const svgRef = useRef(null);
  const {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    fillColor,
    fontColor,
    lineColor,
    yAxisLabel,
    xAxisLabel,
    padding,
    style,
    tooltipPrefix,
    tooltipSuffix,
    showTooltip,
    data,
    showYaxisLine,
    showXaxis,
    showXaxisLabel,
    showYaxis,
    showYaxisLabel,
    showLegend,
    sortClause,
    showAnimation,
    xAxisTicksOrientation,
    animationClass,
    onClick,
    fontSize,
    yTicks,
  } = props;

  const sortBy = (clause = null) => {
    switch (clause) {
      case "desc":
        return d3.groupSort(
          data,
          ([d]) => -Number(d.value),
          d => d.label,
        );
      case "asc":
        return d3.groupSort(
          data,
          ([d]) => Number(d.value),
          d => d.label,
        );
      default:
        return data.map(d => d.label);
    }
  };

  useEffect(() => {
    if (!isNaN(width)) {
      const order = sortBy(sortClause);
      // Declare the x (horizontal position) scale.
      const x = d3
        .scaleBand()
        .domain(order)
        .range([marginLeft, width - marginRight])
        .padding(padding);

      const xAxis = d3.axisBottom(x).tickSizeOuter(0);

      // Declare the y (vertical position) scale.
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => Number(d.value))])
        .nice()
        .range([height - marginBottom, marginTop]);

      const zoom = svg => {
        const extent = [
          [marginLeft, marginTop],
          [width - marginRight, height - marginTop],
        ];

        svg.call(
          d3
            .zoom()
            .scaleExtent([1, 8])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", event => {
              x.range(
                [marginLeft, width - marginRight].map(d =>
                  event.transform.applyX(d),
                ),
              );
              svg
                .selectAll(".bars rect")
                .attr("x", d => x(d.label))
                .attr("width", x.bandwidth());
              svg.selectAll(".x-axis").call(xAxis);
              svg
                .selectAll(".legends text")
                .attr("x", d => x(d.label))
                .attr("width", x.bandwidth());
              svg.selectAll(".x-axis").call(xAxis);
            }),
        );
      };
      // Create the SVG container.
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height + 10)
        .attr("viewBox", [0, 0, width, height])
        .call(zoom);

      // Add a rect for each bar.
      svg.selectAll(`.bars`).remove();
      svg.selectAll(`.legends`).remove();
      svg
        .append("g")
        .attr("class", `bars ${showAnimation ? animationClass : ""}`)
        .selectAll()
        .data(data)
        .join("rect")
        .on("click", (d, i) => {
          onClick(d, i);
        })
        .on("mousemove", (e, d) => {
          if (showTooltip) {
            tooltip.style("padding", "5px");
            tooltip.style("opacity", 1);
            tooltip
              .html(
                `<div>${tooltipPrefix}<div><div>${d.label}</div><div>${Number(
                  d.value,
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</div><div>${tooltipSuffix}</div>`,
              )
              .style("left", e.pageX + 10 + "px")
              .style("top", e.pageY - 50 + "px");
          }
        })
        .on("mouseout", d => {
          tooltip.style("padding", 0);
          tooltip.style("opacity", 0);
        })
        .attr("width", x.bandwidth())
        .attr("x", d => x(d.label))
        // .attr("y", 0)
        // .attr("height", 0)
        .attr("fill", fillColor)
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value));

      if (showLegend) {
        svg
          .append("g")
          .attr("class", `legends ${showAnimation ? animationClass : ""}`)
          .selectAll()
          .data(data)
          .join("text")
          .text(d => d.value)
          .attr("width", x.bandwidth())
          .attr("fill", fontColor)
          .attr("font-size", fontSize)
          .attr("x", d => x(d.label))
          .attr("y", d => y(d.value) - 5)
          .attr("height", d => y(0) - y(d.value));
      }

      // Add the x-axis and label.
      svg.selectAll(`#x-axis`).remove();
      if (showXaxis) {
        svg
          .append("g")
          .attr("id", "x-axis")
          .attr("class", "x-axis")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(xAxis)
          .call(g =>
            showXaxisLabel
              ? g
                  .append("text")
                  .style("text-anchor", "start")
                  .attr("font-size", fontSize)
                  .attr("x", width / 2)
                  .attr("y", marginBottom)
                  .attr("fill", fontColor)
                  .text(xAxisLabel)
              : g,
          );
        if (xAxisTicksOrientation === "vertical") {
          svg
            .selectAll(".x-axis .tick text")
            .attr("font-size", fontSize)
            .style("text-anchor", "end")
            .attr("y", "15")
            .attr("dx", "-1em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-60)");
        }
      }

      // Add the y-axis and x-axis label
      svg.selectAll(`#y-axis`).remove();
      if (showYaxis) {
        svg
          .append("g")
          .attr("id", "y-axis")
          .attr("class", "y-axis")
          .attr("transform", `translate(${marginLeft},0)`)
          .call(d3.axisLeft(y).ticks(yTicks).tickFormat(d3.format(".2s")))
          .call(g => (!showYaxisLine ? g.select(".domain").remove() : g))
          .call(g =>
            showYaxisLabel
              ? g
                  .append("text")
                  .style("text-anchor", "middle")
                  .attr("font-size", fontSize)
                  .attr("x", -((height - marginBottom) / 2))
                  .attr("y", -(marginLeft - 20))
                  .attr("fill", fontColor)
                  .attr("transform", "rotate(270)")
                  .text(yAxisLabel)
              : g,
          );

        svg.selectAll(".domain").attr("stroke", lineColor);
        svg
          .selectAll(".tick text")
          .attr("stroke", fontColor)
          .attr("font-size", fontSize)
          .attr("fill", fontColor);
        svg.selectAll(".tick line").attr("stroke", lineColor);
      }
    }
  }, [JSON.stringify(props)]);

  return <svg style={style} ref={svgRef} />;
};

VerticalBarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  yAxisLabel: PropTypes.string,
  xAxisLabel: PropTypes.string,
  padding: PropTypes.number,
  style: PropTypes.object,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  showTooltip: PropTypes.bool,
  data: PropTypes.array,
  showYaxisLine: PropTypes.bool,
  showXaxis: PropTypes.bool,
  showXaxisLabel: PropTypes.bool,
  showYaxis: PropTypes.bool,
  showYaxisLabel: PropTypes.bool,
  showAnimation: PropTypes.bool,
  showLegend: PropTypes.bool,
  sortClause: PropTypes.string,
  xAxisTicksOrientation: PropTypes.string,
  onClick: PropTypes.func,
  fontSize: PropTypes.number,
  yTicks: PropTypes.number,
};

VerticalBarChart.defaultProps = verticalBarChartProps;

export default VerticalBarChart;
