import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const LineShapeSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
  return (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='25px' height='35px' viewBox='0 0 25 35' version='1.1'>
      <g id='surface1'>
        <path
          style={{
            fill: "none",
            strokeWidth: 62,
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            stroke: appThemeBgColor,
            strokeOpacity: 1,
            strokeMiterlimit: 4,
          }}
          d='M 34.29375 780.898661 L 717.14625 169.541071 '
          transform='matrix(0.0336022,0,0,0.03327,0,0)'
        />
      </g>
    </svg>
  );
};

export default React.memo(LineShapeSvg);
