import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { VerticalBarChart } from "../../shared/D3";
import { NoContent, DraggerText } from "./index";
import { Col, Row } from "react-bootstrap";
import helpers from "../../../helpers";
import { UserContext } from "../../../contexts/UserContext";

const RecentTransaction = ({ width, recentData, intlHeader }) => {
  const userContext = useContext(UserContext);
  const color = helpers.bootstrapColorVariables[Math.floor(Math.random() * helpers.bootstrapColorVariables.length)];
  return (
    <div className='pb-2'>
      <div>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
          </DraggerText>
        </div>
        <Row>
          <Col md={6}>
            {recentData?.length > 0 && (
              <VerticalBarChart
                width={window.innerWidth > 450 ? width / 2 : width}
                height={200}
                data={recentData}
                marginLeft={50}
                marginBottom={0}
                marginTop={20}
                showXaxis={true}
                showYaxis={true}
                showXaxisLabel={false}
                showYaxisLabel={false}
                padding={0.5}
                yTicks={4}
                style={{
                  maxWidth: "100%",
                  boxShadow: "none",
                }}
                showAnimation={false}
                fontSize={10}
                fillColor={color}
                lineColor={color}
                fontColor={userContext.userData.theme === "dark" ? "#ffffff" : "#000000"}
              />
            )}
          </Col>
        </Row>
        {recentData?.length === 0 && <NoContent />}
      </div>
    </div>
  );
};

export default RecentTransaction;
