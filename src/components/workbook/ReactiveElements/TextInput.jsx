import React, { useEffect, useState } from "react";

const TextInput = props => {
  const { id, title, init, onChange, ...rest } = props;
  const [value, setValue] = useState(init);

  useEffect(() => {
    onChange({ id, value });
  }, [value]);

  return (
    <div className='input-group input-group-sm mb-1'>
      <label
        className='input-group-text bni-bg border-0 fst-italic'
        htmlFor={id}
      >
        {title}
      </label>
      <input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        className='form-control'
        id={id}
        {...rest}
      />
    </div>
  );
};

export default TextInput;
