import React, { useContext, useEffect } from "react";
import WorkbookContext from "../WorkbookContext";
import { DSContext } from "./DataSource";
import {
  Popover,
  OverlayTrigger,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import Slider from "react-rangeslider";

const DynamicClause = props => {
  const { targetKey, type, contextMenu, suffixList, showAlias } = props;
  const workbookContext = useContext(WorkbookContext);
  const dSContext = useContext(DSContext);
  const { clause, setClause, optionsConfig, tableDragging, fieldDragging } =
    dSContext;
  const { theme } = workbookContext;

  const popover = (index, data) => (
    <Popover style={{ zIndex: 9999 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small className='small'>
          <span>&fnof;</span>
          <sub>&cap;</sub>
        </small>
      </Popover.Header>
      <Popover.Body className='p-0'>
        <ul className='list-group list-group-flush rounded-bottom'>
          {contextMenu.map((m, i) => (
            <li
              onClick={() => onClickFunction(index, m, data)}
              key={i}
              className={`list-group-item cursor-pointer py-1 px-2 small`}
            >
              {m.label}
            </li>
          ))}
        </ul>
      </Popover.Body>
    </Popover>
  );

  const aliasPopover = (index, data) => (
    <Popover style={{ zIndex: 9999 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <small className='small'>Alias</small>
      </Popover.Header>
      <Popover.Body className='p-0'>
        <Form.Control
          type='text'
          size='sm'
          placeholder='Alias name'
          maxLength={15}
          defaultValue={data.split(" ")[data.split(" ").length - 1]}
          onChange={e => onChangeAlias(index, e.target.value)}
          onKeyDown={e => [" "].includes(e.key) && e.preventDefault()}
        />
      </Popover.Body>
    </Popover>
  );

  const onChangeAlias = (index, value) => {
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index) {
          return value !== ""
            ? `${c.split(" ")[0]} AS ${value}`
            : c.split(" ")[0];
        }
        return c;
      }),
    }));
  };

  const onClickFunction = (index, m, row) => {
    document.body.click();
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index && m.mode === "function") {
          if (/[()]/.test(c)) {
            const str = c
              .match(/\((.*?)\)/g)
              .map(b => b.replace(/\(|(.*?)\)/g, "$1"));
            return m.label !== "NULL" ? `${m.label}(${str})` : str[0];
          }
          return m.label !== "NULL" ? `${m.label}(${c})` : c;
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
              array: [
                row.targetTable.label,
                `${row.selectedSource} = ${row.selectedTarget}`,
                m.label,
              ],
              ...m,
            },
          };
        }
        return c;
      }),
    }));
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
          if (m.valueType === "DOUBLE" && pieces[0] && pieces[1]) {
            newVal = value.replace("{a}", `${pieces[0]}`);
            newVal = newVal.replace("{b}", `${pieces[1]}`);
          }
          if (m.valueType === "MULTIPLE") {
            newVal = value.replace("{n}", `(${pieces.join(",")})`);
          }
          return {
            ...c,
            row: `${c.data} ${newVal}${bool ? ` ${c.suffix}` : ""}`,
            input: val,
          };
        }
        return c;
      }),
    }));
  };

  const onDropHandle = e => {
    const { source, data } = JSON.parse(e.dataTransfer.getData("text"));
    if (source.includes(targetKey) && type === "array") {
      setClause(prev => ({
        ...prev,
        [targetKey]: [...new Set([...clause[targetKey], data])],
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
              row: `${data}${
                contextMenu && contextMenu[0]?.value
                  ? ` ${contextMenu[0]?.value}`
                  : ""
              }`,
              ...(contextMenu && contextMenu.length ? contextMenu[0] : []),
            },
          ],
        }));
      }
    }
    if (source.includes(targetKey) && type === "relation") {
      const getFieldList = where => {
        return optionsConfig
          .filter(f => f.id === "MP")[0]
          .tables.filter(f => f.label === where)[0];
      };
      const onString = `${getFieldList(clause["from"])?.label}.${
        getFieldList(clause["from"])?.fields[0]
      }`;
      const targetString = `${data}.${getFieldList(data)?.fields[0]}`;
      const joinType =
        contextMenu && contextMenu[0]?.label ? `${contextMenu[0]?.label}` : "";
      if (
        clause["from"] &&
        !clause[targetKey].filter(f => f.array.includes(onString)).length
      ) {
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
  };

  useEffect(() => {
    // console.log("bbb", targetKey, clause);
  }, [clause]);

  const onDeleteHandle = (index = null) => {
    setClause(prev => ({
      ...prev,
      ...(type === "array" || type === "arrayOfObjects" || type === "relation"
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
          c.array = [
            c.targetTable.label,
            `${c.selectedSource} = ${c.selectedTarget}`,
            c.label,
          ];
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
            className={`p-1 list-group-item ${
              theme === "dark"
                ? "bg-dark text-white border-secondary"
                : "bg-white text-dark"
            }`}
            style={{ columnGap: "10px" }}
          >
            <div
              className='d-flex align-items-center justify-content-between'
              style={{ columnGap: "5px" }}
            >
              {contextMenu?.length > 0 && (
                <OverlayTrigger
                  trigger='click'
                  placement='right'
                  overlay={popover(i, s)}
                  rootClose
                >
                  <i className='fa fa-bars cursor-pointer' />
                </OverlayTrigger>
              )}
              <span
                title={s.data}
                className='w-50 d-inline-block text-truncate small'
              >
                {s.data}
              </span>
              <span
                title={s.label}
                className='d-inline-block text-truncate text-end small'
              >
                {s.label}
              </span>
              <i
                onClick={() => onDeleteHandle(i)}
                className='fa fa-times-circle cursor-pointer text-danger'
              />
            </div>
            {s.valueType !== "NULL" && (
              <InputGroup className='' size='sm'>
                <Form.Control
                  onChange={e =>
                    onChangeWhereClause(
                      i,
                      e.target.value,
                      s,
                      clause[targetKey].length - 1 !== i,
                    )
                  }
                  type='text'
                  size='sm'
                  disabled={!s.label}
                  placeholder={s.placeholder}
                  value={s.input}
                />
                {/* calendar pending */}
                {clause[targetKey].length > 1 &&
                  clause[targetKey].length - 1 !== i && (
                    <DropdownButton
                      variant={`btn btn-${theme} border-1 ${
                        theme === "dark" ? "border-secondary" : "border"
                      }`}
                      title={s.suffix}
                      className='p-1'
                    >
                      {suffixList &&
                        suffixList.map((a, j) => (
                          <Dropdown.Item
                            key={j}
                            href='#'
                            onClick={() => onSuffixClick(a, i)}
                            className='p-1'
                          >
                            {a}
                          </Dropdown.Item>
                        ))}
                    </DropdownButton>
                  )}
              </InputGroup>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  const renderArrayType = () => (
    <ul className='list-group p-1'>
      {clause[targetKey].map((s, i) => (
        <li
          key={i}
          className={`p-1 d-flex align-items-center justify-content-between list-group-item ${
            theme === "dark"
              ? "bg-dark text-white border-secondary"
              : "bg-white text-dark"
          }`}
          style={{ columnGap: "10px" }}
        >
          {contextMenu?.length > 0 && (
            <OverlayTrigger
              trigger='click'
              placement='right'
              overlay={popover(i)}
              rootClose
            >
              <i className='fa fa-bars cursor-pointer' />
            </OverlayTrigger>
          )}
          <span className='text-break small'>{s}</span>
          <div
            className='d-flex align-items-center'
            style={{ columnGap: "5px" }}
          >
            {showAlias && (
              <OverlayTrigger
                trigger='click'
                placement='top'
                overlay={aliasPopover(i, s)}
                rootClose
              >
                <i
                  className='fa fa-font cursor-pointer text-warning'
                  title='Alias'
                />
              </OverlayTrigger>
            )}
            <i
              onClick={() => onDeleteHandle(i)}
              className='fa fa-times-circle cursor-pointer text-danger'
            />
          </div>
        </li>
      ))}
    </ul>
  );

  const renderStringType = () => (
    <ul className='list-group p-1'>
      <li
        className={`p-1 d-flex align-items-center justify-content-between list-group-item ${
          theme === "dark"
            ? "bg-dark text-white border-secondary"
            : "bg-white text-dark"
        }`}
      >
        <span className='small'>{clause[targetKey]}</span>
        <i
          onClick={() => onDeleteHandle()}
          className='fa fa-times-circle cursor-pointer text-danger'
        />
      </li>
    </ul>
  );

  const renderRange = () => (
    <ul className='list-group p-1'>
      <li
        className={`list-group-item ${
          theme === "dark"
            ? "bg-dark text-white border-secondary"
            : "bg-white text-dark"
        }`}
      >
        <Row className='align-items-center justify-content-between'>
          {contextMenu.map((m, i) => (
            <React.Fragment key={i}>
              <Col xs={3}>{m.label}</Col>
              <Col
                xs={9}
                className='d-flex align-items-center justify-content-between'
                style={{ columnGap: "5px" }}
              >
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
              className={`p-1 small list-group-item ${
                theme === "dark"
                  ? "bg-dark text-white border-secondary"
                  : "bg-white text-dark"
              }`}
              style={{ columnGap: "10px" }}
            >
              <div
                className='d-flex align-items-center justify-content-between'
                style={{ columnGap: "5px" }}
              >
                {contextMenu?.length > 0 && (
                  <OverlayTrigger
                    trigger='click'
                    placement='right'
                    overlay={popover(i, s)}
                    rootClose
                  >
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
                  {s.sourceTable?.fields?.length &&
                    s.sourceTable.fields.map((f, i) => (
                      <option
                        key={i}
                        value={`${s.sourceTable.label}.${f}`}
                      >{`${s.sourceTable.label}.${f}`}</option>
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
                  {s.targetTable?.fields?.length > 0 &&
                    s.targetTable.fields.map((f, i) => (
                      <option
                        key={i}
                        value={`${s.targetTable.label}.${f}`}
                      >{`${s.targetTable.label}.${f}`}</option>
                    ))}
                </select>
                <div className='small'>{s.label}</div>
                <i
                  onClick={() => onDeleteHandle(i)}
                  className='fa fa-times-circle cursor-pointer text-danger'
                />
              </div>
            </li>
          </React.Fragment>
        ))}
      </ul>
    );

  const renderConditionalType = () => {
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
  };

  return (
    <div className='m-1'>
      <div
        className={`rounded border border-1 ${
          theme === "dark" ? "border-secondary" : ""
        }`}
        onDrop={e => onDropHandle(e)}
      >
        <div
          className='small p-1'
          style={{
            ...((tableDragging?.source?.includes(targetKey) ||
              fieldDragging?.source?.includes(targetKey)) && {
              background: "var(--app-theme-bg-color)",
              borderRadius: "0.375rem",
            }),
          }}
        >
          {targetKey.toUpperCase()}
        </div>
        {renderConditionalType()}
      </div>
    </div>
  );
};

export default DynamicClause;
