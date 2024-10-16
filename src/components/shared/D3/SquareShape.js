import React from "react";
import { squareShapeProps } from "./propsData";
import PropTypes from "prop-types";

const SquareShape = ({
  name,
  width,
  height,
  fillColor,
  fontColor,
  lineColor,
  fontSize,
  showAnimation,
  animationClass,
  strokeWidth,
  borderRadius,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`${showAnimation ? animationClass : ""} shape`}
    >
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

SquareShape.propTypes = {
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

SquareShape.defaultProps = squareShapeProps;

export default SquareShape;
