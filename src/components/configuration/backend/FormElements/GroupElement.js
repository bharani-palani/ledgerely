import React, { useState, useEffect, useRef } from "react";
import HtmlIcon from "./HtmlIcon";
import { useIntl } from "react-intl";

const GroupElement = props => {
  const intl = useIntl();
  const {
    defaultRecordsPerPage,
    config,
    searchString,
    onSearchChange,
    onDropDownChange,
    onDismissSearch,
    theme,
    options,
  } = props;
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState(searchString);
  const [selected, setSelected] = useState(defaultRecordsPerPage);
  const ref = useRef(null);
  const inputRef = useRef(null);

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

  useEffect(() => {
    if (searchString) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, [searchString]);

  const onSearch = e => {
    const newVal = e.target.value;
    onSearchChange(newVal);
    setSearchValue(newVal);
  };

  const dismiss = () => {
    onDismissSearch();
    setSearchValue("");
  };

  const onDropDownSelect = count => {
    setSelected(count);
    onDropDownChange(count);
  };
  return (
    <div className='group-input'>
      <div className='inputWrapper'>
        <input
          ref={inputRef}
          onChange={e => onSearch(e)}
          placeholder={config.header.searchPlaceholder}
          type='text'
          value={searchValue}
          className={`join-input ${theme}`}
        />
        {searchValue && (
          <HtmlIcon onClick={dismiss} className='dismiss' entity={"&#215;"} />
        )}
      </div>
      <div
        ref={ref}
        onClick={() => setToggle(!toggle)}
        title={intl.formatMessage(
          { id: "showNRecordsPerPage", defaultMessage: "showNRecordsPerPage" },
          { n: selected },
        )}
        className='join-select'
      >
        <div
          style={
            toggle
              ? { borderBottomRightRadius: 0 }
              : { borderBottomRightRadius: "5px" }
          }
          className='selected'
        >
          <div>
            <span>{selected}</span>
            <HtmlIcon className={`icon up`} entity={"&#9662;"} />
          </div>
        </div>
        {toggle && (
          <ul>
            {options.map((v, i) => (
              <li key={i} onClick={() => onDropDownSelect(v)}>
                {v}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupElement;
