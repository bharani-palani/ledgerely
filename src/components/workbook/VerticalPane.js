import React from "react";

const Pane = props => {
  const { children, width, className } = props;
  return (
    <div className={`${className}`} style={{ width }}>
      {children}
    </div>
  );
};

const VerticalPanes = props => {
  const { children, theme, className, style } = props;
  return (
    <div
      style={style}
      className={`d-flex ${
        theme === "dark" ? "bg-dark" : "bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export { VerticalPanes, Pane };
