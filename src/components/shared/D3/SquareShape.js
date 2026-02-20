import React, { useLayoutEffect, useState, useRef } from "react";
import { squareShapeProps } from "./propsData";
import { useCommonFunctions } from "../../workbook/commonFunctions";

const SquareShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth, borderRadius } = {
    ...squareShapeProps,
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

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={`${showAnimation ? animationClass : ""} shape`}>
      <rect
        width={width}
        height={height}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
        rx={borderRadius}
        ry={borderRadius}
        className='shape'
      />
      <foreignObject width={width} height={height} className='shape'>
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
          className='lh-1 text-center p-1 shape'
          style={{
            width,
            height,
            color: fontColor,
            fontSize,
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
      </foreignObject>
    </svg>
  );
};

export default SquareShape;
