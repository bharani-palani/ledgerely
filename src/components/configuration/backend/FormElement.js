import React, { useState, useRef, useContext } from "react";
import Radio from "./FormElements/Radio";
import FilterSelect from "./FormElements/FilterSelect";
// import DateTimeSelector from "./FormElements/DateTimeSelector";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
// import "moment/locale/ar";
import { LocaleContext } from "../../../contexts/LocaleContext";
import "moment-timezone";
import "moment/min/locales";

function FormElement(props) {
  const localeContext = useContext(LocaleContext);
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
    theme,
    ...rest
  } = props;

  const inputRef = useRef([]);
  inputRef.current = [];
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [dateTime, setDateTime] = useState(
    value ? new Date(value) : new Date(),
  );

  const objectToDate = date => {
    const [YYYY, MM, DD] = [
      date.getFullYear(),
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
      date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`,
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
      dt.getSeconds(),
    ];
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
    const dateString = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    return dateString;
  };

  const handleChange = (e, index, value, pKey) => {
    onChange(index, value, pKey);
  };

  const addToRef = (index, el) => {
    if (el && !inputRef.current.includes(el)) {
      inputRef.current.push({ [index.i]: el });
    }
  };

  const renderElement = (index, element, value, primaryKey) => {
    if (typeof element === "string") {
      switch (element) {
        case "textbox":
          return (
            <input
              type='text'
              placeholder={placeholder}
              onBlur={e => handleChange(e, index, e.target.value, primaryKey)}
              className={`inputText ${theme}`}
              defaultValue={value}
              {...rest}
            />
          );
        case "number":
          return (
            <input
              id={`${index.j}-${index.i}`}
              type='number'
              min='0'
              step='.01'
              placeholder={placeholder}
              ref={el => addToRef(index, el)}
              onBlur={e => handleChange(e, index, e.target.value, primaryKey)}
              className={`inputText ${theme} text-end`}
              defaultValue={Number(value).toFixed(
                config.footer.total.maxDecimal,
              )}
              {...rest}
            />
          );
        case "textarea":
          return (
            <textarea
              placeholder={placeholder}
              onBlur={e => handleChange(e, index, e.target.value, primaryKey)}
              rows='3'
              className={`inputText ${theme}`}
              defaultValue={value}
              {...rest}
            />
          );
        case "label":
          return <div {...rest}>{value}</div>;
        case "boolean":
          return (
            <div {...rest} className='text-center'>
              {(value === "1" ||
                value === "True" ||
                value === "true" ||
                value === true) && <i className='fa fa-check' />}
              {(value === "0" ||
                value === "False" ||
                value === "false" ||
                value === false) && <i className='fa fa-times' />}
            </div>
          );
        case "relativeTime":
          return (
            <div>
              {moment(value || new Date())
                .locale(localeContext.localeLanguage)
                .tz(moment.tz.guess())
                .fromNow()}
            </div>
          );
        case "checkbox":
          return isPostable ? (
            <div className='d-flex justify-content-between'>
              {showDecrement && (
                <i
                  onClick={() => onDelete(index)}
                  style={{ fontSize: "1.5rem", fontWeight: "700" }}
                  className='fa fa-times-circle text-danger cursor-pointer'
                />
              )}
              {showIncrement && (
                <i
                  onClick={() => onAddRow(true)}
                  style={{ fontSize: "1.5rem", fontWeight: "700" }}
                  className='fa fa-plus-circle text-success cursor-pointer'
                />
              )}
            </div>
          ) : (
            <div {...rest}>{value}</div>
          );
        case "date":
          return (
            <DateTimePicker
              value={date || new Date()}
              format='y-MM-dd'
              clearIcon={null}
              onChange={value => {
                setDate(value);
                onChange(index, objectToDate(value), primaryKey);
              }}
              minDate={config?.dateSelection?.minDate || new Date()}
              maxDate={config?.dateSelection?.maxDate || new Date()}
            />
          );
        case "dateTime":
          return (
            <DateTimePicker
              value={dateTime}
              format='y-MM-dd H:mm:ss'
              clearIcon={null}
              onChange={value => {
                setDateTime(value);
                onChange(index, objectToDateTime(value), primaryKey);
              }}
              minDate={config.dateSelection.maxDate || new Date()}
              maxDate={config?.dateSelection?.maxDate || new Date()}
            />
          );
        default:
          return <div {...rest}>{value}</div>;
      }
    } else if (typeof element === "object" && element !== null) {
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
              theme={theme}
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

  return <div>{renderElement(index, element, value, primaryKey)}</div>;
}

export default FormElement;
