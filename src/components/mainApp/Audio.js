import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import AppContext from "../../contexts/AppContext";
import AwsFactory from "../configuration/Gallery/AwsFactory";


const Audio = props => {
  const { myAudio, togglePlay, audioVisible, audioState } = props;
  const [appData] = useContext(AppContext);
	const [ url, setUrl ] = useState("");

  const getSignedUrl = () => {
    new AwsFactory(appData)
    .getSignedUrl(appData.bgSong)
    .then(link => {
        setUrl(link);
    })
  }

  useEffect(() => {
      getSignedUrl();
  },[appData])


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
            src={url}
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
