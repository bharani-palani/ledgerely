import React from "react";
import { circleShapeProps } from "./propsData";

const CircleShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth } = {
    ...CircleShape.CircleShape,
    ...props,
  };
  const radius = Math.min(width, height) / 2 - strokeWidth;

  return (
    <svg width={width} height={height} className={showAnimation ? animationClass : ""}>
      <circle cx={width / 2} cy={height / 2} r={radius} fill={fillColor} stroke={lineColor} strokeWidth={strokeWidth} />
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

export default CircleShape;
