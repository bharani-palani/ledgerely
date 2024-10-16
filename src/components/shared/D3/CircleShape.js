import React from "react";
import { circleShapeProps } from "./propsData";
import PropTypes from "prop-types";

const CircleShape = ({
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
  const radius = Math.min(width, height) / 2 - strokeWidth;

  return (
    <svg
      width={width}
      height={height}
      className={showAnimation ? animationClass : ""}
    >
      <circle
        cx={width / 2}
        cy={height / 2}
        r={radius}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
      />
      <foreignObject width={width} height={height}>
        <div
          className='lh-1 shape'
          style={{
            color: fontColor,
            textAlign: "center",
            width: "100%",
            height: "100%",
            padding: `${strokeWidth * 3}px`,
            fontSize: fontSize,
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {name}
        </div>
      </foreignObject>
    </svg>
  );
};

CircleShape.propTypes = {
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
};

CircleShape.defaultProps = circleShapeProps;

export default CircleShape;
