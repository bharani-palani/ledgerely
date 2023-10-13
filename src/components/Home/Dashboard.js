import React, { useEffect, useRef, useState, useContext } from "react";
import { BarChart, PannableChart } from "../shared/D3";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { Row, Col } from "react-bootstrap";
import { pannableChartData } from "../shared/D3/constants";
import * as d3 from "d3";

const Dashboard = props => {
  const userContext = useContext(UserContext);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(containerRef?.current?.clientWidth);
  }, []);

  return (
    <div className='container-fluid'>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark" ? "bg-dark" : "bg-light"
        } ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-cubes fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='dashboard' defaultMessage='dashboard' />
            </div>
          </div>
        </div>
      </div>
      <Row className='mt-3'>
        <Col lg={4} ref={containerRef}>
          {width && <BarChart width={width} />}
        </Col>
        <Col lg={4} ref={containerRef}>
          {width && (
            <PannableChart
              width={width}
              data={pannableChartData.map(p => ({
                ...p,
                label: d3.timeParse("%Y-%m-%d")(p.label),
              }))}
            />
          )}
        </Col>
        <Col lg={4} ref={containerRef}>
          {width && (
            <PannableChart
              width={width}
              data={pannableChartData
                .filter((f, i) => i < 500)
                .map(p => ({
                  ...p,
                  label: d3.timeParse("%Y-%m-%d")(p.label),
                }))}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
