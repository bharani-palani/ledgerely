import React, { useState } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";

export const getTotal = (array, key) =>
  array.length > 0
    ? array.reduce((a, b) => {
        return Number(a) + Number(b[key]) || 0;
      }, 0)
    : 0;

const MultipleBankHoldings = ({ hold }) => {
  const [show, setShow] = useState(false);

  return (
    <Card className={`bni-border bni-border-all bni-border-all-1 mb-2`}>
      <Card.Body className='bni-bg rounded-top p-2'>
        <i className='fa fa-1x fa-cubes pe-2' />
        {hold.currency}
      </Card.Body>
      <Card.Body className='p-2 rounded-bottom'>
        <div className='d-flex align-items-center justify-content-between'>
          <span style={!show ? { filter: "blur(5px)" } : {}}>
            {helpers.lacSeperator(getTotal(hold.data, "Balance"), hold.locale)}
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

export default MultipleBankHoldings;
