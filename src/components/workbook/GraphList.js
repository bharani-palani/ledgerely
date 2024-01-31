import React from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  divergingBarChartProps,
  pannableChartProps,
  donutChartProps,
  horizontalBarChartProps,
  pieChartProps,
  stackedVerticalBarChartProps,
  verticalBarChartProps,
  zoomableCirclePackingChartProps,
} from "../../components/shared/D3/propsData";

const GraphList = () => {
  const charts = [
    {
      id: null,
      name: "Vertical Bar Chart",
      location: require("../../images/charts/VerticalBarChart.svg").default,
      chartKey: "VerticalBarChart",
      props: verticalBarChartProps,
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
      props: pannableChartProps,
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
      props: pieChartProps,
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
      name: "Diverging Chart",
      location: require("../../images/charts/DivergingChart.svg").default,
      chartKey: "DivergingBarChart",
      props: divergingBarChartProps,
      x: 0,
      y: 0,
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
      name: "Zoomable Circle Packing Chart",
      location: require("../../images/charts/ZoomableCirclePacking.svg")
        .default,
      chartKey: "ZoomableCirclePackingChart",
      props: zoomableCirclePackingChartProps,
      x: 0,
      y: 0,
      massageConfig: {
        type: "nestedArrayOfObjects",
        keys: [
          { source: "label", target: "" },
          { source: "children", target: "" },
        ],
      },
    },
    {
      id: null,
      name: "Horizontal Bar Chart",
      location: require("../../images/charts/HorizontalBarChart.svg").default,
      chartKey: "HorizontalBarChart",
      props: horizontalBarChartProps,
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
      props: stackedVerticalBarChartProps,
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
      props: donutChartProps,
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
  ];

  const renderTooltip = (props, title, id) => (
    <Tooltip id={`chart-tooltip-${id}`} {...props}>
      {title}
    </Tooltip>
  );

  return (
    <Row className='m-0'>
      {charts.map((chart, i) => (
        <Col key={i} sm={12} className='my-2 p-0'>
          <OverlayTrigger
            placement='right'
            overlay={p => renderTooltip(p, chart.name, i)}
          >
            <img
              className='cursor-pointer'
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
  );
};

export default GraphList;
