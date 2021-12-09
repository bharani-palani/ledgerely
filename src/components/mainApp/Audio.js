import React from "react";
import PropTypes from "prop-types";

const Audio = props => {
  const { myAudio, togglePlay, audioVisible, audioState } = props;
  return (
    <>
      <audio
        className="audio"
        ref={myAudio}
        controls
        loop
        src={require("../../videos/Heliolingus.mp3")}
        preload="auto"
      />
      <button
        className="audiBtn mobile visible-xs hidden-print"
        onClick={togglePlay}
      >
        {!audioVisible ? (
          <i className="fa fa-music" />
        ) : (
          <i className={`fa fa-${audioState === "play" ? "play" : "pause"}`} />
        )}
      </button>
    </>
  );
};

Audio.propTypes = {
  property: PropTypes.string
};
Audio.defaultProps = {
  property: "String name"
};

export default Audio;
