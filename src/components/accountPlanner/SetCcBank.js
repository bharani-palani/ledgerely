import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AccountContext } from "./AccountPlanner";
import { injectIntl } from "react-intl";

const SetCcBank = props => {
  const accountContext = useContext(AccountContext);
  const { intl } = props;
  const { ccBankList, ccBankSelected, setCcBankSelected } = accountContext;
  const label = ccBankList.filter(f => f.id === ccBankSelected)[0]?.value;

  return (
    <Dropdown
      title={intl.formatMessage({ id: "select", defaultMessage: "select" })}
      className='d-grid'
    >
      <Dropdown.Toggle className='btn btn-bni'>
        {label} <i className='fa fa-chevron-down' />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {ccBankList.map((d, i) => (
          <Dropdown.Item
            key={i}
            onClick={e => {
              setCcBankSelected(d.value);
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
export default injectIntl(SetCcBank);
