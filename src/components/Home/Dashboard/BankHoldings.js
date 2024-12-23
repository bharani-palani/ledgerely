import React, { useContext } from "react";
import { NoContent, DraggerText } from "./index";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "react-bootstrap";
import TotalHoldings from "./TotalHoldings";
import SingleBank from "./SingleBank";
import CreditCardOutstanding from "./CreditCardOutstanding";
import { UserContext } from "../../../contexts/UserContext";
import MultipleBankHoldings from "./MultipleBankHoldings";

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
      <Col lg={bankList.length > 1 ? 8 : 4} md={6}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage id={intlHeader} defaultMessage={intlHeader} />
          </DraggerText>
        </div>
        {bankList.length > 0 ? (
          <div className='x-scroll pb-2'>
            <div
              className=''
              style={
                bankList.length > 1
                  ? {
                      display: "grid",
                      gridTemplateColumns: `repeat(${bankList.length}, 250px)`,
                      columnGap: "15px",
                    }
                  : null
              }
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
      <Col lg={bankList.length > 1 ? 2 : 4} md={3}>
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
                  <MultipleBankHoldings key={i} hold={hold} />
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
      <Col lg={bankList.length > 1 ? 2 : 4} md={3}>
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
