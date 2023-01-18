import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";

const SetBank = props => {
  const { bankList, onSelectBank, title } = props;
  const [bankSelected, setBankSelected] = useState("");

  useEffect(() => {
    if (bankList.length > 0) {
      setBankSelected(bankList[0].value);
    }
  }, [bankList]);

  return (
    <Dropdown title={title} className="d-grid">
      <Dropdown.Toggle className="btn btn-bni">
        {bankSelected} <i className="fa fa-chevron-down" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {bankList.map((d, i) => (
          <Dropdown.Item
            key={i}
            onClick={e => {
              setBankSelected(d.value);
              onSelectBank(d.id);
            }}
          >
            {d.value}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

SetBank.propTypes = {
  property: PropTypes.string
};
SetBank.defaultProps = {
  property: "String name"
};

export default SetBank;
