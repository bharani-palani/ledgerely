import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import HtmlIcon from "./HtmlIcon";

const GroupElemet = props => {
  const { defaultRecordsPerPage, onSearchChange, onDropDownChange, onDismissSearch } = props;
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState(defaultRecordsPerPage);
  const ref = useRef(null);
  const array = Array.from({ length: 10 }, (_, idx) => ++idx).map((v, i) => {
    if (i >= 0 && i <= 2) {
      return v * defaultRecordsPerPage;
    }
    if (i >= 3 && i <= 5) {
      return v * defaultRecordsPerPage * 5;
    }
    if (i >= 6 && i <= 9) {
      return v * defaultRecordsPerPage * 10;
    }
    return null;
  });

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const onSearch = e => {
    const newVal = e.target.value;
    onSearchChange(newVal);
    setSearchValue(newVal);
  };

  const dismiss = () => {
    onDismissSearch();
    setSearchValue("");
  };

  const onDropDownSelect = (count) => {
    setSelected(count);
    onDropDownChange(count);
  }
  return (
    <div className="group-input">
      <div className="inputWrapper">
        <input
          onChange={e => onSearch(e)}
          placeholder="Search"
          type="text"
          value={searchValue}
          className="join-input"
        />
        {searchValue && (
          <HtmlIcon onClick={dismiss} className="dismiss" entity={"&#215;"} />
        )}
      </div>
      <div
        ref={ref}
        onClick={() => setToggle(!toggle)}
        title={`show ${selected} records per page`}
        className="join-select"
      >
        <div
          style={
            toggle
              ? { borderBottomRightRadius: 0 }
              : { borderBottomRightRadius: "5px" }
          }
          className="selected"
        >
          <div>
            <span>{selected}</span>
            <HtmlIcon className={`icon up`} entity={"&#9662;"} />
          </div>
        </div>
        {toggle && (
          <ul>
            {array.map(v => (
              <li onClick={() => onDropDownSelect(v)}>{v}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

GroupElemet.propTypes = {
  property: PropTypes.string
};
GroupElemet.defaultProps = {
  property: "String name"
};

export default GroupElemet;
