import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiInstance from "../services/apiServices";

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  const defUserData = {
    type: "public",
    theme: "",
    audioShown: false,
    videoShown: false,
    email: null,
    imageUrl: null,
    name: null,
    source: "self",
    userId: null,
    menu: [],
  };
  const defUserConfig = {
    webMenuType: "topMenu",
  };

  // note: to set default on page load ls is required
  const lsUserData =
    JSON.parse(localStorage.getItem("userData")) || defUserData;
  const lsUserConfig =
    JSON.parse(localStorage.getItem("userConfig")) || defUserConfig;

  const [userData, setUserData] = useState(lsUserData);
  const [userConfig, setUserConfig] = useState(lsUserConfig);
  const [openAppLoginModal, setOpenAppLoginModal] = useState(true);
  const [appExpired, setAppExpired] = useState(false);

  const linklist = [
    {
      page_id: "home",
      hasAccessTo: ["public"],
      href: "/",
      isLinkActiveOnExpiry: false,
    },
    {
      page_id: "dashboard",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/dashboard",
      isLinkActiveOnExpiry: true,
    },
    {
      page_id: "category",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/category",
      isLinkActiveOnExpiry: true,
    },
    {
      page_id: "bank",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/bank",
      isLinkActiveOnExpiry: true,
    },
    {
      page_id: "creditCard",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/creditCard",
      isLinkActiveOnExpiry: true,
    },
    {
      page_id: "schedules",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/schedules",
      isLinkActiveOnExpiry: true,
    },
    {
      page_id: "moneyPlanner",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/moneyPlanner",
      isLinkActiveOnExpiry: true,
    },
    {
      page_id: "workbook",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/workbook",
      isLinkActiveOnExpiry: true,
    },
    {
      page_id: "billing",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/billing",
      isLinkActiveOnExpiry: false,
    },
    {
      page_id: "settings",
      hasAccessTo: ["superAdmin"],
      href: "/settings",
      isLinkActiveOnExpiry: true,
    },
    // {
    //   ...(userConfig.isOwner === "1" && {
    //     page_id: "internationalization",
    //     hasAccessTo: ["superAdmin"],
    //     href: "/internationalization",
    //     isLinkActiveOnExpiry: false,
    //   }),
    // },
    // {
    //   ...(userConfig.isOwner === "1" && {
    //     page_id: "fileStorage",
    //     hasAccessTo: ["superAdmin"],
    //     href: "/fileStorage",
    //     isLinkActiveOnExpiry: false,
    //   }),
    // },
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
    setUserData(() => ({ ...copiedUserData }));
  };

  useEffect(() => {
    if (userData?.type) {
      getMenus(userData?.type, appExpired).then(data => {
        updateUserData("menu", data);
      });
    }
  }, [userData.type, appExpired]);

  const getMenus = (type, isExpired) => {
    return new Promise(resolve => {
      const backUp = [...linklist];
      const bMenu = backUp
        .filter(f => f?.hasAccessTo?.includes(type))
        .filter(f =>
          isExpired
            ? [false].includes(f.isLinkActiveOnExpiry)
            : [true, false].includes(f.isLinkActiveOnExpiry),
        );
      setTimeout(() => resolve(bMenu), []);
    });
  };

  // useEffect(() => {
  //   console.log("bbb", userData.menu);
  // }, [userData.menu]);

  useEffect(() => {
    if (userConfig.appId) {
      getUserConfig(userConfig.appId)
        .then(res => {
          const {
            data: { response },
          } = res;
          const save = {
            theme: response[0].webTheme,
            audioShown: response[0].bgSongDefaultPlay === "1",
            videoShown: response[0].bgVideoDefaultPlay === "1",
          };
          setUserData(prev => ({ ...prev, ...save }));
          setUserConfig(prev => ({ ...prev, ...response[0] }));
        })
        .catch(() => console.error("Unable to fetch user config"));
    }
  }, [userConfig.appId]);

  useEffect(() => {
    if (userConfig?.webTheme) {
      setTimeout(() => {
        updateBulkUserData({ theme: userConfig.webTheme });
      }, 100);
    }
  }, [userConfig]);

  const getUserConfig = async appId => {
    const formdata = new FormData();
    formdata.append("appId", appId);
    return await apiInstance.post("/getUserConfig", formdata);
  };

  const renderToast = ({
    autoClose = 5000,
    type = "success",
    position = "top-right",
    message,
    theme = "colored",
    hideProgressBar = false,
    closeOnClick = false,
    pauseOnHover = true,
    draggable = true,
  }) => {
    return toast[type](message, {
      autoClose,
      position,
      theme,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
    });
  };

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
        userConfig,
        setUserConfig,
        updateBulkUserData,
        defUserData,
        defUserConfig,
        getUserConfig,
        appExpired,
        setAppExpired,
        getMenus,
      }}
    >
      <ToastContainer className='bniToaster' />
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
