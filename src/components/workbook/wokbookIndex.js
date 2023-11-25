import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { VerticalPanes, Pane } from "./VerticalPane";
import WorkbookContext from "./WorkbookContext";
import SheetPane from "./SheetPane";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

const Workbook = props => {
  const userContext = useContext(UserContext);
  const [sheets, setSheets] = useState(1);
  const [activeSheet, setActiveSheet] = useState(-1);
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
    <WorkbookContext.Provider
      value={{
        sheets,
        setSheets,
        theme: userContext.userData.theme,
        activeSheet,
        setActiveSheet,
      }}
    >
      <div className='container-fluid small'>
        <VerticalPanes
          theme={userContext.userData.theme}
          className={`border border-1 ${
            userContext.userData.theme === "dark" ? "border-secondary" : ""
          } rounded-top`}
        >
          <Pane width={"5%"} className='p-2'>
            <Row>
              {charts.map((o, i) => (
                <Col key={i} sm={6} className='mb-3 pe-0'>
                  <OverlayTrigger
                    placement='right'
                    delay={{ show: 250, hide: 400 }}
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
          </Pane>
          <Pane
            width={"70%"}
            className={`border border-1 ${
              userContext.userData.theme === "dark" ? "border-secondary" : ""
            } border-top-0 border-bottom-0`}
          >
            xyz
          </Pane>
          <Pane width={"20%"}>bni</Pane>
        </VerticalPanes>
        <SheetPane />
      </div>
    </WorkbookContext.Provider>
  );
};

export default Workbook;
