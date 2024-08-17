import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Radio = props => {
  const { index, primaryKey, onChange, element, value } = props;
  const { i, j } = index;
  const [radioList] = useState(element.radio.radioList);
  const preCheck = props.value || radioList.filter(r => r.checked)[0].value;
  const [radioSelected, setRadioSelected] = useState(preCheck);

  // useEffect(() => {
  //   onChange(index, radioSelected, primaryKey);
  // }, [radioSelected]);

  useEffect(() => {
    setRadioSelected(value);
  }, [value]);

  return (
    <div className={`radioComponent`}>
      {radioList.length &&
        radioList.map((radio, k) => (
          <div className='radioWrapper' key={k}>
            <input
              type='radio'
              onChange={e => {
                setRadioSelected(e.target.value);
                onChange(index, radio.value, primaryKey);
              }}
              value={radio.value}
              checked={radio.value === radioSelected}
              name={`${j}-${i}`}
              id={`${j}-${k}-${i}`}
            />{" "}
            <span className='checkmark'></span>
            <label htmlFor={`${j}-${k}-${i}`}>{radio.label}</label>
          </div>
        ))}
    </div>
  );
};

Radio.propTypes = {
  index: PropTypes.object,
  primaryKey: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  element: PropTypes.object,
};

export default Radio;
