import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { AccountContext } from "./AccountPlanner";
import { injectIntl } from "react-intl";

const SetCcBank = props => {
  const accountContext = useContext(AccountContext);
  const { intl } = props;
  const { ccBankList, onChangeCcBank } = accountContext;
  const [ccBankSelected, setCcBankSelected] = useState("");

  useEffect(() => {
    if (ccBankList.length > 0) {
      setCcBankSelected(ccBankList[0].value);
    }
  }, [ccBankList]);

  return (
    <Dropdown
      title={intl.formatMessage({ id: "select", defaultMessage: "select" })}
      className='d-grid'
    >
      <Dropdown.Toggle className='btn btn-bni'>
        {ccBankSelected} <i className='fa fa-chevron-down' />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {ccBankList.map((d, i) => (
          <Dropdown.Item
            key={i}
            onClick={e => {
              setCcBankSelected(d.value);
              onChangeCcBank(d.id);
            }}
          >
            <div title={d.value}>
              <i className='fa fa-credit-card' /> {d.value}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

SetCcBank.propTypes = {
  title: PropTypes.string,
};
SetCcBank.defaultProps = {
  title: "Title",
};

export default injectIntl(SetCcBank);
