import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { AccountContext } from './AccountPlanner';
import { injectIntl } from 'react-intl';

const SetCcYear = props => {
  const accountContext = useContext(AccountContext);
  const { intl } = props;
  const { ccYearList, onChangeCcYear } = accountContext;
  const [ccYearSelected, setCcYearSelected] = useState("");

  useEffect(() => {
    if (ccYearList.length > 0) {
      setCcYearSelected(ccYearList[0].value);
    }
  }, [ccYearList])

  return (
    <>
      <Dropdown title={intl.formatMessage({ id: 'select' })} className="d-grid">
        <Dropdown.Toggle className="btn btn-bni">
          {ccYearSelected} <i className="fa fa-chevron-down" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {ccYearList && ccYearList.length > 0 && ccYearList.map((d, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => {
                setCcYearSelected(d.id);
                onChangeCcYear(d.id)
              }}
            >
              {d.value}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

SetCcYear.propTypes = {
  title: PropTypes.string
};
SetCcYear.defaultProps = {
  title: "Title"
};

export default injectIntl(SetCcYear);
