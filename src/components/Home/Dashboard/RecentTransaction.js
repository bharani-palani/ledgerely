import React, { useContext, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { VerticalBarChart } from "../../shared/D3";
import { UserContext } from "../../../contexts/UserContext";
import { NoContent, DraggerText } from "./index";
import { Col, Row } from "react-bootstrap";

const RecentTransaction = ({ loader, recentData }) => {
  const containerRef = useRef(null);
  const userContext = useContext(UserContext);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const w =
        containerRef?.current?.clientWidth ||
        containerRef?.current?.getBoundingClientRect()?.width;
      setWidth(w);
    }, 1000);
  }, []);

  return (
    <Row>
      <Col lg={12} ref={containerRef}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage
              id='recentTransactions'
              defaultMessage='recentTransactions'
            />
          </DraggerText>
        </div>
        {width > 0 && recentData.length > 0 ? (
          <VerticalBarChart
            width={width}
            height={150}
            data={recentData}
            marginLeft={50}
            marginBottom={0}
            marginTop={0}
            showXaxis={false}
            showYaxis={true}
            showYaxisLabel={false}
            padding={0.01}
            yTicks={4}
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              boxShadow:
                userContext.userData.theme === "dark"
                  ? "0px 0 10px #000"
                  : "0px 0 10px #aaa",
            }}
            showAnimation={true}
          />
        ) : null}
        {recentData.length === 0 && <NoContent />}
      </Col>
    </Row>
  );
};

export default RecentTransaction;
