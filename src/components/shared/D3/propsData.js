import { appThemeBgColor, appThemeColor, animationList } from "./constants";
import {
  divergingBarChartData,
  pannableChartData,
  stackedVerticalBarChartData,
  zoomableCirclePackingChartData,
  scatterPlotChartData,
  DensityChartData,
  BoxPlotChartData,
  LinChartData,
  VoronoiChartdata,
  circularBarChartData,
  wordCloudChartData,
} from "./mockData";
import * as d3 from "d3";

const divergingBarChartProps = {
  name: "Diverging chart",
  width: 600,
  height: 300,
  barHeight: 20,
  marginTop: 30,
  marginRight: 60,
  marginBottom: 10,
  marginLeft: 60,
  metric: "relative",
  fillColor: appThemeBgColor,
  fontColor: "currentColor",
  lineColor: "currentColor",
  fontSize: 14,
  data: divergingBarChartData,
  showAnimation: true,
  showTooltip: true,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showXaxis: true,
  showYaxis: true,
  yTicks: 6,
  padding: 0.1,
  showAnimation: true,
  animationClass: animationList[0]?.id,
  onClick: () => {},
};

const pannableChartProps = {
  name: "Pannable chart",
  width: 700,
  height: 300,
  marginTop: 10,
  marginRight: 20,
  marginBottom: 40,
  marginLeft: 50,
  fillColor: appThemeBgColor,
  fontColor: appThemeBgColor,
  lineColor: "currentColor",
  yAxisLabel: "y-axis",
  data: pannableChartData,
  showYaxisLine: true,
  showXaxis: true,
  showYaxis: true,
  showYaxisLabel: true,
  yTicks: 6,
  showAnimation: true,
  animationClass: animationList[0]?.id,
  onClick: () => {},
};

const donutChartProps = {
  name: "Donut chart",
  width: 350,
  height: 350,
  outerRadius: 100,
  innerRadius: 70,
  data: [12, 23, 34, 45, 56].map((m, i) => ({
    label: "Sample " + (i + 1),
    value: m,
  })),
  fillColor: [appThemeBgColor, appThemeColor],
  fontSize: 12,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showTooltip: true,
  fontColor: "currentColor",
  showAnimation: true,
  showLegend: true,
  showXaxisLabel: true,
  xAxisLabel: "Sample",
  showXaxisLabel: true,
  animationClass: animationList[0]?.id,
  onClick: () => {},
};

const horizontalBarChartProps = {
  name: "Horizontal bar chart",
  width: 600,
  barHeight: 20,
  data: new Array(10).fill("_").map((_, i) => ({
    label: `C${i + 1}`,
    value: Number((Math.random() * 100).toFixed(2)),
  })),
  marginTop: 30,
  marginRight: 50,
  marginBottom: 10,
  marginLeft: 60,
  sortClause: "",
  padding: 0.05,
  style: {},
  fillColor: appThemeBgColor,
  fontColor: "currentColor",
  lineColor: appThemeBgColor,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showTooltip: true,
  fontSize: 12,
  showAnimation: true,
  animationClass: animationList[0]?.id,
  onClick: () => {},
};

const pieChartProps = {
  name: "Pie chart",
  width: 250,
  height: 250,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showTooltip: true,
  fillColor: [appThemeBgColor, appThemeColor],
  fontColor: "currentColor",
  data: [
    { label: "<5", value: 45000 },
    { label: "5-9", value: 30000 },
    { label: "10-14", value: 40000 },
    { label: "15-19", value: 50000 },
    { label: "20-24", value: 60000 },
    { label: "25-29", value: 70000 },
    { label: "30-34", value: 80000 },
  ],
  fontSize: 12,
  showXaxisLabel: true,
  showYaxisLabel: true,
  sortClause: "",
  lineColor: "#555",
  showAnimation: true,
  animationClass: animationList[0]?.id,
  className: "",
  onClick: () => {},
};

const stackedVerticalBarChartProps = {
  name: "Stacked vertical bar chart",
  width: 500,
  height: 200,
  marginTop: 10,
  marginRight: 10,
  marginBottom: 20,
  marginLeft: 80,
  fillColor: [appThemeBgColor, appThemeColor],
  fontColor: "currentColor",
  lineColor: "currentColor",
  showTooltip: true,
  padding: 0.01,
  yTicks: 6,
  showAnimation: true,
  animationClass: animationList[0]?.id,
  sortClause: "",
  data: stackedVerticalBarChartData.filter(f =>
    ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL"].includes(
      f.label,
    ),
  ),
  showYaxis: true,
  showXaxis: true,
  showXaxisLabel: true,
  showXaxisLine: true,
  showYaxisLine: true,
  showYaxisLabel: true,
  fontSize: 12,
  onClick: () => {},
};

const verticalBarChartProps = {
  name: "Vertical bar chart",
  width: 700,
  height: 200,
  marginTop: 20,
  marginRight: 10,
  marginBottom: 40,
  marginLeft: 60,
  fillColor: appThemeBgColor,
  fontColor: appThemeBgColor,
  lineColor: "currentColor",
  yAxisLabel: "y-axis",
  xAxisLabel: "x-axis",
  padding: 0.01,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showTooltip: true,
  data: new Array(20).fill("_").map((_, i) => ({
    label: `C${i + 1}`,
    value: Number((Math.random() * 100).toFixed(2)),
  })),
  showYaxisLine: true,
  showXaxis: true,
  showXaxisLabel: true,
  showYaxis: true,
  showYaxisLabel: true,
  showAnimation: true,
  showLegend: true,
  animationClass: animationList[0]?.id,
  sortClause: "",
  xAxisTicksOrientation: "horizontal",
  fontSize: 12,
  yTicks: 6,
  onClick: () => {},
};

const zoomableCirclePackingChartProps = {
  name: "zoomable circle packing chart",
  width: 600,
  height: 600,
  fillColor: [appThemeBgColor, appThemeColor],
  padding: 3,
  tooltipPrefix: "",
  tooltipSuffix: "",
  showTooltip: true,
  fontSize: 10,
  showAnimation: true,
  animationClass: animationList[0]?.id,
  data: zoomableCirclePackingChartData,
  onClick: () => {},
};

const allChartProps = {
  width: 0,
  height: 0,
  innerRadius: 0,
  outerRadius: 0,
  barHeight: 0,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  padding: 0,
  fontSize: 14,
  markerSize: 1,
  xTicks: 1,
  yTicks: 1,
  fillColor: [],
  fontColor: [],
  lineColor: [],
  name: "",
  xAxisLabel: "",
  yAxisLabel: "",
  tooltipPrefix: "",
  tooltipSuffix: "",
  className: "",
  animationClass: "",
  xAxisTicksOrientation: "horizontal",
  sortClause: "asc",
  showTooltip: true,
  showXaxisLabel: true,
  showXaxisLine: true,
  showYaxisLine: true,
  showXaxis: true,
  showYaxis: true,
  showYaxisLabel: true,
  showAnimation: true,
  showLegend: true,
  data: [],
  onClick: () => {},
};

const scatterPlotChartProps = {
  name: "Scatter plot chart",
  width: 500,
  height: 300,
  marginTop: 60,
  marginRight: 60,
  marginBottom: 60,
  marginLeft: 70,
  data: scatterPlotChartData,
  fillColor: d3[`schemeSet1`],
  fontColor: appThemeBgColor,
  lineColor: appThemeBgColor,
  xTicks: 40,
  yTicks: 40,
  markerSize: 7,
  fontSize: 14,
  showTooltip: true,
  tooltipPrefix: "",
  tooltipSuffix: "",
  yAxisLabel: "Y - Axis",
  xAxisLabel: "X - Axis",
  showYaxisLabel: true,
  showXaxisLabel: true,
  showYaxisLine: true,
  showXaxisLine: true,
  animationClass: animationList[0]?.id,
  showAnimation: true,
  showXaxis: true,
  showYaxis: true,
  onClick: () => {},
};

const densityChartProps = {
  name: "Density chart",
  width: 500,
  height: 300,
  data: DensityChartData,
  marginTop: 30,
  marginRight: 30,
  marginBottom: 60,
  marginLeft: 30,
  fillColor: appThemeBgColor,
  fontColor: appThemeBgColor,
  lineColor: appThemeBgColor,
  showXaxisLabel: true,
  fontSize: 12,
  xAxisLabel: "X - Axis",
  showXaxis: true,
  animationClass: animationList[0]?.id,
  showAnimation: true,
  onClick: () => {},
};

const boxPlotChartProps = {
  name: "Box plot chart",
  width: 700,
  height: 400,
  data: BoxPlotChartData,
  marginTop: 30,
  marginRight: 30,
  marginBottom: 60,
  marginLeft: 60,
  markerSize: 1,
  fillColor: appThemeBgColor,
  fontColor: appThemeBgColor,
  lineColor: appThemeBgColor,
  padding: 0.7,
  fontSize: 12,
  showXaxis: true,
  showYaxis: true,
  showYaxisLabel: true,
  showXaxisLabel: true,
  showYaxisLine: true,
  showXaxisLine: true,
  xAxisLabel: "x-axis",
  yAxisLabel: "y-axis",
  animationClass: animationList[0]?.id,
  showAnimation: true,
  xAxisTicksOrientation: "horizontal",
  onClick: () => {},
};

const lineChartProps = {
  name: "Line chart",
  width: 500,
  height: 200,
  data: LinChartData,
  marginTop: 30,
  marginRight: 30,
  marginBottom: 50,
  marginLeft: 60,
  markerSize: 1,
  fontSize: 12,
  fillColor: appThemeBgColor,
  fontColor: appThemeBgColor,
  lineColor: appThemeBgColor,
  showXaxis: true,
  showYaxis: true,
  showYaxisLabel: true,
  showXaxisLabel: true,
  showYaxisLine: true,
  showXaxisLine: true,
  xAxisLabel: "x-axis",
  yAxisLabel: "y-axis",
  showAnimation: true,
  xAxisTicksOrientation: "horizontal",
  animationClass: animationList[0]?.id,
  onClick: () => {},
};

const voronoiChartProps = {
  name: "Voronoi chart",
  width: 500,
  height: 200,
  data: VoronoiChartdata,
  markerSize: 7,
  lineColor: appThemeColor,
  fillColor: appThemeBgColor,
  showTooltip: true,
  tooltipPrefix: "",
  tooltipSuffix: "",
  animationClass: animationList[0]?.id,
  showAnimation: true,
  className: "",
  onClick: () => {},
};

const circularBarChartProps = {
  name: "Circular bar chart",
  width: 400,
  height: 400,
  data: circularBarChartData,
  marginTop: 30,
  marginRight: 0,
  marginBottom: 30,
  marginLeft: 0,
  fontSize: 12,
  fillColor: appThemeBgColor,
  fontColor: appThemeBgColor,
  lineColor: appThemeBgColor,
  innerRadius: 10,
  padding: 0.2,
  opacity: 0.7,
  showTooltip: true,
  tooltipPrefix: "",
  tooltipSuffix: "",
  sortClause: "",
  showAnimation: true,
  showLegend: true,
  animationClass: animationList[0]?.id,
  onClick: () => {},
};

const wordCloudChartProps = {
  name: "Word cloud chart",
  width: 400,
  height: 300,
  data: wordCloudChartData,
  fontColor: new Array(25).fill(appThemeBgColor),
  padding: 1,
  showAnimation: true,
  animationClass: animationList[0]?.id,
  opacity: 1,
};

const circleShapeProps = {
  name: "Circle",
  width: 100,
  height: 100,
  fillColor: appThemeBgColor,
  fontColor: appThemeColor,
  lineColor: appThemeBgColor,
  fontSize: 12,
  strokeWidth: 1,
  showAnimation: true,
  animationClass: animationList[0]?.id,
};

const triangleShapeProps = {
  name: "Triangle",
  width: 100,
  height: 100,
  fillColor: appThemeBgColor,
  fontColor: appThemeColor,
  lineColor: appThemeBgColor,
  fontSize: 12,
  strokeWidth: 1,
  showAnimation: true,
  animationClass: animationList[0]?.id,
};

export {
  divergingBarChartProps,
  pannableChartProps,
  donutChartProps,
  horizontalBarChartProps,
  pieChartProps,
  stackedVerticalBarChartProps,
  verticalBarChartProps,
  zoomableCirclePackingChartProps,
  scatterPlotChartProps,
  allChartProps,
  densityChartProps,
  boxPlotChartProps,
  lineChartProps,
  voronoiChartProps,
  circularBarChartProps,
  wordCloudChartProps,
  circleShapeProps,
  triangleShapeProps,
};
