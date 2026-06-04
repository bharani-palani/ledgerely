import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const CircleShapeSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
  return (
    <svg width='25' height='25' viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='12.5' cy='12.5' r='10' fill='transparent' stroke={appThemeBgColor} strokeWidth='1' />
    </svg>
  );
};

export default React.memo(CircleShapeSvg);
