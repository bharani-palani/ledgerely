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
      name: "Vertical Bar Chart",
      location: require("../../images/charts/VerticalBarChart.svg").default,
      chartKey: "VerticalBarChart",
      props: verticalBarChartProps,
    },
    {
      name: "Pannable Chart",
      location: require("../../images/charts/PannableChart.svg").default,
      chartKey: "PannableChart",
      props: pannableChartProps,
    },
    {
      name: "Pie Chart",
      location: require("../../images/charts/PieChart.svg").default,
      chartKey: "PieChart",
      props: pieChartProps,
    },
    {
      name: "Diverging Chart",
      location: require("../../images/charts/DivergingChart.svg").default,
      chartKey: "DivergingBarChart",
      props: divergingBarChartProps,
    },
    {
      name: "Zoomable Circle Packing Chart",
      location: require("../../images/charts/ZoomableCirclePacking.svg")
        .default,
      chartKey: "ZoomableCirclePackingChart",
      props: zoomableCirclePackingChartProps,
    },
    {
      name: "Horizontal Bar Chart",
      location: require("../../images/charts/HorizontalBarChart.svg").default,
      chartKey: "HorizontalBarChart",
      props: horizontalBarChartProps,
    },
    {
      name: "Stacked Vertical Chart",
      location: require("../../images/charts/StackedVerticalChart.svg").default,
      chartKey: "StackedVerticalBarChart",
      props: stackedVerticalBarChartProps,
    },
    {
      name: "Donut Chart",
      location: require("../../images/charts/DonutChart.svg").default,
      chartKey: "DonutChart",
      props: donutChartProps,
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
