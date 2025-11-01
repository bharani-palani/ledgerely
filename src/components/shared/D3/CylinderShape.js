import React, { useRef, useEffect } from "react";
import { cylinderShapeProps } from "./propsData";
import * as d3 from "d3";

const CylinderShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth } = {
    ...cylinderShapeProps,
    ...props,
  };
  const svgRef = useRef(null);

  useEffect(() => {
    const radius = width / 2;
    const w = width + strokeWidth * 2;
    const h = height + strokeWidth * 2;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .attr("viewBox", [0, 0, w, h])
      .attr("class", showAnimation ? animationClass : "");

    svg.selectAll(`g`).remove();
    svg.selectAll(`foreignObject`).remove();

    // append shape
    svg
      .append("g")
      .attr("transform", `translate(${strokeWidth},${radius / 2 + strokeWidth})`)
      .append("path")
      .attr(
        "d",
        `M 0,0 a ${radius},${radius / 2} 0,0,0 ${radius * 2} 0 a ${radius},${radius / 2} 0,0,0 -${radius * 2} 0 l 0,${height - radius} a ${radius},${
          radius / 2
        } 0,0,0 ${radius * 2} 0 l 0,-${height - radius}`,
      )
      .attr("fill", fillColor)
      .attr("stroke", lineColor)
      .attr("stroke-width", strokeWidth);

    // append text
    svg.append("foreignObject").attr("width", w).attr("height", h).attr("viewBox", `0 0 ${w} ${h}`).attr("preserveAspectRatio", "xMidYMin slice");

    svg
      .select("foreignObject")
      .append("xhtml:div")
      .attr("class", "lh-1 text-center p-2 shape")
      .style("margin-top", `${radius}px`)
      .style("height", `${height - radius}px`)
      .style("color", fontColor)
      .style("font-size", `${fontSize}px`)
      .style("width", "100%")
      .style("word-wrap", "break-word")
      .text(name);
  }, [JSON.stringify(props)]);

  return <svg ref={svgRef} />;
};

export default CylinderShape;
