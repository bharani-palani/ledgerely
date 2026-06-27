import React, { useContext, useState } from "react";
import { tableProps } from "./propsData";
import { UserContext } from "../../../contexts/UserContext";
import helpers from "../../../helpers";

const Table = props => {
  const { data, className, height, width, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, padding, expandableKey } = {
    ...tableProps,
    ...props,
  };
  const heads = data && data.length > 0 ? Object.keys(data[0]) : [];
  const userContext = useContext(UserContext);
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = id => {
    setExpandedRow(prev => (prev === id ? null : id));
  };

  return (
    <div className={`overflow-y table-responsive ${showAnimation ? animationClass : ""}`} style={{ maxHeight: height }}>
      <table style={{ width, fontSize: `${fontSize}px` }} className={`mb-0 table table-striped table-${userContext?.userData?.theme} ${className}`}>
        <thead style={{ position: "sticky", top: "0px", zIndex: 1 }} className='border-dark border-top'>
          <tr>
            {expandableKey && (
              <th className='p-1' style={{ background: fillColor, color: fontColor }}>
                <i className='fa fa-plus-square' />
              </th>
            )}
            {heads.length > 0 &&
              heads
                .filter(f => f !== expandableKey)
                .map((head, i) => (
                  <th key={i} className='p-1' style={{ background: fillColor, color: fontColor }}>
                    {helpers.camelCaseToText(head).toLocaleUpperCase()}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody className='' style={{ color: fontColor }}>
          {data &&
            data.length > 0 &&
            data.map((t, i) => (
              <>
                <tr
                  key={i}
                  onClick={() => toggleRow(i)}
                  style={{
                    borderBottom: `solid ${lineColor}`,
                    borderWidth: lineColor === "transparent" ? "0px" : "1px",
                    cursor: t[expandableKey] ? "pointer" : "",
                  }}
                >
                  {t[expandableKey] && <td>{<i className={`fa fa-caret-${expandedRow === i ? "down" : "right"}`} />}</td>}
                  {Object.entries(t).map(
                    (r, j) =>
                      r[0] !== expandableKey && (
                        <td key={j} style={{ padding: `${padding}em` }}>
                          {r[1]}
                        </td>
                      ),
                  )}
                </tr>
                {expandedRow === i && t[expandableKey] && (
                  <tr className='animate__animated animate__animated animate__slideInLeft'>
                    <td colSpan={Object.keys(data[0]).length}>{t[expandableKey]}</td>
                  </tr>
                )}
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
