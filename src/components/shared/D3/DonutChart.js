import React, { useRef, useEffect } from "react";
import { tooltip } from "./constants";
import * as d3 from "d3";
import PropTypes from "prop-types";
import { donutChartProps } from "./propsData";

const DonutChart = props => {
  const svgRef = useRef(null);
  const {
    width,
    height,
    outerRadius,
    innerRadius,
    data,
    fillColor,
    style,
    fontSize,
    showTooltip,
    tooltipPrefix,
    tooltipSuffix,
    onClick,
    fontColor,
    showAnimation,
    animationDuration,
    showLegend,
    showXaxisLabel,
    xaxisLabel,
  } = props;
  useEffect(() => {
    const textOffset = 24;

    // OBJECTS TO BE POPULATED WITH DATA LATER
    let valueLabels;
    let nameLabels;
    let pieData = [];
    let oldPieData = [];
    let filteredPieData = [];

    // D3 helper function to populate pie slice parameters from array data
    const donut = d3.pie().value(function (d) {
      return d.value;
    });

    // D3 helper function to create colors from an ordinal scale
    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    const color = d3
      .scaleLinear()
      .domain([0, data.length])
      .range(fillColor)
      .interpolate(d3.interpolateHcl);

    // D3 helper function to draw arcs, populates parameter "d" in path object
    const arc = d3
      .arc()
      .startAngle(function (d) {
        return d.startAngle;
      })
      .endAngle(function (d) {
        return d.endAngle;
      })
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const vis = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // GROUP FOR ARCS/PATHS
    vis.selectAll(`g`).remove();

    const arcGroup = vis
      .append("svg:g")
      .attr("class", "arc")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // GROUP FOR LABELS
    const labelGroup = vis
      .append("svg:g")
      .attr("class", "labelGroup")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // GROUP FOR CENTER TEXT
    const centerGroup = vis
      .append("svg:g")
      .attr("class", "centerGroup")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // // PLACEHOLDER GRAY CIRCLE
    if (showXaxisLabel) {
      centerGroup
        .append("text")
        .html(xaxisLabel)
        .attr("fill", fontColor)
        .attr("font-size", fontSize)
        .attr("text-anchor", "middle");
    }

    // to run each time data is generated
    function update(data) {
      oldPieData = filteredPieData;
      pieData = donut(data);

      let sliceProportion = 0; // size of this slice
      filteredPieData = pieData.filter(filterData);

      function filterData(element, index, array) {
        element.name = data[index].label;
        element.value = data[index].value;
        sliceProportion += element.value;
        return element.value > 0;
      }

      // DRAW ARC PATHS
      const paths = arcGroup.selectAll("path").data(filteredPieData);
      paths
        .enter()
        .append("svg:path")
        .on("click", (d, i) => {
          onClick(d, i);
        })
        .on("mousemove", (e, d) => {
          if (showTooltip) {
            tooltip.style("padding", "5px");
            tooltip.style("opacity", 1);
            tooltip
              .html(
                `<div>${tooltipPrefix} ${
                  d.name
                }</div><div>${d.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}</div><div>${((d.value / sliceProportion) * 100).toFixed(
                  2,
                )}%</div><div>${tooltipSuffix}</div>`,
              )
              .style("left", e.pageX + 15 + "px")
              .style("top", e.pageY - 30 + "px");
          }
        })
        .on("mouseout", d => {
          tooltip.style("padding", 0);
          tooltip.style("opacity", 0);
        })
        .attr("fill", function (d, i) {
          return color(i);
        });

      paths
        .enter()
        .selectAll("path")
        .transition()
        .duration(animationDuration)
        .attrTween(
          "d",
          showAnimation
            ? pieTween
            : d => {
                const ii = d3.interpolate(
                  { startAngle: d.startAngle, endAngle: d.endAngle },
                  { startAngle: d.startAngle, endAngle: d.endAngle },
                );
                return function (t) {
                  const b = ii(t);
                  return arc(b);
                };
              },
        );

      paths
        .exit()
        .transition()
        .duration(animationDuration)
        .attrTween("d", removePieTween)
        .remove();

      if (showLegend) {
        // DRAW TICK MARK LINES FOR LABELS
        const lines = labelGroup.selectAll("line").data(filteredPieData);
        lines
          .enter()
          .append("svg:line")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", -outerRadius - 3)
          .attr("y2", -outerRadius - 15)
          .attr("stroke", "gray")
          .attr("transform", function (d) {
            return (
              "rotate(" +
              ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) +
              ")"
            );
          });
        lines
          .transition()
          .duration(animationDuration)
          .attr("transform", function (d) {
            return (
              "rotate(" +
              ((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) +
              ")"
            );
          });
        lines.exit().remove();

        // DRAW LABELS WITH PERCENTAGE VALUES
        valueLabels = labelGroup
          .selectAll("text.value")
          .data(filteredPieData)
          .attr("dy", function (d) {
            if (
              (d.startAngle + d.endAngle) / 2 > Math.PI / 2 &&
              (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5
            ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function (d) {
            if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
              return "beginning";
            } else {
              return "end";
            }
          })
          .text(function (d) {
            const percentage = (d.value / sliceProportion) * 100;
            return percentage.toFixed(1) + "%";
          });

        valueLabels
          .enter()
          .append("svg:text")
          .attr("class", "value")
          .attr("fill", "currentColor")
          .attr("font-size", fontSize)
          .attr("transform", function (d) {
            return (
              "translate(" +
              Math.cos((d.startAngle + d.endAngle - Math.PI) / 2) *
                (outerRadius + textOffset) +
              "," +
              Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                (outerRadius + textOffset) +
              ")"
            );
          })
          .attr("dy", function (d) {
            if (
              (d.startAngle + d.endAngle) / 2 > Math.PI / 2 &&
              (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5
            ) {
              return 5;
            } else {
              return -7;
            }
          })
          .attr("text-anchor", function (d) {
            if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
              return "beginning";
            } else {
              return "end";
            }
          })
          .attr("fill", fontColor)
          .text(function (d) {
            const percentage = (d.value / sliceProportion) * 100;
            return percentage.toFixed(2) + "%";
          });

        valueLabels
          .transition()
          .duration(animationDuration)
          .attrTween("transform", textTween);

        valueLabels.exit().remove();

        // DRAW LABELS WITH ENTITY NAMES
        nameLabels = labelGroup
          .selectAll("text.units")
          .data(filteredPieData)
          .attr("dy", function (d) {
            if (
              (d.startAngle + d.endAngle) / 2 > Math.PI / 2 &&
              (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5
            ) {
              return 17;
            } else {
              return 5;
            }
          })
          .attr("text-anchor", function (d) {
            if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
              return "beginning";
            } else {
              return "end";
            }
          })
          .text(function (d) {
            return d.name;
          });

        nameLabels
          .enter()
          .append("svg:text")
          .attr("class", "units")
          .attr("font-size", fontSize)
          .attr("transform", function (d) {
            return (
              "translate(" +
              Math.cos((d.startAngle + d.endAngle - Math.PI) / 2) *
                (outerRadius + textOffset) +
              "," +
              Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) *
                (outerRadius + textOffset) +
              ")"
            );
          })
          .attr("dy", function (d) {
            if (
              (d.startAngle + d.endAngle) / 2 > Math.PI / 2 &&
              (d.startAngle + d.endAngle) / 2 < Math.PI * 1.5
            ) {
              return 25;
            } else {
              return 10;
            }
          })
          .attr("text-anchor", function (d) {
            if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
              return "beginning";
            } else {
              return "end";
            }
          })
          .attr("fill", fontColor)
          .text(function (d) {
            return d.name;
          });

        nameLabels
          .transition()
          .duration(animationDuration)
          .attrTween("transform", textTween);

        nameLabels.exit().remove();
      }
    }

    // Interpolate the arcs in data space.
    function pieTween(d, i) {
      let s0;
      let e0;
      if (oldPieData[i]) {
        s0 = oldPieData[i].startAngle;
        e0 = oldPieData[i].endAngle;
      } else if (!oldPieData[i] && oldPieData[i - 1]) {
        s0 = oldPieData[i - 1].endAngle;
        e0 = oldPieData[i - 1].endAngle;
      } else if (!oldPieData[i - 1] && oldPieData.length > 0) {
        s0 = oldPieData[oldPieData.length - 1].endAngle;
        e0 = oldPieData[oldPieData.length - 1].endAngle;
      } else {
        s0 = 0;
        e0 = 0;
      }
      const ii = d3.interpolate(
        { startAngle: s0, endAngle: e0 },
        { startAngle: d.startAngle, endAngle: d.endAngle },
      );
      return function (t) {
        const b = ii(t);
        return arc(b);
      };
    }

    function removePieTween(d, i) {
      s0 = 2 * Math.PI;
      e0 = 2 * Math.PI;
      const ii = d3.interpolate(
        { startAngle: d.startAngle, endAngle: d.endAngle },
        { startAngle: s0, endAngle: e0 },
      );
      return function (t) {
        const b = ii(t);
        return arc(b);
      };
    }

    function textTween(d, i) {
      let a;
      if (oldPieData[i]) {
        a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI) / 2;
      } else if (!oldPieData[i] && oldPieData[i - 1]) {
        a =
          (oldPieData[i - 1].startAngle +
            oldPieData[i - 1].endAngle -
            Math.PI) /
          2;
      } else if (!oldPieData[i - 1] && oldPieData.length > 0) {
        a =
          (oldPieData[oldPieData.length - 1].startAngle +
            oldPieData[oldPieData.length - 1].endAngle -
            Math.PI) /
          2;
      } else {
        a = 0;
      }
      const b = (d.startAngle + d.endAngle - Math.PI) / 2;

      const fn = d3.interpolateNumber(a, b);
      return function (t) {
        const val = fn(t);
        return (
          "translate(" +
          Math.cos(val) * (outerRadius + textOffset) +
          "," +
          Math.sin(val) * (outerRadius + textOffset) +
          ")"
        );
      };
    }

    update(data);
  }, [JSON.stringify(props)]);

  return <svg style={style} ref={svgRef}></svg>;
};

DonutChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  outerRadius: PropTypes.number,
  innerRadius: PropTypes.number,
  data: PropTypes.array,
  fillColor: PropTypes.array,
  style: PropTypes.object,
  fontSize: PropTypes.number,
  showTooltip: PropTypes.bool,
  tooltipPrefix: PropTypes.string,
  tooltipSuffix: PropTypes.string,
  onClick: PropTypes.func,
  fontColor: PropTypes.string,
  showAnimation: PropTypes.bool,
  animationDuration: PropTypes.number,
  showLegend: PropTypes.bool,
  showXaxisLabel: PropTypes.bool,
  xaxisLabel: PropTypes.string,
};

DonutChart.defaultProps = donutChartProps;

export default DonutChart;
