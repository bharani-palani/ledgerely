import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { tooltip } from "./constants";
import { horizontalBarChartProps } from "./propsData";

const HorizontalBarChart = props => {
  const svgRef = useRef(null);
  const {
    data,
    width,
    barHeight,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    sortClause,
    padding,
    style,
    fillColor,
    lineColor,
    showTooltip,
    tooltipPrefix,
    tooltipSuffix,
    onClick,
    fontColor,
    fontSize,
    showAnimation,
    animationClass,
  } = { ...horizontalBarChartProps, ...props };

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
    const height = Math.ceil((data.length + 0.1) * barHeight) + marginTop + marginBottom;
    const order = sortBy(sortClause);

    // Create the scales.
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleBand()
      .domain(order)
      .rangeRound([marginTop, height - marginBottom])
      .padding(padding);

    // Create the SVG container.
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height).attr("viewBox", [0, 0, width, height]);

    // Append a rect for each label.
    svg.selectAll(`g`).remove();
    svg
      .append("g")
      .attr("fill", fillColor)
      .selectAll()
      .data(data)
      .join("rect")
      .on("click", (d, i) => {
        onClick(d, i);
      })
      .on("mousemove", (d, i) => {
        if (showTooltip) {
          tooltip.style("padding", "5px");
          tooltip.style("opacity", 1);
          tooltip
            .html(`${tooltipPrefix} ${i.label}: ${i.value} ${tooltipSuffix}`)
            .style("left", d.pageX + 5 + "px")
            .style("top", d.pageY - 30 + "px");
        }
      })
      .on("mouseout", () => {
        tooltip.style("padding", 0);
        tooltip.style("opacity", 0);
      })
      .attr("x", x(0))
      .attr("y", d => y(d.label))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth())
      .attr("class", showAnimation ? animationClass : "");

    // Append a label for each label.
    svg
      .append("g")
      .attr("fill", fontColor)
      .attr("text-anchor", "start")
      .selectAll()
      .data(data)
      .join("text")
      .attr("x", d => x(d.value))
      .attr("y", d => y(d.label) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", 1)
      .text(d => d.value)
      .attr("font-size", fontSize)
      .call(text =>
        text
          .filter(d => x(d.value) - x(0))
          .attr("dx", 4)
          .attr("fill", fontColor)
          .attr("text-anchor", "start")
          .attr("class", showAnimation ? animationClass : ""),
      );

    // Create the axes.
    svg
      .append("g")
      .attr("transform", `translate(0,${marginTop})`)
      .call(d3.axisTop(x))
      .call(g => g.select(".domain").remove())
      .selectAll("text")
      .attr("font-size", fontSize)
      .attr("fill", fontColor)
      .attr("class", showAnimation ? animationClass : "");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call(g => g.selectAll(".tick line").attr("stroke", lineColor))
      .selectAll("text")
      .attr("font-size", fontSize)
      .attr("fill", fontColor)
      .attr("class", showAnimation ? animationClass : "");

    svg.select(".domain").attr("stroke", lineColor);
    svg.selectAll(".tick line").attr("stroke", lineColor);
  }, [JSON.stringify(props)]);

  return <svg style={style} ref={svgRef} />;
};

export default HorizontalBarChart;
