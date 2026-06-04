import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const CylinderShapeSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
  return (
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width={25} height={37} viewBox='0 0 108 158'>
      <g transform='translate(4,29)'>
        <path
          d='M 0,0 a 50,25 0,0,0 100 0 a 50,25 0,0,0 -100 0 l 0,100 a 50,25 0,0,0 100 0 l 0,-100'
          fill='transparent'
          stroke={appThemeBgColor}
          strokeWidth={4}
        ></path>
      </g>
    </svg>
  );
};

export default React.memo(CylinderShapeSvg);
