import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const TableSvg = () => {
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
            fill: "none",
            strokeWidth: "3.1355",
            strokeLinecap: "butt",
            strokeLinejoin: "round",
            stroke: appThemeBgColor,
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d='M 6.657299 11.030145 C 5.547353 11.030145 4.653752 11.923746 4.653752 13.033692 L 4.653752 46.633078 C 4.653752 47.743024 5.547353 48.636625 6.657299 48.636625 L 53.444349 48.636625 C 54.554295 48.636625 55.447896 47.743024 55.447896 46.633078 L 55.447896 13.033692 C 55.447896 11.923746 54.554295 11.030145 53.444349 11.030145 Z M 6.657299 11.030145 '
          transform='matrix(0.415279,0,0,0.415279,0.0205187,0.110817)'
        />
        <path
          style={{
            fill: "none",
            strokeWidth: "2.5084",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            stroke: appThemeBgColor,
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d='M 5.142881 36.126215 L 55.447896 36.126215 '
          transform='matrix(0.415279,0,0,0.415279,0.0205187,0.110817)'
        />
        <path
          style={{
            fill: "none",
            strokeWidth: "2.5084",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            stroke: appThemeBgColor,
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d='M 5.142881 23.766307 L 55.447896 23.766307 '
          transform='matrix(0.415279,0,0,0.415279,0.0205187,0.110817)'
        />
        <path
          style={{
            fill: "none",
            strokeWidth: "2.5084",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            stroke: appThemeBgColor,
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d='M 30.050824 11.519274 L 30.050824 47.902931 '
          transform='matrix(0.415279,0,0,0.415279,0.0205187,0.110817)'
        />
      </g>
    </svg>
  );
};
export default React.memo(TableSvg);
