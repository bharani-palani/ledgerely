import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const DateTimeDropDown = props => {
  const { defaultValue, array, onSelectClick, onItemClick } = props;
  const [focus, setFocus] = useState(false);
  const listRef = useRef(null);
  const ref = useRef(null);

  const onSetFocus = bool => {
    setFocus(bool);
    if (bool) {
      setTimeout(() => {
        const targetElm = document.querySelector(".options");
        const checkedPos =
          document.querySelector(".checked") !== null
              ? document.querySelector(".checked").offsetTop
            : 0;
        if(targetElm && checkedPos) {
          targetElm.scrollTo({ top: checkedPos, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      onSetFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={ref}>
      {!focus && (
        <div
          className="selected"
          onClick={() => {
            onSetFocus(!focus);
            onSelectClick(defaultValue);
          }}
        >
          {defaultValue}
        </div>
      )}
      {focus && (
        <div className="dateTimeDropDown">
          <div className="placeHolder">{defaultValue}</div>
          {focus && (
            <ul ref={listRef} id="container" className="options">
              {array.map((a, i) => (
                <li
                  key={i}
                  onClick={() => {
                    onSetFocus(false);
                    onItemClick(a.value);
                  }}
                  className={
                    defaultValue.toString() === a.value.toString()
                      ? "checked"
                      : ""
                  }
                >
                  <span className="labelValue">{a.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

DateTimeDropDown.propTypes = {
  property: PropTypes.string
};
DateTimeDropDown.defaultProps = {
  property: "String name"
};

export default DateTimeDropDown;
