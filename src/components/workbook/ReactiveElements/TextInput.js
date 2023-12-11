import React, { useEffect, useState } from "react";

const TextInput = props => {
  const { id, title, init, onChange } = props;
  const [value, setValue] = useState(init);

  useEffect(() => {
    onChange({ id, value });
  }, [value]);

  return (
    <div className='input-group input-group-sm mb-1'>
      <label className='input-group-text bni-bg border-0' htmlFor={id}>
        {title}
      </label>
      <input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        className='form-control'
        id={id}
      />
    </div>
  );
};

export default TextInput;
