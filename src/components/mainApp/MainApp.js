import React, { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import Wrapper from "../wrapper/wrapper";
import BackendUpdate from "../configuration/backendUpdate";
import { menus } from "../../mockData/menuData";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import history from "../../history";
import "./MainApp.scss";

function MainApp(props) {
  const {logger} = props;
  const appData = props.appData;
  const [navBarExpanded, setNavBarExpanded] = useState(false);
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [ls,setLs] = useState(JSON.parse(localStorage.getItem("googleData")) || {});


  useEffect(() => {
    setLs(logger);
  },[JSON.stringify(logger)]);

  useEffect(() => {
    if (Object.keys(appData).length > 0) {
      window.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.keyCode === 66) {
          setOpenModal(true);
        }
      });
    }
  }, [appData]);

  const onNavBarToggle = () => {
    setNavBarExpanded(!navBarExpanded);
  };

  const onNavBarClose = () => {
    setNavBarExpanded(false);
  };

  return (
    <>
      {Object.keys(appData).length > 0 && (
        <Router history={history}>
          <div className={`application-wrapper ${appData.webLayoutType}`}>
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
                appData={appData}
                ls={ls}
              />
              <DesktopApp
                menus={menus}
                setToggleSideBar={setToggleSideBar}
                toggleSideBar={toggleSideBar}
                appData={appData}
                ls={ls}
              />
            </div>
            <div
              className={`wrapper ${appData.webMenuType} ${appData.webMenuType === "sideMenu" ? (toggleSideBar ? "toggleOn" : "toggleOff") : ""}`}
            >
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
