import React from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { FormattedMessage, useIntl } from "react-intl";
import { PieChart } from "../../shared/D3";
import moment from "moment";

const TopTrendsPie = ({ chartData, intlHeader }) => {
  const intl = useIntl();
  return (
    <Row className='pb-2'>
      <Col lg={12} className='fs-6 py-3'>
        <DraggerText>
          {intl.formatMessage({
            id: moment().format("MMM").toLowerCase(),
            defaultMessage: moment().format("MMM").toLowerCase(),
          })}{" "}
          {moment().format("YYYY")}{" "}
          <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
        </DraggerText>
      </Col>
      {chartData &&
        chartData.length > 0 &&
        chartData.map((m, i) => (
          <Col key={i} lg={3} md={6} className='text-center'>
            <PieChart
              width={200}
              height={200}
              outerRadius={100}
              innerRadius={80}
              xaxisLabel={m.key}
              showXaxisLabel={false}
              showYaxisLabel={false}
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
            <div className='py-2'>
              <small>
                <FormattedMessage id={m.key} defaultMessage={m.key} />
              </small>
            </div>
          </Col>
        ))}
    </Row>
  );
};

export default TopTrendsPie;
