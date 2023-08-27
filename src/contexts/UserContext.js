import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiInstance from "../services/apiServices";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  const defUserData = {
    theme: "light",
    audioShown: false,
    videoShown: false,
  };
  const [userData, setUserData] = useState(defUserData);
  const [openAppLoginModal, setOpenAppLoginModal] = useState(false);
  const [dropDownShown, setdropDown] = useState(false);
  const [userConfig, setUserConfig] = useState({});

  // note: to set default on page load ls is required
  const [ls] = useState(JSON.parse(localStorage.getItem("userData")) || {});

  const addUserData = response => {
    setUserData({ ...response, ...userData });
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
    addUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  useEffect(() => {
    updateUserData("type", !ls.type ? "public" : ls.type);
  }, [ls]);

  useEffect(() => {
    if (userData?.userId) {
      getUserConfig(userData?.appId);
    }
  }, [userData.userId, userData.appId]);

  const getUserConfig = async appId => {
    const formdata = new FormData();
    formdata.append("appId", appId);
    await apiInstance
      .post("/getUserConfig", formdata)
      .then(response => {
        const data = response.data.response[0];
        setUserConfig(data);
        setUserData({ ...userData, theme: data.webTheme });
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
      }}
    >
      <ToastContainer className='bniToaster' />
      {Object.keys(userData).length > 0 && props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
