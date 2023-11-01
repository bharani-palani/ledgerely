import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { appThemeBgColor, tooltip } from "./constants";
import PropTypes from "prop-types";

const PieChart = props => {
  const svgRef = useRef(null);
  const {
    width,
    height,
    tooltipPrefix,
    tooltipSuffix,
    fillColor,
    showTooltip,
    data,
    style,
    fontSize,
    showXaxisLabel,
    showYaxisLabel,
    sortClause,
    showAnimation,
    className,
    onClick,
    lineColor,
  } = props;

  const sortBy = (clause = null) => {
    switch (clause) {
      case "desc":
        return data.sort((a, b) => b.value - a.value);
      case "asc":
        return data.sort((a, b) => a.value - b.value);
      default:
        return data;
    }
  };

  useEffect(() => {
    const orderByData = sortBy(sortClause);

    // Create the color scale.
    // const color = d3
    //   .scaleOrdinal()
    //   .domain(data.map(d => d.label))
    //   .range(
    //     d3
    //       .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
    //       .reverse(),
    //   );

    // const color = () => fillColor;
    const color = d3
      .scaleLinear()
      .domain([0, data.length])
      .range(fillColor)
      .interpolate(d3.interpolateHcl);

    // Create the pie layout and arc generator.
    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const labelRadius = arc.outerRadius()() * 0.8;

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(orderByData);
    const sliceProportion = data.reduce(
      (a, b) => Number(a) + Number(b.value),
      0,
    );
    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr(
        "class",
        ` ${className} ${
          showAnimation ? "animate__animated animate__bounce" : ""
        } `,
      )
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    // Add a sector path for each value.
    svg
      .append("g")
      .attr("stroke", lineColor)
      .selectAll()
      .data(arcs)
      .join("path")
      .on("click", (d, i) => {
        onClick(d, i);
      })
      .attr("fill", (d, i) => color(i))
      .style("box-shadow", "0px 0 10px #000")
      .attr("d", arc)
      .on("mousemove", (e, d) => {
        if (showTooltip) {
          tooltip.style("padding", "5px");
          tooltip.style("opacity", 1);
          tooltip
            .html(
              `<div>${tooltipPrefix}</div><div>${
                d.data.label
              }</div><div>${Number(d.data.value.toFixed(2)).toLocaleString(
                "en-US",
              )}</div><div>${((d.value / sliceProportion) * 100).toFixed(
                2,
              )}%</div><div>${tooltipSuffix}</div>`,
            )
            .style("left", e.pageX + 15 + "px")
            .style("top", e.pageY - 40 + "px");
        }
      })
      .on("mouseout", d => {
        tooltip.style("padding", 0);
        tooltip.style("opacity", 0);
      });

    // Create a new arc generator to place a label close to the edge.
    // The label shows the value if there is enough room.
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      .call(text =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => (showXaxisLabel ? d.data.label : ""))
          .attr("font-size", fontSize),
      )
      .call(text =>
        text
          .filter(d => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d =>
            showYaxisLabel ? d.data.value.toLocaleString("en-US") : "",
          )
          .attr("font-size", fontSize),
      );
  }, [JSON.stringify(props)]);

  return <svg style={style} ref={svgRef}></svg>;
};

PieChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  showTooltip: PropTypes.bool,
  fillColor: PropTypes.array,
  data: PropTypes.array,
  style: PropTypes.object,
  fontSize: PropTypes.number,
  showXaxisLabel: PropTypes.bool,
  showYaxisLabel: PropTypes.bool,
  sortClause: PropTypes.string,
  showAnimation: PropTypes.bool,
  onClick: PropTypes.func,
  lineColor: PropTypes.string,
  className: PropTypes.string,
};
PieChart.defaultProps = {
  width: 200,
  height: 200,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showTooltip: true,
  fillColor: [appThemeBgColor],
  data: [
    { label: "<5", value: 45000 },
    { label: "5-9", value: 30000 },
    { label: "10-14", value: 40000 },
    { label: "15-19", value: 50000 },
    { label: "20-24", value: 60000 },
    { label: "25-29", value: 70000 },
    { label: "30-34", value: 80000 },
  ],
  style: { maxWidth: "100%", height: "auto" },
  fontSize: 12,
  showXaxisLabel: true,
  showYaxisLabel: true,
  sortClause: "",
  onClick: () => {},
  lineColor: "#555",
  showAnimation: true,
  className: "",
};

export default PieChart;
