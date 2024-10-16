import React from "react";
import { lineShapeProps } from "./propsData";
import PropTypes from "prop-types";

const LineShape = ({
  id,
  width,
  height,
  fillColor,
  showAnimation,
  animationClass,
  strokeWidth,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`${showAnimation ? animationClass : ""} shape`}
    >
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

LineShape.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
  fillColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  lineColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  padding: PropTypes.number,
  opacity: PropTypes.number,
  showAnimation: PropTypes.bool,
  animationClass: PropTypes.string,
  strokeWidth: PropTypes.number,
  borderRadius: PropTypes.number,
};

LineShape.defaultProps = lineShapeProps;

export default LineShape;
