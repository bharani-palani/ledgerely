import React, { useLayoutEffect, useState, useRef } from "react";
import { parllelogramShapeProps } from "./propsData";
import { useCommonFunctions } from "../../workbook/commonFunctions";

const ParllelogramShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth } = {
    ...parllelogramShapeProps,
    ...props,
  };
  const { callBack, renderCursorFocus } = useCommonFunctions();
  const [isEmpty, setIsEmpty] = useState(name.length === 0);
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef?.current?.focus();
    renderCursorFocus(inputRef);
    setIsEmpty(name.length === 0 || name === "\n");
  }, [name]);

  const skewAngle = 20;
  const calculatedWidth = width - (width * skewAngle) / 100;

  return (
    <div
      style={{
        width: width,
        height,
        color: fontColor,
        fontSize,
        transform: `skew(${skewAngle}deg)`,
      }}
    >
      <div
        style={{
          width: calculatedWidth,
          height,
          backgroundColor: fillColor,
          border: `${strokeWidth}px solid ${lineColor}`,
          marginLeft: `${skewAngle / 2}%`,
        }}
      >
        <div
          ref={inputRef}
          contentEditable={true}
          spellCheck='false'
          autoCorrect='off'
          autoCapitalize='none'
          suppressContentEditableWarning={true}
          onInput={e => {
            callBack({ id: "name", value: e.target.innerText });
            setIsEmpty(e.target.innerText.length === 0);
          }}
          className={`${showAnimation ? animationClass : ""} shape lh-1 text-center text-wrap text-break p-1`}
          style={{
            width: calculatedWidth,
            height,
            outline: "none",
            ...(!isEmpty
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {
                  transform: "translateY(44%)",
                }),
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default ParllelogramShape;
