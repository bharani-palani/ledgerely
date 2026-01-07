import React, { useState } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";
import { FormattedMessage } from "react-intl";

const SingleBank = ({ bank, theme }) => {
  const [show, setShow] = useState(false);

  const copyTextToClipboard = async text => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  };

  return (
    <Card
      className={`dashboardCard my-2 border-${theme === "dark" ? "dark" : "1"} bg-${theme} text-${theme === "dark" ? "light" : "dark"} shadow-${theme}`}
    >
      <Card.Body className='px-0 pt-2 text-center'>
        <i className='fa fa-bank fa-2x' />
        <h6 className=''>
          <FormattedMessage id='bank' defaultMessage='bank' />
        </h6>
        <div className='fs-6 py-1 text-center'>
          <h6 className='my-0'>{bank?.Bank}</h6>
          <div className={`small badge rounded-pill ${theme === "dark" ? "text-light bg-secondary" : "text-dark border border-1"}`}>
            {bank?.BankAccountNumber}
          </div>
        </div>
      </Card.Body>
      <hr className='m-0' />
      <Card.Body className='px-2 pb-3'>
        <div className='d-flex align-items-center justify-content-between'>
          <span style={!show ? { filter: "blur(5px)" } : {}}>
            {helpers.countryCurrencyLacSeperator(bank?.Locale, bank?.Currency, Number(bank?.Balance, 2))}
          </span>
          <div>
            <i className='fa fa-copy cursor-pointer pe-2' onClick={() => copyTextToClipboard(bank?.Balance)} />
            <i className={`fa fa-eye${!show ? "-slash" : ""} cursor-pointer`} onClick={() => setShow(!show)} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleBank;
