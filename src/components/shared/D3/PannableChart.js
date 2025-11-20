import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
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
    fontColor,
    lineColor,
    yAxisLabel,
    style,
    data,
    showYaxisLine,
    showXaxis,
    showYaxis,
    showYaxisLabel,
    yTicks,
    showAnimation,
    animationClass,
  } = { ...pannableChartProps, ...props };

  useEffect(() => {
    if (data.length > 0) {
      const parent = d3.select(svgRef.current);
      const totalWidth = width;
      // Create the horizontal (x) scale over the total width.
      const x = d3
        .scaleUtc()
        .domain(d3.extent(data, d => new Date(d.date)))
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
        .x(d => x(new Date(d.date)))
        .y0(y(0))
        .y1(d => y(d.value));
      parent.selectAll(`svg`).remove();
      parent.selectAll(`div`).remove();

      parent
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .style("pointer-events", "none")
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("stroke", fontColor)
        .call(showYaxis ? d3.axisLeft(y).ticks(yTicks) : () => {})
        .call(g => g.selectAll(".tick line").attr("stroke", lineColor))
        .call(g => (!showYaxisLine ? g.select(".domain").remove() : g.select(".domain").attr("stroke", lineColor)))
        .call(g =>
          showYaxisLabel
            ? g
                .select(".tick:last-of-type text")
                .clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .attr("fill", fontColor)
                .text(yAxisLabel)
            : g,
        );

      // Create the svg with the vertical axis.
      const svg = parent.append("svg").attr("width", totalWidth).attr("height", height).style("display", "block");

      if (showXaxis) {
        svg
          .append("g")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(
            d3
              .axisBottom(x)
              .ticks(d3.utcMonth.every(data.length / width))
              .tickSizeOuter(0),
          )
          .call(g =>
            g
              .selectAll(".tick line")
              .attr("stroke", lineColor)
              .attr("class", showAnimation ? animationClass : ""),
          )
          .call(g =>
            g
              .selectAll(".tick text")
              .attr("stroke", fontColor)
              .attr("class", showAnimation ? animationClass : ""),
          );
      }
      svg
        .append("path")
        .attr("class", `path ${showAnimation ? animationClass : ""}`)
        .datum(data)
        .attr("fill", fillColor)
        .attr("d", area);

      svg.select(".domain").attr("stroke", lineColor);
    }
  }, [JSON.stringify(props)]);

  return <div style={style} ref={svgRef} />;
};

export default PannableChart;
