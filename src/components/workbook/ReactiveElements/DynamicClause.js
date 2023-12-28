import React, { useContext } from "react";
import WorkbookContext from "../WorkbookContext";
import { DSContext } from "./DataSource";
import { Popover, OverlayTrigger } from "react-bootstrap";

const DynamicClause = props => {
  const { targetKey, type, contextMenu } = props;
  const workbookContext = useContext(WorkbookContext);
  const dSContext = useContext(DSContext);
  const { clause, setClause } = dSContext;
  const { theme } = workbookContext;

  const popover = index => (
    <Popover style={{ zIndex: 9999 }}>
      <Popover.Header as='div' className={`bni-bg bni-text py-1 px-2`}>
        <span>
          <span>f</span>
          <sub>(x)</sub>
        </span>
      </Popover.Header>
      <Popover.Body className='p-0'>
        <ul className='list-group list-group-flush rounded-bottom'>
          {contextMenu.map((m, i) => (
            <li
              onClick={() => onClickFunction(index, m.label, m.mode)}
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

  const onClickFunction = (index, fn, mode) => {
    setClause(prev => ({
      ...prev,
      [targetKey]: clause[targetKey].map((c, i) => {
        if (i === index && mode === "function") {
          if (/[()]/.test(c)) {
            const str = c
              .match(/\((.*?)\)/g)
              .map(b => b.replace(/\(|(.*?)\)/g, "$1"));
            return fn !== "NULL" ? `${fn}(${str})` : str[0];
          }
          return fn !== "NULL" ? `${fn}(${c})` : c;
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
      setClause(prev => ({
        ...prev,
        [targetKey]: [data],
      }));
    }
  };

  const onDeleteHandle = (index = null) => {
    setClause(prev => ({
      ...prev,
      ...(type === "array"
        ? {
            [targetKey]: clause[targetKey].filter((_, j) => j !== index),
          }
        : {
            [targetKey]: "",
          }),
    }));
  };
  const renderArrayOfObjectType = () => (
    <ul className='list-group'>
      {clause[targetKey].map((s, i) => (
        <li
          key={i}
          className={`p-1 d-flex align-items-center justify-content-between small list-group-item ${
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
          <span className='w-75 text-break'>{s}</span>
          <i
            onClick={() => onDeleteHandle(i)}
            className='fa fa-times-circle cursor-pointer text-danger'
          />
        </li>
      ))}
    </ul>
  );

  const renderArrayType = () => (
    <ul className='list-group'>
      {clause[targetKey].map((s, i) => (
        <li
          key={i}
          className={`p-1 d-flex align-items-center justify-content-between small list-group-item ${
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
          <span className='w-75 text-break'>{s}</span>
          <i
            onClick={() => onDeleteHandle(i)}
            className='fa fa-times-circle cursor-pointer text-danger'
          />
        </li>
      ))}
    </ul>
  );

  const renderStringType = () => (
    <ul className='list-group'>
      <li
        className={`p-1 d-flex align-items-center justify-content-between small list-group-item ${
          theme === "dark"
            ? "bg-dark text-white border-secondary"
            : "bg-white text-dark"
        }`}
      >
        <span>{clause[targetKey]}</span>
        <i
          onClick={() => onDeleteHandle()}
          className='fa fa-times-circle cursor-pointer text-danger'
        />
      </li>
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
  };

  return (
    <div className='m-1'>
      <div
        className={`rounded p-1 border border-1 ${
          theme === "dark" ? "border-secondary" : ""
        }`}
        onDrop={e => onDropHandle(e)}
      >
        <div className='pb-1 small'>{targetKey.toUpperCase()}</div>
        {renderConditionalType()}
      </div>
    </div>
  );
};

export default DynamicClause;
