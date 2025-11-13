import React from "react";
import { tableProps } from "./propsData";

const Table = props => {
  const { data, theme, width = 100, fillColor, fontColor, fontSize = 14, showAnimation, animationClass } = { ...tableProps, ...props };
  const heads = Object.keys(data[0]);
  return (
    <table
      style={{ width: width + "%", fontSize: `${fontSize}px` }}
      className={`table table-sm table-striped table-${theme} ${showAnimation ? animationClass : ""}`}
    >
      <thead>
        <tr>
          {heads.map((head, i) => (
            <th key={i} className='border-end border-secondary border-bottom-0' style={{ background: fillColor, color: fontColor }}>
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className='fw-light'>
        {data.map((t, i) => (
          <tr key={i}>
            {Object.entries(t).map((r, j) => (
              <td key={j} className=''>
                {r[1]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
