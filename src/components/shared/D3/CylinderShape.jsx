import React, { useLayoutEffect, useRef } from "react";
import { cylinderShapeProps } from "./propsData";
import { useCommonFunctions } from "../../workbook/commonFunctions";

const CylinderShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth } = {
    ...cylinderShapeProps,
    ...props,
  };

  const { callBack, renderCursorFocus } = useCommonFunctions();
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef?.current?.focus();
    renderCursorFocus(inputRef);
  }, [name]);

  const ellipseHeight = width / 4;
  const bodyHeight = height - ellipseHeight;

  const containerStyle = {
    position: "relative",
    width: `${width}px`,
    height: `${height}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: fontColor,
  };

  const topStyle = {
    position: "absolute",
    top: 0,
    width: "100%",
    height: `${ellipseHeight}px`,
    backgroundColor: fillColor,
    borderRadius: "50%",
    border: `solid ${strokeWidth}px ${lineColor}`,
    zIndex: 1,
  };

  const bodyStyle = {
    position: "absolute",
    top: `${ellipseHeight / 2}px`,
    width: "100%",
    height: `${bodyHeight}px`,
    backgroundColor: fillColor,
    borderLeft: `solid ${strokeWidth}px ${lineColor}`,
    borderRight: `solid ${strokeWidth}px ${lineColor}`,
    borderBottom: `solid ${strokeWidth}px ${lineColor}`,
    borderBottomLeftRadius: `50% ${ellipseHeight / 1.5}px`,
    borderBottomRightRadius: `50% ${ellipseHeight / 1.5}px`,
  };

  return (
    <div className={`${showAnimation ? animationClass : ""} shape`} style={containerStyle}>
      <div style={topStyle} />
      <div style={bodyStyle} />
      <div
        ref={inputRef}
        spellCheck='false'
        autoCorrect='off'
        autoCapitalize='none'
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={e => {
          callBack({ id: "name", value: e.target.innerText });
        }}
        style={{ fontSize, outline: "none", zIndex: 1 }}
        className='text-center text-wrap text-break p-2 lh-1'
      >
        {name}
      </div>
    </div>
  );
};

export default CylinderShape;
