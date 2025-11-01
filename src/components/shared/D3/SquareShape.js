import React from "react";
import { squareShapeProps } from "./propsData";

const SquareShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth, borderRadius } = {
    ...squareShapeProps,
    ...props,
  };
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`${showAnimation ? animationClass : ""} shape`}>
      <rect
        width={width}
        height={height}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
        rx={borderRadius}
        ry={borderRadius}
        className='shape'
      />
      <foreignObject width={width} height={height} className='shape'>
        <div
          className='lh-1 text-center p-1 d-flex align-items-center justify-content-center shape'
          style={{ width, height, color: fontColor, fontSize }}
        >
          {name}
        </div>
      </foreignObject>
    </svg>
  );
};

export default SquareShape;
