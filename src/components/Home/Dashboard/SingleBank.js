import React, { useState } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";

const SingleBank = ({ bank }) => {
  const [show, setShow] = useState(false);
  return (
    <Card className={`bni-border bni-border-all dashboardCard`}>
      <Card.Body className='bni-bg rounded-top text-center'>
        <i className='fa fa-3x fa-bank' />
        <div className='fs-6 py-1'>
          <span className='badge bg-dark'>{bank.Bank}</span>
        </div>
        <div className='small'>{bank.BankAccountNumber}</div>
      </Card.Body>
      <Card.Body>
        <div className='d-flex align-items-center justify-content-between'>
          <span style={!show ? { filter: "blur(5px)" } : {}}>
            {helpers.countryCurrencyLacSeperator(
              bank.Locale,
              bank.Currency,
              Number(bank.Balance, 2),
            )}
          </span>
          <i
            className={`fa fa-eye${!show ? "-slash" : ""} cursor-pointer`}
            onClick={() => setShow(!show)}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleBank;
