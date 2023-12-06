import React, { useState } from "react";
import Slider from "react-rangeslider";
import { Row, Col } from "react-bootstrap";

const NumberSlider = props => {
  const { title, min, max, init } = props;
  const [value, setValue] = useState(init);

  return (
    <>
      <div>{title}</div>
      <Row>
        <Col sm={7} md={9}>
          <Slider
            min={min}
            max={max}
            value={value}
            step={1}
            orientation='horizontal'
            onChange={v => setValue(v)}
            tooltip={false}
          />
        </Col>
        <Col sm={5} md={3}>
          <small>{value}px</small>
        </Col>
      </Row>
    </>
  );
};

export default NumberSlider;
