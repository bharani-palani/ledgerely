import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import SelectableContext from "react-bootstrap/SelectableContext";

const SetCcBank = props => {
  const {ccBankList, onSelectCcBank, title} = props;
  const [ccBankSelected, setCcBankSelected] = useState("");
  
  useEffect(() => {
    if(ccBankList.length > 0) {
      setCcBankSelected(ccBankList[0].value);
    }
  },[])

  return (
    <>
      <SelectableContext.Provider value={false}>
        <Dropdown title={title} className="d-grid">
          <Dropdown.Toggle className="btn btn-bni">
            {ccBankSelected} <i className="fa fa-chevron-down" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {ccBankList.map((d, i) => (
              <Dropdown.Item
                key={i}
                onClick={e => {
                  setCcBankSelected(d.value);
                  onSelectCcBank(d.id);
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

SetCcBank.propTypes = {
  property: PropTypes.string
};
SetCcBank.defaultProps = {
  property: "String name"
};

export default SetCcBank;
