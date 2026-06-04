import React from "react";

export const VerticalBox = ({
  min,
  q1,
  median,
  q3,
  max,
  width,
  stroke,
  strokeWidth,
  fill,
  animationClass,
  showAnimation,
}) => {
  return (
    <>
      <line
        x1={width / 2}
        x2={width / 2}
        y1={min}
        y2={max}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={showAnimation ? animationClass : ""}
      />
      <rect
        x={0}
        y={q3}
        width={width}
        height={q1 - q3}
        stroke={stroke}
        fill={fill}
        className={showAnimation ? animationClass : ""}
      />
      <line
        x1={0}
        x2={width}
        y1={median}
        y2={median}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={showAnimation ? animationClass : ""}
      />
    </>
  );
};
