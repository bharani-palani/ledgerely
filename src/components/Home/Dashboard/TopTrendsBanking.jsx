import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { DonutChart } from "../../shared/D3";
import { FormattedMessage } from "react-intl";
import helpers from "../../../helpers";
import { UserContext } from "../../../contexts/UserContext";

const TopTrendsBanking = ({ chartData, intlHeader }) => {
  const userContext = useContext(UserContext);
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
          <Col key={i} md={6} className='text-center pb-3'>
            <DonutChart
              width={200}
              height={200}
              outerRadius={100}
              innerRadius={50}
              xAxisLabel=''
              showLegend={false}
              showTooltip={true}
              fillColor={[helpers.bootstrapColorVariables[0], helpers.bootstrapColorVariables[4]]}
              data={m.data}
              showAnimation={false}
            />
            <div className='pt-2'>
              <span
                className={`badge border border-1 border-secondary ${userContext.userData.theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}
              >
                <FormattedMessage id={m.key} defaultMessage={m.key} />
              </span>
            </div>
          </Col>
        ))}
    </Row>
  );
};

export default TopTrendsBanking;
