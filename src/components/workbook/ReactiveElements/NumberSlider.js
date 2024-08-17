import React, { useEffect, useState } from "react";
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
      <span className='small fst-italic'>{title}</span>
      <Row className='justify-content-between pb-1'>
        <Col sm={1}>
          <i
            className='fa fa-minus cursor-pointer'
            onClick={() =>
              value <= max && value > min && setValue(value - step)
            }
          />
        </Col>
        <Col xs={true} sm={5}>
        {/* todo: */}
          {/* <Slider
            min={min}
            max={max}
            value={value}
            step={step}
            orientation='horizontal'
            onChange={v => setValue(v)}
            tooltip={false}
          /> */}
        </Col>
        <Col sm={1}>
          <i
            className='fa fa-plus cursor-pointer'
            onClick={() =>
              value < max && value >= min && setValue(value + step)
            }
          />
        </Col>
        <Col xs={true} sm={4}>
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
