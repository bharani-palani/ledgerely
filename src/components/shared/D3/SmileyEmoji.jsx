import React from "react";
import { smileyEmojiProps } from "./propsData";

const SmileyEmoji = props => {
  const { fontSize, emoji, showAnimation, animationClass } = { ...smileyEmojiProps, props };
  return (
    <div
      className={`${showAnimation ? animationClass : ""} shape`}
      style={{
        fontSize,
      }}
    >
      {emoji}
    </div>
  );
};

export default SmileyEmoji;
