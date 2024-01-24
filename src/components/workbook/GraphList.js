import React from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const GraphList = () => {
  const charts = [
    {
      name: "Vertical Bar Chart",
      location: require("../../images/charts/VerticalBarChart.svg").default,
      chartKey: "VerticalBarChart",
    },
    {
      name: "Pannable Chart",
      location: require("../../images/charts/PannableChart.svg").default,
      chartKey: "PannableChart",
    },
    {
      name: "Pie Chart",
      location: require("../../images/charts/PieChart.svg").default,
      chartKey: "PieChart",
    },
    {
      name: "Diverging Chart",
      location: require("../../images/charts/DivergingChart.svg").default,
      chartKey: "DivergingBarChart",
    },
    {
      name: "Zoomable Circle Packing Chart",
      location: require("../../images/charts/ZoomableCirclePacking.svg")
        .default,
      chartKey: "ZoomableCirclePackingChart",
    },
    {
      name: "Horizontal Bar Chart",
      location: require("../../images/charts/HorizontalBarChart.svg").default,
      chartKey: "HorizontalBarChart",
    },
    {
      name: "Stacked Vertical Chart",
      location: require("../../images/charts/StackedVerticalChart.svg").default,
      chartKey: "StackedVerticalBarChart",
    },
    {
      name: "Donut Chart",
      location: require("../../images/charts/DonutChart.svg").default,
      chartKey: "DonutChart",
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
