import React from "react";

export const Pane = props => {
  const { children, width, className } = props;
  return (
    <div className={`${className}`} style={{ width }}>
      {children}
    </div>
  );
};

export const VerticalPanes = props => {
  const { children, theme, className, style } = props;
  return (
    <div
      style={style}
      className={`d-flex position-relative ${
        theme === "dark" ? "bg-dark" : "bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
};
