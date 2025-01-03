import React from "react";

const Loader = ({ middle }) => {
  return (
    <div
      className={`${middle ? "d-flex align-items-center w-100 h-100 justify-content-center" : ""}`}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 -10 200'>
        <circle
          fill='#C2D82E'
          stroke='#C2D82E'
          strokeWidth='2'
          r='5'
          cx='140'
          cy='75'
        >
          <animate
            attributeName='opacity'
            calcMode='spline'
            dur='1.1'
            values='1;0;1;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='-.4'
          ></animate>
        </circle>
        <circle
          fill='#C2D82E'
          stroke='#C2D82E'
          strokeWidth='2'
          r='5'
          cx='160'
          cy='75'
        >
          <animate
            attributeName='opacity'
            calcMode='spline'
            dur='1.1'
            values='1;0;1;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='-.2'
          ></animate>
        </circle>
        <circle
          fill='#C2D82E'
          stroke='#C2D82E'
          strokeWidth='2'
          r='5'
          cx='180'
          cy='75'
        >
          <animate
            attributeName='opacity'
            calcMode='spline'
            dur='1.1'
            values='1;0;1;'
            keySplines='.5 0 .5 1;.5 0 .5 1'
            repeatCount='indefinite'
            begin='0'
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export default Loader;
