import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { Col, Row, Card } from "react-bootstrap";
import { DonutChart } from "../shared/D3";

const Dashboard = props => {
  const userContext = useContext(UserContext);

  return (
    <div className=''>
      <div
        className={`bg-gradient ${
          userContext.userData.theme === "dark"
            ? "bg-dark darkBoxShadow"
            : "bg-white lightBoxShadow"
        } mt-2 ps-3 py-2 rounded-pill mb-2`}
      >
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <i className={`fa fa-pie-chart fa-1x`}></i>
            <div className='ps-2 mb-0'>
              <FormattedMessage id='dashboard' defaultMessage='dashboard' />
            </div>
          </div>
        </div>
      </div>
      <Row>
        <Col lg={9}>
          <div className='fs-6 py-2'>Total holdings</div>
          <div className='x-scroll pb-2'>
            <div
              className=''
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(12,15rem)`,
                columnGap: "5px",
              }}
            >
              {new Array(12).fill("_").map((b, i) => (
                <Card key={i} className='bni-border bni-border-all'>
                  <Card.Body className='bni-bg rounded-top text-center'>
                    <i className='fa fa-3x fa-bank' />
                    <div className='fs-6 py-1'>
                      <span className='badge bg-dark'>HDFC Bank</span>
                    </div>
                    <div className='small'># 12345</div>
                  </Card.Body>
                  <Card.Body>Rs. 2,00,000/-</Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </Col>
        <Col lg={3}>
          <div className='fs-6 py-2'>Summated holdings</div>
          <div className='y-scroll max-h-12 pe-2 py-1'>
            <ul className='list-group list-group-flush'>
              {new Array(12).fill("_").map((b, i) => (
                <li key={i} className='list-group-item icon-bni bg-dark'>
                  An item
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
      <div className='fs-6 py-2'>Oct 2023: Top 10</div>
      <Row>
        <Col lg={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={330}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Credits"}
            showLegend={true}
            showTooltip={true}
            fillColor={["#c2d82e", "#000"]}
          />
        </Col>
        <Col lg={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={330}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Debits"}
            showLegend={true}
            showTooltip={true}
          />
        </Col>
        <Col lg={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={330}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Credit card outstanding"}
            showLegend={true}
            showTooltip={true}
          />
        </Col>
        <Col lg={3} md={6} className='text-center'>
          <DonutChart
            width={340}
            height={330}
            outerRadius={100}
            innerRadius={75}
            xaxisLabel={"Credit card payments"}
            showLegend={true}
            showTooltip={true}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
