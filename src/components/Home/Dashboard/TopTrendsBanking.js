import React from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { DonutChart } from "../../shared/D3";
import { FormattedMessage } from "react-intl";
import helpers from "../../../helpers";

const TopTrendsBanking = ({ chartData, intlHeader }) => {
  return (
    <Row>
      <Col lg={12} className='fs-6 py-3'>
        <DraggerText>
          <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
        </DraggerText>
      </Col>
      {chartData &&
        chartData.length > 0 &&
        chartData.map((m, i) => (
          <Col key={i} xl={3} lg={6} md={6} className='text-center pt-2'>
            <DonutChart
              width={200}
              height={200}
              outerRadius={100}
              innerRadius={80}
              xAxisLabel={m.key}
              showLegend={false}
              showTooltip={true}
              fillColor={[helpers.bootstrapColorVariables[0], helpers.bootstrapColorVariables[4]]}
              data={m.data}
              showAnimation={false}
            />
          </Col>
        ))}
    </Row>
  );
};

export default TopTrendsBanking;
