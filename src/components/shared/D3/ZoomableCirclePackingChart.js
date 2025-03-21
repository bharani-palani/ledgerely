import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { tooltip } from "./constants";
import { zoomableCirclePackingChartProps } from "./propsData";
import PropTypes from "prop-types";

const ZoomableCirclePackingChart = props => {
  const svgRef = useRef(null);
  const {
    width,
    height,
    style,
    fillColor,
    fontColor,
    padding,
    tooltipPrefix,
    tooltipSuffix,
    showTooltip,
    fontSize,
    showAnimation,
    onClick,
    data,
  } = props;

  useEffect(() => {
    // Create the color scale.
    const color = d3
      .scaleLinear()
      .domain([0, 5])
      .range(fillColor)
      .interpolate(d3.interpolateHcl);

    // Compute the layout.
    const pack = data =>
      d3.pack().size([width, height]).padding(padding)(
        d3
          .hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value),
      );
    const root = pack(data);

    // Create the SVG container.
    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);

    // Append the nodes.
    svg.selectAll(`g`).remove();
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => (d.children ? color(d.depth) : "white"))
      .attr("pointer-events", d => (!d.children ? "none" : null))
      .on("mouseover", function (d, i) {
        d3.select(this).attr("stroke", fillColor[0]).attr("stroke-width", "3");
        if (showTooltip) {
          tooltip.style("padding", "5px");
          tooltip.style("opacity", 1);
          tooltip
            .html(`${tooltipPrefix} ${i.value} ${tooltipSuffix}`)
            .style("left", d.pageX + 5 + "px")
            .style("top", d.pageY - 30 + "px");
        }
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null);
        tooltip.style("padding", 0);
        tooltip.style("opacity", 0);
      })
      .on("click", (event, d) => {
        if (focus !== d) {
          event.stopPropagation();
          zoom(event, d);
          onClick(event, d);
        }
      });

    // Append the text labels.
    const label = svg
      .append("g")
      .style("font", fontSize + "px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", d => (d.parent === root ? 1 : 0))
      .style("display", d => (d.parent === root ? "inline" : "none"))
      .text(d => d.data.label)
      .attr("fill", fontColor);

    svg.on("click", event => zoom(event, root));
    let focus = root;
    let view;
    zoomTo([focus.x, focus.y, focus.r * 2]);

    function zoomTo(v) {
      const k = width / v[2];

      view = v;

      label.attr(
        "transform",
        d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`,
      );
      node.attr(
        "transform",
        d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`,
      );
      node.attr("r", d => d.r * k);
    }

    function zoom(event, d) {
      focus = d;

      const transition = svg
        .transition()
        .duration(showAnimation ? (event.altKey ? 7500 : 1000) : 0)
        .tween("zoom", () => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline";
        })
        .transition(transition)
        .style("fill-opacity", d => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline";
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none";
        });
    }
  }, [JSON.stringify(props)]);

  return <svg style={style} ref={svgRef} />;
};

ZoomableCirclePackingChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  padding: PropTypes.number,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  showTooltip: PropTypes.bool,
  fontSize: PropTypes.number,
  showAnimation: PropTypes.bool,
  onClick: PropTypes.func,
  data: PropTypes.object,
};
ZoomableCirclePackingChart.defaultProps = zoomableCirclePackingChartProps;

export default ZoomableCirclePackingChart;
