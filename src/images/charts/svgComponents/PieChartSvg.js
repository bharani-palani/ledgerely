import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");

export const PieChartSvg = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='25px' height='25px' viewBox='0 0 25 25' version='1.1'>
      <g id='surface1'>
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 13.363281 11.621094 L 24.96875 11.621094 C 24.542969 5.40625 19.578125 0.441406 13.363281 0.015625 Z M 13.363281 11.621094 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 0.75,
          }}
          d='M 21.71875 20.953125 C 23.589844 18.925781 24.800781 16.273438 25 13.34375 L 14.109375 13.34375 Z M 21.71875 20.953125 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 0.5,
          }}
          d='M 11.636719 12.125 L 11.636719 0.015625 C 5.136719 0.460938 0 5.871094 0 12.484375 C 0 15.625 1.160156 18.492188 3.074219 20.691406 Z M 11.636719 12.125 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 0.25,
          }}
          d='M 12.246094 13.957031 L 4.292969 21.910156 C 6.488281 23.820312 9.359375 24.984375 12.5 24.984375 C 15.511719 24.984375 18.273438 23.914062 20.429688 22.140625 Z M 12.246094 13.957031 '
        />
      </g>
    </svg>
  );
};
export default React.memo(PieChartSvg);
