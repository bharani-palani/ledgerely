import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const DonutChartSvg = () => {
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
          d='M 12.425781 0.683594 C 5.914062 0.683594 0.632812 5.960938 0.632812 12.476562 C 0.632812 18.988281 5.914062 24.265625 12.425781 24.265625 C 18.941406 24.265625 24.21875 18.988281 24.21875 12.476562 C 24.21875 5.960938 18.941406 0.683594 12.425781 0.683594 Z M 12.425781 21.089844 C 7.671875 21.089844 3.8125 17.230469 3.8125 12.476562 C 3.8125 7.71875 7.671875 3.863281 12.425781 3.863281 C 17.183594 3.863281 21.039062 7.71875 21.039062 12.476562 C 21.039062 17.230469 17.183594 21.089844 12.425781 21.089844 Z M 12.425781 21.089844 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 0.5,
          }}
          d='M 5.921875 6.835938 C 7.5 5 9.84375 3.835938 12.453125 3.835938 C 13.238281 3.835938 14 3.945312 14.722656 4.140625 L 16.015625 1.242188 C 14.886719 0.878906 13.695312 0.660156 12.453125 0.660156 C 8.695312 0.660156 5.355469 2.414062 3.195312 5.148438 Z M 5.921875 6.835938 '
        />
        <path
          style={{
            stroke: "none",
            fillRule: "nonzero",
            fill: appThemeBgColor,
            fillOpacity: 0.2,
          }}
          d='M 19.515625 17.441406 C 17.960938 19.648438 15.386719 21.089844 12.480469 21.089844 C 10.046875 21.089844 7.816406 20.09375 6.25 18.476562 L 3.382812 19.980469 C 5.546875 22.597656 8.820312 24.265625 12.480469 24.265625 C 16.820312 24.265625 20.570312 21.910156 22.621094 18.414062 Z M 19.515625 17.441406 '
        />
      </g>
    </svg>
  );
};
export default React.memo(DonutChartSvg);
