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
const DensityChart = lazy(() => import("./DensityChart/"));
const BoxPlotChart = lazy(() => import("./BoxPlotChart/"));
const LineChart = lazy(() => import("./LineChart"));
const VoronoiChart = lazy(() => import("./VoronoiChart"));
const CircularBarChart = lazy(() => import("./CircularBarChart"));
const WordCloudChart = lazy(() => import("./WordCloudChart/"));
const CircleShape = lazy(() => import("./CircleShape"));
const TriangleShape = lazy(() => import("./TriangleShape"));
const SquareShape = lazy(() => import("./SquareShape"));
const DiamondShape = lazy(() => import("./DiamondShape"));
const Tshape = lazy(() => import("./Tshape"));
const HorizontalArrowShape = lazy(() => import("./HorizontalArrowShape"));
const DoubleArrowShape = lazy(() => import("./DoubleArrowShape"));
const ParllelogramShape = lazy(() => import("./ParllelogramShape"));
const CylinderShape = lazy(() => import("./CylinderShape"));
const DirectionArrowShape = lazy(() => import("./DirectionArrowShape"));
const SmileyEmoji = lazy(() => import("./SmileyEmoji"));
const LineShape = lazy(() => import("./LineShape"));

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
  DensityChart,
  BoxPlotChart,
  LineChart,
  VoronoiChart,
  CircularBarChart,
  WordCloudChart,
  CircleShape,
  TriangleShape,
  SquareShape,
  DiamondShape,
  Tshape,
  HorizontalArrowShape,
  DoubleArrowShape,
  ParllelogramShape,
  CylinderShape,
  DirectionArrowShape,
  SmileyEmoji,
  LineShape,
};
