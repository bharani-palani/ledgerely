import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";
import { FormattedMessage, injectIntl } from "react-intl";
import { Form, Dropdown, InputGroup, Container } from "react-bootstrap";

const FilterSelect = props => {
  const {
    index,
    type,
    primaryKey,
    element,
    value: defaultValueOrArray,
    placeholder,
    onChange,
    intl,
    theme,
  } = props;
  const ref = useRef(null);
  const highlightRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const selectRef = useRef();
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

  // const handleClickOutside = event => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     setToggle(false);
  //   }
  // };

  useEffect(() => {
    if (type === "multiple") {
      setSelected(getMoreString(selectedValueOrArray));
    }
    // document.addEventListener("click", handleClickOutside, true);
    // return () => {
    //   document.removeEventListener("click", handleClickOutside, true);
    // };
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
      selectRef.current && selectRef.current.focus({ preventScroll: true });
      highlightRef?.current?.focus({ preventScroll: true });
      setTimeout(() => {
        highlightRef?.current?.scrollIntoView({
          behavior: "instant",
          block: "nearest",
        });
      }, 1);
    }
  }, [toggle]);

  return (
    <Dropdown
      show={toggle}
      onToggle={() => setToggle(!toggle)}
      ref={ref}
      autoClose='outside'
      className='d-inline-block w-100'
    >
      <Dropdown.Toggle
        variant={`${theme === "dark" ? "dark" : "white"}`}
        className={`p-2 rounded cursor-pointer w-100 border d-flex align-items-center justify-content-between ${
          theme === "dark" ? "border-black" : "border-1"
        }`}
        style={{ fontSize: "0.9rem" }}
        as={"div"}
      >
        <span>
          {selected ||
            intl.formatMessage({
              id: placeholder,
              defaultMessage: placeholder,
            })}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        variant={`${theme === "dark" ? "dark" : "white"}`}
        className={`w-100 p-0 border ${
          theme === "dark" ? "border-black" : "border-1"
        }`}
        show={toggle}
      >
        {element?.searchable && (
          <Dropdown.Item className='p-0 border-0'>
            <InputGroup>
              <Form.Control
                size='sm'
                ref={selectRef}
                className={`${
                  theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"
                } rounded-bottom-0 border-0`}
                onChange={e => {
                  e.preventDefault();
                  onSearch(e.target.value);
                }}
                placeholder={intl.formatMessage({
                  id: "searchHere",
                  defaultMessage: "searchHere",
                })}
                type='text'
                value={searchValue}
                style={{ boxShadow: "none" }}
              />
              {searchValue && (
                <i
                  onClick={onDismiss}
                  className={`fa fa-times text-danger bg-${theme} p-2`}
                />
              )}
            </InputGroup>
          </Dropdown.Item>
        )}
        <Container
          className='px-0'
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {dropDownList.length > 0 ? (
            dropDownList.map((d, i) => (
              <Dropdown.Item
                ref={d.checked ? highlightRef : null}
                className={`small px-0 py-1 border-0 ${
                  d.checked ? "bni-bg text-dark" : ""
                } ${i === 0 && !element.searchable ? "rounded-top" : ""}`}
                key={i}
              >
                {type === "multiple" ? (
                  <Checkbox
                    key={i}
                    onChange={e => onCheckBoxChange(e, d)}
                    checked={d.checked}
                    marker={d.marker}
                    info={d}
                  />
                ) : (
                  <div className='px-2' onClick={() => onSetSelected(d)}>
                    {d.value}
                    {d.marker && <span className='sup'>*</span>}
                  </div>
                )}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item className='textCenter small'>
              <FormattedMessage
                id='noRecordsGenerated'
                defaultMessage='noRecordsGenerated'
              />
            </Dropdown.Item>
          )}
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};

FilterSelect.propTypes = {
  type: PropTypes.string,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  primaryKey: PropTypes.string,
  element: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
};
FilterSelect.defaultProps = {
  type: "single", // single or multiple
  placeholder: "select",
  theme: "",
};

export default injectIntl(FilterSelect);
