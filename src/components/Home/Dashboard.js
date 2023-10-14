import React, { useEffect, useRef, useState, useContext } from "react";
import { BarChart, PannableChart } from "../shared/D3";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { Row, Col } from "react-bootstrap";

const Dashboard = props => {
  const userContext = useContext(UserContext);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(containerRef?.current?.clientWidth);
  }, []);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getDaysArray = function (start, end) {
    const arr = [];
    for (
      const dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push({ label: new Date(dt), value: randomIntFromInterval(50, 100) });
    }
    return arr;
    // return arr.sort((a, b) => (a.value > b.value ? 1 : -1));
  };

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
              data={getDaysArray(
                new Date("2020-01-01"),
                new Date("2020-12-31"),
              )}
            />
          )}
        </Col>
        <Col lg={4} ref={containerRef}>
          {width && (
            <PannableChart
              width={width}
              data={getDaysArray(
                new Date("2021-01-01"),
                new Date("2025-12-31"),
              )}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
