import React from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { aws } from "../../environment";
import GoogleLogin from "react-google-login";

const MobileApp = props => {
  const {
    menus,
    onNavBarToggle,
    navBarExpanded,
    onNavBarClose,
    socialMedias,
    openBlank,
    oAuthToken,
    responseGoogle,
    errorGoogle,
    ls,
    appData
  } = props;

  const isGoogleLogged =
    ls &&
    ls.profileObj &&
    ls.profileObj.googleId &&
    ls.profileObj.googleId === appData.google_id;
  let googleMenu = isGoogleLogged
    ? menus
    : menus.filter(menu => menu.showOnlyIfSuperUser === false);
  googleMenu = googleMenu.sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <div className="mobile-menu">
      <Navbar
        fixed={"top"}
        bg="dark"
        onToggle={onNavBarToggle}
        expanded={navBarExpanded}
        expand="lg"
      >
        <Navbar.Brand className="navbar-brand">
          <Link onClick={onNavBarClose} to={"/"}>
            <img
              className="mobLogoImg "
              src={`${aws.baseUrl}/avatar/bniGreyCoat.jpg`}
              alt=""
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          bsPrefix="navbar-toggle"
        >
          <i className="fa fa-bars" />
        </Navbar.Toggle>
        <Navbar.Collapse style={{ marginTop: "80px" }} id="basic-navbar-nav">
          <ul
            className={`mobile-menu-social text-center ${
              navBarExpanded ? "slidedown" : "slideup"
            }`}
          >
            {socialMedias.map((media, i) => (
              <li key={i}>
                <Link to="" onClick={() => openBlank(media.href)}>
                  <i className={media.icon}></i>
                </Link>
              </li>
            ))}
            <li className="google-mobile">
              <GoogleLogin
                clientId={oAuthToken}
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={errorGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </li>
          </ul>
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
                  onClick={onNavBarToggle}
                  to={menu.href}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
            {/* {menus
              .filter(menu => !menu.showOnlyIfSuperUser)
              .map((menu, i) => (
                <li key={i} className="child-menu">
                  <Link onClick={onNavBarToggle} to={menu.href}>
                    {menu.label}
                  </Link>
                </li>
              ))} */}
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

MobileApp.propTypes = {
  property: PropTypes.string
};
MobileApp.defaultProps = {
  property: "String name"
};

export default MobileApp;
