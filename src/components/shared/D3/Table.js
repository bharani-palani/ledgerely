import React, { useContext } from "react";
import { tableProps } from "./propsData";
import { UserContext } from "../../../contexts/UserContext";

const Table = props => {
  const { data, className, height, width, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, padding } = {
    ...tableProps,
    ...props,
  };
  const heads = Object.keys(data[0]);
  const userContext = useContext(UserContext);
  return (
    <div className={`overflow-y table-responsive ${showAnimation ? animationClass : ""}`} style={{ maxHeight: height }}>
      <table style={{ width, fontSize: `${fontSize}px` }} className={`mb-1 table table-striped table-${userContext?.userData?.theme} ${className}`}>
        <thead style={{ position: "sticky", top: "0px", zIndex: 1 }} className='border-dark border-top'>
          <tr>
            {heads.map((head, i) => (
              <th key={i} className='p-1' style={{ background: fillColor, color: fontColor }}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='' style={{ color: fontColor }}>
          {data.map((t, i) => (
            <tr key={i} style={{ borderBottom: `solid ${lineColor}`, borderWidth: lineColor === "transparent" ? "0px" : "1px" }}>
              {Object.entries(t).map((r, j) => (
                <td key={j} className='p-1' style={{ padding: `${padding}em` }}>
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
