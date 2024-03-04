import React, { useContext, useEffect, useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip, Dropdown } from "react-bootstrap";
import {
  divergingBarChartProps,
  pannableChartProps,
  donutChartProps,
  horizontalBarChartProps,
  pieChartProps,
  stackedVerticalBarChartProps,
  verticalBarChartProps,
  // zoomableCirclePackingChartProps,
  // allChartProps,
  scatterPlotChartProps,
  densityChartProps,
  boxPlotChartProps,
  lineChartProps,
  voronoiChartProps,
} from "../../components/shared/D3/propsData";
import WorkbookContext from "./WorkbookContext";

const GraphList = () => {
  const workbookContext = useContext(WorkbookContext);
  const categories = [
    { id: null, label: "All" },
    { id: 0, label: "Circular" },
    { id: 1, label: "Bar" },
    { id: 2, label: "Distribution" },
    { id: 3, label: "Correlation" },
    { id: 4, label: "Shapes" },
  ];
  const [cat, setCat] = useState(null);
  const allCharts = [
    {
      id: null,
      name: "Vertical Bar Chart",
      location: require("../../images/charts/VerticalBarChart.svg").default,
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
      name: "Pannable Chart",
      location: require("../../images/charts/PannableChart.svg").default,
      chartKey: "PannableChart",
      visibility: true,
      catId: 2,
      props: { ...pannableChartProps },
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
      name: "Pie Chart",
      location: require("../../images/charts/PieChart.svg").default,
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
      name: "Diverging Chart",
      location: require("../../images/charts/DivergingChart.svg").default,
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
    // {
    //   id: null,
    //   name: "Zoomable Circle Packing Chart",
    //   location: require("../../images/charts/ZoomableCirclePacking.svg")
    //     .default,
    //   chartKey: "ZoomableCirclePackingChart",
    // visibility: true,
    //   props: {  ...zoomableCirclePackingChartProps },
    // catId: 0,
    //   x: 0,
    //   y: 0,
    //   massageConfig: {
    //     type: "nestedArrayOfObjects",
    //     keys: [
    //       { source: "label", target: "" },
    //       { source: "children", target: "" },
    //     ],
    //   },
    // },
    {
      id: null,
      name: "Horizontal Bar Chart",
      location: require("../../images/charts/HorizontalBarChart.svg").default,
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
      name: "Stacked Vertical Chart",
      location: require("../../images/charts/StackedVerticalChart.svg").default,
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
      name: "Donut Chart",
      location: require("../../images/charts/DonutChart.svg").default,
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
      name: "Scatter Plot Chart",
      location: require("../../images/charts/ScatterPlotChart.svg").default,
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
      name: "Density Chart",
      location: require("../../images/charts/DensityChart.svg").default,
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
      name: "Box Plot Chart",
      location: require("../../images/charts/BoxPlotChart.svg").default,
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
      name: "Line Chart",
      location: require("../../images/charts/LineChart.svg").default,
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
    {
      id: null,
      name: "Voronoi Chart",
      location: require("../../images/charts/VoronoiChart.svg").default,
      chartKey: "VoronoiChart",
      catId: 3,
      visibility: true,
      props: { ...voronoiChartProps },
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
  ];
  const [charts, setCharts] = useState([]);
  const { theme } = workbookContext;

  const renderTooltip = (props, title, id) => (
    <Tooltip id={`chart-tooltip-${id}`} {...props}>
      {title}
    </Tooltip>
  );

  useEffect(() => {
    const bCharts = allCharts.filter(c =>
      cat === null ? true : cat === c.catId,
    );
    setCharts(bCharts);
  }, [cat]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          className={`bni-border bni-border-all bni-border-all-1 btn-bni btn-sm w-100 rounded-end-0 toggleDropdown d-flex align-items-center justify-content-center`}
          style={{ borderRadius: "5px 0 0 0" }}
        >
          <span className='pe-1 d-none d-lg-block'>
            {categories.find(c => c.id === cat).label}
          </span>
          <i className='fa fa-filter' />
        </Dropdown.Toggle>
        <Dropdown.Menu
          variant={theme}
          className=''
          style={{ minWidth: "100px" }}
        >
          {categories.map(c => (
            <Dropdown.Item
              as='small'
              onClick={() => setCat(c.id)}
              key={c.id}
              className='p-1'
            >
              {c.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Row className='m-0 align-items-center'>
        {charts.map((chart, i) => (
          <Col key={i} sm={6} className='my-2 p-0'>
            <OverlayTrigger
              placement='bottom'
              overlay={p => renderTooltip(p, chart.name, i)}
            >
              <img
                className='cursor-pointer img-fluid'
                width={25}
                height={25}
                alt={`chartImage-${chart.name}`}
                src={chart.location}
                draggable={true}
                onDragStart={e => {
                  e.dataTransfer.setData(
                    "workbookDragData",
                    JSON.stringify({
                      chart,
                    }),
                  );
                }}
              />
            </OverlayTrigger>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default GraphList;
