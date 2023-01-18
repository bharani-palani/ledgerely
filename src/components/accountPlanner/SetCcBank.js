import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";

const SetCcBank = props => {
  const { ccBankList, onSelectCcBank, title } = props;
  const [ccBankSelected, setCcBankSelected] = useState("");

  useEffect(() => {
    if (ccBankList.length > 0) {
      setCcBankSelected(ccBankList[0].value);
    }
  }, [ccBankList]);

  return (
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
  );
};

SetCcBank.propTypes = {
  title: PropTypes.string
};
SetCcBank.defaultProps = {
  title: "Title"
};

export default SetCcBank;
