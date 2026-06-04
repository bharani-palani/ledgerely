import React from "react";
import { Row, Col } from "react-bootstrap";

const SelectBox = props => {
  const { id, title, init, onChange, list } = props;
  return (
    <Row className='align-items-center pb-1'>
      <Col lg={12}>
        <span className='small fst-italic'>{title}</span>
      </Col>
      <Col lg={12}>
        <select
          className='form-control form-control-sm rounded'
          defaultValue={init}
          onChange={e => onChange({ id, value: e.target.value })}
        >
          {list.map((l, i) => (
            <option key={i} value={l.id}>
              {l.value}
            </option>
          ))}
        </select>
      </Col>
    </Row>
  );
};

export default SelectBox;
