import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const CircleShapeSvg = () => {
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
      viewBox='0 0 225 225'
    >
      <g>
        <path
          style={{ opacity: 1 }}
          fill='transparent'
          d='M 104.5,0.5 C 104.5,0.166667 104.5,-0.166667 104.5,-0.5C 144.5,-0.5 184.5,-0.5 224.5,-0.5C 224.5,32.5 224.5,65.5 224.5,98.5C 223.137,94.3681 222.137,90.0348 221.5,85.5C 221.072,82.2154 220.072,79.2154 218.5,76.5C 205.56,41.06 181.226,17.2266 145.5,5C 132.076,1.29664 118.41,-0.203364 104.5,0.5 Z'
        />
      </g>
      <g>
        <path
          style={{ opacity: 1 }}
          fill={appThemeBgColor}
          d='M 104.5,0.5 C 118.41,-0.203364 132.076,1.29664 145.5,5C 181.226,17.2266 205.56,41.06 218.5,76.5C 218.528,79.9164 219.528,82.9164 221.5,85.5C 222.137,90.0348 223.137,94.3681 224.5,98.5C 224.5,106.833 224.5,115.167 224.5,123.5C 219.036,160.582 200.369,189.082 168.5,209C 148.25,219.978 126.584,224.811 103.5,223.5C 57.8913,218.395 26.058,194.728 8,152.5C 5.83441,147.555 4.33441,142.555 3.5,137.5C 3.43487,134.572 2.7682,131.905 1.5,129.5C -4.05922,78.1188 15.2741,39.2854 59.5,13C 73.5163,5.27208 88.5163,1.10541 104.5,0.5 Z'
        />
      </g>
      <g>
        <path
          style={{ opacity: 1 }}
          fill='transparent'
          d='M 218.5,76.5 C 220.072,79.2154 221.072,82.2154 221.5,85.5C 219.528,82.9164 218.528,79.9164 218.5,76.5 Z'
        />
      </g>
      <g>
        <path
          style={{ opacity: 1 }}
          fill='transparent'
          d='M -0.5,-0.5 C 34.5,-0.5 69.5,-0.5 104.5,-0.5C 104.5,-0.166667 104.5,0.166667 104.5,0.5C 88.5163,1.10541 73.5163,5.27208 59.5,13C 15.2741,39.2854 -4.05922,78.1188 1.5,129.5C 1.29379,132.495 1.96046,135.162 3.5,137.5C 4.33441,142.555 5.83441,147.555 8,152.5C 26.058,194.728 57.8913,218.395 103.5,223.5C 103.5,223.833 103.5,224.167 103.5,224.5C 68.8333,224.5 34.1667,224.5 -0.5,224.5C -0.5,149.5 -0.5,74.5 -0.5,-0.5 Z'
        />
      </g>
      <g>
        <path
          style={{ opacity: 1 }}
          fill='transparent'
          d='M 224.5,123.5 C 224.5,157.167 224.5,190.833 224.5,224.5C 184.167,224.5 143.833,224.5 103.5,224.5C 103.5,224.167 103.5,223.833 103.5,223.5C 126.584,224.811 148.25,219.978 168.5,209C 200.369,189.082 219.036,160.582 224.5,123.5 Z'
        />
      </g>
      <g>
        <path
          style={{ opacity: 1 }}
          fill='transparent'
          d='M 1.5,129.5 C 2.7682,131.905 3.43487,134.572 3.5,137.5C 1.96046,135.162 1.29379,132.495 1.5,129.5 Z'
        />
      </g>
    </svg>
  );
};

export default React.memo(CircleShapeSvg);
