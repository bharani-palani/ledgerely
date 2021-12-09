import React from "react";
import PropTypes from "prop-types";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./loginUser.scss";

const LoginUser = props => {
  const { userData, toggleSideBar, onLogout } = props;
  /*
    Bounce types vailable @
    https://github.com/animate-css/animate.css/tree/a8d92e585b1b302f7749809c3308d5e381f9cb17
  */
  const animateType = "bounceInUp";

  const renderTooltip = props => (
    <Tooltip id="button-tooltip" className="in show" {...props}>
      Logout
    </Tooltip>
  );

  return (
    <div
      className={`userContainer hidden-print animate__animated animate__${animateType} ${
        toggleSideBar ? "toggleOn" : "toggleOff"
      }`}
    >
      <div className={`leftMenu pl-5`}>
        <img
          className="userImage"
          alt="userImage"
          src={userData.profileObj.imageUrl}
        />
        <span className="welcomeText pl-5">
          Welcome {userData.profileObj.name}..
        </span>
      </div>
      <div className="rightMenu text-right pr-10">
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
          triggerType="hover"
        >
            <i
              onClick={onLogout}
              className="fa fa-sign-out roundedButton"
            />
        </OverlayTrigger>
      </div>
    </div>
  );
};

LoginUser.propTypes = {
  toggleSideBar: PropTypes.bool,
  userData: PropTypes.object
};
LoginUser.defaultProps = {};

export default LoginUser;
