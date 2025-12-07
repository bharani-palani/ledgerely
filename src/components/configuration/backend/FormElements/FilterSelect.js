import React, { useState, useEffect, useRef } from "react";
import Checkbox from "./Checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import { Form, Dropdown, InputGroup, Container } from "react-bootstrap";

const FilterSelect = props => {
  const intl = useIntl();
  const { index, type = "single", primaryKey, element, value: defaultValueOrArray, placeholder = "select", onChange, theme = "" } = props;
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
      selectedValueOrArray = backupList.length > 0 && backupList.filter(b => b.id === defaultValueOrArray);
      selectedValueOrArray = selectedValueOrArray.length > 0 ? selectedValueOrArray[0].value : selectNull();
    } else {
      selectedValueOrArray =
        typeof selectedValueOrArray === "object" && selectedValueOrArray.length > 0 ? selectedValueOrArray.map(v => v.toString()) : [];
    }
    return [backupList, selectedValueOrArray];
  };

  const [backupList, selectedValueOrArray] = returnThis();
  const massagedList = backupList.map(d => {
    d.checked =
      d.id &&
      (Array.isArray(selectedValueOrArray)
        ? selectedValueOrArray.filter(f => f.toString() === d.id.toString()).length > 0
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
          ? selectedValueOrArray.filter(f => f.toString() === d.id.toString()).length > 0
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
    const newList = backupList.filter(b => b.value.toString().toLowerCase().includes(newVal.toString().toLowerCase()));
    await setDropDownList(newList);
  };

  const onDismiss = () => {
    setSearchValue("");
    onSearch("");
    selectRef.current.focus({ preventScroll: true });
  };

  const getMoreString = sList => {
    let firstValue = sList.length > 0 && backupList.filter(b => b.id === sList[0]);
    if (firstValue.length === 1) {
      firstValue = firstValue[0].value;
      const selString = sList.length > 1 ? `${firstValue} + ${sList.length - 1} more...` : firstValue;
      return selString;
    } else {
      return selectNull();
    }
  };
  const onCheckBoxChange = (e, info) => {
    const {
      target: { checked },
    } = e;
    let sList = info.id && checked ? [...checkedItems, info.id] : checkedItems.filter(c => c !== info.id);
    sList = [...new Set(sList)];
    const newDropDownList = dropDownList.map(b => (sList.includes(b.id) ? { ...b, checked: true } : { ...b, checked: false }));
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

  const onlyLabel = element?.fetch?.dropDownList.filter(d => d?.id?.toString() === defaultValueOrArray.toString())[0]?.value;

  return (
    <>
      {!element?.showAsLabel ? (
        <Dropdown show={toggle} onToggle={() => setToggle(!toggle)} ref={ref} autoClose='outside' className='d-inline-block w-100' role='Drop Down'>
          <Dropdown.Toggle
            variant={`${theme === "dark" ? "dark" : "white"}`}
            className={`p-2 rounded cursor-pointer w-100 border d-flex align-items-center justify-content-between ${
              theme === "dark" ? "border-black" : "border-1"
            }`}
            style={{ fontSize: "0.9rem" }}
            as={"div"}
          >
            <span className='text-truncate'>
              {selected ||
                intl.formatMessage({
                  id: placeholder,
                  defaultMessage: placeholder,
                })}
            </span>
            <i className={`fa fa-caret-${toggle ? "right" : "down"}`} />
          </Dropdown.Toggle>
          <Dropdown.Menu
            variant={`${theme === "dark" ? "dark" : "white"}`}
            className={`w-100 p-0 border ${theme === "dark" ? "border-black" : "border-1"}`}
            show={toggle}
          >
            {element?.searchable && (
              <Dropdown.Item className='p-0 border-0 rounded-top'>
                <InputGroup>
                  <Form.Control
                    size='sm'
                    ref={selectRef}
                    className={`${theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"} rounded-bottom-0 border-0 shadow-none py-2`}
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
                    id='filter-select-search'
                  />
                  {searchValue && (
                    <i
                      onClick={onDismiss}
                      className={`fa fa-times text-danger bg-${theme} p-2 cursor-pointer`}
                      style={{ borderTopRightRadius: "5px" }}
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
                  <Dropdown.Item ref={d.checked ? highlightRef : null} className={`small px-0 py-0 border-0 text-wrap`} key={i} as='div'>
                    {type === "multiple" ? (
                      <Checkbox
                        key={i}
                        onChange={e => {
                          onCheckBoxChange(e, d);
                        }}
                        checked={d.checked}
                        marker={d.marker}
                        info={d}
                        theme={theme}
                      />
                    ) : (
                      <div
                        className={`cursor-pointer px-2 py-1 ${
                          d.checked ? "bni-bg text-dark" : ""
                        } ${i === 0 && !element.searchable ? "rounded-top" : ""} ${i === dropDownList.length - 1 ? "rounded-bottom" : ""}
                    `}
                        onClick={() => onSetSelected(d)}
                      >
                        {d.value}
                        {d.marker && <span className='sup'>*</span>}
                      </div>
                    )}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item className='text-center small text-wrap'>
                  <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
                </Dropdown.Item>
              )}
            </Container>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        onlyLabel && <div>{onlyLabel}</div>
      )}
    </>
  );
};

export default FilterSelect;
