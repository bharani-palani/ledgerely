import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import SelectableContext from "react-bootstrap/SelectableContext";

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
      <SelectableContext.Provider value={false}>
        <Dropdown title={title}>
          <Dropdown.Toggle>
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
      </SelectableContext.Provider>
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
