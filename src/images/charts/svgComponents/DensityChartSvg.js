import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");
const appThemeColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-color");

export const DensityChartSvg = () => {
  // todo: not correct svg for density chart, need to update later
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='25'
      height='25'
      viewBox='0 0 25 25'
      role='img'
      aria-label='Density chart'
    >
      <rect x='0' y='0' width='25' height='25' rx='3' fill={appThemeBgColor} />
      <path d='M2 20 L6.5 12.5 L11.5 16.5 L15.5 9 L19.5 13.5 L23 20 Z' fill={appThemeColor} fillOpacity='0' />
      <path
        d='M2 20 C4.5 14 6 12 6.5 12.5 C9.5 14.5 10.5 15.5 11.5 16.5 C13.5 15 14.8 11 15.5 9 C17 10.5 18.5 12.5 19.5 13.5 C21 14.8 22.5 17 23 20'
        fill='none'
        stroke={appThemeColor}
      />
    </svg>
  );
};

export default React.memo(DensityChartSvg);
