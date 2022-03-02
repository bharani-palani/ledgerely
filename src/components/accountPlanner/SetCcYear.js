import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import SelectableContext from "react-bootstrap/SelectableContext";

const SetCcYear = props => {
  const {ccYearList, onSelectCcYear, title} = props;
  const [ccYearSelected, setCcYearSelected] = useState("");

  useEffect(() => {
    if(ccYearList.length > 0) {
      setCcYearSelected(ccYearList[0].value);
    }
  },[ccYearList])

  return (
    <>
      <SelectableContext.Provider value={false}>
        <Dropdown title={title}>
          <Dropdown.Toggle>
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
      </SelectableContext.Provider>
    </>
  );
};

SetCcYear.propTypes = {
  property: PropTypes.string
};
SetCcYear.defaultProps = {
  property: "String name"
};

export default SetCcYear;
