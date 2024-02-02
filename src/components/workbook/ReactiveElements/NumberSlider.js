import React, { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import { Row, Col } from "react-bootstrap";

const NumberSlider = props => {
  const { id, units, title, min, max, init, step, onChange } = props;
  const [value, setValue] = useState(init);
  const [newVal, setNewValue] = useState(value);

  const countDecimals = value => {
    if (Math.floor(value) !== value)
      return value.toString().split(".")[1].length || 0;
    return 0;
  };

  useEffect(() => {
    const decValue = isFinite(step)
      ? Number(value?.toFixed(countDecimals(step)))
      : min;
    setNewValue(decValue);
    onChange({ id, value: decValue });
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
            step={step}
            orientation='horizontal'
            onChange={v => setValue(v)}
            tooltip={false}
          />
        </Col>
        <Col xs={true} xl={3}>
          <small>
            {newVal}
            {units}
          </small>
        </Col>
      </Row>
    </div>
  );
};

export default NumberSlider;
