import React, { useCallback, useContext, useEffect, useState } from "react";
import WorkbookContext from "../WorkbookContext";
import { DSContext } from "./DataSource";
import { Popover, OverlayTrigger, Form, DropdownButton, Dropdown, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useIntl, FormattedMessage } from "react-intl";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Slider from "@appigram/react-rangeslider";

const DynamicClause = props => {
  const intl = useIntl();
  const { targetKey, type, contextMenu, suffixList, showAlias } = props;
  const workbookContext = useContext(WorkbookContext);
  const dSContext = useContext(DSContext);
  const { clause, setClause, optionsConfig, tableDragging, fieldDragging, table, selectedWBFields } = dSContext;
  const { theme } = workbookContext;
  const doubleInputChoice = [
    {
      id: "DATE",
      label: intl.formatMessage({
        id: "date",
        defaultMessage: "date",
      }),
      input: {
        start: moment().startOf("year").toDate(),
        end: moment().endOf("year").toDate(),
      },
    },
    {
      id: "NUMBER",
      label: intl.formatMessage({
        id: "number",
        defaultMessage: "number",
      }),
      input: {
        start: 1,
        end: 1,
      },
    },
  ];

  const [selectedDoubleInput, setSelectedDoubleInput] = useState(doubleInputChoice[0]);

  const popover = (index, data) => (
    <Popover style={{ zIndex: 10000 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small className='small'>
          <span>&fnof;</span>
          <sub>&cap;</sub>
        </small>
      </Popover.Header>
      <Popover.Body className='p-0'>
        <ul className='list-group list-group-flush rounded-bottom'>
          {contextMenu.map((m, i) => (
            <li onClick={() => onClickFunction(index, m, data)} key={i} className={`list-group-item cursor-pointer py-1 px-2 small`}>
              {m.label}
            </li>
          ))}
        </ul>
      </Popover.Body>
    </Popover>
  );

  const getAliasValue = data => {
    if (typeof data !== "string") return "";

    const trimmedData = data.trim();
    if (!trimmedData) return "";

    const aliasMatch = trimmedData.match(/\bAS\b\s+([A-Za-z0-9_]+)\s*$/i);
    if (aliasMatch?.[1]) return aliasMatch[1];

    const asIndex = trimmedData.toUpperCase().lastIndexOf(" AS ");
    if (asIndex !== -1) {
      const aliasPart = trimmedData.slice(asIndex + 3).trim();
      return aliasPart.split(/\s+/)[0] || "";
    }
    return "";
  };

  const aliasPopover = (index, data) => {
    return (
      <Popover style={{ zIndex: 10000 }}>
        <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
          <small className='small'>
            <FormattedMessage id='alias' defaultMessage='alias' />
          </small>
        </Popover.Header>
        <Popover.Body className='p-0'>
          <Form.Control
            type='text'
            size='sm'
            placeholder='Alias name'
            maxLength={15}
            defaultValue={getAliasValue(data)}
            onChange={e => {
              onChangeAlias(index, e.target.value);
            }}
            onKeyDown={e => [" "].includes(e.key) && e.preventDefault()}
            style={{ boxShadow: "none" }}
          />
        </Popover.Body>
      </Popover>
    );
  };

  const onChangeAlias = (index, value) => {
    const aliasValue = value?.trim();
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        const isStringHavingAS = value.trim() === "" && value.trim().toUpperCase().endsWith(" AS");
        if (i === index && !isStringHavingAS) {
          const currentQuery = typeof c?.query === "string" ? c.query : "";
          const cleanedQuery = currentQuery.replace(/\s+AS\s+[A-Za-z0-9_]+$/i, "").trim();
          const nextQuery = aliasValue ? `${cleanedQuery} AS ${aliasValue}` : cleanedQuery;
          return { ...c, query: nextQuery };
        }
        return c;
      }),
    }));
  };

  const onClickFunction = (index, m, row) => {
    document.body.click();
    const updatedRow = {
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index && m.mode === "function") {
          return m.label !== "NULL" ? { ...c, query: `${m.label}(${c.data})`, input: [], row: [] } : { ...c, query: `${c.data}`, input: [], row: [] };
        }
        if (i === index && m.mode === "propertyBindingFunction") {
          const iPieces = [`${table}.${selectedWBFields[0]}`, "=", 0, c.data];
          return m.label !== "NULL"
            ? {
                ...c,
                ...{
                  row: m.pieces,
                  input: iPieces,
                  hasQuotes: m.hasQuotes,
                  query: m.pieces
                    .map((p, i) => {
                      return p.replace(`{${i}}`, !isNaN(iPieces[i]) ? `'${iPieces[i]}'` : iPieces[i]);
                    })
                    .join(""),
                },
              }
            : {};
        }
        if (i === index && m.mode === "operator") {
          return {
            ...c,
            ...{
              data: row.data,
              row: `${row.data} ${m.value}`,
              label: m.label,
              value: m.value,
              valueType: m.valueType,
              placeholder: m.placeholder,
              suffix: m.suffix,
              input: "",
            },
          };
        }
        if (i === index && m.mode === "joinQuery") {
          return {
            ...c,
            ...{
              row: `${m.label} JOIN ${row.targetTable.label} ON ${row.selectedSource} = ${row.selectedTarget}`,
              array: [row.targetTable.label, `${row.selectedSource} = ${row.selectedTarget}`, m.label],
              ...m,
            },
          };
        }
        if (i === index && m.mode === "inlineEdit") {
          return {
            ...c,
            ...{
              inlineEdit: true,
            },
          };
        }
        if (i === index && m.mode === "toggleFunction") {
          const toggleValues = Array.isArray(m.toggleArray) ? m.toggleArray : [];
          const currentIndex = typeof c.toggle === "number" ? c.toggle : 0;
          const nextIndex = currentIndex + 1 >= toggleValues.length ? 0 : currentIndex + 1;
          const selectedValue = toggleValues[nextIndex] ?? null;
          const obj = {
            query:
              m.label === "NULL"
                ? `${c.data}${selectedValue ? ` ${selectedValue}` : ""}`
                : `${m.label}(${c.data})${selectedValue ? ` ${selectedValue}` : ""}`,
            toggle: nextIndex,
            row: m.label === "NULL" ? c.data : `${m.label}(${c.data})`,
          };
          return {
            ...c,
            ...obj,
          };
        }
        return c;
      }),
    };
    setClause(prev => ({
      ...prev,
      ...updatedRow,
    }));
  };

  useEffect(() => {
    // console.log({ clause, targetKey });
  }, [clause, targetKey]);

  const BLOCKED_SQL_PATTERNS = [
    /\bSELECT\b/i,
    /\bINSERT\b/i,
    /\bUPDATE\b/i,
    /\bDELETE\b/i,
    /\bDROP\b/i,
    /\bALTER\b/i,
    /\bCREATE\b/i,
    /\bTRUNCATE\b/i,
    /\bREPLACE\b/i,
    /\bCALL\b/i,
    /\bSET\b/i,
    /\bINTO\s+OUTFILE\b/i,
    /\bINTO\s+DUMPFILE\b/i,
    /\bUNION\b/i,
    /\bWITH\b/i,

    // Query composition
    /\bSELECT\b/i,
    /\bFROM\b/i,
    /\bJOIN\b/i,

    // Subqueries
    /\(\s*SELECT\b/i,

    // SQL comments
    /--/,
    /\/\*/,
    /\*\//,
    /#/,

    // Multiple statements
    /;/,

    // MySQL potentially expensive functions
    /\bSLEEP\s*\(/i,
    /\bBENCHMARK\s*\(/i,
  ];

  const containsBlockedSql = (blockers, value) => {
    if (!value) return false;
    return blockers.some(pattern => pattern.test(value));
  };

  const onChangeWhereClause = (index, val, m, bool) => {
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index) {
          let newVal = "";
          const { value } = c;
          const pieces = val.split(",");
          if (m.valueType === "SINGLE") {
            newVal = value.replace("{a}", `${pieces[0]}`);
          }
          if (m.valueType === "DOUBLE") {
            if (pieces[0]) {
              newVal = value.replace("{a}", `${pieces[0]}`);
            }
            if (pieces[1]) {
              newVal = newVal.replace("{b}", `${pieces[1]}`);
            }
          }
          if (m.valueType === "MULTIPLE") {
            newVal = value.replace("{n}", `(${pieces.map(value => `'${value}'`).join(",")})`);
          }
          if (m.valueType === "KEYVALUE") {
            newVal = value.replace("{a}", val);
            return {
              ...c,
              row: !containsBlockedSql(BLOCKED_SQL_PATTERNS, newVal) ? `${newVal}${bool ? ` ${c.suffix}` : ""}` : "",
              input: !containsBlockedSql(BLOCKED_SQL_PATTERNS, newVal) ? newVal : "",
            };
          } else {
            return {
              ...c,
              row: `${c.data} ${newVal}${bool ? ` ${c.suffix}` : ""}`,
              input: val,
            };
          }
        }
        return c;
      }),
    }));
  };

  const onDropHandle = e => {
    const { source, data } = JSON.parse(e.dataTransfer.getData("text"));
    if (clause[targetKey] && source?.includes(targetKey) && type === "array") {
      setClause(prev => ({
        ...prev,
        [targetKey]: [
          ...new Set([
            ...clause[targetKey],
            {
              row: [],
              data,
              input: [`${table}.${selectedWBFields[0]}`, "=", 0, data],
              query: data,
              hasQuotes: [],
            },
          ]),
        ],
      }));
    }
    if (source.includes(targetKey) && type === "string") {
      setClause(prev => ({
        ...prev,
        [targetKey]: data,
      }));
    }
    if (source.includes(targetKey) && type === "arrayOfObjects") {
      if (!clause[targetKey].filter(f => f.data === data).length) {
        setClause(prev => ({
          ...prev,
          [targetKey]: [
            ...clause[targetKey],
            {
              data,
              row: `${data}${contextMenu && contextMenu[0]?.value ? ` ${contextMenu[0]?.value}` : ""}`,
              ...(contextMenu && contextMenu.length ? contextMenu[0] : []),
            },
          ],
        }));
      }
    }
    if (source.includes(targetKey) && type === "relation") {
      const getFieldList = where => {
        return optionsConfig.filter(f => f.id === "MP")[0].tables.filter(f => f.label === where)[0];
      };
      const onString = `${getFieldList(clause["from"])?.label}.${getFieldList(clause["from"])?.fields[0]}`;
      const targetString = `${data}.${getFieldList(data)?.fields[0]}`;
      const joinType = contextMenu && contextMenu[0]?.label ? `${contextMenu[0]?.label}` : "";
      if (clause["from"] && !clause[targetKey].filter(f => f.array.includes(onString)).length) {
        setClause(prev => ({
          ...prev,
          [targetKey]: [
            ...clause[targetKey],
            {
              sourceTable: getFieldList(clause["from"]),
              targetTable: getFieldList(data),
              row: `${joinType} JOIN ${data} ON ${onString} = ${targetString}`,
              selectedSource: onString,
              selectedTarget: targetString,
              ...(contextMenu && contextMenu.length ? contextMenu[0] : []),
              array: [data, `${onString} = ${targetString}`, joinType],
            },
          ],
        }));
      }
    }
    if (source.includes(targetKey) && type === "arrayOfToggle") {
      setClause(prev => ({
        ...prev,
        [targetKey]: [
          ...clause[targetKey],
          {
            data,
            query: data,
            row: data,
          },
        ],
      }));
    }
  };

  const renderArrayOfToggle = useCallback(() => {
    return (
      <ul className='list-group p-1'>
        {clause[targetKey] &&
          clause[targetKey].map((s, i) => (
            <li key={i} className={`list-group-item ${theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white text-dark"}`}>
              <div className={`p-1 d-flex align-items-center justify-content-between`} style={{ columnGap: "10px" }}>
                {contextMenu?.length > 0 && (
                  <OverlayTrigger trigger='click' placement='right' overlay={popover(i)} rootClose>
                    <i className='fa fa-bars cursor-pointer' />
                  </OverlayTrigger>
                )}
                <span title={s.query} className='d-inline-block text-truncate text-end small'>
                  {s.query}
                </span>
                <i onClick={() => onDeleteHandle(i)} className='fa fa-times-circle cursor-pointer text-danger' />
              </div>
            </li>
          ))}
      </ul>
    );
  }, [clause, targetKey, theme, contextMenu, popover]);

  const onDeleteHandle = (index = null) => {
    setClause(prev => ({
      ...prev,
      ...(type === "array" || type === "arrayOfObjects" || type === "relation" || type === "arrayOfToggle"
        ? {
            [targetKey]: clause[targetKey].filter((_, j) => j !== index),
          }
        : {
            [targetKey]: "",
          }),
    }));
  };

  const onSuffixClick = (val, index) => {
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index) {
          c.suffix = val;
          c.row = `${c.data} ${c.value} ${val}`;
        }
        return c;
      }),
    }));
  };

  const onDropDownChange = (val, index, key) => {
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index) {
          c[key] = val;
          c.row = `${c.label} JOIN ${c.targetTable.label} ON ${c.selectedSource} = ${c.selectedTarget}`;
          c.array = [c.targetTable.label, `${c.selectedSource} = ${c.selectedTarget}`, c.label];
        }
        return c;
      }),
    }));
  };

  const onChangeSelectParams = (index, subIndex, value) => {
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index) {
          c.input = c.input.map((inp, j) => {
            if (j === subIndex) {
              inp = value;
            }
            return inp;
          });
          c.query = c.row
            .map((r, k) => {
              return r.replace(`{${k}}`, c.hasQuotes[k] ? `'${c.input[k]}'` : c.input[k]);
            })
            .join("");
        }
        return c;
      }),
    }));
  };

  const onInlineEdit = (val, index) => {
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index) {
          c.query = !containsBlockedSql(BLOCKED_SQL_PATTERNS, val) ? val : "";
        }
        return c;
      }),
    }));
  };

  const renderArrayOfObjectType = () => (
    <ul className='list-group p-1'>
      {clause[targetKey].map((s, i) => (
        <React.Fragment key={i}>
          <li
            className={`p-1 list-group-item ${theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white text-dark"}`}
            style={{ columnGap: "10px" }}
          >
            <div className='d-flex align-items-center justify-content-between' style={{ columnGap: "5px" }}>
              {contextMenu?.length > 0 && (
                <OverlayTrigger trigger='click' placement='right' overlay={popover(i, s)} rootClose>
                  <i className='fa fa-bars cursor-pointer' />
                </OverlayTrigger>
              )}
              {s.label !== "CUSTOM" && (
                <span title={s.data} className='w-50 d-inline-block text-truncate small'>
                  {s.data}
                </span>
              )}
              <span title={s.label} className='d-inline-block text-truncate text-end small'>
                {s.label}
              </span>
              <i onClick={() => onDeleteHandle(i)} className='fa fa-times-circle cursor-pointer text-danger' />
            </div>
            {s.valueType !== "NULL" && (
              <div className=''>
                {["SINGLE", "MULTIPLE", "KEYVALUE"].includes(s.valueType) && (
                  <Form.Control
                    onChange={e => {
                      onChangeWhereClause(i, e.target.value, s, clause[targetKey].length - 1 !== i);
                    }}
                    type='text'
                    size='sm'
                    disabled={!s.label}
                    placeholder={s.placeholder}
                    value={s.input}
                  />
                )}
                {["DOUBLE"].includes(s.valueType) && (
                  <Row>
                    <Col xs={4} className='py-1'>
                      {selectedDoubleInput.id === "DATE" ? (
                        <div className='position-relative' style={{ zoom: "0.7" }}>
                          <DateTimePicker
                            className='bg-white text-dark'
                            value={selectedDoubleInput.input.start}
                            format='y-MM-dd'
                            clearIcon={null}
                            onChange={value => {
                              setSelectedDoubleInput(prev => {
                                onChangeWhereClause(
                                  i,
                                  `${new moment(value).format("YYYY-MM-DD").toString()},${new moment(prev.input.end)
                                    .format("YYYY-MM-DD")
                                    .toString()}`,
                                  s,
                                  clause[targetKey].length - 1 !== i,
                                );
                                return {
                                  ...prev,
                                  input: { ...prev.input, start: value },
                                };
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <Form.Control
                          onChange={e => {
                            setSelectedDoubleInput(prev => {
                              onChangeWhereClause(i, `${e.target.value},${prev.input.end}`, s, clause[targetKey].length - 1 !== i);
                              return {
                                ...prev,
                                input: { ...prev.input, start: e.target.value },
                              };
                            });
                          }}
                          type='number'
                          size='sm'
                          placeholder={s.placeholder}
                          value={selectedDoubleInput.input.start}
                        />
                      )}
                    </Col>
                    <Col xs={4} className='py-1'>
                      {selectedDoubleInput.id === "DATE" ? (
                        <div className='position-relative' style={{ zoom: "0.7" }}>
                          <DateTimePicker
                            className='bg-white text-dark'
                            value={selectedDoubleInput.input.end}
                            format='y-MM-dd'
                            clearIcon={null}
                            onChange={value => {
                              setSelectedDoubleInput(prev => {
                                onChangeWhereClause(
                                  i,
                                  `${new moment(prev.input.start).format("YYYY-MM-DD").toString()},${new moment(value)
                                    .format("YYYY-MM-DD")
                                    .toString()}`,
                                  s,
                                  clause[targetKey].length - 1 !== i,
                                );
                                return {
                                  ...prev,
                                  input: { ...prev.input, end: value },
                                };
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <Form.Control
                          onChange={e => {
                            setSelectedDoubleInput(prev => {
                              onChangeWhereClause(i, `${prev.input.start},${e.target.value}`, s, clause[targetKey].length - 1 !== i);
                              return {
                                ...prev,
                                input: { ...prev.input, end: e.target.value },
                              };
                            });
                          }}
                          type='number'
                          size='sm'
                          placeholder={s.placeholder}
                          value={selectedDoubleInput.input.end}
                        />
                      )}
                    </Col>
                    <Col xs={4}>
                      <Dropdown title={selectedDoubleInput.label} className='d-grid' size='sm'>
                        <Dropdown.Toggle className='btn btn-sm btn-bni'>{selectedDoubleInput.label}</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {doubleInputChoice.map((d, i) => (
                            <Dropdown.Item
                              key={i}
                              onClick={() => {
                                setSelectedDoubleInput(d);
                              }}
                            >
                              <div title={d.label}>{d.label}</div>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                )}
                {clause[targetKey].length > 1 && clause[targetKey].length - 1 !== i && (
                  <DropdownButton
                    variant={`btn btn-sm btn-${theme} mt-1 border-1 ${theme === "dark" ? "border-secondary" : "border"}`}
                    title={s.suffix}
                    className=''
                  >
                    {suffixList &&
                      suffixList.map((a, j) => (
                        <Dropdown.Item key={j} href='#' onClick={() => onSuffixClick(a, i)} className='p-1'>
                          {a}
                        </Dropdown.Item>
                      ))}
                  </DropdownButton>
                )}
              </div>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  const aliasSelection = () => {
    const aliasArray = clause["select"].map((sel, i) => {
      const pieces = sel?.query?.split(" AS ");
      const object = pieces.length === 2 ? { id: i, value: pieces[1] } : { id: i, value: pieces[0] };
      return object;
    });
    return aliasArray;
  };

  const renderArrayType = useCallback(
    () => (
      <ul className='list-group p-1'>
        {clause[targetKey].map((s, i) => (
          <li key={i} className={`list-group-item ${theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white text-dark"}`}>
            <div className={`p-1 d-flex align-items-center justify-content-between`} style={{ columnGap: "10px" }}>
              {contextMenu?.length > 0 && (
                <OverlayTrigger trigger='click' placement='right' overlay={popover(i)} rootClose>
                  <i className='fa fa-bars cursor-pointer' />
                </OverlayTrigger>
              )}
              {Object.prototype.hasOwnProperty.call(s, "inlineEdit") && s?.inlineEdit ? (
                <Form.Control type='text' value={s.query} size='sm' onChange={e => onInlineEdit(e.target.value, i)} />
              ) : (
                <span className='text-break small'>{s.query}</span>
              )}
              <div className='d-flex align-items-center' style={{ columnGap: "5px" }}>
                {showAlias && (
                  <OverlayTrigger trigger='click' placement='top' overlay={aliasPopover(i, s.query)} rootClose>
                    <i className='fa fa-font cursor-pointer text-warning' title='Alias' />
                  </OverlayTrigger>
                )}
                <i onClick={() => onDeleteHandle(i)} className='fa fa-times-circle cursor-pointer text-danger' />
              </div>
            </div>
            {s?.row?.length > 0 && (
              <InputGroup size='sm' className='pb-2'>
                <select
                  className='form-control form-control-sm'
                  onChange={e => onChangeSelectParams(i, 0, e.target.value)}
                  defaultValue={s?.input[0]}
                >
                  <option value={null}>--</option>
                  {["select"].includes(targetKey)
                    ? optionsConfig[0].tables.map((t, i) => t?.fields.map((f, j) => <option key={`${i}-${j}`}>{`${t.label}.${f}`}</option>))
                    : aliasSelection().map(t => <option key={t.id}>{`${t.value}`}</option>)}
                </select>
                <select
                  className='form-control form-control-sm'
                  onChange={e => onChangeSelectParams(i, 1, e.target.value)}
                  defaultValue={s?.input[1]}
                >
                  <option value={null}>--</option>
                  {["=", "!=", ">", "<", ">=", "<="].map((m, i) => (
                    <option key={i} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <FormControl
                  placeholder={intl.formatMessage({
                    id: "stringNumber",
                    defaultMessage: "stringNumber",
                  })}
                  defaultValue={s?.input[2]}
                  maxLength={20}
                  onChange={e => onChangeSelectParams(i, 2, e.target.value)}
                />
              </InputGroup>
            )}
          </li>
        ))}
      </ul>
    ),
    [clause],
  );

  const renderStringType = () => (
    <ul className='list-group p-1'>
      <li
        className={`p-1 d-flex align-items-center justify-content-between list-group-item ${
          theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white text-dark"
        }`}
      >
        <span className='small'>{clause[targetKey]}</span>
        <i onClick={() => onDeleteHandle()} className='fa fa-times-circle cursor-pointer text-danger' />
      </li>
    </ul>
  );

  const renderRange = () => (
    <ul className='p-1'>
      <li className={`${theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white text-dark"}`}>
        <Row className='align-items-center justify-content-between row-gap-2'>
          {contextMenu.map((m, i) => (
            <React.Fragment key={i}>
              <Col xs={3} className='small'>
                <kbd className={`p-1 rounded border border-1 border-secondary bg-secondary`}>{m.label}</kbd>
              </Col>
              <Col xs={9} className='d-flex align-items-center justify-content-between' style={{ columnGap: "5px" }}>
                <i
                  className='fa fa-minus cursor-pointer'
                  onClick={() =>
                    setClause(prev => ({
                      ...prev,
                      [targetKey]: clause[targetKey].map((c, j) => {
                        if (i === j) {
                          c = c > m.min ? c - 1 : c;
                        }
                        return c;
                      }),
                    }))
                  }
                />
                <Slider
                  className='w-100'
                  min={m.min}
                  max={m.max}
                  value={clause[targetKey][i]}
                  step={1}
                  orientation='horizontal'
                  onChange={v =>
                    setClause(prev => ({
                      ...prev,
                      [targetKey]: clause[targetKey].map((c, j) => {
                        if (i === j) {
                          m.input = v;
                          c = v;
                        }
                        return c;
                      }),
                    }))
                  }
                  tooltip={false}
                />
                <i
                  className='fa fa-plus cursor-pointer'
                  onClick={() =>
                    setClause(prev => ({
                      ...prev,
                      [targetKey]: clause[targetKey].map((c, j) => {
                        if (i === j) {
                          c = c < m.max ? c + 1 : c;
                        }
                        return c;
                      }),
                    }))
                  }
                />
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </li>
    </ul>
  );

  const renderRelation = () =>
    clause[targetKey].length > 0 && (
      <ul className='list-group p-1'>
        {clause[targetKey].map((s, i) => (
          <React.Fragment key={i}>
            <li
              className={`p-1 small list-group-item ${theme === "dark" ? "bg-dark text-white border-secondary" : "bg-white text-dark"}`}
              style={{ columnGap: "10px" }}
            >
              <div className='d-flex align-items-center justify-content-between' style={{ columnGap: "5px" }}>
                {contextMenu?.length > 0 && (
                  <OverlayTrigger trigger='click' placement='right' overlay={popover(i, s)} rootClose>
                    <i className='fa fa-bars cursor-pointer' />
                  </OverlayTrigger>
                )}
                <select
                  className='form-control form-control-sm'
                  title={s.selectedSource}
                  value={s.selectedSource}
                  onChange={e => {
                    onDropDownChange(e.target.value, i, "selectedSource");
                  }}
                >
                  <option value={null}>--</option>
                  {s.sourceTable?.fields?.length &&
                    s.sourceTable.fields.map((f, i) => (
                      <option key={i} value={`${s.sourceTable.label}.${f}`}>{`${s.sourceTable.label}.${f}`}</option>
                    ))}
                </select>
                <div className='fs-3 lh-1'>&asymp;</div>
                <select
                  className='form-control form-control-sm'
                  title={s.selectedTarget}
                  value={s.selectedTarget}
                  onChange={e => {
                    onDropDownChange(e.target.value, i, "selectedTarget");
                  }}
                >
                  <option value={null}>--</option>
                  {s.targetTable?.fields?.length > 0 &&
                    s.targetTable.fields.map((f, i) => (
                      <option key={i} value={`${s.targetTable.label}.${f}`}>{`${s.targetTable.label}.${f}`}</option>
                    ))}
                </select>
                <div className='small'>{s.label}</div>
                <i onClick={() => onDeleteHandle(i)} className='fa fa-times-circle cursor-pointer text-danger' />
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    );

  const renderConditionalType = useCallback(() => {
    if (type === "array") {
      if (Array.isArray(clause[targetKey]) && clause[targetKey].length > 0) {
        return renderArrayType();
      }
    }
    if (type === "string") {
      if (typeof clause[targetKey] === "string" && clause[targetKey] !== "") {
        return renderStringType();
      }
    }
    if (type === "arrayOfToggle") {
      return renderArrayOfToggle();
    }
    if (type === "arrayOfObjects") {
      if (clause[targetKey].length > 0) {
        return renderArrayOfObjectType();
      }
    }
    if (type === "range") {
      return renderRange();
    }
    if (type === "relation") {
      return renderRelation();
    }
  }, [type, clause, targetKey]);

  return (
    <div className='m-1'>
      <div className={`rounded border border-1 ${theme === "dark" ? "border-secondary" : ""}`} onDrop={e => onDropHandle(e)}>
        <div
          className='small p-1'
          style={{
            ...((tableDragging?.source?.includes(targetKey) || fieldDragging?.source?.includes(targetKey)) && {
              background: "var(--app-theme-bg-color)",
              borderRadius: "0.375rem",
            }),
          }}
        >
          <kbd className='bg-secondary'>{targetKey.toUpperCase()}</kbd>
        </div>
        {renderConditionalType()}
      </div>
    </div>
  );
};

export default DynamicClause;
