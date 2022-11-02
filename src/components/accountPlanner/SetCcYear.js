import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";

const SetCcYear = props => {
  const { ccYearList, onSelectCcYear, title } = props;
  const [ccYearSelected, setCcYearSelected] = useState("");

  useEffect(() => {
    if (ccYearList.length > 0) {
      setCcYearSelected(ccYearList[0].value);
    }
  }, [ccYearList])

  return (
    <>
      <Dropdown title={title} className="d-grid">
        <Dropdown.Toggle className="btn btn-bni">
          {ccYearSelected} <i className="fa fa-chevron-down" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {ccYearList && ccYearList.length > 0 && ccYearList.map((d, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => {
                setCcYearSelected(d.id);
                onSelectCcYear(d.id)
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

export default SetCcYear;
