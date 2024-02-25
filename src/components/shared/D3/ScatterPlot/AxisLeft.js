import React, { useMemo } from "react";

const AxisLeft = ({
  yScale,
  pixelsPerTick,
  width,
  fontSize,
  fontColor,
  lineColor,
  xTicks,
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
      {ticks.map(({ value, yOffset }) => (
        <g
          key={value}
          transform={`translate(0, ${yOffset})`}
          shapeRendering={"crispEdges"}
        >
          <line
            x1={-xTicks}
            x2={width + xTicks}
            stroke={lineColor}
            strokeWidth={0.5}
          />
          <text
            key={value}
            style={{
              fontSize: `${fontSize}px`,
              textAnchor: "middle",
              transform: "translateX(-20px)",
              fill: fontColor,
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </>
  );
};

export default AxisLeft;
