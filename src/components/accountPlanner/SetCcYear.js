import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { AccountContext } from "./AccountPlanner";
import { injectIntl } from "react-intl";
import moment from "moment";

const SetCcYear = props => {
  const accountContext = useContext(AccountContext);
  const { intl } = props;
  const { ccYearList, onChangeCcYear } = accountContext;
  const [ccYearSelected, setCcYearSelected] = useState("");

  useEffect(() => {
    if (ccYearList.length > 0) {
      setCcYearSelected(String(moment().year()) || ccYearList[0].value);
      onChangeCcYear(String(moment().year()));
    }
  }, [ccYearList]);

  return (
    <>
      <Dropdown
        title={intl.formatMessage({ id: "select", defaultMessage: "select" })}
        className='d-grid'
      >
        <Dropdown.Toggle className='btn btn-bni'>
          {ccYearSelected} <i className='fa fa-chevron-down' />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {ccYearList &&
            ccYearList.length > 0 &&
            ccYearList.map((d, i) => (
              <Dropdown.Item
                key={i}
                onClick={() => {
                  setCcYearSelected(d.id);
                  onChangeCcYear(d.id);
                }}
              >
                <div title={d.value}>
                  <i className='fa fa-calendar' /> {d.value}
                </div>
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

SetCcYear.propTypes = {
  title: PropTypes.string,
};
SetCcYear.defaultProps = {
  title: "Title",
};

export default injectIntl(SetCcYear);
