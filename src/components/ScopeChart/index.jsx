import React, { useMemo, useState, useRef, useEffect } from "react";
import { scaleLinear } from "d3-scale";
import { format } from "d3-format";
import moment from "moment";
import { tooltip } from "../shared/D3/constants";
import helpers from "../../helpers";

const ScopeChart = ({
  // Required props
  data = [],
  monthYearSelected = null,
  // Dimensions
  width = 1024,
  height = 720,
  margins = { top: 50, right: 20, bottom: 50, left: 55 },
  // Axis labels
  xLabel = "X",
  yLabel = "Y",
  hideXLabel = false,
  hideYLabel = false,
  hideXAxis = false,
  hideYAxis = false,
  // Domain
  xMin = null,
  xMax = null,
  yMin = null,
  yMax = null,
  // Parsing
  isDate = false,
  xParser = null,
  xDisplay = null,
  ticks = 10,
  // Rendering
  hideLines = false,
  hidePoints = false,
  pointRadius = 5,
  interpolate = "cardinal",
  strokeWidth = 2,
  // Callbacks
  onPointClick = null,
  // Other
  id = `linechart-${Date.now()}`,
  showTooltip = true,
  tooltipPrefix = "",
  tooltipSuffix = "",
  locale,
  currency,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(monthYearSelected ? monthYearSelected.replace("-", " ") : null);
  const svgRef = useRef(null);

  useEffect(() => {
    setSelectedMonth(monthYearSelected ? monthYearSelected.replace("-", " ") : null);
  }, [monthYearSelected]);

  // Parse X values
  const parseX = val => {
    if (xParser) return xParser(val);
    if (isDate) return new Date(val).getTime();
    return Number(val);
  };

  // Display X value
  const displayDateX = val => {
    const date = moment(Number(val));
    return date.format("MMM YYYY");
  };

  const displayX = val => {
    if (xDisplay) {
      return xDisplay(new Date(Number(val)));
    }

    if (isDate) {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(Number(val)));
    }

    return Math.round(val);
  };

  // Compute scales and paths
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return { lines: [], xScale: null, yScale: null };

    // Flatten all points to determine domain
    const allPoints = data.flatMap(line => line.points || []);
    if (allPoints.length === 0) return { lines: [], xScale: null, yScale: null };

    // Compute X domain
    const xValues = allPoints.map(p => parseX(p.x));
    const computedXMin = xMin !== null ? parseX(xMin) : Math.min(...xValues);
    const computedXMax = xMax !== null ? parseX(xMax) : Math.max(...xValues);

    // Compute Y domain
    const yValues = allPoints.map(p => Number(p.y || 0));
    const computedYMin = yMin !== null ? Number(yMin) : Math.min(...yValues, 0);
    const computedYMax = yMax !== null ? Number(yMax) : Math.max(...yValues, 0);

    // Create scale functions
    const innerWidth = width - margins.left - margins.right;
    const innerHeight = height - margins.top - margins.bottom;

    const xScale = val => {
      const normalized = (parseX(val) - computedXMin) / (computedXMax - computedXMin || 1);
      return margins.left + normalized * innerWidth;
    };

    const yScale = val => {
      const normalized = (Number(val) - computedYMin) / (computedYMax - computedYMin || 1);
      return height - margins.bottom - normalized * innerHeight;
    };

    // Build line paths
    const lines = data.map(line => {
      const points = (line.points || []).map(p => ({
        x: xScale(p.x),
        y: yScale(p.y),
        data: p,
      }));

      const createSmoothPath = points => {
        if (points.length < 2) return "";

        let d = `M ${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i - 1] || points[i];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[i + 2] || p2;

          const cp1x = p1.x + (p2.x - p0.x) / 7;
          const cp1y = p1.y + (p2.y - p0.y) / 7;

          const cp2x = p2.x - (p3.x - p1.x) / 7;
          const cp2y = p2.y - (p3.y - p1.y) / 7;

          d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
        }

        return d;
      };

      // const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
      const pathD = interpolate === "cardinal" ? createSmoothPath(points) : points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

      return {
        ...line,
        points,
        pathD,
      };
    });

    return {
      lines,
      xScale,
      yScale,
      xMin: computedXMin,
      xMax: computedXMax,
      yMin: computedYMin,
      yMax: computedYMax,
      innerWidth,
      innerHeight,
    };
  }, [data, width, height, margins, xMin, xMax, yMin, yMax, isDate, xParser]);

  // Generate X axis ticks
  const xTicks = useMemo(() => {
    if (!chartData.xScale) return [];

    const { xMin, xMax } = chartData;

    // Non-date axis
    if (!isDate) {
      const range = xMax - xMin;
      const step = range / (ticks - 1 || 1);

      return Array.from({ length: ticks }, (_, i) => {
        const value = xMin + step * i;

        return {
          value,
          x: chartData.xScale(value),
        };
      });
    }

    // Date axis
    const start = new Date(xMin);
    const end = new Date(xMax);

    const tickArray = [];

    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      const timestamp = current.getTime();
      tickArray.push({
        value: timestamp,
        x: chartData.xScale(timestamp),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return tickArray;
  }, [chartData, ticks, isDate]);

  // Generate Y axis ticks
  const yTicks = useMemo(() => {
    if (!chartData.yScale) return [];
    const { yMin, yMax, innerHeight } = chartData;
    const scale = scaleLinear().domain([yMin, yMax]).nice(ticks);

    return scale.ticks(ticks).map(value => ({
      value,
      y: margins.top + ((scale.domain()[1] - value) / (scale.domain()[1] - scale.domain()[0])) * innerHeight,
    }));
  }, [chartData, ticks, margins]);

  const formatYAxisLabel = value => {
    const abs = Math.abs(value);

    if (abs >= 10000000) {
      return `${format(".1f")(value / 10000000)} Cr`;
    }
    if (abs >= 1000000) {
      return `${format(".1f")(value / 1000000)} M`;
    }

    if (abs >= 100000) {
      return `${format(".1f")(value / 100000)} L`;
    }

    if (abs >= 1000) {
      return `${format(".1f")(value / 1000)} K`;
    }

    return format(",")(value);
  };

  const handlePointClick = point => {
    if (onPointClick) {
      setSelectedMonth(point.data.month.replace("-", " "));
      onPointClick(new MouseEvent("click"), point.data);
    }
  };

  if (!chartData.lines || chartData.lines.length === 0) {
    return (
      <div id={id} className='linechart-empty'>
        No data available
      </div>
    );
  }

  return (
    <div id={id} className='linechart-container'>
      <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} className=''>
        <rect width={width} height={height} fill='transparent' />
        {/* Y Axis */}
        {!hideYAxis && (
          <>
            <line x1={margins.left} y1={margins.top} x2={margins.left} y2={height - margins.bottom} stroke='#ccc' strokeWidth='1' />
            {yTicks.map((tick, i) => (
              <g key={`ytick-${i}`}>
                <line x1={margins.left - 5} y1={tick.y} x2={margins.left} y2={tick.y} stroke='#666' strokeWidth='1' />
                <text x={margins.left - 10} y={tick.y} textAnchor='end' dy='0.3em' fontSize='12' fill='#666'>
                  {formatYAxisLabel(tick.value)}
                </text>
              </g>
            ))}
          </>
        )}
        {/* X Axis */}
        {!hideXAxis && (
          <>
            <line
              x1={margins.left}
              y1={height - margins.bottom}
              x2={width - margins.right}
              y2={height - margins.bottom}
              stroke='#ccc'
              strokeWidth='1'
            />
            {xTicks.map((tick, i) => (
              <g key={`xtick-${i}`}>
                <line x1={tick.x + 2} y1={height - margins.bottom} x2={tick.x + 2} y2={height - margins.bottom + 5} stroke='#666' strokeWidth='1' />
                <text
                  x={tick.x}
                  y={height - margins.bottom + 20}
                  textAnchor='middle'
                  fontSize='12'
                  onClick={() => {
                    handlePointClick({ data: { month: displayDateX(tick.value).replace(" ", "-") } });
                  }}
                  className={displayDateX(tick.value) === selectedMonth ? "colored" : ""}
                >
                  {displayX(tick.value)}{" "}
                </text>
              </g>
            ))}
          </>
        )}
        {/* Y Axis Label */}
        {!hideYLabel && (
          <text x={-height / 2} y={15} textAnchor='middle' fontSize='14' fill='#333' transform='rotate(-90)'>
            {yLabel}
          </text>
        )}
        {/* X Axis Label */}
        {!hideXLabel && (
          <text x={width / 2} y={height - 10} textAnchor='middle' fontSize='14' fill='#333'>
            {xLabel}
          </text>
        )}
        {/* Lines and Points */}
        {chartData.lines.map((line, lineIdx) => (
          <g key={`line-${lineIdx}`}>
            {/* Line */}
            {!hideLines && (
              <path
                d={line.pathD}
                fill='none'
                stroke={line.color || `hsl(${(lineIdx * 360) / chartData.lines.length}, 70%, 50%)`}
                strokeWidth={strokeWidth}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            )}

            {/* Points */}
            {!hidePoints &&
              line.points.map((point, pointIdx) => (
                <g key={`point-${lineIdx}-${pointIdx}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={pointRadius}
                    fill='#ddd'
                    stroke={line.color || `hsl(${(lineIdx * 360) / chartData.lines.length}, 70%, 50%)`}
                    strokeWidth={3}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handlePointClick(point);
                    }}
                    onMouseOver={e => {
                      if (showTooltip) {
                        tooltip.style("padding", "5px");
                        tooltip.style("opacity", 0.9);
                        tooltip
                          .html(`${tooltipPrefix} ${helpers.countryCurrencyLacSeperator(locale, currency, point.data.y, 2)} ${tooltipSuffix}`)
                          .style("left", e.pageX + 5 + "px")
                          .style("top", e.pageY - 30 + "px");
                      }
                    }}
                    onMouseLeave={() => {
                      tooltip.style("padding", 0);
                      tooltip.style("opacity", 0);
                    }}
                  />
                </g>
              ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ScopeChart;
