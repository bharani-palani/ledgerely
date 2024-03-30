import React from "react";
import { directionArrowShapeProps } from "./propsData";
import PropTypes from "prop-types";

const DirectionArrowShape = ({
  id,
  width,
  height,
  fillColor,
  showAnimation,
  animationClass,
  strokeWidth,
  lineColor,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`${showAnimation ? animationClass : ""} shape`}
    >
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
          <path d='M2,2 L10,6 L2,10 L6,6 L2,2' fill={fillColor}></path>
        </marker>
      </defs>
      <line
        x1={strokeWidth / 2}
        y1={strokeWidth * 5}
        x2={strokeWidth / 2}
        y2={height}
        stroke={fillColor}
        strokeWidth={strokeWidth}
        className='shape'
      ></line>
      <line
        x1={0}
        x2={width - strokeWidth * 5}
        y1={strokeWidth * 5}
        y2={strokeWidth * 5}
        stroke={fillColor}
        strokeWidth={strokeWidth}
        markerEnd={`url(#${id}-1)`}
        className='shape'
      />
    </svg>
  );
};

DirectionArrowShape.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  opacity: PropTypes.number,
  showAnimation: PropTypes.bool,
  animationClass: PropTypes.string,
  strokeWidth: PropTypes.number,
  borderRadius: PropTypes.number,
};

DirectionArrowShape.defaultProps = directionArrowShapeProps;

export default DirectionArrowShape;
