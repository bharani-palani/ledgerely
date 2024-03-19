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
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={showAnimation ? animationClass : ""}
    >
      <rect
        width={width}
        height={height}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
      />
      <foreignObject width={width} height={height}>
        <div
          className='lh-1 text-center p-1 d-flex align-items-center justify-content-center'
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
  padding: PropTypes.number,
  animationClass: PropTypes.string,
  strokeWidth: PropTypes.number,
};

SquareShape.defaultProps = squareShapeProps;

export default SquareShape;
