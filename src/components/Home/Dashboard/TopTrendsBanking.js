import React from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { DonutChart } from "../../shared/D3";
import { FormattedMessage } from "react-intl";

const TopTrendsBanking = ({ chartData, intlHeader, theme }) => {
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
          <Col key={i} lg={3} md={6} className='text-center pb-3'>
            <DonutChart
              width={200}
              height={200}
              outerRadius={100}
              innerRadius={80}
              xAxisLabel={m.key}
              showLegend={false}
              showTooltip={true}
              fillColor={[
                document.documentElement.style.getPropertyValue(
                  "--app-theme-bg-color",
                ),
                document.documentElement.style.getPropertyValue(
                  "--app-theme-color",
                ),
              ]}
              data={m.data}
              showAnimation={false}
            />
          </Col>
        ))}
    </Row>
  );
};

export default TopTrendsBanking;
