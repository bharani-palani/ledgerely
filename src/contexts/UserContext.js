import React, { createContext, useEffect, useState, lazy } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiInstance from "../services/apiServices";

const AccountPlanner = lazy(
  () => import("../components/accountPlanner/AccountPlanner"),
);
const Settings = lazy(() => import("../components/configuration/settings"));
// const Intl18 = lazy(() => import("../components/configuration/Intl18"));
// const FileStorage = lazy(() => import("../components/fileStorage/FileStorage"));
const Payment = lazy(() => import("../components/payment/Billing"));
const Workbook = lazy(() => import("../components/workbook/wokbookIndex"));
const Home = lazy(() => import("../components/Home/Home"));
const Dashboard = lazy(() => import("../components/Home/Dashboard/index"));
const Categories = lazy(() => import("../components/categories/categoryIndex"));
const Bank = lazy(() => import("../components/bank/bankIndex"));
const CreditCard = lazy(
  () => import("../components/creditCard/creditCardIndex"),
);
const CreateModule = lazy(
  () => import("../components/accountPlanner/CreateModule"),
);

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
      label: "Home",
      component: <Home />,
    },
    {
      ...(!appExpired && {
        page_id: "dashboard",
        hasAccessTo: ["admin", "superAdmin"],
        href: "/dashboard",
        label: "Dashboard",
        component: <Dashboard />,
      }),
    },
    {
      ...(!appExpired && {
        page_id: "category",
        hasAccessTo: ["admin", "superAdmin"],
        href: "/category",
        label: "category",
        component: <Categories />,
      }),
    },
    {
      ...(!appExpired && {
        page_id: "bank",
        hasAccessTo: ["admin", "superAdmin"],
        href: "/bank",
        label: "bank",
        component: <Bank />,
      }),
    },
    {
      ...(!appExpired && {
        page_id: "creditCard",
        hasAccessTo: ["admin", "superAdmin"],
        href: "/creditCard",
        label: "creditCard",
        component: <CreditCard />,
      }),
    },
    {
      ...(!appExpired && {
        page_id: "schedules",
        hasAccessTo: ["admin", "superAdmin"],
        href: "/schedules",
        label: "schedules",
        component: <CreateModule />,
      }),
    },
    {
      ...(!appExpired && {
        page_id: "moneyPlanner",
        hasAccessTo: ["admin", "superAdmin"],
        href: "/moneyPlanner",
        label: "Money Planner",
        component: <AccountPlanner />,
      }),
    },
    {
      ...(!appExpired && {
        page_id: "workbook",
        hasAccessTo: ["admin", "superAdmin"],
        href: "/workbook",
        label: "Workbook",
        component: <Workbook />,
      }),
    },
    {
      page_id: "billing",
      hasAccessTo: ["admin", "superAdmin"],
      href: "/billing",
      label: "billing",
      component: <Payment />,
    },
    {
      ...(!appExpired && {
        page_id: "settings",
        hasAccessTo: ["superAdmin"],
        href: "/settings",
        label: "Settings",
        component: <Settings />,
      }),
    },
    // {
    //   ...(userConfig.isOwner === "1" && {
    //     page_id: "internationalization",
    //     hasAccessTo: ["superAdmin"],
    //     href: "/internationalization",
    //     label: "internationalization",
    //     component: Intl18,
    //   }),
    // },
    // {
    //   ...(userConfig.isOwner === "1" && {
    //     page_id: "fileStorage",
    //     hasAccessTo: ["superAdmin"],
    //     href: "/fileStorage",
    //     label: "fileStorage",
    //     component: FileStorage,
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
    setUserData(userData => ({ ...copiedUserData }));
  };

  useEffect(() => {
    if (userData?.type) {
      getMenus(userData?.type).then(data => updateUserData("menu", data));
    }
  }, [userData.type, appExpired]);

  const getMenus = type => {
    return new Promise(resolve => {
      const bMenu = [...linklist].filter(
        f => f?.hasAccessTo?.includes(type) && Object.keys(f).length > 0,
      );
      resolve(bMenu);
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
        .catch(err => console.error("Unable to fetch user config"));
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
      }}
    >
      <ToastContainer className='bniToaster' />
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
