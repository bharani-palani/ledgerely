import * as d3 from "d3";

const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");
const appThemeColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-color");
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
  .style("border-radius", "5px")
  .style("color", "#ffffff");

const animationList = [
  { id: "animate__animated animate__bounce", value: "Bounce" },
  { id: "animate__animated animate__flash", value: "Flash" },
  { id: "animate__animated animate__pulse", value: "Pulse" },
  {
    id: "animate__animated animate__rubberBand",
    value: "Rubberband",
  },
  {
    id: "animate__animated animate__shakeX",
    value: "Shake horizontal",
  },
  {
    id: "animate__animated animate__shakeY",
    value: "Shake vertical",
  },
  {
    id: "animate__animated animate__headShake",
    value: "Headshake",
  },
  { id: "animate__animated animate__swing", value: "Swing" },
  { id: "animate__animated animate__tada", value: "Tada" },
  { id: "animate__animated animate__wobble", value: "Wobble" },
  { id: "animate__animated animate__jello", value: "Jello" },
  {
    id: "animate__animated animate__heartBeat",
    value: "Heart beat",
  },
  {
    id: "animate__animated animate__backInDown",
    value: "Back in down",
  },
  {
    id: "animate__animated animate__backInLeft",
    value: "Back in left",
  },
  {
    id: "animate__animated animate__backInRight",
    value: "Back in right",
  },
  {
    id: "animate__animated animate__backInUp",
    value: "Back in up",
  },
  { id: "animate__animated animate__bounceIn", value: "Bounce in" },
  {
    id: "animate__animated animate__bounceInDown",
    value: "Bounce in down",
  },
  {
    id: "animate__animated animate__bounceInLeft",
    value: "Bounce in left",
  },
  {
    id: "animate__animated animate__bounceInRight",
    value: "Bounce in right",
  },
  {
    id: "animate__animated animate__bounceInUp",
    value: "Bounce in up",
  },
  { id: "animate__animated animate__fadeIn", value: "Fade in" },
  {
    id: "animate__animated animate__fadeInDown",
    value: "Fade in down",
  },
  {
    id: "animate__animated animate__fadeInDownBig",
    value: "Fade in down big",
  },
  {
    id: "animate__animated animate__fadeInLeft",
    value: "Fade in left",
  },
  {
    id: "animate__animated animate__fadeInLeftBig",
    value: "Fadeinleftbig",
  },
  {
    id: "animate__animated animate__fadeInRight",
    value: "Fade in right",
  },
  {
    id: "animate__animated animate__fadeInRightBig",
    value: "Fade in right big",
  },
  {
    id: "animate__animated animate__fadeInUp",
    value: "Fade in up",
  },
  {
    id: "animate__animated animate__fadeInUpBig",
    value: "Fade in up big",
  },
  {
    id: "animate__animated animate__fadeInTopLeft",
    value: "Fade in top left",
  },
  {
    id: "animate__animated animate__fadeInTopRight",
    value: "Fade in top right",
  },
  {
    id: "animate__animated animate__fadeInBottomLeft",
    value: "Fade in bottom left",
  },
  {
    id: "animate__animated animate__fadeInBottomRight",
    value: "Fade in bottom right",
  },
  { id: "animate__animated animate__flip", value: "Flip" },
  {
    id: "animate__animated animate__flipInX",
    value: "Flipin horizontal",
  },
  {
    id: "animate__animated animate__flipInY",
    value: "Flipin vertical",
  },
  {
    id: "animate__animated animate__lightSpeedInRight",
    value: "Light speed in right",
  },
  {
    id: "animate__animated animate__lightSpeedInLeft",
    value: "Light speed in left",
  },
  { id: "animate__animated animate__rotateIn", value: "Rotate in" },
  {
    id: "animate__animated animate__rotateInDownLeft",
    value: "Rotate in down left",
  },
  {
    id: "animate__animated animate__rotateInDownRight",
    value: "Rotate in down right",
  },
  {
    id: "animate__animated animate__rotateInUpLeft",
    value: "Rotate in up left",
  },
  {
    id: "animate__animated animate__rotateInUpLeft",
    value: "Rotate in up left",
  },
  {
    id: "animate__animated animate__jackInTheBox",
    value: "Jack in the box",
  },
  { id: "animate__animated animate__rollIn", value: "Roll in" },
  { id: "animate__animated animate__zoomIn", value: "Zoom in" },
  {
    id: "animate__animated animate__zoomInDown",
    value: "Zoom in down",
  },
  {
    id: "animate__animated animate__zoomInLeft",
    value: "Zoom in left",
  },
  {
    id: "animate__animated animate__zoomInRight",
    value: "Zoom in right",
  },
  {
    id: "animate__animated animate__zoomInUp",
    value: "Zoom in up",
  },
  {
    id: "animate__animated animate__slideInDown",
    value: "Slide in down",
  },
  {
    id: "animate__animated animate__slideInLeft",
    value: "Slide in left",
  },
  {
    id: "animate__animated animate__slideInRight",
    value: "Slide in right",
  },
  {
    id: "animate__animated animate__slideInUp",
    value: "Slide in up",
  },
];

const CHART_TYPES = {
  0: "CIRCULAR",
  1: "BAR",
  2: "DISTRIBUTION",
  3: "CORRELATION",
  4: "SHAPES",
  5: "EMOJI",
};

const CHART_SIZE = {
  minWidth: 100,
  maxWidth: 1000,
  minHeight: 100,
  maxHeight: 1000,
};

const WORKBOOK_CONFIG = {
  chartLimit: Math.pow(2, 8), // 256
  sheetLimit: Math.pow(2, 5), // 32
};

export {
  tooltip,
  appThemeBgColor,
  appThemeColor,
  successColor,
  dangerColor,
  warningColor,
  infoColor,
  animationList,
  CHART_TYPES,
  CHART_SIZE,
  WORKBOOK_CONFIG,
};
