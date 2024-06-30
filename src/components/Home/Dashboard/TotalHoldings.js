import React, { useState } from "react";
import { Card } from "react-bootstrap";
import helpers from "../../../helpers";
import { getTotal } from "./BankHoldings";

const TotalHoldings = ({ totalHoldings, theme }) => {
  const [show, setShow] = useState(false);
  return (
    <Card className={`dashboardCard border-${theme === "dark" ? "dark" : "1"}`}>
      <Card.Body className='bni-bg rounded-top text-center p-4'>
        <div className='d-flex align-items-center justify-content-center h-100 p-3'>
          <div className='fs-6 py-1'>
            <i className='fa fa-3x fa-cubes d-block' />
          </div>
        </div>
      </Card.Body>
      <Card.Body className='text-center'>
        <div className='d-flex align-items-center justify-content-between'>
          <span style={!show ? { filter: "blur(5px)" } : {}}>
            {helpers.countryCurrencyLacSeperator(
              totalHoldings[0].locale,
              totalHoldings[0].currency,
              getTotal(totalHoldings[0].data, "Balance"),
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

export default TotalHoldings;
