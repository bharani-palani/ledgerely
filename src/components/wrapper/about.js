import React, { useContext, useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import AppContext from "../../contexts/AppContext";
import SignedUrl from "../configuration/Gallery/SignedUrl";

function About() {
  const [appData] = useContext(AppContext);
  const [height, setHeight] = useState("100%");
  const [width, setWidth] = useState("100%");
  document.title = `${appData.display_name} | About`;

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      setHeight(document.body.clientHeight);
      setWidth(document.body.clientWidth);
    });
  },[])

  return (
    <div className="video-section">
      {appData && appData.display_name && appData.profile_name ? (
        <>
          <SignedUrl className="banner-img" width={width} height={height} type="image" appData={appData} unsignedUrl={appData.bannerImg} />
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
