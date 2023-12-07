import React, { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import { Row, Col } from "react-bootstrap";

const NumberSlider = props => {
  const { id, title, min, max, init, onChange } = props;
  const [value, setValue] = useState(init);

  useEffect(() => {
    onChange({ id, value });
  }, [value]);

  return (
    <div>
      <small>{title}</small>
      <Row>
        <Col xs={true} xl={9}>
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
        <Col xs={true} xl={3}>
          <small>{value}px</small>
        </Col>
      </Row>
    </div>
  );
};

export default NumberSlider;
