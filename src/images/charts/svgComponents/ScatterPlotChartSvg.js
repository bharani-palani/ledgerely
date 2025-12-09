import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const ScatterPlotChartSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");

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
          d='M 1.5625 23.4375 L 1.5625 0 L 0 0 L 0 25 L 25 25 L 25 23.4375 Z M 1.5625 23.4375 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 7.8125 17.1875 C 7.8125 18.050781 7.113281 18.75 6.25 18.75 C 5.386719 18.75 4.6875 18.050781 4.6875 17.1875 C 4.6875 16.324219 5.386719 15.625 6.25 15.625 C 7.113281 15.625 7.8125 16.324219 7.8125 17.1875 Z M 7.8125 17.1875 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 12.5 9.375 C 12.5 10.238281 11.800781 10.9375 10.9375 10.9375 C 10.074219 10.9375 9.375 10.238281 9.375 9.375 C 9.375 8.511719 10.074219 7.8125 10.9375 7.8125 C 11.800781 7.8125 12.5 8.511719 12.5 9.375 Z M 12.5 9.375 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 21.875 7.8125 C 21.875 8.675781 21.175781 9.375 20.3125 9.375 C 19.449219 9.375 18.75 8.675781 18.75 7.8125 C 18.75 6.949219 19.449219 6.25 20.3125 6.25 C 21.175781 6.25 21.875 6.949219 21.875 7.8125 Z M 21.875 7.8125 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 1,
          }}
          d='M 17.1875 15.625 C 17.1875 16.488281 16.488281 17.1875 15.625 17.1875 C 14.761719 17.1875 14.0625 16.488281 14.0625 15.625 C 14.0625 14.761719 14.761719 14.0625 15.625 14.0625 C 16.488281 14.0625 17.1875 14.761719 17.1875 15.625 Z M 17.1875 15.625 '
        />
      </g>
    </svg>
  );
};
export default React.memo(ScatterPlotChartSvg);
