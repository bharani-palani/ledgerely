import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { AccountContext } from "./AccountPlanner";
import { injectIntl } from "react-intl";

const SetYear = props => {
  const accountContext = useContext(AccountContext);
  const { intl } = props;
  const { yearList, yearSelected, setYearSelected } = accountContext;

  return (
    <Dropdown
      title={intl.formatMessage({ id: "select", defaultMessage: "select" })}
      className='d-grid'
    >
      <Dropdown.Toggle className='btn btn-bni'>
        {yearSelected} <i className='fa fa-chevron-down' />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {yearList.map((d, i) => (
          <Dropdown.Item
            key={i}
            onClick={() => {
              setYearSelected(d.id);
            }}
          >
            <div title={d.value}>
              <i className='fa fa-calendar' /> {d.value}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default injectIntl(SetYear);
