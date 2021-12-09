import React, { useContext, useState } from "react";
import Loader from "react-loader-spinner";
import helpers from "../../helpers";
import { baseUrl } from "../../environment";
import AppContext from "../../contexts/AppContext";
import Gallery from "react-grid-gallery";

function About() {
  const [appData] = useContext(AppContext);
  document.title = `${appData.display_name} | About`;
  const [height, setheight] = useState(window.innerHeight);
  const [width, setWidth] = useState("100%");

  window.addEventListener("resize", () => {
    setheight(window.innerHeight);
    setWidth("100%");
  });
  const IMAGES = [
    {
      src: `${baseUrl()}/image/actualAvatar/avatar/20191006_161009.jpg`,
      thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20191006_161009.jpg`,
      thumbnailWidth: 318,
      thumbnailHeight: 180
    },
    {
      src: `${baseUrl()}/image/actualAvatar/avatar/20190309_165844.jpg`,
      thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20190309_165844.jpg`,
      thumbnailWidth: 318,
      thumbnailHeight: 180
    },
    // {
    //   src: `${baseUrl()}/image/actualAvatar/avatar/20190408_213558.jpg`,
    //   thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20190408_213558.jpg`,
    //   thumbnailWidth: 318,
    //   thumbnailHeight: 180
    // },
    // {
    //   src: `${baseUrl()}/image/actualAvatar/avatar/20190706_164557.jpg`,
    //   thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20190706_164557.jpg`,
    //   thumbnailWidth: 318,
    //   thumbnailHeight: 180
    // },
    {
      src: `${baseUrl()}/image/actualAvatar/avatar/20190817_160034.jpg`,
      thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20190817_160034.jpg`,
      thumbnailWidth: 318,
      thumbnailHeight: 180
    },
    {
      src: `${baseUrl()}/image/actualAvatar/avatar/20191026_155625.jpg`,
      thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20191026_155625.jpg`,
      thumbnailWidth: 318,
      thumbnailHeight: 180
    },
    {
      src: `${baseUrl()}/image/actualAvatar/avatar/IMAG0668.jpg`,
      thumbnail: `${baseUrl()}/image/actualAvatar/avatar/IMAG0668.jpg`,
      thumbnailWidth: 318,
      thumbnailHeight: 180
    },
    {
      src: `${baseUrl()}/image/actualAvatar/avatar/IMAG1424.jpg`,
      thumbnail: `${baseUrl()}/image/actualAvatar/avatar/IMAG1424.jpg`,
      thumbnailWidth: 318,
      thumbnailHeight: 180
    },
    // {
    //   src: `${baseUrl()}/image/actualAvatar/avatar/20191005_140735.jpg`,
    //   thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20191005_140735.jpg`,
    //   thumbnailWidth: 180,
    //   thumbnailHeight: 340
    // },
    // {
    //   src: `${baseUrl()}/image/actualAvatar/avatar/bniGreyCoat.jpg`,
    //   thumbnail: `${baseUrl()}/image/actualAvatar/avatar/bniGreyCoat.jpg`,
    //   thumbnailWidth: 180,
    //   thumbnailHeight: 340
    // },
    // {
    //   src: `${baseUrl()}/image/actualAvatar/avatar/20190714_164140.jpg`,
    //   thumbnail: `${baseUrl()}/image/actualAvatar/avatar/20190714_164140.jpg`,
    //   thumbnailWidth: 180,
    //   thumbnailHeight: 340
    // }
  ];
  return (
    <div className="video-section">
      <div className="overlay" />
      {appData && appData.display_name && appData.profile_name ? (
        <>
          <Gallery margin={0} rowHeight={400} images={IMAGES} />
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
