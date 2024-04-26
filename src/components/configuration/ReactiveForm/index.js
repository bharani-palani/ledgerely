import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import _debounce from "lodash/debounce";
import OffCanvas from "../../shared/OffCanvas";
import { UserContext } from "../../../contexts/UserContext";
import _ from "lodash";

function ReactiveForm(props) {
  const {
    structure,
    showSubmit,
    parentClassName,
    onChange,
    onSubmit,
    submitBtnLabel,
    submitBtnClassName,
    ...rest
  } = props;

  const userContext = useContext(UserContext);
  const [data, setData] = useState(structure);
  const [eye, setEye] = useState(false);
  const [errorIndexes, setErrorIndexes] = useState([]);

  useEffect(() => {
    setData(data);
  }, [JSON.stringify(data)]);

  const handleChange = (e, index, value, list) => {
    onChange(index, value, list);
  };

  const handleSubmit = () => {
    const errors = data
      .map(d => {
        if (d.options) {
          if (d.options.validation) {
            return !new RegExp(d.options.validation).test(d.value) && d.index;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
      .filter(f => f);
    if (errors.length > 0) {
      setErrorIndexes(errors);
    } else {
      onSubmit();
    }
  };

  const ErrorSpan = props => {
    const { label } = props;
    return <div className='text-danger pt-2'>{label}</div>;
  };

  const validate = (row, value) => {
    if (row.options && row.options.validation) {
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

  const debounceFn = useCallback(
    _debounce((e, row) => {
      handleChange(e, row.index, e.target.value);
      validate(row, e.target.value);
    }, 300),
    [],
  );

  const renderElement = (row, key) => {
    switch (row.elementType) {
      case "hidden":
        return (
          <div key={key}>
            <input
              id={row.id}
              className='d-none'
              type='hidden'
              defaultValue={row.value}
              {...rest}
            />
          </div>
        );
      case "invisible":
        return (
          <div key={key} {...rest}>
            {row.value}
          </div>
        );
      case "text":
        return (
          <div className='py-2 text-dark' key={key}>
            <div className='form-floating'>
              <input
                id={row.id}
                type='text'
                placeholder={row.placeHolder}
                onChange={e => {
                  e.persist();
                  debounceFn(e, row);
                }}
                className={`form-control ${
                  errorIndexes.includes(row.index) ? "is-invalid" : ""
                }`}
                defaultValue={row.value}
                {...rest}
              />
              {row.options && row.options.help && (
                <OffCanvas
                  btnValue="<i class='fa fa-question-circle text-secondary' />"
                  btnClassName={`btn-white rounded-circle help`}
                  placement='end'
                  key={1}
                  label={row.label}
                >
                  <ul className={`list-group list-group-flush`}>
                    {row.options.help.map((point, j) => (
                      <li
                        key={j}
                        className={`list-group-item border-bottom-0 ${
                          userContext.userData.theme === "dark"
                            ? "bg-dark text-white-50"
                            : "bg-white text-dark"
                        }`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </OffCanvas>
              )}
              <label htmlFor={row.id} className='text-truncate w-100'>
                {row.options && row.options.required && (
                  <sup className='text-danger'>*</sup>
                )}
                {row.label}
              </label>
            </div>
            {errorIndexes.includes(row.index) && (
              <ErrorSpan label={row.options.errorMsg} />
            )}
          </div>
        );
      case "number":
        return (
          <div className='py-2 text-dark' key={key}>
            <div className='form-floating'>
              {row.options && row.options.help && (
                <OffCanvas
                  btnValue="<i class='fa fa-question-circle text-secondary' />"
                  btnClassName={`btn-white rounded-circle help`}
                  placement='end'
                  key={1}
                  label={row.label}
                >
                  <ul className={`list-group list-group-flush`}>
                    {row.options.help.map((point, j) => (
                      <li
                        key={j}
                        className={`list-group-item border-bottom-0 ${
                          userContext.userData.theme === "dark"
                            ? "bg-dark text-white-50"
                            : "bg-white text-dark"
                        }`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </OffCanvas>
              )}
              <input
                id={row.id}
                type='number'
                placeholder={row.placeHolder}
                onChange={e => {
                  e.persist();
                  debounceFn(e, row);
                }}
                className={`form-control ${
                  errorIndexes.includes(row.index) ? "is-invalid" : ""
                }`}
                defaultValue={row.value}
                {...rest}
              />
              {errorIndexes.includes(row.index) && (
                <ErrorSpan label={row.options.errorMsg} />
              )}
              <label htmlFor={row.id} className='text-truncate w-100'>
                {row.options && row.options.required && (
                  <sup className='text-danger'>*</sup>
                )}
                {row.label}
              </label>
            </div>
          </div>
        );
      case "textArea":
        return (
          <div className='py-2 text-dark' key={key}>
            <div className='form-floating'>
              {row.options && row.options.help && (
                <OffCanvas
                  btnValue="<i class='fa fa-question-circle text-secondary' />"
                  btnClassName={`btn-white rounded-circle help`}
                  placement='end'
                  key={1}
                  label={row.label}
                >
                  <ul className={`list-group list-group-flush`}>
                    {row.options.help.map((point, j) => (
                      <li
                        key={j}
                        className={`list-group-item border-bottom-0 ${
                          userContext.userData.theme === "dark"
                            ? "bg-dark text-white-50"
                            : "bg-white text-dark"
                        }`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </OffCanvas>
              )}
              <textarea
                id={row.id}
                style={{ height: `${row.options.rowLength}px` }}
                placeholder={row.placeHolder}
                onChange={e => {
                  e.persist();
                  debounceFn(e, row);
                }}
                className={`form-control ${
                  errorIndexes.includes(row.index) ? "is-invalid" : ""
                }`}
                {...rest}
                defaultValue={row.value}
              />
              {errorIndexes.includes(row.index) && (
                <ErrorSpan label={row.options.errorMsg} />
              )}
              <label htmlFor={row.id} className='text-truncate w-100'>
                {row.options && row.options.required && (
                  <sup className='text-danger'>*</sup>
                )}
                {row.label}
              </label>
            </div>
          </div>
        );
      case "password":
        return (
          <div className='py-2 text-dark' key={key}>
            <div className='form-floating password'>
              {row.options && row.options.help && (
                <OffCanvas
                  btnValue="<i class='fa fa-question-circle text-secondary' />"
                  btnClassName={`btn-white rounded-circle help`}
                  placement='end'
                  key={1}
                  label={row.label}
                >
                  <ul className={`list-group list-group-flush`}>
                    {row.options.help.map((point, j) => (
                      <li
                        key={j}
                        className={`list-group-item border-bottom-0 ${
                          userContext.userData.theme === "dark"
                            ? "bg-dark text-white-50"
                            : "bg-white text-dark"
                        }`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </OffCanvas>
              )}
              <input
                id={row.id}
                type={`${!eye ? "password" : "text"}`}
                placeholder={row.placeHolder}
                onChange={e => {
                  e.persist();
                  debounceFn(e, row);
                }}
                className={`form-control ${
                  errorIndexes.includes(row.index) ? "is-invalid" : ""
                }`}
                defaultValue={row.value}
                {...rest}
              />
              <i
                onClick={() => setEye(!eye)}
                className={`eye fa fa-${eye ? "eye" : "eye-slash"}`}
              />
              {errorIndexes.includes(row.index) && (
                <ErrorSpan label={row.options.errorMsg} />
              )}
              <label htmlFor={row.id} className='text-truncate w-100'>
                {row.options && row.options.required && (
                  <sup className='text-danger'>*</sup>
                )}
                {row.label}
              </label>
            </div>
          </div>
        );
      case "dropDown":
        return (
          <div className='py-2 text-dark' key={key}>
            <div className='form-floating'>
              {row.options && row.options.help && (
                <OffCanvas
                  btnValue="<i class='fa fa-question-circle text-secondary' />"
                  btnClassName={`btn-white rounded-circle help`}
                  placement='end'
                  key={1}
                  label={row.label}
                >
                  <ul className={`list-group list-group-flush`}>
                    {row.options.help.map((point, j) => (
                      <li
                        key={j}
                        className={`list-group-item border-bottom-0 ${
                          userContext.userData.theme === "dark"
                            ? "bg-dark text-white-50"
                            : "bg-white text-dark"
                        }`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </OffCanvas>
              )}
              <select
                id={row.id}
                onChange={e => {
                  validate(row, e.target.value);
                  handleChange(e, row.index, e.target.value);
                }}
                className={`form-select ${
                  errorIndexes.includes(row.index) ? "is-invalid" : ""
                }`}
                // defaultValue={row.value}
                value={row.value}
                {...rest}
              >
                <option value=''>{row.placeHolder}</option>
                {row.list &&
                  row.list.length > 0 &&
                  row.list.map((l, i) => (
                    <option
                      key={i}
                      value={l.value}
                      // selected={l.value === row.value}
                    >
                      {l.label}
                    </option>
                  ))}
              </select>
              {errorIndexes.includes(row.index) && (
                <ErrorSpan label={row.options.errorMsg} />
              )}
              <label htmlFor={row.id} className='text-truncate w-100'>
                {row.options && row.options.required && (
                  <sup className='text-danger'>*</sup>
                )}
                {row.label}
              </label>
            </div>
          </div>
        );
      case "checkBox":
        return (
          <div className='py-2' key={key}>
            <div className='position-relative'>
              <div>{row.label}</div>
              <div>
                {row.options && row.options.help && (
                  <OffCanvas
                    btnValue="<i class='fa fa-question-circle text-secondary' />"
                    btnClassName={`btn-white rounded-circle help`}
                    placement='end'
                    key={1}
                    label={row.label}
                  >
                    <ul className={`list-group list-group-flush`}>
                      {row.options.help.map((point, j) => (
                        <li
                          key={j}
                          className={`list-group-item border-bottom-0 ${
                            userContext.userData.theme === "dark"
                              ? "bg-dark text-white-50"
                              : "bg-white text-dark"
                          }`}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </OffCanvas>
                )}
                {row.list.map((l, i) => {
                  const rId = _.uniqueId(`checkbox-${l.id}-`);
                  return (
                    <div
                      key={i}
                      className={`form-check ${
                        row.isInline ? "d-inline-block" : "d-block"
                      }`}
                    >
                      <input
                        className='form-check-input'
                        onChange={e => {
                          handleChange(e, row.index, "", {
                            id: l.id,
                            checked: e.target.checked,
                          });
                          validate(row, row.value);
                        }}
                        type='checkbox'
                        defaultValue={l.value}
                        id={rId}
                        disabled={l.disabled}
                        defaultChecked={l.checked}
                        name={row.index}
                        {...rest}
                      />
                      <label
                        className='form-check-label pe-2 text-truncate w-100'
                        htmlFor={rId}
                      >
                        {l.label}
                      </label>
                    </div>
                  );
                })}
              </div>
              {errorIndexes.includes(row.index) && (
                <ErrorSpan label={row.options.errorMsg} />
              )}
            </div>
          </div>
        );
      case "radio":
        return (
          <div className='py-2' key={key}>
            <div className='position-relative'>
              <div>{row.label}</div>
              <div>
                {row.options && row.options.help && (
                  <OffCanvas
                    btnValue="<i class='fa fa-question-circle text-secondary' />"
                    btnClassName={`btn-white rounded-circle help`}
                    placement='end'
                    key={1}
                    label={row.label}
                  >
                    <ul className={`list-group list-group-flush`}>
                      {row.options.help.map((point, j) => (
                        <li
                          key={j}
                          className={`list-group-item border-bottom-0 ${
                            userContext.userData.theme === "dark"
                              ? "bg-dark text-white-50"
                              : "bg-white text-dark"
                          }`}
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </OffCanvas>
                )}
                {row.list.map((l, i) => {
                  const rId = _.uniqueId(`radio-${l.id}-`);
                  return (
                    <div
                      key={i}
                      className={`form-check ${
                        row.options.isInline ? "d-inline-block" : "d-block"
                      }`}
                    >
                      <input
                        className='form-check-input'
                        onChange={e => {
                          validate(row, e.target.value);
                          handleChange(e, row.index, e.target.value);
                        }}
                        type='radio'
                        defaultValue={l.value}
                        id={rId}
                        disabled={l.disabled}
                        defaultChecked={l.checked}
                        name={row.index}
                        {...rest}
                      />
                      <label
                        className='form-check-label pe-2 text-truncate w-100'
                        htmlFor={rId}
                      >
                        {l.label}
                      </label>
                    </div>
                  );
                })}
              </div>
              {errorIndexes.includes(row.index) && (
                <ErrorSpan label={row.options.errorMsg} />
              )}
            </div>
          </div>
        );

      default:
        return <div>Unknown Element</div>;
    }
  };

  return (
    <div className={parentClassName}>
      <div className='row'>
        {data.length > 0 &&
          data.map((row, i) => (
            <div key={i} className={row.className}>
              {renderElement(row, i)}
            </div>
          ))}
        {data.length > 0 &&
          data.filter(d => d.elementType === "hidden").length > 0 &&
          data
            .filter(d => d.elementType === "hidden")
            .map((r, i) => renderElement(r, i))}
        {showSubmit && (
          <div className='col-md-12 py-2'>
            <button
              onClick={() => handleSubmit()}
              className={submitBtnClassName}
            >
              {submitBtnLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ReactiveForm.propTypes = {
  structure: PropTypes.array,
  showSubmit: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  submitBtnLabel: PropTypes.string,
  parentClassName: PropTypes.string,
};
ReactiveForm.defaultProps = {
  structure: {
    options: { rowLength: 3 },
  },
  submitBtnLabel: "Submit",
  submitBtnClassName: "btn btn-sm btn-success",
  showSubmit: true,
  parentClassName: "my-reactive-form",
};

export default ReactiveForm;
