import React from "react";
import { diamondShapeProps } from "./propsData";
import PropTypes from "prop-types";
import { polygon } from "./utils";

const DiamondShape = ({
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
  const polyPath = polygon(width / 2, height / 2, 4, width / 2);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={showAnimation ? animationClass : ""}
    >
      <path
        d={polyPath}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
      />
      <foreignObject width={width} height={height}>
        <div
          className='lh-1 text-center'
          style={{
            width,
            height,
            color: fontColor,
            fontSize,
          }}
        >
          <div
            style={{
              clipPath: "polygon(0 0,0 100%,100% 100%,0 50%,100% 0)",
              shapeOutside: "polygon(0 0,0 100%,100% 100%,0 50%,100% 0)",
              float: "left",
              width: "50%",
              height: "100%",
            }}
          />
          <div
            style={{
              clipPath: "polygon(100% 0,100% 100%,0% 100%,100% 50%,0% 0)",
              shapeOutside: "polygon(100% 0,100% 100%,0% 100%,100% 50%,0% 0)",
              float: "right",
              width: "50%",
              height: "100%",
            }}
          />
          <div>{name}</div>
        </div>
      </foreignObject>
    </svg>
  );
};

DiamondShape.propTypes = {
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

DiamondShape.defaultProps = diamondShapeProps;

export default DiamondShape;
