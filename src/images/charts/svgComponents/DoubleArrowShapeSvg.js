import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");

export const DoubleArrowShapeSvg = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      fill={appThemeBgColor}
      height={25}
      width={25}
      version='1.1'
      id='Layer_1'
      viewBox='0 0 492.426 492.426'
      xmlSpace='preserve'
    >
      <polygon points='411.819,165.606 390.606,186.82 435.019,231.232 57.407,231.232 101.819,186.82 80.606,165.606 0,246.213   80.606,326.82 101.819,305.606 57.445,261.232 434.981,261.232 390.606,305.606 411.819,326.82 492.426,246.213 ' />
    </svg>
  );
};

export default React.memo(DoubleArrowShapeSvg);
