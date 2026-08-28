import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const SquareShapeSvg = () => {
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
      viewBox='0 0 150 150'
    >
      <rect width={150} height={150} stroke={appThemeBgColor} fill='transparent' strokeWidth={10} />
    </svg>
  );
};

export default React.memo(SquareShapeSvg);
