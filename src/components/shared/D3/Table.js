import React from "react";
import { tableProps } from "./propsData";

const Table = props => {
  const {
    data,
    className,
    height,
    width,
    fillColor,
    fontColor,
    lineColor,
    fontSize = 14,
    showAnimation,
    animationClass,
  } = { ...tableProps, ...props };
  const heads = Object.keys(data[0]);
  return (
    <div className={`overflow-y table-responsive ${showAnimation ? animationClass : ""}`} style={{ height }}>
      <table
        style={{ width, fontSize: `${fontSize}px`, border: `solid ${lineColor}`, borderWidth: lineColor === "transparent" ? "0px" : "1px" }}
        className={className}
      >
        <thead style={{ position: "sticky", top: "0px", zIndex: 1 }}>
          <tr>
            {heads.map((head, i) => (
              <th key={i} className='ps-1 border-end border-top border-secondary border-bottom-0' style={{ background: fillColor, color: fontColor }}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=''>
          {data.map((t, i) => (
            <tr key={i}>
              {Object.entries(t).map((r, j) => (
                <td key={j} className='ps-1'>
                  {r[1]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
