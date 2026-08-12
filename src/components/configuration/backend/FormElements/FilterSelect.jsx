import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import Checkbox from "./Checkbox";
import { FormattedMessage, useIntl } from "react-intl";
import { Form, InputGroup, Container } from "react-bootstrap";

const DEFAULT_LIMIT = 50;

const FilterSelect = props => {
  const intl = useIntl();
  const { index, type = "single", primaryKey, element, value: defaultValueOrArray, placeholder = "select", onChange, theme = "" } = props;
  const ref = useRef(null);
  const highlightRef = useRef(null);
  const selectRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [onlyLabel, setOnlyLabel] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0, placement: "bottom" });
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

    const updatePosition = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      setMenuPosition({
        top: rect.bottom + 2,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();

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

    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener("resize", handleResize);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [toggle]);

  useEffect(() => {
    if (!toggle) {
      return;
    }

    const handleOutsideClick = event => {
      const clickedInsideTrigger = ref.current?.contains(event.target);
      const clickedInsideMenu = menuRef.current?.contains(event.target);

      if (!clickedInsideTrigger && !clickedInsideMenu) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
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

  useLayoutEffect(() => {
    if (!toggle) return;

    const updatePosition = () => {
      const rect = toggleRef.current?.getBoundingClientRect();
      const menuNode = menuRef.current;

      if (!rect || !menuNode) return;

      const menuHeight = menuNode.getBoundingClientRect().height || menuNode.offsetHeight || 220;
      const gap = -4;
      const fitsBelow = window.innerHeight - rect.bottom >= menuHeight + gap;
      const fitsAbove = rect.top >= menuHeight + gap;
      const shouldOpenAbove = !fitsBelow && fitsAbove;
      const nextPlacement = shouldOpenAbove ? "top" : "bottom";
      const nextTop =
        nextPlacement === "top" ? Math.max(gap, rect.top - menuHeight - gap) : Math.min(window.innerHeight - menuHeight - gap, rect.bottom + gap);
      const nextLeft = Math.min(window.innerWidth - rect.width - gap, Math.max(gap, rect.left));

      setMenuPosition({
        top: nextTop,
        left: nextLeft,
        width: rect.width,
        placement: nextPlacement,
      });
    };

    const raf = requestAnimationFrame(updatePosition);
    const handleResize = () => requestAnimationFrame(updatePosition);
    const handleScroll = () => requestAnimationFrame(updatePosition);

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [toggle, dropDownList.length, element?.searchable, searchValue]);

  const closeMenu = () => {
    setToggle(false);
    setSearchValue("");
  };

  return (
    <>
      {!element?.showAsLabel ? (
        <div ref={ref} className='d-inline-block w-100 position-relative' role='Drop Down'>
          <div
            ref={toggleRef}
            onClick={() => {
              const nextShow = !toggle;
              setToggle(nextShow);
            }}
            className={`p-2 rounded cursor-pointer w-100 border d-flex align-items-center justify-content-between ${
              theme === "dark" ? "border-black" : "border-1"
            }`}
            style={{
              fontSize: "0.9rem",
            }}
          >
            <span className='text-truncate'>{selected || selectNull()}</span>
            <i className={`fa fa-caret-${toggle ? "right" : "down"}`} />
          </div>

          {toggle &&
            createPortal(
              <div
                ref={menuRef}
                className={`p-0 border ${theme === "dark" ? "border-black" : "border-1"}`}
                style={{
                  position: "fixed",
                  top: menuPosition.top,
                  left: menuPosition.left,
                  width: menuPosition.width,
                  background: theme === "dark" ? "var(--bs-dark)" : "var(--bs-light)",
                  color: theme === "dark" ? "var(--bs-light)" : "var(--bs-dark)",
                  zIndex: 99999,
                }}
              >
                {element?.searchable && (
                  <div className='p-0 border-0 rounded-top'>
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

                      {searchValue && <i onClick={onDismiss} className={`fa fa-times text-danger bg-${theme} p-2 cursor-pointer`} />}
                    </InputGroup>
                  </div>
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
                      <div ref={item.checked ? highlightRef : null} className='small px-0 py-0 border-0 text-wrap' key={item.id ?? i}>
                        {type === "multiple" ? (
                          <Checkbox onChange={e => onCheckBoxChange(e, item)} checked={item.checked} marker={item.marker} info={item} theme={theme} />
                        ) : (
                          <div
                            className={`cursor-pointer px-2 py-1 ${selectedIds.includes(item?.id?.toString()) ? "bni-bg text-dark" : ""}`}
                            onClick={() => {
                              onSetSelected(item);
                              closeMenu();
                            }}
                          >
                            {item.value}
                            {item.marker && <span className='sup'>*</span>}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className='text-center small text-wrap px-2 py-2'>
                      <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
                    </div>
                  )}
                  {dropDownList.length < backupList.length && !searchValue && <i className='fa fa-ellipsis-h px-2 pull-right fa-2x' />}
                </Container>
              </div>,
              document.body,
            )}
        </div>
      ) : (
        onlyLabel && <div>{onlyLabel}</div>
      )}
    </>
  );
};

export default FilterSelect;
