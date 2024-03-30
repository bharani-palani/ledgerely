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
      className={`${showAnimation ? animationClass : ""} shape`}
    >
      <polygon
        points={points.join(" ")}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeLinejoin='round'
      />
      <foreignObject width={width} height={height} className='shape'>
        <div
          className='lh-1 text-center shape'
          style={{ width, height, color: fontColor, fontSize }}
        >
          <div
            className='shape'
            style={{
              height: `${height}px`,
              width: `${width / 2}px`,
              clipPath: "polygon(100% 0%, 0% 0%, 0% 100%)",
              shapeOutside: "polygon(100% 0%, 0% 0%, 0% 100%)",
              float: "left",
            }}
          ></div>
          <div
            className='shape'
            style={{
              height: `${height}px`,
              width: `${width / 2}px`,
              clipPath: "polygon(100% 100%, 100% 0%, 0% 0%)",
              shapeOutside: "polygon(100% 100%, 100% 0%, 0% 0%)",
              float: "right",
            }}
          ></div>
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
