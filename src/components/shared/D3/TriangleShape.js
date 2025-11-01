import React from "react";
import { triangleShapeProps } from "./propsData";

const TriangleShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth } = {
    ...triangleShapeProps,
    ...props,
  };
  const points = [
    [0, width],
    [width, width],
    [width / 2, 0],
  ];
  return (
    <svg width={width} height={height} className={`${showAnimation ? animationClass : ""} shape`}>
      <polygon points={points.join(" ")} fill={fillColor} stroke={lineColor} strokeWidth={strokeWidth} strokeLinejoin='round' />
      <foreignObject width={width} height={height} className='shape'>
        <div className='lh-1 text-center shape' style={{ width, height, color: fontColor, fontSize }}>
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

export default TriangleShape;
