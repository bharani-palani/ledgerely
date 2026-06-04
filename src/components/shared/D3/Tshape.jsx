import React, { useEffect, useRef, useState } from "react";
import { tShapeProps } from "./propsData";

const Tshape = props => {
  const { name, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth, fontFamily } = { ...tShapeProps, ...props };
  const textRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const obj = textRef.current.getBBox();
    const [w, h] = [obj.width, obj.height];
    setWidth(w);
    setHeight(h);
  }, [JSON.stringify(props)]);

  return (
    <svg
      width={width + 10}
      height={height + 10}
      viewBox={`0 0 ${width + 10} ${height + 10}`}
      className={`${showAnimation ? animationClass : ""} shape`}
    >
      <g className='shape' transform={`translate(0, ${height - height * 0.2})`}>
        <text
          className='shape'
          ref={textRef}
          fill={fontColor}
          stroke={lineColor}
          strokeWidth={strokeWidth}
          fontFamily={fontFamily}
          style={{
            fontSize,
          }}
        >
          {name}
        </text>
      </g>
    </svg>
  );
};

export default Tshape;
