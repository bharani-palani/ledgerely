import React from "react";
import { lineShapeProps } from "./propsData";

const LineShape = props => {
  const { id, width, height, fillColor, showAnimation, animationClass, strokeWidth } = { ...lineShapeProps, ...props };
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`${showAnimation ? animationClass : ""} shape`}>
      <line
        x1={0}
        x2={width}
        y1={height / 2}
        y2={height / 2}
        stroke={fillColor}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${id}-1)`}
        className='shape'
      />
    </svg>
  );
};

export default LineShape;
