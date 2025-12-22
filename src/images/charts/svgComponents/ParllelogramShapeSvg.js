import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const ParllelogramShapeSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={25}
      height={25}
      fill={appThemeBgColor}
      viewBox='0 0 100 50'
      version='1.1'
      xmlSpace='preserve'
    >
      <polygon stroke={appThemeBgColor} fill='transparent' strokeWidth={5} points='0,0 75,0 100,50 25,50' />
    </svg>
  );
};

export default React.memo(ParllelogramShapeSvg);
