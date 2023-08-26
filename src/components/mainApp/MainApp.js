import React, { useState, useEffect, useContext } from "react";
import { Router } from "react-router-dom";
import Wrapper from "../wrapper/wrapper";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import history from "../../history";
import AccountPlanner from "../accountPlanner/AccountPlanner";
import Settings from "../configuration/settings";
import Home from "../Home/Home";
import { UserContext } from "../../contexts/UserContext";

function MainApp(props) {
  const userContext = useContext(UserContext);
  const [navBarExpanded, setNavBarExpanded] = useState(false);

  useEffect(() => {
    if (userContext.userData.type) {
      const list = [
        {
          page_id: "dashboard",
          hasAccessTo: ["public", "admin", "superAdmin"],
          href: "/",
          label: "Dashboard",
          component: Home,
        },
        {
          page_id: "moneyPlanner",
          hasAccessTo: ["superAdmin"],
          href: "/moneyPlanner",
          label: "Money Planner",
          component: AccountPlanner,
        },
        {
          page_id: "settings",
          hasAccessTo: ["superAdmin"],
          href: "/settings",
          label: "Settings",
          component: Settings,
        },
      ];
      const bMenu = list.filter(f =>
        f.hasAccessTo.includes(userContext.userData.type),
      );
      userContext.updateUserData("menu", bMenu);
    }
  }, [userContext.userData.type]);

  const onNavBarToggle = () => {
    setNavBarExpanded(!navBarExpanded);
  };

  const onNavBarClose = () => {
    setNavBarExpanded(false);
  };

  return (
    <React.Fragment>
      {userContext.userData.menu && userContext.userData.menu.length > 0 && (
        <>
          <Router history={history}>
            <div
              className={`application-wrapper ${
                userContext.userConfig.webLayoutType
              } ${
                userContext.userData.theme === "dark" ? "bg-dark" : "bg-white"
              }`}
            >
              <div className='' />
              <div
                className={`application-content ${userContext.userConfig.webMenuType}`}
              >
                {userContext?.userData?.userId && (
                  <div
                    className={`menu-wrapper d-print-none p-0 ${
                      ["sideMenuRight", "sideMenuLeft"].includes(
                        userContext.userConfig.webMenuType,
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
                  className={`wrapper ${userContext.userConfig.webLayoutType} ${
                    userContext.userData.theme === "dark"
                      ? "bg-dark text-white"
                      : "bg-white text-dark"
                  } p-0 ${userContext.userConfig.webMenuType} ${
                    ["sideMenuRight", "sideMenuLeft"].includes(
                      userContext.userConfig.webMenuType,
                    )
                      ? "col-sm-10"
                      : "col-sm-12"
                  }`}
                >
                  <Wrapper />
                </div>
              </div>
              <div className='' />
            </div>
          </Router>
        </>
      )}
    </React.Fragment>
  );
}

export default MainApp;
