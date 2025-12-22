import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const DiamondShapeSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
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
      viewBox='0 0 200 200'
    >
      <g>
        <path
          style={{ opacity: "0.989" }}
          stroke={appThemeBgColor}
          strokeWidth={10}
          fill='transparent'
          d='M 97.5,5.5 C 98.8734,5.34332 100.207,5.50999 101.5,6C 132.738,36.7374 163.405,67.9041 193.5,99.5C 163.405,131.096 132.738,162.263 101.5,193C 100.167,193.667 98.8333,193.667 97.5,193C 66.2615,162.263 35.5948,131.096 5.5,99.5C 5.66667,98.8333 5.83333,98.1667 6,97.5C 36.7015,66.9653 67.2015,36.2987 97.5,5.5 Z'
        />
      </g>
    </svg>
  );
};

export default React.memo(DiamondShapeSvg);
