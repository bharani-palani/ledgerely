import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { stackedVerticalBarChartData } from "./mockData";
import { tooltip, appThemeBgColor } from "./constants";
import PropTypes from "prop-types";

const StackedVerticalBarChart = props => {
  const svgRef = useRef(null);
  const data = stackedVerticalBarChartData;
  const {
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    showTooltip,
    style,
    padding,
    yTicks,
    showAnimation,
    animationDuration,
    sortClause,
  } = props;

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

  useEffect(() => {
    // Determine the series that need to be stacked.
    const series = d3
      .stack()
      .keys(d3.union(data.map(d => d.where))) // distinct series keys, in input order
      .value(([, D], key) => D.get(key).value)(
      // get value for each series key and stack
      d3.index(
        data,
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

    const color = () => appThemeBgColor;

    // A function to format the value in the tooltip.
    const formatValue = x => (isNaN(x) ? "N/A" : x);

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", style);

    // Append a group for each series, and a rect for each element in the series.
    svg
      .append("g")
      .selectAll()
      .data(series)
      .join("g")
      .attr("fill", d => {
        return color(d.key);
      })
      .selectAll("rect")
      .data(D => D.map(d => ((d.key = D.key), d)))
      .join("rect")
      .on("mousemove", (e, d) => {
        if (showTooltip) {
          tooltip.style("opacity", 1);
          tooltip
            .html(() => {
              return `${d.data[0]} <br /> ${d.key} <br /> ${formatValue(
                d.data[1].get(d.key).value,
              )}`;
            })
            .style("left", e.pageX + 10 + "px")
            .style("top", e.pageY - 30 + "px");
        }
      })
      .on("mouseout", d => {
        tooltip.style("opacity", 0);
      })
      .transition()
      .duration((d, i) => (showAnimation ? animationDuration + i * 100 : i))
      .attr("x", d => x(d.data[0]))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    // Append the horizontal axis.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
    //   .call(g => g.selectAll(".domain").remove());

    // Append the vertical axis.
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(yTicks));
    //   .call(g => g.selectAll(".domain").remove());
  }, []);
  return <svg ref={svgRef} />;
};

StackedVerticalBarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  showTooltip: PropTypes.bool,
  style: PropTypes.string,
  padding: PropTypes.number,
  yTicks: PropTypes.number,
  showAnimation: PropTypes.bool,
  animationDuration: PropTypes.number,
  sortClause: PropTypes.string,
};
StackedVerticalBarChart.defaultProps = {
  width: 1300,
  height: 200,
  marginTop: 10,
  marginRight: 10,
  marginBottom: 20,
  marginLeft: 80,
  showTooltip: true,
  style:
    "max-width: 100%; height: auto; box-shadow: 0px 0 10px #000; border-radius: 10px;",
  padding: 0.01,
  yTicks: 6,
  showAnimation: true,
  animationDuration: 1000,
  sortClause: "",
};

export default StackedVerticalBarChart;
