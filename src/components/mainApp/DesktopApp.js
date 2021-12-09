import React from "react";
import PropTypes from "prop-types";
import { baseUrl } from "../../environment";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const DesktopApp = props => {
  const {
    menus,
    oAuthToken,
    socialMedias,
    ls,
    audioVisible,
    audioState,
    togglePlay,
    responseGoogle,
    errorGoogle,
    openBlank,
    setToggleSideBar,
    toggleSideBar,
    appData
  } = props;

  const hamburgerStyle = () => {
    return toggleSideBar
      ? { right: "calc(100% - 46px)" }
      : { right: "calc(100% - 260px)" };
  };

  const toggleStyle = () => {
    return toggleSideBar
      ? { position: "absolute", right: "calc(100% - 0px)" }
      : { position: "absolute", right: "calc(100% - 260px)" };
  };

  const renderTooltip = props => (
    <Tooltip id="button-tooltip" className="in show" {...props}>
      Sign in with Google
    </Tooltip>
  );

  const isGoogleLogged =
    ls &&
    ls.profileObj &&
    ls.profileObj.googleId &&
    ls.profileObj.googleId === appData.google_id;
  let googleMenu = isGoogleLogged
    ? menus
    : menus.filter(menu => menu.showOnlyIfSuperUser === false);

  googleMenu = googleMenu.sort((a, b) => a.label > b.label ? 1 : -1);

  return (
    <header className="vertical-header hidden-print">
      <i
        style={hamburgerStyle()}
        onClick={() => setToggleSideBar(!toggleSideBar)}
        className={`fa hamburger ${
          toggleSideBar ? "fa-times higlight" : "fa-bars"
        }`}
      />
      <div style={toggleStyle()} className="vertical-header-wrapper slideRight">
        <nav className="nav-menu">
          <div className="logo">
            <Link to={"/"}>
              <img
                src={`${baseUrl()}/image/actualAvatar/avatar/bniBlack.jpg`}
                alt=""
              />
            </Link>
            <button className="audiBtn" onClick={() => togglePlay()}>
              {!audioVisible ? (
                <i className="fa fa-music" />
              ) : (
                <i
                  className={`fa fa-${
                    audioState === "play" ? "play" : "pause"
                  }`}
                />
              )}
            </button>
          </div>
          <ul className="primary-menu">
            {/* {isGoogleLogged && googleMenu.length > 0 && (
                <li className="menuHeading">Setup</li>
              )} */}
            {googleMenu.map((menu, i) => (
              <li
                key={i}
                className={`child-menu ${
                  i === googleMenu.length - 1 ? "last-child-menu" : ""
                }`}
              >
                <Link
                  className={menu.showOnlyIfSuperUser ? "admin" : ""}
                  to={menu.href}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
            {/* {menus
                .filter(menu => !menu.showOnlyIfSuperUser)
                .map((menu, j) => (
                  <li key={j} className="child-menu">
                    <Link to={menu.href}>{menu.label}</Link>
                  </li>
                ))} */}
          </ul>
          <div className="menu-social">
            <ul className="list-inline text-center">
              {socialMedias.map((media, i) => (
                <li key={i}>
                  <Link to="" onClick={() => openBlank(media.href)}>
                    <i className={media.icon}></i>
                  </Link>
                </li>
              ))}
              <li className="google">
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                  triggerType="hover"
                >
                  <div>
                    <GoogleLogin
                      clientId={oAuthToken}
                      buttonText=""
                      onSuccess={responseGoogle}
                      onFailure={errorGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </OverlayTrigger>
              </li>
            </ul>
            <div className="text-center designedBy">
              Design and development by{" "}
              <a
                className="normalLink"
                href={"mailto:barani.potshot@gmail.com"}
              >
                Bharani
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

DesktopApp.propTypes = {
  property: PropTypes.string
};
DesktopApp.defaultProps = {
  property: "String name"
};

export default DesktopApp;
