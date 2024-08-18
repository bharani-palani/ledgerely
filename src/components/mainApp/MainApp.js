import React, { useState, useContext } from "react";
import {} from "react-router-dom";
import Wrapper from "../wrapper/wrapper";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import { UserContext } from "../../contexts/UserContext";
import MyAlertProvider from "../../contexts/AlertContext";
import AppExpiry from "../Timers/AppExpiry";
import GlobalHeader from "../GlobalHeader";

function MainApp(props) {
  const userContext = useContext(UserContext);
  const [navBarExpanded, setNavBarExpanded] = useState(false);

  const onNavBarToggle = () => {
    setNavBarExpanded(!navBarExpanded);
  };

  const onNavBarClose = () => {
    setNavBarExpanded(false);
  };

  return (
    <React.Fragment>
      <GlobalHeader>
        <div
          className={`application-wrapper ${
            userContext?.userConfig?.webLayoutType
          } ${userContext.userData.theme === "dark" ? "bg-dark" : "bg-white"}`}
        >
          <div className='' />
          <div
            className={`application-content ${userContext?.userConfig?.webMenuType}`}
          >
            {userContext?.userData?.userId && (
              <div
                className={`menu-wrapper d-print-none p-0 ${
                  ["sideMenuRight", "sideMenuLeft"].includes(
                    userContext?.userConfig?.webMenuType,
                  )
                    ? "col-sm-2"
                    : ""
                }`}
              >
                <div className='fixed-content'>
                  <DesktopApp />
                </div>
                <MobileApp
                  onNavBarToggle={onNavBarToggle}
                  navBarExpanded={navBarExpanded}
                  onNavBarClose={onNavBarClose}
                />
              </div>
            )}
            <div
              style={{
                opacity: userContext.userData.videoShown ? 0.9 : 1,
              }}
              className={`wrapper ${userContext.userConfig?.webLayoutType} ${
                userContext.userData.theme === "dark"
                  ? "bg-dark text-white"
                  : "bg-white text-dark"
              } p-0 ${userContext?.userConfig?.webMenuType} ${
                ["sideMenuRight", "sideMenuLeft"].includes(
                  userContext?.userConfig?.webMenuType,
                )
                  ? "col-sm-10"
                  : "col-sm-12"
              }`}
            >
              {/* {userContext.userData.menu.length > 0 && ( */}
              <MyAlertProvider>
                <AppExpiry />
                <Wrapper />
              </MyAlertProvider>
              {/* )} */}
            </div>
          </div>
          <div className='' />
        </div>
      </GlobalHeader>
    </React.Fragment>
  );
}

export default MainApp;
