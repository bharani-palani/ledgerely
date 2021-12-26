import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { aws } from "../../environment";
import AppContext from "../../contexts/AppContext";

function About() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | About`;

  return (
    <div className="video-section">
      {appData && appData.display_name && appData.profile_name ? (
        <>
          <img
            className="img-responsive"
            alt="My-banner-img"
            src={`${aws.baseUrl}/avatar/20191006_161009.jpg`}
          />
          <div className="home-message">
            <div className="nameHeading">
              <p>{appData.display_name}</p>
              <div className="skillset">{appData.profile_name}</div>
            </div>
          </div>
        </>
      ) : (
        <div className="spinner">
          <Loader
            type={helpers.LoadRandomSpinnerIcon()}
            color={helpers.fluorescentColor}
            height={100}
            width={100}
          />
        </div>
      )}
    </div>
  );
}

export default About;
