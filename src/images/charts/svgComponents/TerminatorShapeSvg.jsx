import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const TerminatorShapeSvg = () => {
  const userContext = useContext(UserContext);
  const [appThemeBgColor, setAppThemeBgColor] = useState("");
  useEffect(() => {
    const bg =
      userContext.userData.theme === "dark"
        ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
        : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
    setAppThemeBgColor(bg);
  }, [
    userContext.userData.theme,
    getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color"),
    getComputedStyle(document.documentElement).getPropertyValue("--bs-gray"),
  ]);
  return (
    <svg width={25} height={25} xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='22' height='15' rx='7' ry='7' stroke={appThemeBgColor} fill='transparent' />
    </svg>
  );
};

export default React.memo(TerminatorShapeSvg);
