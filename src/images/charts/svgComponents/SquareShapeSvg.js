import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");

export const SquareShapeSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      version='1.1'
      width={25}
      height={25}
      style={{
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
        imageRendering: "optimizeQuality",
        fillRule: "evenodd",
        clipRule: "evenodd",
      }}
      viewBox='0 0 150 150'
    >
      <rect width={150} height={150} fill={appThemeBgColor} />
    </svg>
  );
};

export default React.memo(SquareShapeSvg);
