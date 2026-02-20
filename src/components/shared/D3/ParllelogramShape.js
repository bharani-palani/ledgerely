import React, { useLayoutEffect, useState, useRef } from "react";
import { parllelogramShapeProps } from "./propsData";
import { useCommonFunctions } from "../../workbook/commonFunctions";

const ParllelogramShape = props => {
  const { name, width, height, fillColor, fontColor, lineColor, fontSize, showAnimation, animationClass, strokeWidth } = {
    ...parllelogramShapeProps,
    ...props,
  };
  const points = [
    [0, 0],
    [(width * 75) / 100, 0],
    [width, height],
    [(width * 25) / 100, height],
  ];

  const { callBack, renderCursorFocus } = useCommonFunctions();
  const [isEmpty, setIsEmpty] = useState(name.length === 0);
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef?.current?.focus();
    renderCursorFocus(inputRef);
    setIsEmpty(name.length === 0 || name === "\n");
  }, [name]);

  return (
    <svg
      width={width + strokeWidth}
      height={height + strokeWidth}
      fill={fillColor}
      viewBox={`0 0 ${width} ${height}`}
      className={`${showAnimation ? animationClass : ""} shape`}
    >
      <polygon stroke={lineColor} strokeWidth={strokeWidth} points={points.join(" ")} className='shape' />
      <foreignObject width={width} height={height} className='shape'>
        <div
          className='lh-1 shape'
          style={{
            width,
            height,
            color: fontColor,
            fontSize,
          }}
        >
          <div
            className='shape'
            style={{
              clipPath: "polygon(0% 100%, 50% 100%, 0% 0%)",
              shapeOutside: "polygon(0% 100%, 50% 100%, 0% 0%)",
              float: "left",
              width: "50%",
              height: "100%",
            }}
          />
          <div
            className='shape'
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 100% 0%)",
              shapeOutside: "polygon(50% 0%, 100% 100%, 100% 0%)",
              float: "right",
              width: "50%",
              height: "100%",
            }}
          />
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
            className='shape text-center text-break text-wrap'
            style={{
              width,
              height,
              outline: "none",
            }}
          >
            {name}
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

export default ParllelogramShape;
