import React, { useState, useEffect } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import md5 from "md5";

function ReactiveForm(props) {
  const { structure, className, onChange, ...rest } = props;
  const [data, setData] = useState(structure);
  const [eye, setEye] = useState(false);
  const [errorIndexes, setErrorIndexes] = useState([]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleChange = (e, index, value) => {
    onChange(index, value);
  };

  const renderCloneTooltip = (props, content) => (
    <Tooltip id="button-tooltip-1" className="in show" {...rest}>
      {content}
    </Tooltip>
  );

  const HelpContent = (props) => {
    const { label } = props;
    return (
      <OverlayTrigger
        placement="top"
        overlay={renderCloneTooltip(props, label)}
        triggerType="hover"
      >
        <i className="fa fa-question-circle" />
      </OverlayTrigger>
    );
  };

  const ErrorSpan = (props) => {
    return (
      <div className="text-danger">
        Your input does not match the criteria
      </div>
    );
  };

  const validate = (row, value) => {
    if (row.options.validation) {
      let bErrorIndexes = [...errorIndexes];
      const test = new RegExp(row.options.validation).test(value);
      if (!test) {
        bErrorIndexes.push(row.index);
      } else {
        const myIndex = bErrorIndexes.indexOf(row.index);
        if (myIndex !== -1) {
          bErrorIndexes.splice(myIndex, 1);
        }
      }
      bErrorIndexes = [...new Set(bErrorIndexes)];
      setErrorIndexes(bErrorIndexes);
    }
  };

  const renderElement = (row) => {
    switch (row.elementType) {
      case "text":
        return (
          <div className="form-group" key={row.index}>
            <label htmlFor={row.id}>
              {row.label}{" "}
              {row.options.help && <HelpContent label={row.options.help} />}
            </label>
            <input
              id={row.id}
              type="text"
              placeholder={row.placeHolder}
              onChange={(e) => handleChange(e, row.index, e.target.value)}
              onKeyUp={(e) => validate(row, e.target.value)}
              className={row.className}
              defaultValue={row.value}
              {...rest}
            />
            {errorIndexes.includes(row.index) && <ErrorSpan />}
          </div>
        );
      case "number":
        return (
          <div className="form-group" key={row.index}>
            <label htmlFor={row.id}>
              {row.label}{" "}
              {row.options.help && <HelpContent label={row.options.help} />}
            </label>
            <input
              id={row.id}
              type="number"
              placeholder={row.placeHolder}
              onChange={(e) => handleChange(e, row.index, e.target.value)}
              onKeyUp={(e) => validate(row, e.target.value)}
              className={row.className}
              defaultValue={row.value}
              {...rest}
            />
            {errorIndexes.includes(row.index) && <ErrorSpan />}
          </div>
        );
      case "password":
        return (
          <div className="form-group password" key={row.index}>
            <label htmlFor={row.id}>
              {row.label}{" "}
              {row.options.help && <HelpContent label={row.options.help} />}
            </label>
            <input
              id={row.id}
              type={`${!eye ? "password" : "text"}`}
              placeholder={row.placeHolder}
              onChange={(e) => handleChange(e, row.index, md5(e.target.value))}
              onKeyUp={(e) => validate(row, e.target.value)}
              className={row.className}
              defaultValue={row.value}
              {...rest}
            />
            <i onClick={() => setEye(!eye)} className={`eye fa fa-${eye ? "eye" : "eye-slash"}`} />
            {errorIndexes.includes(row.index) && <ErrorSpan />}
          </div>
        );
      default:
        return <div>Unknown Element</div>;
    }
  };
  return (
    <div className={className}>
      {JSON.stringify(errorIndexes)}
      {data.map((row) => renderElement(row))}
      <button disabled={errorIndexes.length > 0} onClick={() => alert("success")} className="btn btn-bni pull-right">Submit</button>
    </div>
  );
}

export default ReactiveForm;
