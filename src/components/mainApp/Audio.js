import React, {useContext} from "react";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContext";


const Audio = props => {
  const { myAudio, togglePlay, audioVisible, audioState } = props;
  const [appData] = useContext(AppContext);
  return (
    <>
      <button
        className="audiBtn mobile visible-xs hidden-print"
        onClick={togglePlay}
      >
        {!audioVisible ? (
          <i className="fa fa-music" />
        ) : (
          <>
          <audio
            className="audio"
            ref={myAudio}
            controls
            loop
            src={appData.bgSong}
            preload="auto"
          />
          <i className={`fa fa-${audioState === "play" ? "play" : "pause"}`} />
          </>
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
