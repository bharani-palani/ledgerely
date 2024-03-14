import React, { useRef } from "react";
import * as d3 from "d3";
import ReactFauxDom from "react-faux-dom";
import cloud from "d3-cloud";
import isDeepEqual from "react-fast-compare";

const defaultScaleOrdinal = d3.scaleOrdinal(d3[`schemeCategory10`]);

const WordCloud = ({
  data,
  width,
  height,
  font = "serif",
  fontStyle = "normal",
  fontWeight = "normal",
  fontSize = d => Math.sqrt(d.value),
  rotate = () => (~~(Math.random() * 6) - 3) * 30,
  spiral = "archimedean",
  padding = 1,
  random = Math.random,
  fill = (_, i) => defaultScaleOrdinal(i),
  onWordClick,
  onWordMouseOver,
  onWordMouseOut,
}) => {
  const elementRef = useRef();

  if (!elementRef.current) {
    elementRef.current = ReactFauxDom.createElement("div");
  }

  const el = elementRef.current;

  // clear old words
  d3.select(el).selectAll("*").remove();

  // render based on new data
  const layout = cloud()
    .words(data)
    .size([width, height])
    .font(font)
    .fontStyle(fontStyle)
    .fontWeight(fontWeight)
    .fontSize(fontSize)
    .rotate(rotate)
    .spiral(spiral)
    .padding(padding)
    .random(random)
    .on("end", words => {
      const [w, h] = layout.size();

      const texts = d3
        .select(el)
        .append("svg")
        .attr("viewBox", `0 0 ${w} ${h}`)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", `translate(${w / 2},${h / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-family", d => d.font)
        .style("font-style", d => d.style)
        .style("font-weight", d => d.weight)
        .style("font-size", d => `${d.size}px`)
        .style("fill", fill)
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text(d => d.text);

      if (onWordClick) {
        texts.on("click", onWordClick);
      }
      if (onWordMouseOver) {
        texts.on("mouseover", onWordMouseOver);
      }
      if (onWordMouseOut) {
        texts.on("mouseout", onWordMouseOut);
      }
    });

  layout.start();

  return el.toReact();
};

export default React.memo(WordCloud, isDeepEqual);
