import React, { useMemo } from "react";
const TICK_LENGTH = 6;

const AxisBottom = ({ xScale, pixelsPerTick, fontColor, lineColor }) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map(value => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      <path
        d={["M", range[0], 0, "L", range[1], 0].join(" ")}
        fill='none'
        stroke={lineColor}
      />
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2={TICK_LENGTH} stroke={lineColor} />
          <text
            key={value}
            fill={fontColor}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisBottom;
