import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { tooltip } from "./constants";
import { stackedVerticalBarChartProps } from "./propsData";

const StackedVerticalBarChart = props => {
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
    padding,
    style,
    showTooltip,
    data,
    showYaxis,
    showYaxisLine,
    showYaxisLabel,
    showXaxis,
    showXaxisLabel,
    showXaxisLine,
    sortClause,
    showAnimation,
    animationClass,
    onClick,
    fontSize,
    yTicks,
  } = { ...stackedVerticalBarChartProps, ...props };

  const sortBy = (clause = null) => {
    switch (clause) {
      case "desc":
        return d3.groupSort(
          data,
          D => -d3.sum(D, d => d.value),
          d => d.label,
        );
      case "asc":
        return d3.groupSort(
          data,
          D => d3.sum(D, d => d.value),
          d => d.label,
        );
      default:
        return [...new Set(data.map(d => d.label))];
    }
  };

  const uniqueArray = array => {
    const exists =
      array.filter(o => {
        return (
          Object.prototype.hasOwnProperty.call(o, "where") &&
          Object.prototype.hasOwnProperty.call(o, "label") &&
          Object.prototype.hasOwnProperty.call(o, "value")
        );
      }).length > 0;
    return exists ? array : [];
  };

  useEffect(() => {
    // Determine the series that need to be stacked.
    const validData = uniqueArray(data);
    const series = d3
      .stack()
      .keys(d3.union(validData.map(d => d.where))) // distinct series keys, in input order
      .value(([, D], key) => D.get(key)?.value)(
      // get value for each series key and stack
      d3.index(
        validData,
        d => d.label,
        d => d.where,
      ),
    ); // group by stack then series key

    // Prepare the scales for positional and color encodings.
    const order = sortBy(sortClause);
    const x = d3
      .scaleBand()
      .domain(order)
      .range([marginLeft, width - marginRight])
      .padding(padding);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(series, d => {
          return d3.max(d, d => d[1]);
        }),
      ])
      .rangeRound([height - marginBottom, marginTop]);

    const color = d3
      .scaleLinear()
      .domain([0, series.map(d => d.key).length])
      .range(fillColor)
      .interpolate(d3.interpolateHcl);

    // const color = () => fillColor;

    // A function to format the value in the tooltip.
    const formatValue = x => (isNaN(x) ? "N/A" : x);

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height + 30)
      .attr("viewBox", [0, 0, width, height]);

    // Append a group for each series, and a rect for each element in the series.
    svg.selectAll(`g`).remove();
    svg
      .append("g")
      .selectAll()
      .data(series)
      .join("g")
      .attr("fill", (d, i) => {
        return color(i);
      })
      .selectAll("rect")
      .data(D => D.map(d => ((d.key = D.key), d)))
      .join("rect")
      .on("click", (d, i) => {
        onClick(d, i);
      })
      .on("mousemove", (e, d) => {
        if (showTooltip) {
          tooltip.style("padding", "5px");
          tooltip.style("opacity", 1);
          tooltip
            .html(() => {
              return `${d.data[0]} <br /> ${d.key} <br /> ${formatValue(d.data[1].get(d.key).value)}`;
            })
            .style("left", e.pageX + 10 + "px")
            .style("top", e.pageY - 30 + "px");
        }
      })
      .on("mouseout", () => {
        tooltip.style("padding", 0);
        tooltip.style("opacity", 0);
      })
      .attr("x", d => x(d.data[0]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
      .attr("class", showAnimation ? animationClass : "");

    // Append the horizontal axis.
    if (showXaxis) {
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(showXaxisLabel ? d3.axisBottom(x).tickSizeOuter(0) : () => {})
        .call(g => g.selectAll(".tick line").attr("stroke", lineColor))
        .call(g => (showXaxisLine ? g : g.selectAll(".domain").remove()))
        .selectAll("text")
        .attr("font-size", fontSize)
        .attr("fill", fontColor)
        .attr("class", showAnimation ? animationClass : "");
    }

    // Append the vertical axis.
    if (showYaxis) {
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(showYaxisLabel ? d3.axisLeft(y).ticks(yTicks) : () => {})
        .call(g => g.selectAll(".tick line").attr("stroke", lineColor))
        .call(g => (showYaxisLine ? g : g.selectAll(".domain").remove()))
        .selectAll("text")
        .attr("font-size", fontSize)
        .attr("fill", fontColor)
        .attr("class", showAnimation ? animationClass : "");
    }
    // set axis line color
    svg.selectAll(".domain").attr("stroke", lineColor);
  }, [JSON.stringify(props)]);
  return <svg style={style} ref={svgRef} />;
};

export default StackedVerticalBarChart;
