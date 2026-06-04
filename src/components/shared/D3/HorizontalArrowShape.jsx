import React from "react";
import { horizontalArrowShapeProps } from "./propsData";

const HorizontalArrowShape = props => {
  const { id, width, height, fillColor, showAnimation, animationClass, strokeWidth } = { ...horizontalArrowShapeProps, ...props };
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`${showAnimation ? animationClass : ""} shape`}>
      <defs>
        <marker
          id={`${id}-1`}
          className='shape'
          markerUnits='strokeWidth'
          markerWidth={width}
          markerHeight={height}
          viewBox={`0 0 ${width} ${height}`}
          refX='6'
          refY='6'
          orient='auto'
        >
          <path d='M2,2 L10,6 L2,10 L6,6 L2,2' className='shape' fill={fillColor}></path>
        </marker>
      </defs>
      <line
        x1={0}
        x2={width - height * 0.4}
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

export default HorizontalArrowShape;
