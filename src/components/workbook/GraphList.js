import React from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const GraphList = props => {
  const charts = [
    {
      name: "Vertical Bar Chart",
      location: require("../../images/charts/VerticalBarChart.svg").default,
    },
    {
      name: "Pannable Chart",
      location: require("../../images/charts/PannableChart.svg").default,
    },
    {
      name: "Pie Chart",
      location: require("../../images/charts/PieChart.svg").default,
    },
    {
      name: "Diverging Chart",
      location: require("../../images/charts/DivergingChart.svg").default,
    },
    {
      name: "Zoomable Circle Packing Chart",
      location: require("../../images/charts/ZoomableCirclePacking.svg")
        .default,
    },
    {
      name: "Horizontal Bar Chart",
      location: require("../../images/charts/HorizontalBarChart.svg").default,
    },
    {
      name: "Stacked Vertical Chart",
      location: require("../../images/charts/StackedVerticalChart.svg").default,
    },
    {
      name: "Donut Chart",
      location: require("../../images/charts/DonutChart.svg").default,
    },
  ];

  const renderTooltip = (props, title, id) => (
    <Tooltip id={`chart-tooltip-${id}`} {...props}>
      {title}
    </Tooltip>
  );

  return (
    <Row className='m-0'>
      {charts.map((o, i) => (
        <Col key={i} sm={12} className='my-2 p-0'>
          <OverlayTrigger
            placement='right'
            overlay={p => renderTooltip(p, o.name, i)}
          >
            <img
              className='cursor-pointer'
              width={25}
              height={25}
              alt='chartImage'
              src={o.location}
            />
          </OverlayTrigger>
        </Col>
      ))}
    </Row>
  );
};

export default GraphList;
