import * as d3 from "d3";
import React, { useMemo } from "react";

const AxisBottom = ({
  xScale,
  pixelsPerTick,
  height,
  fontSize,
  fontColor,
  lineColor,
  yTicks,
  showYaxisLine,
  showXaxis,
}) => {
  const range = xScale.range();
  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);
    return xScale.ticks(numberOfTicksTarget).map(value => ({
      value: d3.format(".1s")(value),
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      {ticks.map(({ value, xOffset }, i) => (
        <g
          key={i}
          transform={`translate(${xOffset}, 0)`}
          shapeRendering={"crispEdges"}
        >
          {showYaxisLine && (
            <line
              y1={yTicks}
              y2={-height - yTicks}
              stroke={lineColor}
              strokeWidth={1}
            />
          )}
          {showXaxis && (
            <text
              key={value}
              style={{
                fontSize: `${fontSize}px`,
                textAnchor: "middle",
                transform: "translateY(20px)",
                fill: fontColor,
              }}
            >
              {value}
            </text>
          )}
        </g>
      ))}
    </>
  );
};

export default AxisBottom;
