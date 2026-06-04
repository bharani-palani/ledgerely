import React, { useLayoutEffect, useState, useRef } from "react";
import { terminatorShapeProps } from "./propsData";
import { useCommonFunctions } from "../../workbook/commonFunctions";

const TerminatorShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth, borderRadius } = {
    ...terminatorShapeProps,
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
    <svg width={width} height={height} className={showAnimation ? animationClass : ""}>
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={width - strokeWidth - 5}
        height={height - strokeWidth - 5}
        rx={borderRadius}
        ry={borderRadius}
        fill={fillColor}
        stroke={lineColor}
        strokeWidth={strokeWidth}
      />
      <foreignObject width={width - strokeWidth - 5} height={height - strokeWidth - 5}>
        <div
          ref={inputRef}
          spellCheck='false'
          autoCorrect='off'
          autoCapitalize='none'
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={e => {
            callBack({ id: "name", value: e.target.innerText });
            setIsEmpty(e.target.innerText.length === 0);
          }}
          className='shape lh-1'
          style={{
            color: fontColor,
            textAlign: "center",
            width: "100%",
            height: "100%",
            padding: `${strokeWidth * 3}px`,
            fontSize: fontSize,
            overflowY: "auto",
            overflow: "hidden",
            outline: "none",
            ...(!isEmpty
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {
                  transform: "translateY(35%)",
                }),
          }}
        >
          {name}
        </div>
      </foreignObject>
    </svg>
  );
};

export default TerminatorShape;
