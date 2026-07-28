import React, { useEffect, useMemo, useRef, useState } from "react";
import Checkbox from "./Checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import { Form, Dropdown, InputGroup, Container } from "react-bootstrap";

const DEFAULT_LIMIT = 50;

const FilterSelect = props => {
  const intl = useIntl();
  const { index, type = "single", primaryKey, element, value: defaultValueOrArray, placeholder = "select", onChange, theme = "" } = props;
  const ref = useRef(null);
  const highlightRef = useRef(null);
  const selectRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [onlyLabel, setOnlyLabel] = useState("");
  const backupList = element?.fetch?.dropDownList || [];

  /**
   * Placeholder text
   */
  const selectNull = () =>
    intl.formatMessage({
      id: placeholder,
      defaultMessage: placeholder,
    });

  /**
   * Normalize selected IDs.
   */
  const selectedIds = useMemo(() => {
    if (type === "multiple") {
      if (!Array.isArray(defaultValueOrArray)) {
        return [];
      }

      return defaultValueOrArray.map(id => id?.toString());
    }

    if (defaultValueOrArray === null || defaultValueOrArray === undefined || defaultValueOrArray === "") {
      return [];
    }

    return [defaultValueOrArray.toString()];
  }, [defaultValueOrArray, type]);

  /**
   * Find selected records from the COMPLETE list.
   */
  const selectedRecords = useMemo(() => {
    if (!selectedIds.length) {
      return [];
    }

    const selectedSet = new Set(selectedIds);

    return backupList.filter(item => item?.id !== null && item?.id !== undefined && selectedSet.has(item.id.toString()));
  }, [backupList, selectedIds]);

  /**
   * Build visible list.
   *
   * Behaviour:
   *
   * No search:
   *   selected outside first 50
   *   +
   *   first 50
   *
   * Search:
   *   search entire backupList
   *   +
   *   matching records
   */
  const visibleList = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    /**
     * SEARCH MODE
     *
     * Search the COMPLETE list.
     */
    if (search) {
      const matches = backupList.filter(item => item?.value?.toString().toLowerCase().includes(search));

      /**
       * Put selected matching values first.
       */
      const selectedSet = new Set(selectedIds);

      const selectedMatches = matches.filter(item => selectedSet.has(item?.id?.toString()));

      const remainingMatches = matches.filter(item => !selectedSet.has(item?.id?.toString()));

      return [...selectedMatches, ...remainingMatches];
    }

    /**
     * DEFAULT MODE
     *
     * First 50 + selected values outside first 50.
     */
    const defaultList = backupList.slice(0, DEFAULT_LIMIT);

    const defaultIds = new Set(defaultList.map(item => item?.id?.toString()));

    const extraSelected = selectedRecords.filter(item => !defaultIds.has(item?.id?.toString()));

    return [...extraSelected, ...defaultList];
  }, [backupList, searchValue, selectedIds, selectedRecords]);

  /**
   * Add checked state without modifying original records.
   */
  const dropDownList = useMemo(() => {
    if (type !== "multiple") {
      return visibleList;
    }

    const selectedSet = new Set(selectedIds);

    return visibleList.map(item => ({
      ...item,
      checked: selectedSet.has(item?.id?.toString()),
    }));
  }, [visibleList, selectedIds, type]);

  /**
   * Single-select display value.
   */
  const getSingleSelectedValue = () => {
    const selectedRecord = selectedRecords[0];

    return selectedRecord?.value || selectNull();
  };

  /**
   * Multiple-select display value.
   */
  const getMoreString = ids => {
    if (!ids?.length) {
      return selectNull();
    }

    const selectedSet = new Set(ids.map(id => id?.toString()));

    const records = backupList.filter(item => selectedSet.has(item?.id?.toString()));

    if (!records.length) {
      return selectNull();
    }

    const firstValue = records[0]?.value;

    return records.length > 1 ? `${firstValue} + ${records.length - 1} more...` : firstValue;
  };

  /**
   * Synchronize component state when props change.
   */
  useEffect(() => {
    if (type === "multiple") {
      const ids = Array.isArray(defaultValueOrArray) ? defaultValueOrArray.map(id => id?.toString()) : [];

      setCheckedItems(ids);
      setSelected(getMoreString(ids));
    } else {
      setSelected(getSingleSelectedValue());
    }

    /**
     * Reset search when parent data/value changes.
     */
    setSearchValue("");
  }, [defaultValueOrArray, backupList, type]);

  /**
   * Search handler.
   *
   * IMPORTANT:
   * Do NOT filter only the first 50.
   * visibleList searches backupList.
   */
  const onSearch = newValue => {
    setSearchValue(newValue);
  };

  /**
   * Clear search.
   */
  const onDismiss = () => {
    setSearchValue("");

    requestAnimationFrame(() => {
      selectRef.current?.focus({
        preventScroll: true,
      });
    });
  };

  /**
   * Single selection.
   */
  const onSetSelected = info => {
    onChange(index, info.id, primaryKey);

    setSelected(info.value);

    if (type === "single") {
      setToggle(false);
      setSearchValue("");
    }
  };

  /**
   * Multiple selection.
   */
  const onCheckBoxChange = (e, info) => {
    const checked = e.target.checked;
    const itemId = info?.id?.toString();

    let newSelectedItems;

    if (checked) {
      newSelectedItems = [...new Set([...checkedItems, itemId])];
    } else {
      newSelectedItems = checkedItems.filter(id => id !== itemId);
    }

    setCheckedItems(newSelectedItems);

    setSelected(getMoreString(newSelectedItems));

    onChange(index, newSelectedItems, primaryKey);
  };

  /**
   * Dropdown opened.
   */
  useEffect(() => {
    if (!toggle) {
      return;
    }

    requestAnimationFrame(() => {
      selectRef.current?.focus({
        preventScroll: true,
      });

      highlightRef.current?.focus({
        preventScroll: true,
      });

      highlightRef.current?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
      });
    });
  }, [toggle]);

  /**
   * Label-only mode.
   */
  useEffect(() => {
    if (!element?.showAsLabel) {
      return;
    }

    const label = backupList.find(item => item?.id?.toString() === defaultValueOrArray?.toString())?.value;

    setOnlyLabel(label || "");
  }, [element?.showAsLabel, backupList, defaultValueOrArray]);

  /**
   * Return selected item IDs that are NOT inside
   * the first 50 records.
   *
   * These need to be added at the top.
   */
  // const selectedOutsideDefaultList = useMemo(() => {
  //   const defaultList = backupList.slice(0, DEFAULT_LIMIT);
  //   const defaultIds = new Set(defaultList.map(item => item?.id?.toString()));
  //   return selectedRecords.filter(item => !defaultIds.has(item?.id?.toString()));
  // }, [backupList, selectedRecords]);

  /**
   * Is selected value outside first 50?
   * Useful if you want to visually identify it.
   */
  // const hasSelectedOutsideDefault = selectedOutsideDefaultList.length > 0;
  // console.log(hasSelectedOutsideDefault);

  return (
    <>
      {!element?.showAsLabel ? (
        <Dropdown
          show={toggle}
          onToggle={nextShow => setToggle(nextShow)}
          ref={ref}
          autoClose='outside'
          className='d-inline-block w-100'
          role='Drop Down'
        >
          <Dropdown.Toggle
            variant={theme === "dark" ? "dark" : "white"}
            className={`p-2 rounded cursor-pointer w-100 border d-flex align-items-center justify-content-between ${
              theme === "dark" ? "border-black" : "border-1"
            }`}
            style={{
              fontSize: "0.9rem",
            }}
            as='div'
          >
            <span className='text-truncate'>{selected || selectNull()}</span>

            <i className={`fa fa-caret-${toggle ? "right" : "down"}`} />
          </Dropdown.Toggle>

          <Dropdown.Menu
            variant={theme === "dark" ? "dark" : "white"}
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
                    onChange={e => onSearch(e.target.value)}
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
                      style={{
                        borderTopRightRadius: "5px",
                      }}
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
                dropDownList.map((item, i) => (
                  <Dropdown.Item ref={item.checked ? highlightRef : null} className='small px-0 py-0 border-0 text-wrap' key={item.id ?? i} as='div'>
                    {type === "multiple" ? (
                      <Checkbox onChange={e => onCheckBoxChange(e, item)} checked={item.checked} marker={item.marker} info={item} theme={theme} />
                    ) : (
                      <div
                        className={`cursor-pointer px-2 py-1 ${selectedIds.includes(item?.id?.toString()) ? "bni-bg text-dark" : ""}`}
                        onClick={() => onSetSelected(item)}
                      >
                        {item.value}
                        {item.marker && <span className='sup'>*</span>}
                      </div>
                    )}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item className='text-center small text-wrap'>
                  <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
                </Dropdown.Item>
              )}
              {dropDownList.length < backupList.length && (
                <i className='fa fa-ellipsis-h px-2 pull-right fa-2x animate__animated animate__headShake animate__infinite animate__slow' />
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
