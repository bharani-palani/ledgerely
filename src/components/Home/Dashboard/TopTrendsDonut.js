import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { FormattedMessage, injectIntl } from "react-intl";
import { DonutChart } from "../../shared/D3";
import moment from "moment";

const TopTrendsDonut = ({ chartData, intl }) => {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    const bData = [...data].map(m => {
      m.xaxisLabel = intl.formatMessage({
        id: m.xaxisLabel,
        defaultMessage: m.xaxisLabel,
      });
      return m;
    });
    setData([]);
    setTimeout(() => {
      console.log("bbb", bData);
      setData(bData);
    }, 100);
  }, [intl]);

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
      {data.length > 0 &&
        data.map((m, i) => (
          <Col key={i} lg={3} md={6} className='text-center'>
            <DonutChart {...m} />
          </Col>
        ))}
    </Row>
  );
};

export default injectIntl(TopTrendsDonut);
