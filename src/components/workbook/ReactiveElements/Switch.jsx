import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const Switch = props => {
  const { id, title, onChange, init } = props;
  const [value, setValue] = useState(init);

  useEffect(() => {
    onChange({ id, value });
  }, [value]);

  return (
    <Form>
      <Form.Check
        type='switch'
        id={id}
        value={value}
        label={title}
        checked={value}
        onChange={e => setValue(e.target.checked)}
        className='fst-italic'
      />
    </Form>
  );
};

export default Switch;
