import React, { useEffect, useState } from "react";

const Radio = props => {
  const { id, title, onChange, list, isInline, init } = props;
  const [value, setValue] = useState(init);

  useEffect(() => {
    onChange({ id, value });
  }, [value]);

  return (
    <div className='mb-1'>
      <div>
        <span className='small fst-italic'>{title}</span>
      </div>
      {list.map((l, i) => (
        <div
          key={i}
          className={`form-check py-1 ${isInline ? "form-check-inline" : ""}`}
        >
          <input
            className='form-check-input'
            type='radio'
            name={id}
            id={l.id}
            value={l.value}
            onChange={e => setValue(e.target.value)}
            defaultChecked={value === l.value}
          />
          <label className='form-check-label small' htmlFor={l.id}>
            {l.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Radio;
