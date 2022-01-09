import React from "react";
import PropTypes from "prop-types";

const Video = props => {
  const { videoRoot } = props;
  return (
    <video className="videoTag hidden-print" autoPlay loop muted>
      <source src={videoRoot || require("../../videos/loadingVideo.mp4")} type="video/mp4" />
    </video>
  );
};

Video.propTypes = {
  videoRoot: PropTypes.string
};
Video.defaultProps = {};

export default Video;
