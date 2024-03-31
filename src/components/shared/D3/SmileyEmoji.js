import React from "react";
import { smileyEmojiProps } from "./propsData";
import PropTypes from "prop-types";

const SmileyEmoji = props => {
  const { fontSize, emoji, showAnimation, animationClass } = props;
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

SmileyEmoji.propTypes = {
  emoji: PropTypes.string,
  fontSize: PropTypes.number,
  showAnimation: PropTypes.bool,
  animationClass: PropTypes.string,
};

SmileyEmoji.defaultProps = smileyEmojiProps;

export default SmileyEmoji;
