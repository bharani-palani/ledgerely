import React from "react";
import PropTypes from "prop-types";

const Video = props => {
  const { videoRoot } = props;
  
  return (
    <video className="videoTag hidden-print" autoPlay loop muted>
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
