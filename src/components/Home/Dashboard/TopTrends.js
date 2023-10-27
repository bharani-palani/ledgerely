import React from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { FormattedMessage, useIntl } from "react-intl";
import { DonutChart } from "../../shared/D3";
import moment from "moment";

const TopTrends = ({ chartData }) => {
  const intl = useIntl();
  return (
    <Row key={`item-3`} index={2}>
      <Col lg={12} className='fs-6 py-2'>
        <DraggerText>
          {intl.formatMessage({
            id: moment().format("MMM").toLowerCase(),
            defaultMessage: moment().format("MMM").toLowerCase(),
          })}{" "}
          {moment().format("YYYY")}{" "}
          <FormattedMessage id='topTrends' defaultMessage='topTrends' />
        </DraggerText>
      </Col>
      {chartData.map((m, i) => (
        <Col key={i} lg={3} md={6} className='text-center'>
          <DonutChart {...m} />
        </Col>
      ))}
    </Row>
  );
};

export default TopTrends;
