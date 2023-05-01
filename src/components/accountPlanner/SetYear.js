import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { AccountContext } from './AccountPlanner';
import { injectIntl } from 'react-intl';

const SetYear = props => {
  const accountContext = useContext(AccountContext);
  const { intl } = props;
  const { yearList, onChangeYear } = accountContext;
  const [yearSelected, setYearSelected] = useState("");

  useEffect(() => {
    if (yearList.length > 0) {
      setYearSelected(yearList[0].value);
    }
  }, [yearList])

  return (
    <Dropdown title={intl.formatMessage({ id: 'select' })} className="d-grid">
      <Dropdown.Toggle className="btn btn-bni">
        {yearSelected} <i className="fa fa-chevron-down" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {yearList.map((d, i) => (
          <Dropdown.Item
            key={i}
            onClick={() => {
              setYearSelected(d.id);
              onChangeYear(d.id)
            }}
          >
            {d.value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

SetYear.propTypes = {
  property: PropTypes.string
};
SetYear.defaultProps = {
  property: "String name"
};

export default injectIntl(SetYear);
