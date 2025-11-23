import React from "react";
const appThemeBgColor = getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color");

export const DirectionArrowShapeSvg = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width={25} height={25} viewBox='0 0 100 100'>
      <defs>
        <marker id='DAS-1' markerUnits='strokeWidth' markerWidth={100} markerHeight={100} viewBox='0 0 100 100' refX={6} refY={6} orient='auto'>
          <path d='M2,2 L10,6 L2,10 L6,6 L2,2' fill={appThemeBgColor} />
        </marker>
      </defs>
      <line x1='2.5' y1={25} x2='2.5' y2={100} stroke={appThemeBgColor} strokeWidth={7} />
      <line x1={0} x2={75} y1={25} y2={25} stroke={appThemeBgColor} strokeWidth={7} markerEnd='url(#DAS-1)' />
    </svg>
  );
};

export default React.memo(DirectionArrowShapeSvg);
