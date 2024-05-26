import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AccountContext } from "./AccountPlanner";
import { injectIntl } from "react-intl";

const SetBank = props => {
  const accountContext = useContext(AccountContext);
  const { intl } = props;
  const { bankList, bankSelected, setBankSelected } = accountContext;
  const label = bankList.filter(f => f.id === bankSelected)[0]?.value;

  return (
    <Dropdown
      title={intl.formatMessage({ id: "select", defaultMessage: "select" })}
      className='d-grid'
    >
      <Dropdown.Toggle className='btn btn-bni'>
        {label} <i className='fa fa-chevron-down' />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {bankList.map((d, i) => (
          <Dropdown.Item
            key={i}
            onClick={() => {
              setBankSelected(d.id);
            }}
          >
            <div title={d.value}>
              <i className='fa fa-bank' /> {d.value}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default injectIntl(SetBank);
