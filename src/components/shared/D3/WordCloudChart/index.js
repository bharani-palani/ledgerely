import React, { useEffect, useRef } from "react";
import { useResponsiveSvgSelection } from "./hooks";
import { layout } from "./layout";

export const defaultCallbacks = {
  getWordTooltip: ({ text, value }) => `${text} (${value})`,
};

export const defaultOptions = {
  deterministic: false,
  enableOptimizations: false,
  fontFamily: "serif",
  fontSizes: [4, 32],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotationAngles: [-90, 90],
  scale: "sqrt",
  spiral: "rectangular",
};

const WordCloudChart = ({
  height,
  width,
  padding,
  callbacks,
  maxWords = 100,
  minSize,
  options,
  size: initialSize,
  data,
  fontColor,
  opacity,
  showAnimation,
  animationClass,
  ...rest
}) => {
  const [ref, selection, size] = useResponsiveSvgSelection(
    minSize,
    initialSize,
    options.svgAttributes,
  );

  const render = useRef(layout);

  useEffect(() => {
    if (selection) {
      const mergedCallbacks = { ...defaultCallbacks, ...callbacks };
      const mergedOptions = {
        ...defaultOptions,
        ...options,
        padding,
        colors: fontColor,
        opacity,
        showAnimation,
        animationClass,
      };
      render.current({
        callbacks: mergedCallbacks,
        maxWords,
        options: mergedOptions,
        selection,
        size,
        data,
      });
    }
  }, [
    maxWords,
    callbacks,
    options,
    selection,
    size,
    data,
    padding,
    fontColor,
    opacity,
    showAnimation,
    animationClass,
  ]);

  return (
    <div
      ref={ref}
      style={{ height, width }}
      {...rest}
      className={showAnimation ? animationClass : ""}
    />
  );
};

WordCloudChart.defaultProps = {
  callbacks: defaultCallbacks,
  maxWords: 100,
  minSize: [300, 300],
  options: defaultOptions,
};

export default WordCloudChart;
