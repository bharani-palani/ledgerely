import React, { useMemo } from "react";

// tick length
const TICK_LENGTH = 6;

export const AxisBottom = ({
  xScale,
  lineColor,
  fontColor,
  fontSize,
  showXaxisLine,
}) => {
  const [min, max] = xScale.range();

  const ticks = useMemo(() => {
    return xScale.domain().map(value => ({
      value,
      xOffset: xScale(value) + xScale.bandwidth() / 2,
    }));
  }, [xScale]);

  return (
    <>
      {showXaxisLine && (
        <path
          d={["M", min + 20, 0, "L", max - 20, 0].join(" ")}
          fill='none'
          stroke={lineColor}
        />
      )}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          {showXaxisLine && <line y2={TICK_LENGTH} stroke={lineColor} />}
          <text
            key={value}
            fill={fontColor}
            style={{
              fontSize: fontSize,
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
