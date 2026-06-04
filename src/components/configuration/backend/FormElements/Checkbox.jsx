import React from "react";
import { Form } from "react-bootstrap";

const Checkbox = props => {
  const { info, checked, theme, marker, ...rest } = props;

  return (
    <Form.Group className='dropdown-item mb-0' controlId={info.id}>
      {marker && <span className='sup'>*</span>}
      <Form.Check
        className={`px-3 py-0 ${theme === "dark" ? "text-light" : "text-dark"}`}
        type='checkbox'
        label={info.value}
        checked={checked}
        {...rest}
      />
    </Form.Group>
  );
};

export default Checkbox;
