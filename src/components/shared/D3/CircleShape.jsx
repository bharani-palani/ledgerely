import React, { useLayoutEffect, useState, useRef } from "react";
import { circleShapeProps } from "./propsData";
import { useCommonFunctions } from "../../workbook/commonFunctions";

const CircleShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth } = {
    ...circleShapeProps,
    ...props,
  };
  const radius = Math.min(width, height) / 2 - strokeWidth;

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
      <circle cx={width / 2} cy={height / 2} r={radius} fill={fillColor} stroke={lineColor} strokeWidth={strokeWidth} />
      <foreignObject width={width} height={height}>
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
          className='lh-1 shape text-break text-wrap'
          style={{
            color: fontColor,
            textAlign: "center",
            outline: "none",
            width: "100%",
            height: "100%",
            padding: `${strokeWidth * 3}px`,
            fontSize: fontSize,
            overflowY: "auto",
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

export default CircleShape;
