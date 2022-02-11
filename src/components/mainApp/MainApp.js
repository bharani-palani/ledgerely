import React, { useState, useEffect, useContext } from "react";
import { Router } from "react-router-dom";
import Wrapper from "../wrapper/wrapper";
import BackendUpdate from "../configuration/backendUpdate";
import LoginUser from "./loginUser/loginUser";
import { UserContext } from "../../contexts/UserContext";
import { menus, socialMedias } from "../../mockData/menuData";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import history from "../../history";
import "./MainApp.scss";

function MainApp(props) {
  const appData = props.appData;
  const [navBarExpanded, setNavBarExpanded] = useState(false);
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const userContext = useContext(UserContext);
  const [ls, setLs] = useState(
    JSON.parse(localStorage.getItem("googleData")) || {}
  );

  useEffect(() => {
    if (Object.keys(appData).length > 0) {
      window.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.keyCode === 66) {
          setOpenModal(true);
        }
      });
      if (Object.keys(ls).length > 0) {
        localStorage.setItem("googleData", JSON.stringify(ls));
      }
    }
  }, [appData, ls]);

  const onNavBarToggle = () => {
    setNavBarExpanded(!navBarExpanded);
  };

  const onNavBarClose = () => {
    setNavBarExpanded(false);
  };

  const openBlank = url => {
    var win = window.open(url, "_blank");
    win.focus();
  };

  
  const responseGoogle = response => {
    setLs(response);
    userContext.updateUserData(response);
    onNavBarToggle(false);
    history.push("/write");
  };
  const errorGoogle = () => {
    onNavBarToggle(false);
    userContext.renderToast({
      type: "error",
      icon: "fa fa-times-circle",
      message: "Unable to fetch from Google API"
    });
  };
  const onLogout = () => {
    setLs({});
    userContext.removeUserData();
    localStorage.removeItem("googleData");
    history.push("/");
  };
  return (
    <>
      {Object.keys(appData).length > 0 && (
        <Router history={history}>
          <div className="application-wrapper">
            <div className="overlay" />
            <div>
            <div className="menu-wrapper">
              {openModal && (
                <BackendUpdate
                  show={openModal}
                  onHide={bool => setOpenModal(bool)}
                  size="sm"
                  animation={false}
                  style={{ zIndex: 9999 }}
                />
              )}
              <MobileApp
                menus={menus}
                onNavBarToggle={onNavBarToggle}
                navBarExpanded={navBarExpanded}
                onNavBarClose={onNavBarClose}
                socialMedias={socialMedias}
                oAuthToken={appData.google_login_auth_token}
                responseGoogle={responseGoogle}
                errorGoogle={errorGoogle}
                ls={ls}
                openBlank={openBlank}
                appData={appData}
              />
              <DesktopApp
                menus={menus}
                ls={ls}
                socialMedias={socialMedias}
                oAuthToken={appData.google_login_auth_token}
                responseGoogle={responseGoogle}
                errorGoogle={errorGoogle}
                openBlank={openBlank}
                setToggleSideBar={setToggleSideBar}
                toggleSideBar={toggleSideBar}
                appData={appData}
              />
            </div>
            <div
              className={`wrapper ${toggleSideBar ? "toggleOn" : "toggleOff"}`}
            >
              {ls &&
                ls.profileObj &&
                ls.profileObj.name &&
                ls.profileObj.imageUrl && (
                  <LoginUser
                    userData={ls}
                    toggleSideBar={toggleSideBar}
                    onLogout={onLogout}
                  />
                )}
              <Wrapper />
              </div>
            </div>
            <div className="overlay" />
          </div>
        </Router>
      )}
    </>
  );
}

export default MainApp;
