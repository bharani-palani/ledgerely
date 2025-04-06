import React, { useState, useContext } from "react";
import Wrapper from "../wrapper/wrapper";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import { UserContext } from "../../contexts/UserContext";
import MyAlertProvider from "../../contexts/AlertContext";
import AppExpiry from "../Timers/AppExpiry";
import GlobalHeader from "../GlobalHeader";
import { useIdleTimer } from "react-idle-timer";
import IdleReminder from "../Timers/IdleReminder";

function MainApp() {
  const userContext = useContext(UserContext);
  const [navBarExpanded, setNavBarExpanded] = useState(false);
  const [state, setState] = useState("Active");
  const timeout = 1000 * 60 * 60;

  const onIdle = () => {
    setState("idle");
  };

  useIdleTimer({
    crossTab: true,
    disabled: userContext?.userData?.userId === null ? true : false,
    onIdle,
    timeout,
    throttle: 500,
    eventsThrottle: 1000,
  });

  const onNavBarToggle = () => {
    setNavBarExpanded(!navBarExpanded);
  };

  const onNavBarClose = () => {
    setNavBarExpanded(false);
  };

  return (
    <GlobalHeader>
      {userContext?.userData?.userId && state === "idle" && (
        <IdleReminder
          className=''
          show={true}
          onHide={() => false}
          size='md'
          animation={true}
          keyboard={false}
          backdrop='static'
          centered
          onStayLoggedIn={stat => setState(stat)}
        />
      )}
      <div
        className={`${userContext?.userData.userId ? "application-wrapper" : ""} ${
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
            className={`wrapper ${userContext?.userData?.userId ? userContext?.userConfig?.webMenuType : ""} ${
              userContext.userData.theme === "dark"
                ? "bg-dark text-white"
                : "bg-white text-dark"
            } p-0 ${
              ["sideMenuRight", "sideMenuLeft"].includes(
                userContext?.userConfig?.webMenuType,
              )
                ? "col-sm-10"
                : "col-sm-12"
            }`}
          >
            <MyAlertProvider>
              <AppExpiry />
              <Wrapper />
            </MyAlertProvider>
          </div>
        </div>
        <div className='' />
      </div>
    </GlobalHeader>
  );
}

export default MainApp;
