import React from "react";
import PropTypes from "prop-types";

const Video = props => {
  const { videoRoot, style, className, optionalAttr } = props;
  
  return (
    <video style={style} className={className} {...optionalAttr}>
      <source src={videoRoot} type="video/mp4" />
      <source src={videoRoot} type={`video/mov`}></source>
      <source src={videoRoot} type={`video/webm`}></source>
    </video>
  );
};

Video.propTypes = {
  videoRoot: PropTypes.string
};
Video.defaultProps = {};

export default Video;
