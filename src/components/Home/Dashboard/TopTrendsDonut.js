import React from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { DonutChart } from "../../shared/D3";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";

const TopTrendsDonut = ({ chartData }) => {
  const intl = useIntl();
  return (
    <Row>
      <Col lg={12} className='fs-6 py-3'>
        <DraggerText>
          {intl.formatMessage({
            id: moment().format("MMM").toLowerCase(),
            defaultMessage: moment().format("MMM").toLowerCase(),
          })}{" "}
          {moment().format("YYYY")}{" "}
          <FormattedMessage id='topTrends' defaultMessage='topTrends' />
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
              xaxisLabel={m.key}
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

export default TopTrendsDonut;
