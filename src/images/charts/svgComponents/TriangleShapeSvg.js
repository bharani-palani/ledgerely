import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");

export const TriangleShapeSvg = () => {
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
      viewBox='0 0 240 240'
    >
      <g>
        <path
          style={{ opacity: 1 }}
          fill='transparent'
          d='M -0.5,-0.5 C 79.5,-0.5 159.5,-0.5 239.5,-0.5C 239.5,72.5 239.5,145.5 239.5,218.5C 199.511,152.528 159.511,86.5278 119.5,20.5C 79.4888,86.5278 39.4888,152.528 -0.5,218.5C -0.5,145.5 -0.5,72.5 -0.5,-0.5 Z'
        />
      </g>
      <g>
        <path
          style={{ opacity: 1 }}
          fill={appThemeBgColor}
          d='M 239.5,218.5 C 239.5,218.833 239.5,219.167 239.5,219.5C 159.5,219.5 79.5,219.5 -0.5,219.5C -0.5,219.167 -0.5,218.833 -0.5,218.5C 39.4888,152.528 79.4888,86.5278 119.5,20.5C 159.511,86.5278 199.511,152.528 239.5,218.5 Z'
        />
      </g>
      <g>
        <path
          style={{ opacity: 1 }}
          fill='transparent'
          d='M -0.5,219.5 C 79.5,219.5 159.5,219.5 239.5,219.5C 239.5,226.167 239.5,232.833 239.5,239.5C 159.5,239.5 79.5,239.5 -0.5,239.5C -0.5,232.833 -0.5,226.167 -0.5,219.5 Z'
        />
      </g>
    </svg>
  );
};

export default React.memo(TriangleShapeSvg);
