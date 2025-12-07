import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

const Radio = props => {
  const { index, primaryKey, onChange, element, value } = props;
  const { i, j } = index;
  const [radioList] = useState(element.radio.radioList);
  const preCheck = props.value || radioList.filter(r => r.checked)[0].value;
  const [radioSelected, setRadioSelected] = useState(preCheck);

  useEffect(() => {
    setRadioSelected(value);
  }, [value]);

  return (
    <>
      {!element.radio.showAsLabel ? (
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
                <label htmlFor={`${j}-${k}-${i}`}>
                  <FormattedMessage id={radio.localeId} defaultMessage={radio.label} />
                </label>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <FormattedMessage
            id={element?.radio?.radioList.filter(r => r?.value === value)[0].localeId}
            defaultMessage={element?.radio?.radioList.filter(r => r?.value === value)[0].label}
          />
        </div>
      )}
    </>
  );
};

export default Radio;
