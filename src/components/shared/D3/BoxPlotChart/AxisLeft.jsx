import React, { useMemo } from "react";

// tick length
const TICK_LENGTH = 5;

export const AxisLeft = ({
  yScale,
  pixelsPerTick,
  lineColor,
  fontColor,
  fontSize,
  showYaxisLine,
}) => {
  const range = yScale.range();

  const ticks = useMemo(() => {
    const height = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map(value => ({
      value,
      yOffset: yScale(value),
    }));
  }, [yScale]);

  return (
    <>
      {showYaxisLine && (
        <path
          d={["M", 0, range[0], "L", 0, range[1]].join(" ")}
          fill='none'
          stroke={lineColor}
        />
      )}
      {ticks.map(({ value, yOffset }) => (
        <g key={value} transform={`translate(0, ${yOffset})`}>
          {showYaxisLine && <line x2={-TICK_LENGTH} stroke={lineColor} />}
          <text
            key={value}
            fill={fontColor}
            style={{
              fontSize: fontSize,
              textAnchor: "middle",
              transform: "translateX(-20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};
