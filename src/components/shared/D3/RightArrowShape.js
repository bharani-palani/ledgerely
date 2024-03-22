import React from "react";
import { rightArrowShapeProps } from "./propsData";
import PropTypes from "prop-types";

const RightArrowShape = ({
  id,
  width,
  height,
  fillColor,
  showAnimation,
  animationClass,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={showAnimation ? animationClass : ""}
    >
      <defs>
        <marker
          id={`${id}-1`}
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
        x1={0}
        x2={width - height * 0.4}
        y1={height / 2}
        y2={height / 2}
        stroke={fillColor}
        strokeWidth={height * 0.1}
        markerEnd={`url(#${id}-1)`}
      />
    </svg>
  );
};

RightArrowShape.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  padding: PropTypes.number,
  opacity: PropTypes.number,
  showAnimation: PropTypes.bool,
  padding: PropTypes.number,
  animationClass: PropTypes.string,
  strokeWidth: PropTypes.number,
  borderRadius: PropTypes.number,
};

RightArrowShape.defaultProps = rightArrowShapeProps;

export default RightArrowShape;
