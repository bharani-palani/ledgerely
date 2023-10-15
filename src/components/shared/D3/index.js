import { lazy } from "react";

const BarChart = lazy(() => import("./BarChart"));
const PannableChart = lazy(() => import("./PannableChart"));
const DivergingBarChart = lazy(() => import("./DivergingBarChart"));
const ZoomableCirclePackingChart = lazy(() =>
  import("./ZoomableCirclePackingChart"),
);

export {
  BarChart,
  PannableChart,
  DivergingBarChart,
  ZoomableCirclePackingChart,
};
