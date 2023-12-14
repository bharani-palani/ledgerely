import React from "react";

const DataSource = props => {
  const { id, title, onChange } = props;

  return (
    <div className='p-5 border border-1 rounded-1 d-flex align-items-center justify-content-center'>
      <div onClick={() => onChange({ id, value: {} })}>{title}</div>
    </div>
  );
};

export default DataSource;
