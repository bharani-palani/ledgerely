import React, { useContext } from "react";
import { NoContent, DraggerText } from "./index";
import { FormattedMessage } from "react-intl";
import { Row, Col, Card } from "react-bootstrap";
import helpers from "../../../helpers";
import TotalHoldings from "./TotalHoldings";
import SingleBank from "./SingleBank";
import CreditCardOutstanding from "./CreditCardOutstanding";
import { UserContext } from "../../../contexts/UserContext";

export const getTotal = (array, key) =>
  array.length > 0
    ? array.reduce((a, b) => {
        return Number(a) + Number(b[key]) || 0;
      }, 0)
    : 0;

const BankHoldings = ({
  bankList,
  totalHoldings,
  ccOutstandingList,
  intlHeader,
}) => {
  const userContext = useContext(UserContext);
  return (
    <Row className='pb-2'>
      <Col lg={8} md={6}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
          </DraggerText>
        </div>
        {bankList.length > 0 ? (
          <div className='x-scroll pb-2'>
            <div
              className=''
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${bankList.length}, 250px)`,
                columnGap: "15px",
              }}
            >
              {bankList.map((bank, i) => (
                <SingleBank
                  key={i}
                  bank={bank}
                  theme={userContext.userData.theme}
                />
              ))}
            </div>
          </div>
        ) : (
          <NoContent theme={userContext.userData.theme} />
        )}
      </Col>
      <Col lg={2} md={3}>
        <div className='py-2'>
          <DraggerText>
            <FormattedMessage
              id='totalHoldings'
              defaultMessage='totalHoldings'
            />
          </DraggerText>
        </div>
        {totalHoldings.length > 0 ? (
          <div>
            {totalHoldings.length > 1 ? (
              <div className='y-scroll max-h-12 pe-2 py-1'>
                {totalHoldings.map((hold, i) => (
                  <Card
                    key={i}
                    className={`bni-border bni-border-all bni-border-all-1 mb-2`}
                  >
                    <Card.Body className='bni-bg rounded-top p-2'>
                      <i className='fa fa-1x fa-cubes pe-2' />
                      {hold.currency}
                    </Card.Body>
                    <Card.Body className='p-2 rounded-bottom'>
                      {helpers.lacSeperator(
                        getTotal(hold.data, "Balance"),
                        hold.locale,
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <TotalHoldings
                totalHoldings={totalHoldings}
                theme={userContext.userData.theme}
              />
            )}
          </div>
        ) : (
          <NoContent theme={userContext.userData.theme} />
        )}
      </Col>
      <Col lg={2} md={3}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage
              id='creditCardPayable'
              defaultMessage='creditCardPayable'
            />
          </DraggerText>
        </div>
        {ccOutstandingList.length > 0 ? (
          <div className='y-scroll max-h-12 pe-2 py-1'>
            {ccOutstandingList.map((ccOut, i) => (
              <CreditCardOutstanding key={i} ccOut={ccOut} />
            ))}
          </div>
        ) : (
          <NoContent theme={userContext.userData.theme} />
        )}
      </Col>
    </Row>
  );
};

export default BankHoldings;
