import React, { useContext, useRef, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { VerticalBarChart } from "../../shared/D3";
import { UserContext } from "../../../contexts/UserContext";
import { NoContent, DraggerText } from "./index";
import { Col, Row } from "react-bootstrap";

const RecentTransaction = ({ loader, recentData }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(containerRef?.current?.clientWidth || 0);
  const intl = useIntl();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!loader) {
      setTimeout(() => {
        setWidth(containerRef?.current?.clientWidth);
      }, 100);
    }
  }, [loader]);

  return (
    <Row key={`item-0`} index={0}>
      <Col lg={12} ref={containerRef}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage
              id='recentTransactions'
              defaultMessage='recentTransactions'
            />
          </DraggerText>
        </div>
        {width && recentData.length > 0 ? (
          <VerticalBarChart
            width={width}
            height={150}
            data={recentData}
            marginLeft={50}
            marginBottom={0}
            marginTop={0}
            yAxisLabel={intl.formatMessage({
              id: "amount",
              defaultMessage: "amount",
            })}
            xAxisLabel={intl.formatMessage({
              id: "date",
              defaultMessage: "date",
            })}
            showXaxis={false}
            showYaxis={true}
            showYaxisLabel={false}
            padding={0.9}
            yTicks={4}
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              boxShadow:
                userContext.userData.theme === "dark"
                  ? "0px 0 10px #000"
                  : "0px 0 10px #aaa",
            }}
          />
        ) : null}
        {recentData.length === 0 && <NoContent />}
      </Col>
    </Row>
  );
};

export default RecentTransaction;
