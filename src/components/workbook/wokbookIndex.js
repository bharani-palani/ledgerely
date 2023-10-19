import React, { useContext } from "react";
import {
  VerticalBarChart,
  PannableChart,
  DivergingBarChart,
  ZoomableCirclePackingChart,
  HorizontalBarChart,
  StackedVerticalBarChart,
  PieChart,
  DonutChart,
} from "../shared/D3";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";

const Workbook = props => {
  const userContext = useContext(UserContext);
  return (
    <div className='container'>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-light lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-book fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='workbook' defaultMessage='workbook' />
            </div>
          </div>
        </div>
      </div>
      <Row className='mt-3'>
        <Col lg={6} className='p-2'>
          <DonutChart />
        </Col>
        <Col lg={6} className='p-2'>
          <StackedVerticalBarChart />
        </Col>
        <Col lg={6} className='p-2 text-center'>
          <PieChart />
        </Col>
        <Col lg={6} className='p-2'>
          <HorizontalBarChart />
        </Col>
        <Col lg={6} className='p-2'>
          <VerticalBarChart width={700} />
        </Col>
        <Col lg={6} className='p-2'>
          <PannableChart width={400} />
        </Col>
        <Col lg={6} className='p-2'>
          <DivergingBarChart width={400} />
        </Col>
        <Col lg={6} className='p-2'>
          <ZoomableCirclePackingChart />
        </Col>
      </Row>
    </div>
  );
};

export default Workbook;
