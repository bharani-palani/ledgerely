import * as d3 from "d3";

const appThemeBgColor = "#c2d82e";
const appThemeColor = "#000000";
const successColor = "#198754";
const dangerColor = "#dc3545";
const warningColor = "#ffc107";
const infoColor = "#0dcaf0";
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .attr("role", "tooltip")
  .style("position", "absolute")
  .style("background", "#222222")
  .style("padding", "5px")
  .style("border-radius", "5px")
  .style("color", "#ffffff");

export {
  tooltip,
  appThemeBgColor,
  appThemeColor,
  successColor,
  dangerColor,
  warningColor,
  infoColor,
};
