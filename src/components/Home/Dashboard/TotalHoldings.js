import React, { useState } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";
import { getTotal } from "./BankHoldings";
import { FormattedMessage } from "react-intl";

const TotalHoldings = ({ totalHoldings, theme, color }) => {
  const [show, setShow] = useState(false);
  return (
    <Card className={`dashboardCard my-2 bg-${theme} text-light shadow-${theme}`}>
      <Card.Body className='text-center rounded bg-gradient' style={{ background: color }}>
        <div className='d-flex align-items-center justify-content-between'>
          <span style={!show ? { filter: "blur(5px)" } : {}}>
            {helpers.countryCurrencyLacSeperator(totalHoldings[0].locale, totalHoldings[0].currency, getTotal(totalHoldings[0].data, "Balance"))}
          </span>
          <i className={`fa fa-eye${!show ? "-slash" : ""} cursor-pointer`} onClick={() => setShow(!show)} />
        </div>
        <div className='pt-4'>
          <div>
            <FormattedMessage id='totalHoldings' defaultMessage='totalHoldings' />
          </div>
          <div>
            <i className='fa fa-money fa-3x' />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(TotalHoldings);
