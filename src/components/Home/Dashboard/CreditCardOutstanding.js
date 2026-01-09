import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";

const CreditCardOutstanding = ({ ccOut, theme, color, visible }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <Card className={`mb-2 bg-${theme} text-light shadow-${theme}`}>
      <Card.Body className={`rounded-top p-2 bg-gradient`} style={{ background: color }}>
        {ccOut.cardName}
      </Card.Body>
      <Card.Body className={`p-2 rounded-bottom text-${theme === "dark" ? "light" : "dark"}`}>
        <div className='d-flex align-items-center justify-content-between'>
          <span
            title={show && helpers.countryCurrencyLacSeperator(ccOut.Locale, ccOut.Currency, ccOut.total)}
            className='text-truncate d-inline-block'
            style={{ ...(!show && { filter: "blur(5px)" }), maxWidth: "120px" }}
          >
            {helpers.countryCurrencyLacSeperator(ccOut.Locale, ccOut.Currency, ccOut.total)}
          </span>
          <i className={`fa fa-eye${!show ? "-slash" : ""} cursor-pointer`} onClick={() => setShow(!show)} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CreditCardOutstanding;
