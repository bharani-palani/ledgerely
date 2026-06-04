import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export const PannableChartSvg = () => {
  const userContext = useContext(UserContext);
  const appThemeBgColor =
    userContext.userData.theme === "dark"
      ? getComputedStyle(document.documentElement).getPropertyValue("--app-theme-bg-color")
      : getComputedStyle(document.documentElement).getPropertyValue("--bs-gray");

  return (
    <svg xmlns='http://www.w3.org/2000/svg' id='svg2' viewBox='0 0 1844.8 1246.2' version='1.1' width={25} height={25}>
      <g id='g11810' fill={appThemeBgColor} transform='translate(129.66 -794.64)'>
        <g id='g11561' strokeLinejoin='round' stroke='#000' strokeLinecap='round' strokeWidth='4.2813' fill={appThemeBgColor}>
          <path id='path11565' d='m247.53 1692.7h153.05l22.981-19.284h-153.05z' />
          <path id='path11569' d='m400.58 2038.7h-153.05l22.981-19.284h153.05z' />
          <path id='rect6105' d='m247.53 1692.7h153.05v346.07h-153.05z' />
          <path id='path11567' d='m400.58 1692.7v346.07l22.981-19.284v-346.07z' />
        </g>
      </g>
      <g
        id='g11583'
        strokeLinejoin='round'
        transform='translate(129.66 -794.64)'
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='3.7703'
        fill={appThemeBgColor}
      >
        <path id='path11587' d='m43.18 1771.5h153.56l22.981-19.284h-153.56z' />
        <path id='path11591' d='m196.74 2039h-153.56l22.981-19.284h153.56z' />
        <path id='rect6083' d='m43.18 1771.5h153.56v267.5h-153.56z' />
        <path id='path11589' d='m196.74 1771.5v267.5l22.981-19.284v-267.5z' />
      </g>
      <g
        id='g11817'
        strokeLinejoin='round'
        transform='translate(129.66 -794.64)'
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='4.7912'
        fill={appThemeBgColor}
      >
        <path id='path11576' d='m449.32 1603.6h152.54l22.981-19.284h-152.54z' />
        <path id='path11580' d='m601.87 2038.5h-152.54l22.981-19.284h152.54z' />
        <path id='rect6103' d='m449.32 1603.6h152.54v434.85h-152.54z' />
        <path id='path11578' d='m601.87 1603.6v434.85l22.981-19.284v-434.85z' />
      </g>
      <g
        id='g11823'
        strokeLinejoin='round'
        transform='translate(129.66 -794.64)'
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='4.873'
        fill={appThemeBgColor}
      >
        <path id='path11554' d='m658.56 1588.4h152.46l22.981-19.284h-152.46z' />
        <path id='path11558' d='m811.02 2038.4h-152.46l22.981-19.284h152.46z' />
        <path id='rect6101' d='m658.56 1588.4h152.46v450.08h-152.46z' />
        <path id='path11556' d='m811.02 1588.4v450.08l22.981-19.284v-450.08z' />
      </g>
      <g
        id='g11829'
        strokeLinejoin='round'
        transform='translate(129.66 -794.64)'
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='5.7502'
        fill={appThemeBgColor}
      >
        <path id='path11543' d='m863.09 1407.7h151.58l22.981-19.284h-151.58z' />
        <path id='path11547' d='m1014.7 2038h-151.58l22.981-19.284h151.58z' />
        <path id='rect6099' d='m863.09 1407.7h151.58v630.33h-151.58z' />
        <path id='path11545' d='m1014.7 1407.7v630.33l22.981-19.284v-630.33z' />
      </g>
      <g
        id='g11835'
        strokeLinejoin='round'
        transform='translate(129.66 -794.64)'
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='6.3021'
        fill={appThemeBgColor}
      >
        <path id='path11598' d='m1062.4 1277.8h151.03l22.981-19.284h-151.03z' />
        <path id='path11602' d='m1213.4 2037.7h-151.03l22.981-19.284h151.03z' />
        <path id='rect6097' d='m1062.4 1277.8h151.03v759.89h-151.03z' />
        <path id='path11600' d='m1213.4 1277.8v759.89l22.981-19.284v-759.89z' />
      </g>
      <g
        id='g11841'
        strokeLinejoin='round'
        transform='translate(129.66 -794.64)'
        stroke='#000'
        strokeLinecap='round'
        strokeWidth='7.0221'
        fill={appThemeBgColor}
      >
        <path id='path11609' d='m1267.4 1089.4h150.31l22.981-19.284h-150.31z' />
        <path id='path11613' d='m1417.7 2037.4h-150.31l22.981-19.284h150.31z' />
        <path id='rect6095' d='m1267.4 1089.4h150.31v947.96h-150.31z' />
        <path id='path11611' d='m1417.7 1089.4v947.96l22.981-19.284v-947.96z' />
      </g>
      <g id='g12148' transform='translate(129.66 -794.64)'>
        <path
          id='path11847'
          d='m1363.7 892.47c-186.3 146.53-372.06 292.43-557.26 437.73-29.949 59.421-60.324 118.96-91.125 178.62-91.185-8.8381-182.74-17.342-274.66-25.5-140.44 70.962-280.48 141.85-420.25 212.69v21.719c142.56-66.427 284.84-132.79 426.72-199.09 95.173 8.8492 190.73 17.362 286.62 25.531 37.229-59.389 74.887-118.9 112.97-178.53 188.96-137.06 377.34-273.49 565.19-409.28l-48.187-63.875z'
          style={{ color: "#000000" }}
          fillRule='evenodd'
        />
        <path id='path12001' stroke='#000' strokeWidth='4.0664' d='m1291.6 867.43 130.19 156.17 70.157-190.83-200.34 34.658z' />
      </g>
    </svg>
  );
};

export default React.memo(PannableChartSvg);
