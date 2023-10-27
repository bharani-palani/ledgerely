import React from "react";
import { NoContent, DraggerText } from "./index";
import { FormattedMessage } from "react-intl";
import { Row, Col, Card } from "react-bootstrap";
import helpers from "../../../helpers";

const BankHoldings = ({ bankList, totalHoldings, ccOutstandingList }) => {
  const getTotal = (array, key) =>
    array.length > 0
      ? array.reduce((a, b) => {
          return Number(a) + Number(b[key]) || 0;
        }, 0)
      : 0;

  return (
    <Row>
      <Col lg={8} md={6}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage id='bankHoldings' defaultMessage='bankHoldings' />
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
                <Card
                  key={i}
                  className={`bni-border bni-border-all dashboardCard`}
                >
                  <Card.Body className='bni-bg rounded-top text-center'>
                    <i className='fa fa-3x fa-bank' />
                    <div className='fs-6 py-1'>
                      <span className='badge bg-dark'>{bank.Bank}</span>
                    </div>
                    <div className='small'>{bank.BankAccountNumber}</div>
                  </Card.Body>
                  <Card.Body>
                    {helpers.countryCurrencyLacSeperator(
                      bank.Locale,
                      bank.Currency,
                      Number(bank.Balance, 2),
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <NoContent />
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
              <Card className='bni-border bni-border-all dashboardCard'>
                <Card.Body className='bni-bg rounded-top text-center p-4'>
                  <div className='d-flex align-items-center justify-content-center h-100 p-3'>
                    <div className='fs-6 py-1'>
                      <i className='fa fa-3x fa-cubes d-block' />
                    </div>
                  </div>
                </Card.Body>
                <Card.Body className='text-center'>
                  {helpers.countryCurrencyLacSeperator(
                    totalHoldings[0].locale,
                    totalHoldings[0].currency,
                    getTotal(totalHoldings[0].data, "Balance"),
                  )}
                </Card.Body>
              </Card>
            )}
          </div>
        ) : (
          <NoContent />
        )}
      </Col>
      <Col lg={2} md={3}>
        <div className='fs-6 py-2'>
          <DraggerText>
            <FormattedMessage
              id='creditCardOutstandingAmount'
              defaultMessage='creditCardOutstandingAmount'
            />
          </DraggerText>
        </div>
        {ccOutstandingList.length > 0 ? (
          <div className='y-scroll max-h-12 pe-2 py-1'>
            {ccOutstandingList.map((ccOut, i) => (
              <Card
                key={i}
                className={`bni-border bni-border-all bni-border-all-1 mb-2`}
              >
                <Card.Body className='bni-bg rounded-top p-2'>
                  {ccOut.cardName}
                </Card.Body>
                <Card.Body className='p-2 rounded-bottom'>
                  {helpers.countryCurrencyLacSeperator(
                    ccOut.Locale,
                    ccOut.Currency,
                    ccOut.total,
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <NoContent />
        )}
      </Col>
    </Row>
  );
};

export default BankHoldings;
