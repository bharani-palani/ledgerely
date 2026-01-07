import React, { useState } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";

export const getTotal = (array, key) =>
  array.length > 0
    ? array.reduce((a, b) => {
        return Number(a) + Number(b[key]) || 0;
      }, 0)
    : 0;

const MultipleBankHoldings = ({ hold, theme }) => {
  const [show, setShow] = useState(false);

  return (
    <Card className={`mb-3 mx-1 bg-${theme} text-${theme === "dark" ? "light" : "dark"} shadow-${theme}`}>
      <Card.Body className='rounded-top p-2'>{hold.currency}</Card.Body>
      <hr className='m-0' />
      <Card.Body className='p-2'>
        <div className='d-flex align-items-center justify-content-between'>
          <span style={!show ? { filter: "blur(5px)" } : {}}>{helpers.lacSeperator(getTotal(hold.data, "Balance"), hold.locale)}</span>
          <i className={`fa fa-eye${!show ? "-slash" : ""} cursor-pointer`} onClick={() => setShow(!show)} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MultipleBankHoldings;
