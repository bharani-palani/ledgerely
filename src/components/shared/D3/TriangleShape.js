import React from "react";
import { triangleShapeProps } from "./propsData";
import PropTypes from "prop-types";

const TriangleShape = ({
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
  const points = [
    [0, width],
    [width, width],
    [width / 2, 0],
  ];
  return (
    <svg
      width={width}
      height={height}
      className={showAnimation ? animationClass : ""}
    >
      <polygon
        points={points.join(" ")}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
      />
      <foreignObject width={width} height={height}>
        <div
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

TriangleShape.propTypes = {
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

TriangleShape.defaultProps = triangleShapeProps;

export default TriangleShape;
