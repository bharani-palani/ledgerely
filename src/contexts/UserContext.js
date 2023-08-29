import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiInstance from "../services/apiServices";
import "react-toastify/dist/ReactToastify.css";
import AccountPlanner from "../components/accountPlanner/AccountPlanner";
import Settings from "../components/configuration/settings";
import Home from "../components/Home/Home";

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  const defUserData = {
    type: "public",
    theme: "light",
    audioShown: false,
    videoShown: false,
    appId: null,
    email: null,
    imageUrl: null,
    name: null,
    source: null,
    userId: null,
    menu: [],
  };
  const defUserConfig = {
    webMenuType: "topMenu",
  };
  const [userData, setUserData] = useState(defUserData);
  const [openAppLoginModal, setOpenAppLoginModal] = useState(false);
  const [dropDownShown, setdropDown] = useState(false);
  const [userConfig, setUserConfig] = useState(defUserConfig);

  // note: to set default on page load ls is required
  const [ls] = useState(JSON.parse(localStorage.getItem("userData")) || {});

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
    addUserData(ls);
    updateUserData("type", ls.type || defUserData.type);
  }, []);

  useEffect(() => {
    if (userData?.userId) {
      getUserConfig(userData?.appId);
    }
  }, [userData.userId, userData.appId]);

  useEffect(() => {
    if (userData.type) {
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
      const bMenu = list.filter(f => f.hasAccessTo.includes(userData.type));
      updateUserData("menu", bMenu);
    }
  }, [userData]);

  const getUserConfig = async appId => {
    const formdata = new FormData();
    formdata.append("appId", appId);
    await apiInstance
      .post("/getUserConfig", formdata)
      .then(response => {
        const data = response.data.response[0];
        setUserConfig(data);
        setUserData({
          ...userData,
          theme: data.webTheme,
          type: ls?.type || defUserData.type,
        });
      })
      .catch(error => false)
      .finally(() => false);
  };

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
        defUserData,
        userData,
        addUserData,
        updateUserData,
        removeUserData,
        renderToast,
        openAppLoginModal,
        setOpenAppLoginModal,
        dropDownShown,
        setdropDown,
        defUserConfig,
        userConfig,
        setUserConfig,
        updateBulkUserData,
      }}
    >
      <ToastContainer className='bniToaster' />
      {Object.keys(userData).length > 0 && props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
