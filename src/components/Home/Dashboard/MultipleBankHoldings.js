import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";

export const getTotal = (array, key) =>
  array.length > 0
    ? array.reduce((a, b) => {
        return Number(a) + Number(b[key]) || 0;
      }, 0)
    : 0;

const MultipleBankHoldings = ({ hold, theme, color, visible }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <Card className={`mb-3 mx-1 bg-${theme} text-light shadow-${theme}`}>
      <Card.Body className='rounded-top p-2 bg-gradient' style={{ background: color }}>
        {hold.currency}
      </Card.Body>
      <Card.Body className={`p-2 text-${theme === "dark" ? "light" : "dark"}`}>
        <div className='d-flex align-items-center justify-content-between'>
          <span
            title={show && helpers.lacSeperator(getTotal(hold.data, "Balance"), hold.locale)}
            className='text-truncate d-inline-block'
            style={{ ...(!show && { filter: "blur(5px)" }), maxWidth: "120px" }}
          >
            {helpers.lacSeperator(getTotal(hold.data, "Balance"), hold.locale)}
          </span>
          <i className={`fa fa-eye${!show ? "-slash" : ""} cursor-pointer`} onClick={() => setShow(!show)} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MultipleBankHoldings;
