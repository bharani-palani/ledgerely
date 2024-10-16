import React from "react";
import { parllelogramShapeProps } from "./propsData";
import PropTypes from "prop-types";

const ParllelogramShape = ({
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
    [0, 0],
    [(width * 75) / 100, 0],
    [width, height],
    [(width * 25) / 100, height],
  ];
  return (
    <svg
      width={width + strokeWidth}
      height={height + strokeWidth}
      fill={fillColor}
      viewBox={`0 0 ${width} ${height}`}
      className={`${showAnimation ? animationClass : ""} shape`}
    >
      <polygon
        stroke={lineColor}
        strokeWidth={strokeWidth}
        points={points.join(" ")}
        className='shape'
      />
      <foreignObject width={width} height={height} className='shape'>
        <div
          className='lh-1 text-center shape'
          style={{
            width,
            height,
            color: fontColor,
            fontSize,
          }}
        >
          <div
            className='shape'
            style={{
              clipPath: "polygon(0% 100%, 50% 100%, 0% 0%)",
              shapeOutside: "polygon(0% 100%, 50% 100%, 0% 0%)",
              float: "left",
              width: "50%",
              height: "100%",
            }}
          />
          <div
            className='shape'
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 100% 0%)",
              shapeOutside: "polygon(50% 0%, 100% 100%, 100% 0%)",
              float: "right",
              width: "50%",
              height: "100%",
            }}
          />
          <div className='shape' style={{ wordWrap: "break-word" }}>
            {name}
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

ParllelogramShape.propTypes = {
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

ParllelogramShape.defaultProps = parllelogramShapeProps;

export default ParllelogramShape;
