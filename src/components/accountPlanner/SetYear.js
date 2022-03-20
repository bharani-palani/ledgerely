import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";

const SetYear = props => {
  const {yearList, onSelectYear, title} = props;
  const [yearSelected, setYearSelected] = useState("");

  useEffect(() => {
    if(yearList.length > 0) {
      setYearSelected(yearList[0].value);
    }
  },[yearList])

  return (
    <>
        <Dropdown title={title} className="d-grid">
          <Dropdown.Toggle className="btn btn-bni">
            {yearSelected} <i className="fa fa-chevron-down" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {yearList.map((d, i) => (
              <Dropdown.Item
                key={i}
                onClick={() => {
                  setYearSelected(d.id);
                  onSelectYear(d.id)
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

SetYear.propTypes = {
  property: PropTypes.string
};
SetYear.defaultProps = {
  property: "String name"
};

export default SetYear;
