import React from "react";
import { Row, Col } from "react-bootstrap";

const SelectBox = props => {
  const { id, title, init, onChange, list } = props;
  console.log("bbb", init);
  return (
    <Row className='react-responsive-ajax-data-table align-items-center small'>
      <Col xs={12}>{title}</Col>
      <Col xs={12}>
        <select
          className='form-control form-control-sm bni-border bni-border-all bni-border-all-3 rounded-pill'
          defaultValue={init}
          onChange={e => onChange({ id, value: e.target.value })}
        >
          {list.map(l => (
            <option key={l.id} value={l.id}>
              {l.value}
            </option>
          ))}
        </select>
      </Col>
    </Row>
  );
};

export default SelectBox;
