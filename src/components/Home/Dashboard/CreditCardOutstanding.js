import React, { useState } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";

const CreditCardOutstanding = ({ ccOut }) => {
  const [show, setShow] = useState(false);
  return (
    <Card className={`bni-border bni-border-all bni-border-all-1 mb-2`}>
      <Card.Body className='bni-bg rounded-top p-2'>{ccOut.cardName}</Card.Body>
      <Card.Body className='p-2 rounded-bottom'>
        <div className='d-flex align-items-center justify-content-between'>
          <span style={!show ? { filter: "blur(5px)" } : {}}>
            {helpers.countryCurrencyLacSeperator(
              ccOut.Locale,
              ccOut.Currency,
              ccOut.total,
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

export default CreditCardOutstanding;
