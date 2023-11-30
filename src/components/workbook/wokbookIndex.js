import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { VerticalPanes, Pane } from "./VerticalPane";
import WorkbookContext from "./WorkbookContext";
import SheetPane from "./SheetPane";
import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  Button,
  Dropdown,
  Form,
  Card,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useIntl } from "react-intl";

const Workbook = props => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const [sheets, setSheets] = useState([
    { id: uuidv4(), order: 0, label: "Sheet 1", data: {} },
  ]);
  const [activeSheet, setActiveSheet] = useState("");
  const maxZoom = 100;
  const [zoom, setZoom] = useState(100);
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
    <>
      <WorkbookContext.Provider
        value={{
          sheets,
          setSheets,
          theme: userContext.userData.theme,
          activeSheet,
          setActiveSheet,
          zoom,
          maxZoom,
          setZoom,
        }}
      >
        <div className='container-fluid d-block d-sm-none mt-3'>
          <Card
            className={`border ${
              userContext.userData.theme === "dark"
                ? "bg-dark text-white border-secondary"
                : "bg-white text-dark"
            }`}
          >
            <Card.Header className='d-flex border-bottom justify-content-center'>
              <i className='fa fa-2x fa-ban text-danger pe-2' />
              <h2>STOP</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <h4 className='text-danger text-center'>
                  Feature not available
                </h4>
              </Card.Title>
              <p>
                Workbook design layout not available for small displays due to
                usage issue.
              </p>
              <p>Try landscape orientation or bigger display devices.</p>
            </Card.Body>
          </Card>
        </div>

        <div className='workbook container-fluid small d-none d-sm-block'>
          <VerticalPanes
            theme={userContext.userData.theme}
            className={`border border-1 ${
              userContext.userData.theme === "dark" ? "border-secondary" : ""
            } rounded-top`}
          >
            <Pane width={"5%"} className='text-center overflow-auto'>
              <Row className='m-0'>
                {charts.map((o, i) => (
                  <Col key={i} sm={12} className='my-2 p-0'>
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
              <Row>
                <Col md={6}>
                  <InputGroup className='p-1' size='sm'>
                    <Dropdown>
                      <Dropdown.Toggle
                        className={`bni-border bni-border-all bni-border-all-1 btn-link`}
                      >
                        <i className='fa fa-cog icon-bni' />
                      </Dropdown.Toggle>
                      <Dropdown.Menu variant={userContext.userData.theme}>
                        <Dropdown.Item href='#'>Menu 1</Dropdown.Item>
                        <Dropdown.Item href='#'>Menu 2</Dropdown.Item>
                        <Dropdown.Item href='#'>Menu 3</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href='#'>Menu 4</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                      className='bni-border bni-border-all bni-border-all-1'
                      placeholder={intl.formatMessage({
                        id: "workbook",
                        defaultMessage: "workbook",
                      })}
                    />
                    <Button
                      variant='outline-secondary'
                      className='bni-border bni-border-all bni-border-all-1'
                    >
                      <i className='fa fa-save icon-bni' />
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Pane>
            <Pane width={"20%"}>bni</Pane>
          </VerticalPanes>
          <SheetPane />
        </div>
      </WorkbookContext.Provider>
    </>
  );
};

export default Workbook;
