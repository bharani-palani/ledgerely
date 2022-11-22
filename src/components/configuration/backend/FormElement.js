import React, { useState, useRef } from "react";
import Radio from "./FormElements/Radio";
import HtmlIcon from "./FormElements/HtmlIcon";
import FilterSelect from "./FormElements/FilterSelect";
// import DateTimeSelector from "./FormElements/DateTimeSelector";
import DateTimePicker from 'react-datetime-picker';

function FormElement(props) {
  const {
    isPostable,
    config,
    index,
    value,
    element,
    primaryKey,
    onChange,
    placeholder,
    showDecrement,
    showIncrement,
    onDelete,
    onAddRow,
    ...rest
  } = props;
  const inputRef = useRef([]);
  inputRef.current = [];
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [dateTime, setDateTime] = useState(value ? new Date(value) : new Date());

  const objectToDate = date => {
    const [YYYY, MM, DD] = [
      date.getFullYear(),
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
      date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    ];
    const dateString = `${YYYY}-${MM}-${DD}`;
    return dateString;
  };

  const objectToDateTime = dt => {
    let [YYYY, MM, DD, hh, mm, ss] = [
      dt.getFullYear(),
      dt.getMonth() + 1 > 9 ? dt.getMonth() + 1 : `0${dt.getMonth() + 1}`,
      dt.getDate() > 9 ? dt.getDate() : `0${dt.getDate()}`,
      dt.getHours(),
      dt.getMinutes(),
      dt.getSeconds()
    ];
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
    const dateString = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    return dateString;
  };


  const handleChange = (e, index, value, pKey) => {
    onChange(index, value, pKey)
  }

  const addToRef = (index, el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current.push({ [index.i]: el });
    }
  }


  const renderElement = (index, element, value, primaryKey) => {
    if (typeof element === "string") {
      switch (element) {
        case "textbox":
          return (
            <input
              type="text"
              placeholder={placeholder}
              onBlur={e => handleChange(e, index, e.target.value, primaryKey)}
              className="inputText"
              defaultValue={value}
              {...rest}
            />
          );
        case "number":
          return (
            <input
              type="number"
              min="0"
              step=".01"
              placeholder={placeholder}
              ref={el => addToRef(index, el)}
              onBlur={e => handleChange(e, index, e.target.value, primaryKey)}
              className="inputText"
              defaultValue={Number(value).toFixed(config.footer.total.maxDecimal)}
              {...rest}
            />
          );
        case "textarea":
          return (
            <textarea
              placeholder={placeholder}
              onBlur={e => handleChange(e, index, e.target.value, primaryKey)}
              rows="3"
              className="inputText"
              defaultValue={value}
              {...rest}
            />
          );
        case "label":
          return <div {...rest}>{value}</div>;
        case "checkbox":
          return isPostable ? (
            <>
              {showDecrement && (
                <HtmlIcon
                  onClick={() => onDelete(index)}
                  className="error"
                  entity={"&#215;"}
                />
              )}
              {showIncrement && (
                <div
                  className={
                    showDecrement === false ? "floatLeft" : "floatRight"
                  }
                >
                  <HtmlIcon
                    onClick={() => onAddRow(true)}
                    className="success tilt-45"
                    entity={"&#215;"}
                  />
                </div>
              )}
            </>
          ) : (
            <div {...rest}>{value}</div>
          );
        case "date":
          return (
            <DateTimePicker
              value={date}
              format="y-MM-dd"
              clearIcon={null}
              onChange={value => {
                setDate(value);
                onChange(index, objectToDate(value), primaryKey);
              }}
            />
          );
        case "dateTime":
          return (
            <DateTimePicker
              value={dateTime}
              format="y-MM-dd H:mm:ss"
              clearIcon={null}
              onChange={value => {
                setDateTime(value);
                onChange(index, objectToDateTime(value), primaryKey);
              }}
            />

          );
        default:
          return <div {...rest}>{value}</div>;
      }
    } else if (typeof element === "object") {
      const firstKey = Object.keys(element)[0];
      switch (firstKey) {
        case "fetch":
          return (
            <FilterSelect
              index={index}
              primaryKey={primaryKey}
              onChange={(ind, val, pKey) => onChange(ind, val, pKey)}
              element={element}
              value={value}
              type={Array.isArray(value) ? "multiple" : "single"}
              searchable={element.searchable}
            />
          );
        case "radio":
          return (
            <Radio
              key={`${index.i}-${index.j}`}
              index={index}
              primaryKey={primaryKey}
              onChange={(ind, val, pKey) => onChange(ind, val, pKey)}
              element={element}
              value={value}
            />
          );
        default:
          return <div>Unknown Element</div>;
      }
    }
  };

  return <div>{renderElement(index, element, value, primaryKey)}</div>
}

export default FormElement;
