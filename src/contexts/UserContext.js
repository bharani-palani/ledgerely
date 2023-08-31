import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountPlanner from "../components/accountPlanner/AccountPlanner";
import Settings from "../components/configuration/settings";
import Home from "../components/Home/Home";

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  // note: to set default on page load ls is required
  const lsUserData = JSON.parse(localStorage.getItem("userData")) || {};
  const lsUserConfig = JSON.parse(localStorage.getItem("userConfig")) || {};

  const [userData, setUserData] = useState(lsUserData);
  const [userConfig, setUserConfig] = useState(lsUserConfig);
  const [openAppLoginModal, setOpenAppLoginModal] = useState(false);
  const [dropDownShown, setdropDown] = useState(false);
  const linklist = [
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

  const addUserData = response => {
    setUserData(response);
  };

  const updateBulkUserData = response => {
    setUserData({ ...userData, ...response });
  };

  const updateUserData = (key, object) => {
    setUserData(prev => ({ ...prev, [key]: object }));
  };

  const removeUserData = keyArray => {
    const copiedUserData = { ...userData };
    keyArray.forEach(key => {
      delete copiedUserData[key];
    });
    setUserData(userData => ({ ...copiedUserData }));
  };

  useEffect(() => {
    if (userData.type) {
      const bMenu = linklist.filter(f => f.hasAccessTo.includes(userData.type));
      updateUserData("menu", bMenu);
    }
  }, [JSON.stringify(userData)]);

  const renderToast = ({
    autoClose = 5000,
    type = "success",
    icon = "fa fa-check-circle",
    message,
  }) =>
    toast[type](
      <div>
        <span>
          <i className={icon} />{" "}
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </span>
      </div>,
      {
        autoClose,
      },
    );

  return (
    <UserContext.Provider
      value={{
        linklist,
        userData,
        addUserData,
        updateUserData,
        removeUserData,
        renderToast,
        openAppLoginModal,
        setOpenAppLoginModal,
        dropDownShown,
        setdropDown,
        userConfig,
        setUserConfig,
        updateBulkUserData,
      }}
    >
      <ToastContainer className='bniToaster' />
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
