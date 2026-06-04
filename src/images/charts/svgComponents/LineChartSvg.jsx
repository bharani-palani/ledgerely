import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const LineChartSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={25}
      height={25}
      shapeRendering='geometricPrecision'
      imageRendering='optimizeQuality'
      fillRule='evenodd'
      fill={appThemeBgColor}
      viewBox='0 0 256 256'
    >
      <path
        d='M2.5-.5h7c1.644.816 2.81 2.15 3.5 4l.5 238 237 .5c2.407.257 4.073 1.424 5 3.5v6c-1 1.667-2.333 3-4 4H7.5a45.42 45.42 0 0 1-8-8V3.5l3-4z'
        opacity='.905'
      />
      <path
        d='M200.5 43.5c8.487-1.004 11.987 2.663 10.5 11l-52.5 91c-2.708 1.936-5.708 2.436-9 1.5L105 124.5c-16.202 29.244-33.036 58.077-50.5 86.5-9.993 1.206-13.16-2.961-9.5-12.5l51-89c2.917-1.893 6.084-2.393 9.5-1.5l44.5 22.5a2787.79 2787.79 0 0 1 50.5-87z'
        opacity='.83'
      />
    </svg>
  );
};
export default React.memo(LineChartSvg);
