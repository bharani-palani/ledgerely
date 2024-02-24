import { lazy } from "react";

const VerticalBarChart = lazy(() => import("./VerticalBarChart"));
const PannableChart = lazy(() => import("./PannableChart"));
const DivergingBarChart = lazy(() => import("./DivergingBarChart"));
const ZoomableCirclePackingChart = lazy(() =>
  import("./ZoomableCirclePackingChart"),
);
const HorizontalBarChart = lazy(() => import("./HorizontalBarChart"));
const StackedVerticalBarChart = lazy(() => import("./StackedVerticalBarChart"));
const PieChart = lazy(() => import("./PieChart"));
const DonutChart = lazy(() => import("./DonutChart"));
const ScatterPlotChart = lazy(() => import("./ScatterPlot/"));

export {
  VerticalBarChart,
  PannableChart,
  DivergingBarChart,
  ZoomableCirclePackingChart,
  HorizontalBarChart,
  StackedVerticalBarChart,
  PieChart,
  DonutChart,
  ScatterPlotChart,
};
