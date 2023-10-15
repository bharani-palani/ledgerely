import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { appThemeBgColor, tooltip } from "./constants";
import PropTypes from "prop-types";

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
    yAxisLabel,
    xAxisLabel,
    padding,
    style,
    tooltipPrefix,
    tooltipSuffix,
    data,
    showYaxisLine,
    showXaxis,
    showXaxisLabel,
    showYaxis,
    showYaxisLabel,
    showTooltip,
    sortClause,
    showAnimation,
    xAxisTicksOrientation,
    onClick,
    fontSize,
  } = props;

  const sortBy = (clause = null) => {
    switch (clause) {
      case "desc":
        return d3.groupSort(
          data,
          ([d]) => -d.value,
          d => d.label,
        );
      case "asc":
        return d3.groupSort(
          data,
          ([d]) => d.value,
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
        .domain([0, d3.max(data, d => d.value)])
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
            }),
        );
      };

      // Create the SVG container.
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height + 50)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", style)
        .call(zoom);

      // Add a rect for each bar.
      svg
        .append("g")
        .attr("class", "bars")
        .selectAll()
        .data(data)
        .join("rect")
        .on("click", (d, i) => {
          onClick(d, i);
        })
        .on("mousemove", (d, i) => {
          if (showTooltip) {
            tooltip.style("opacity", 0.9);
            tooltip
              .html(`${tooltipPrefix} ${i.value} ${tooltipSuffix}`)
              .style("left", d.pageX + 5 + "px")
              .style("top", d.pageY - 30 + "px");
          }
        })
        .on("mouseout", d => {
          tooltip.style("opacity", 0);
        })
        .attr("width", x.bandwidth())
        .attr("x", d => x(d.label))
        // .attr("y", 0)
        // .attr("height", 0)
        .transition()
        .delay(200)
        .duration((d, i) => (showAnimation ? i * 100 : i))
        .attr("fill", fillColor)
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value));

      // Add the x-axis and label.
      if (showXaxis) {
        svg
          .append("g")
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
                  .attr("fill", "currentColor")
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
      if (showYaxis) {
        svg
          .append("g")
          .attr("class", "y-axis")
          .attr("transform", `translate(${marginLeft},0)`)
          .call(d3.axisLeft(y))
          .call(g => (!showYaxisLine ? g.select(".domain").remove() : g))
          .call(g =>
            showYaxisLabel
              ? g
                  .append("text")
                  .style("text-anchor", "middle")
                  .attr("font-size", fontSize)
                  .attr("x", -((height - marginBottom) / 2))
                  .attr("y", -(marginLeft - 20))
                  .attr("fill", "currentColor")
                  .attr("transform", "rotate(270)")
                  .text(yAxisLabel)
              : g,
          );
      }
    }
  }, [JSON.stringify(props)]);

  return <svg ref={svgRef} />;
};

VerticalBarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  fillColor: PropTypes.string,
  yAxisLabel: PropTypes.string,
  xAxisLabel: PropTypes.string,
  padding: PropTypes.number,
  style: PropTypes.string,
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
  sortClause: PropTypes.string,
  xAxisTicksOrientation: PropTypes.string,
  onClick: PropTypes.func,
  fontSize: PropTypes.number,
};

VerticalBarChart.defaultProps = {
  width: 400,
  height: 200,
  marginTop: 0,
  marginRight: 10,
  marginBottom: 40,
  marginLeft: 60,
  fillColor: appThemeBgColor,
  yAxisLabel: "y-axis",
  xAxisLabel: "x-axis",
  padding: 0.01,
  style:
    "max-width: 100%; height: auto; box-shadow: 0px 0 10px #000; border-radius: 10px;",
  tooltipPrefix: "",
  tooltipSuffix: "",
  showTooltip: true,
  data: new Array(20)
    .fill("_")
    .map((_, i) => ({
      label: `C${i + 1}`,
      value: Number((Math.random() * 100).toFixed(2)),
    })),
  showYaxisLine: true,
  showXaxis: true,
  showXaxisLabel: true,
  showYaxis: true,
  showYaxisLabel: true,
  showAnimation: true,
  sortClause: "",
  xAxisTicksOrientation: "horizontal",
  fontSize: 14,
  onClick: () => {},
};

export default VerticalBarChart;
