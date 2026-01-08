import React from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { FormattedMessage } from "react-intl";
import { PieChart } from "../../shared/D3";
import helpers from "../../../helpers";

const TopTrendsCreditCard = ({ chartData, intlHeader, theme }) => {
  return (
    <Row className='pb-2'>
      <Col lg={12} className='fs-6 py-3'>
        <DraggerText>
          <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
        </DraggerText>
      </Col>
      {chartData &&
        chartData.length > 0 &&
        chartData.map((m, i) => (
          <Col key={i} lg={3} md={6} className='text-center'>
            <PieChart
              width={150}
              height={150}
              outerRadius={70}
              innerRadius={60}
              xAxisLabel={m.key}
              showXaxisLabel={false}
              showYaxisLabel={false}
              lineColor={`transparent`}
              fillColor={[helpers.bootstrapColorVariables[0], helpers.bootstrapColorVariables[4]]}
              data={m.data}
              showAnimation={false}
            />
            <div className='py-2'>
              <small style={{ fontSize: 10 }}>
                <FormattedMessage id={m.key} defaultMessage={m.key} />
              </small>
            </div>
          </Col>
        ))}
    </Row>
  );
};

export default TopTrendsCreditCard;
