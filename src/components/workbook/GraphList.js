import React, { lazy, useContext, useEffect, useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import {
  divergingBarChartProps,
  pannableChartProps,
  donutChartProps,
  horizontalBarChartProps,
  pieChartProps,
  stackedVerticalBarChartProps,
  verticalBarChartProps,
  scatterPlotChartProps,
  densityChartProps,
  boxPlotChartProps,
  lineChartProps,
  voronoiChartProps,
  circularBarChartProps,
  wordCloudChartProps,
  circleShapeProps,
  triangleShapeProps,
  squareShapeProps,
  diamondShapeProps,
  tShapeProps,
  horizontalArrowShapeProps,
  doubleArrowShapeProps,
  parllelogramShapeProps,
  cylinderShapeProps,
  directionArrowShapeProps,
  smileyEmojiProps,
  lineShapeProps,
  tableProps,
} from "../../components/shared/D3/propsData";
import WorkbookContext from "./WorkbookContext";
import { UserContext } from "../../contexts/UserContext";
import { useIntl } from "react-intl";

const VerticalBarChartSvg = lazy(() => import("../../images/charts/svgComponents/VerticalBarChartSvg"));
const PieChartSvg = lazy(() => import("../../images/charts/svgComponents/PieChartSvg"));
const DivergingChartSvg = lazy(() => import("../../images/charts/svgComponents/DivergingChartSvg"));
const HorizontalBarChartSvg = lazy(() => import("../../images/charts/svgComponents/HorizontalBarChartSvg"));
const StackedVerticalChartSvg = lazy(() => import("../../images/charts/svgComponents/StackedVerticalChartSvg"));
const TableSvg = lazy(() => import("../../images/charts/svgComponents/TableSvg"));
const DonutChartSvg = lazy(() => import("../../images/charts/svgComponents/DonutChartSvg"));
const ScatterPlotChartSvg = lazy(() => import("../../images/charts/svgComponents/ScatterPlotChartSvg"));
const DensityChartSvg = lazy(() => import("../../images/charts/svgComponents/DensityChartSvg"));
const BoxPlotChartSvg = lazy(() => import("../../images/charts/svgComponents/BoxPlotChartSvg"));
const LineChartSvg = lazy(() => import("../../images/charts/svgComponents/LineChartSvg"));

const GraphList = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const workbookContext = useContext(WorkbookContext);
  const categories = [
    {
      id: null,
      label: intl.formatMessage({
        id: "all",
        defaultMessage: "all",
      }),
    },
    {
      id: 0,
      label: intl.formatMessage({
        id: "circular",
        defaultMessage: "circular",
      }),
    },
    {
      id: 1,
      label: intl.formatMessage({
        id: "blocks",
        defaultMessage: "blocks",
      }),
    },
    {
      id: 2,
      label: intl.formatMessage({
        id: "distribution",
        defaultMessage: "distribution",
      }),
    },
    {
      id: 3,
      label: intl.formatMessage({
        id: "correlation",
        defaultMessage: "correlation",
      }),
    },
    {
      id: 4,
      label: intl.formatMessage({
        id: "shapes",
        defaultMessage: "shapes",
      }),
    },
    {
      id: 5,
      label: intl.formatMessage({
        id: "emoji",
        defaultMessage: "emoji",
      }),
    },
  ];
  const [cat, setCat] = useState(null);
  const allCharts = [
    {
      id: null,
      name: intl.formatMessage({
        id: "verticalBarChart",
        defaultMessage: "verticalBarChart",
      }),
      location: VerticalBarChartSvg,
      chartKey: "VerticalBarChart",
      visibility: true,
      catId: 1,
      props: { ...verticalBarChartProps },
      x: 0,
      y: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "label", target: "" },
          { source: "value", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "pieChart",
        defaultMessage: "pieChart",
      }),
      location: PieChartSvg,
      chartKey: "PieChart",
      visibility: true,
      props: { ...pieChartProps },
      x: 0,
      y: 0,
      catId: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "label", target: "" },
          { source: "value", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "divergingChart",
        defaultMessage: "divergingChart",
      }),
      location: DivergingChartSvg,
      chartKey: "DivergingBarChart",
      visibility: true,
      props: { ...divergingBarChartProps },
      x: 0,
      y: 0,
      catId: 1,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "label", target: "" },
          { source: "before", target: "" },
          { source: "after", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "horizontalBarChart",
        defaultMessage: "horizontalBarChart",
      }),
      location: HorizontalBarChartSvg,
      chartKey: "HorizontalBarChart",
      visibility: true,
      catId: 1,
      props: { ...horizontalBarChartProps },
      x: 0,
      y: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "label", target: "" },
          { source: "value", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "stackedVerticalChart",
        defaultMessage: "stackedVerticalChart",
      }),
      location: StackedVerticalChartSvg,
      chartKey: "StackedVerticalBarChart",
      catId: 1,
      visibility: true,
      props: { ...stackedVerticalBarChartProps },
      x: 0,
      y: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "label", target: "" },
          { source: "where", target: "" },
          { source: "value", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "tables",
        defaultMessage: "tables",
      }),
      location: TableSvg,
      chartKey: "Table",
      catId: 1,
      visibility: true,
      props: { ...tableProps },
      x: 0,
      y: 0,
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "donutChart",
        defaultMessage: "donutChart",
      }),
      location: DonutChartSvg,
      chartKey: "DonutChart",
      visibility: true,
      catId: 0,
      props: { ...donutChartProps },
      x: 0,
      y: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "label", target: "" },
          { source: "value", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "scatterPlotChart",
        defaultMessage: "scatterPlotChart",
      }),
      location: ScatterPlotChartSvg,
      chartKey: "ScatterPlotChart",
      visibility: true,
      props: { ...scatterPlotChartProps },
      x: 0,
      y: 0,
      catId: 3,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "group", target: "" },
          { source: "subGroup", target: "" },
          { source: "size", target: "" },
          { source: "x", target: "" },
          { source: "y", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "densityChart",
        defaultMessage: "densityChart",
      }),
      location: DensityChartSvg,
      chartKey: "DensityChart",
      catId: 2,
      visibility: true,
      props: { ...densityChartProps },
      x: 0,
      y: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [{ source: "x", target: "" }],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "boxPlotChart",
        defaultMessage: "boxPlotChart",
      }),
      location: BoxPlotChartSvg,
      chartKey: "BoxPlotChart",
      catId: 2,
      visibility: true,
      props: { ...boxPlotChartProps },
      x: 0,
      y: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "name", target: "" },
          { source: "value", target: "" },
        ],
      },
    },
    {
      id: null,
      name: intl.formatMessage({
        id: "lineChart",
        defaultMessage: "lineChart",
      }),
      location: LineChartSvg,
      chartKey: "LineChart",
      catId: 3,
      visibility: true,
      props: { ...lineChartProps },
      x: 0,
      y: 0,
      massageConfig: {
        type: "arrayOfObjects",
        keys: [
          { source: "x", target: "" },
          { source: "y", target: "" },
        ],
      },
    },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "voronoiChart",
    //     defaultMessage: "voronoiChart",
    //   }),
    //   location: require("../../images/charts/VoronoiChart.svg").default,
    //   chartKey: "VoronoiChart",
    //   catId: 3,
    //   visibility: true,
    //   props: { ...voronoiChartProps },
    //   x: 0,
    //   y: 0,
    //   massageConfig: {
    //     type: "arrayOfObjects",
    //     keys: [
    //       { source: "label", target: "" },
    //       { source: "x", target: "" },
    //       { source: "y", target: "" },
    //     ],
    //   },
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "circularBarChart",
    //     defaultMessage: "circularBarChart",
    //   }),
    //   location: require("../../images/charts/CircularBarChart.svg").default,
    //   chartKey: "CircularBarChart",
    //   catId: 0,
    //   visibility: true,
    //   props: { ...circularBarChartProps },
    //   x: 0,
    //   y: 0,
    //   massageConfig: {
    //     type: "arrayOfObjects",
    //     keys: [
    //       { source: "name", target: "" },
    //       { source: "value", target: "" },
    //     ],
    //   },
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "wordCloudChart",
    //     defaultMessage: "wordCloudChart",
    //   }),
    //   location: require("../../images/charts/WordCloudChart.svg").default,
    //   chartKey: "WordCloudChart",
    //   catId: 2,
    //   visibility: true,
    //   props: { ...wordCloudChartProps },
    //   x: 0,
    //   y: 0,
    //   massageConfig: {
    //     type: "arrayOfObjects",
    //     keys: [
    //       { source: "text", target: "" },
    //       { source: "value", target: "" },
    //     ],
    //   },
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "pannableChart",
    //     defaultMessage: "pannableChart",
    //   }),
    //   location: require("../../images/charts/PannableChart.svg").default,
    //   chartKey: "PannableChart",
    //   visibility: true,
    //   catId: 2,
    //   props: { ...pannableChartProps },
    //   x: 0,
    //   y: 0,
    //   massageConfig: {
    //     type: "arrayOfObjects",
    //     keys: [
    //       { source: "date", target: "" },
    //       { source: "value", target: "" },
    //     ],
    //   },
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "text",
    //     defaultMessage: "text",
    //   }),
    //   location: require("../../images/charts/Tshape.svg").default,
    //   chartKey: "Tshape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...tShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "circle",
    //     defaultMessage: "circle",
    //   }),
    //   location: require("../../images/charts/CircleShape.svg").default,
    //   chartKey: "CircleShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...circleShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "triangle",
    //     defaultMessage: "triangle",
    //   }),
    //   location: require("../../images/charts/TriangleShape.svg").default,
    //   chartKey: "TriangleShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...triangleShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "square",
    //     defaultMessage: "square",
    //   }),
    //   location: require("../../images/charts/SquareShape.svg").default,
    //   chartKey: "SquareShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...squareShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "diamond",
    //     defaultMessage: "diamond",
    //   }),
    //   location: require("../../images/charts/DiamondShape.svg").default,
    //   chartKey: "DiamondShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...diamondShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "parllelogram",
    //     defaultMessage: "parllelogram",
    //   }),
    //   location: require("../../images/charts/ParllelogramShape.svg").default,
    //   chartKey: "ParllelogramShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...parllelogramShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "cylinder",
    //     defaultMessage: "cylinder",
    //   }),
    //   location: require("../../images/charts/CylinderShape.svg").default,
    //   chartKey: "CylinderShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...cylinderShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "line",
    //     defaultMessage: "line",
    //   }),
    //   location: require("../../images/charts/LineShape.svg").default,
    //   chartKey: "LineShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...lineShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "arrow",
    //     defaultMessage: "arrow",
    //   }),
    //   location: require("../../images/charts/HorizontalArrowShape.svg").default,
    //   chartKey: "HorizontalArrowShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...horizontalArrowShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "doubleArrow",
    //     defaultMessage: "doubleArrow",
    //   }),
    //   location: require("../../images/charts/DoubleArrowShape.svg").default,
    //   chartKey: "DoubleArrowShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...doubleArrowShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "bendedArrow",
    //     defaultMessage: "bendedArrow",
    //   }),
    //   location: require("../../images/charts/DirectionArrowShape.svg").default,
    //   chartKey: "DirectionArrowShape",
    //   catId: 4,
    //   visibility: true,
    //   props: { ...directionArrowShapeProps },
    //   x: 0,
    //   y: 0,
    // },
    // {
    //   id: null,
    //   name: intl.formatMessage({
    //     id: "emoji",
    //     defaultMessage: "emoji",
    //   }),
    //   location: require("../../images/charts/SmileyEmoji.svg").default,
    //   chartKey: "SmileyEmoji",
    //   catId: 5,
    //   visibility: true,
    //   props: { ...smileyEmojiProps },
    //   x: 0,
    //   y: 0,
    // },
  ];
  const [charts, setCharts] = useState([]);
  const { theme } = workbookContext;

  const renderTooltip = (props, title, id) => (
    <Tooltip id={`chart-tooltip-${id}`} {...props}>
      {title}
    </Tooltip>
  );

  useEffect(() => {
    const bCharts = allCharts
      .filter(f => userContext?.userConfig?.planVisualizations?.includes(f.chartKey))
      .filter(c => (cat === null ? true : cat === c.catId));
    setCharts(bCharts);
  }, [cat, intl]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          className={`bni-border bni-border-all bni-border-all-1 btn-bni btn-sm w-100 rounded-end-0 toggleDropdown d-flex align-items-center justify-content-center`}
          style={{ borderRadius: "5px 0 0 0" }}
        >
          <span className='pe-1 d-none d-lg-block'>{categories.find(c => c.id === cat).label}</span>
          <i className='fa fa-filter' />
        </Dropdown.Toggle>
        <Dropdown.Menu variant={theme} className='' style={{ minWidth: "100px" }}>
          {categories.map(c => (
            <Dropdown.Item as='small' onClick={() => setCat(c.id)} key={c.id} className='p-1'>
              {c.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row className='m-0 align-items-center'>
        {charts.map((chart, i) => {
          const ChartImage = chart.location;
          return (
            <Col key={i} sm={6} className='my-2 p-0'>
              <OverlayTrigger placement='bottom' overlay={p => renderTooltip(p, chart.name, i)}>
                <picture
                  alt={`chartImage-${chart.name}`}
                  draggable={true}
                  className='draggable'
                  onDragStart={e => {
                    e.dataTransfer.setData(
                      "workbookDragData",
                      JSON.stringify({
                        chart,
                      }),
                    );
                  }}
                >
                  <ChartImage />
                </picture>
              </OverlayTrigger>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default GraphList;
