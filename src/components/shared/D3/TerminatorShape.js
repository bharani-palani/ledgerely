import React from "react";
import { terminatorShapeProps } from "./propsData";

const TerminatorShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth, borderRadius } = {
    ...terminatorShapeProps,
    ...props,
  };
  const radius = Math.min(width, height) / 2 - strokeWidth;

  return (
    <svg width={width} height={height} className={showAnimation ? animationClass : ""}>
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={width - strokeWidth - 5}
        height={height - strokeWidth - 5}
        rx={borderRadius}
        ry={borderRadius}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
      />
      <foreignObject width={width - strokeWidth - 5} height={height - strokeWidth - 5}>
        <div
          className='shape'
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
            overflow: "hidden",
          }}
        >
          {name}
        </div>
      </foreignObject>
    </svg>
  );
};

export default TerminatorShape;
