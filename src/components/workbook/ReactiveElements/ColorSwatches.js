import React, { useContext, useEffect, useState } from "react";
import * as d3 from "d3";
import { Popover, OverlayTrigger, Row, Col, Form } from "react-bootstrap";
import WorkbookContext from "../WorkbookContext";
import { FormattedMessage } from "react-intl";

const ColorSwatches = props => {
  const { id, title, onChange } = props;
  const workbookContext = useContext(WorkbookContext);
  const { theme } = workbookContext;
  const [color, setColor] = useState([]);
  const [type, setType] = useState("single");
  const scheme = [
    [
      "#000000",
      "#ffffff",
      document.documentElement.style.getPropertyValue("--app-theme-bg-color"),
    ],
    d3[`schemeCategory10`],
    d3[`schemeAccent`],
    d3[`schemeDark2`],
    d3[`schemePaired`],
    d3[`schemePastel1`],
    d3[`schemePastel2`],
    d3[`schemeSet1`],
    d3[`schemeSet2`],
    d3[`schemeSet3`],
    d3[`schemeTableau10`],
  ];

  useEffect(() => {
    onChange({ id, value: color });
  }, [color]);

  const onSetColor = code => {
    if (type === "single") {
      setColor(code);
    } else {
      const arrColor =
        typeof color === "object" ? [...color, code] : [color, code];
      setColor(arrColor);
    }
  };

  const popover = () => (
    <Popover className='border-0' style={{ width: "350px", maxWidth: "350px" }}>
      <Popover.Header as='div' className={`bni-bg bni-text`}>
        <Form.Check
          type={"checkbox"}
          checked={type === "single"}
          id={`default-${type}`}
          label={`${type === "single" ? "Single" : "Multiple"}`}
          onChange={e =>
            e.target.checked ? setType("single") : setType("multiple")
          }
        />
      </Popover.Header>
      <Popover.Body className={`p-2 rounded-bottom bg-${theme}`}>
        {scheme.map((colors, i) => (
          <Row key={i} className='m-0'>
            {colors.map((c, j) => (
              <Col key={j} xs={1} className='px-1'>
                <i
                  className='fa fa-square cursor-pointer'
                  style={{ color: c }}
                  onClick={() => onSetColor(c)}
                />
              </Col>
            ))}
          </Row>
        ))}
      </Popover.Body>
    </Popover>
  );

  const onDeleteColor = index => {
    const bArr = [...color].filter((f, i) => i !== index);
    setColor(bArr);
  };

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='btn-group btn-group-sm py-0'>
          <OverlayTrigger
            trigger='click'
            placement='left'
            overlay={popover()}
            rootClose
          >
            <button className='btn btn-sm btn-bni'>
              <i className={`fa fa-paint-brush cursor-pointer pe-2`} />
              <span className='small'>
                <FormattedMessage id='select' defaultMessage='select' />
              </span>
            </button>
          </OverlayTrigger>
          <button
            className='btn btn-sm btn-danger'
            onClick={() => setColor([])}
            disabled={!color.length}
          >
            <i className={`fa fa-times cursor-pointer`} />
          </button>
        </div>
        <label className='small'>{title}</label>
      </div>
      <Row className='p-2'>
        {typeof color === "string" ? (
          <Col xs={12} className='px-1'>
            <div className={`rounded-1 lh-1`} style={{ background: color }}>
              &nbsp;
            </div>
          </Col>
        ) : (
          color.map((c, i) => (
            <Col
              key={i}
              xs={1}
              className='px-1 cursor-pointer'
              onClick={() => onDeleteColor(i)}
            >
              <i className={`fa fa-square`} style={{ color: c }} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ColorSwatches;
