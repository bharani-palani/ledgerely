import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { DraggerText } from "./index";
import { FormattedMessage } from "react-intl";
import { PieChart } from "../../shared/D3";
import helpers from "../../../helpers";
import { UserContext } from "../../../contexts/UserContext";

const TopTrendsCreditCard = ({ chartData, intlHeader }) => {
  const userContext = useContext(UserContext);
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
          <Col key={i} md={6} className='text-center pb-3'>
            <PieChart
              width={200}
              height={200}
              outerRadius={190}
              xAxisLabel={m.key}
              showXaxisLabel={true}
              showYaxisLabel={true}
              lineColor={`transparent`}
              fillColor={[helpers.bootstrapColorVariables[5], helpers.bootstrapColorVariables[9]]}
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

export default TopTrendsCreditCard;
