import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import HtmlIcon from "./HtmlIcon";
import Checkbox from "./Checkbox";
import { FormattedMessage, injectIntl } from "react-intl";

const FilterSelect = props => {
  const {
    index,
    type,
    primaryKey,
    searchable,
    element,
    value: defaultValueOrArray,
    placeholder,
    onChange,
    intl,
  } = props;
  const ref = useRef(null);
  const [toggle, setToggle] = useState(false);

  const selectNull = () => {
    // return backupList.filter(v => v.id === null)[0].value;
    return intl.formatMessage({ id: placeholder, defaultMessage: placeholder });
  };

  const returnThis = () => {
    let selectedValueOrArray = defaultValueOrArray; // need this
    const backupList = element.fetch.dropDownList;
    if (type === "single") {
      selectedValueOrArray =
        backupList.length > 0 &&
        backupList.filter(b => b.id === defaultValueOrArray);
      selectedValueOrArray =
        selectedValueOrArray.length > 0
          ? selectedValueOrArray[0].value
          : selectNull();
    } else {
      selectedValueOrArray =
        typeof selectedValueOrArray === "object" &&
        selectedValueOrArray.length > 0
          ? selectedValueOrArray.map(v => v.toString())
          : [];
    }
    return [backupList, selectedValueOrArray];
  };

  const [backupList, selectedValueOrArray] = returnThis();
  const massagedList = backupList.map(d => {
    d.checked =
      d.id &&
      (Array.isArray(selectedValueOrArray)
        ? selectedValueOrArray.filter(f => f.toString() === d.id.toString())
            .length > 0
        : selectedValueOrArray === d.value);
    return d;
  });
  const list = type === "single" ? backupList : massagedList;
  const [dropDownList, setDropDownList] = useState(list);
  const [selected, setSelected] = useState(selectedValueOrArray);
  const [searchValue, setSearchValue] = useState("");
  const [checkedItems, setCheckedItems] = useState(selectedValueOrArray);

  useEffect(() => {
    const [backupList, selectedValueOrArray] = returnThis();
    const massagedList = backupList.map(d => {
      d.checked =
        d.id &&
        (Array.isArray(selectedValueOrArray)
          ? selectedValueOrArray.filter(f => f.toString() === d.id.toString())
              .length > 0
          : selectedValueOrArray === d.value);
      return d;
    });
    const list = type === "single" ? backupList : massagedList;
    setDropDownList(list);
    setSelected(selectedValueOrArray);
    setCheckedItems(selectedValueOrArray);
  }, [element]);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    if (type === "multiple") {
      setSelected(getMoreString(selectedValueOrArray));
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [selectedValueOrArray]);

  const onSetSelected = info => {
    onChange(index, info.id, primaryKey); // need to pass id for dropDown
    setSelected(info.value);
    type === "single" && setToggle(false);
  };

  const onSearch = async newVal => {
    setSearchValue(newVal);
    const newList = backupList.filter(b =>
      b.value
        .toString()
        .toLowerCase()
        .includes(newVal.toString().toLowerCase()),
    );
    await setDropDownList(newList);
  };

  const onDismiss = e => {
    setSearchValue("");
    onSearch("");
  };

  const getMoreString = sList => {
    let firstValue =
      sList.length > 0 && backupList.filter(b => b.id === sList[0]);
    if (firstValue.length === 1) {
      firstValue = firstValue[0].value;
      const selString =
        sList.length > 1
          ? `${firstValue} + ${sList.length - 1} more...`
          : firstValue;
      return selString;
    } else {
      return selectNull();
    }
  };
  const onCheckBoxChange = (e, info) => {
    const {
      target: { checked },
    } = e;
    let sList =
      info.id && checked
        ? [...checkedItems, info.id]
        : checkedItems.filter(c => c !== info.id);
    sList = [...new Set(sList)];
    // new way of updating array object values on condition
    const newDropDownList = dropDownList.map(b =>
      sList.includes(b.id) ? { ...b, checked: true } : { ...b, checked: false },
    );
    setDropDownList(newDropDownList);
    setCheckedItems(sList);
    setSelected(getMoreString(sList));
    onChange(index, sList, primaryKey);
  };

  useEffect(() => {
    if (toggle) {
      const searchText = document.getElementById("inputText");
      searchText && searchText.focus();
    }
  }, [toggle]);

  return (
    <div ref={ref} className={`filterSelectComponent`}>
      <div
        onClick={() => setToggle(!toggle)}
        className={`selected ${toggle ? "yes" : "no"}`}
      >
        <div className='string' title={selected}>
          {selected ||
            intl.formatMessage({
              id: placeholder,
              defaultMessage: placeholder,
            })}
        </div>
        <div>
          <HtmlIcon
            className={`caretIcon ${toggle ? "down" : "up"}`}
            entity={"&#9662;"}
          />
        </div>
      </div>
      {toggle && (
        <div className='wrapper'>
          {searchable && (
            <div className='searchContent'>
              <input
                id='inputText'
                className='inputText'
                onChange={e => onSearch(e.target.value)}
                placeholder={intl.formatMessage({
                  id: "searchHere",
                  defaultMessage: "searchHere",
                })}
                type='text'
                value={searchValue}
              />
              {searchValue && (
                <HtmlIcon
                  onClick={onDismiss}
                  className={`icon`}
                  entity={"&#10006;"}
                />
              )}
            </div>
          )}
          <div className='listWrapper'>
            <ul>
              {dropDownList.length > 0 ? (
                dropDownList.map((d, i) => (
                  <li className={d.checked ? "selectedSingle" : ""} key={i}>
                    {type === "multiple" ? (
                      <Checkbox
                        key={i}
                        onChange={e => onCheckBoxChange(e, d)}
                        checked={d.checked}
                        marker={d.marker}
                        info={d}
                      />
                    ) : (
                      <div onClick={() => onSetSelected(d)}>
                        {d.value}
                        {d.marker && <span className='sup'>*</span>}
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li className='textCenter'>
                  <FormattedMessage
                    id='noRecordsGenerated'
                    defaultMessage='noRecordsGenerated'
                  />
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

FilterSelect.propTypes = {
  type: PropTypes.string,
  searchable: PropTypes.bool,
  index: PropTypes.string,
  primaryKey: PropTypes.string,
  element: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
FilterSelect.defaultProps = {
  type: "single", // single or multiple
  searchable: true,
  placeholder: "select",
};

export default injectIntl(FilterSelect);
