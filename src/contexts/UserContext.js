import React, { createContext, useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import AppContext from "./AppContext";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  const [appData] = useContext(AppContext);
  const [userData, setUserData] = useState({});
  const [openAppLoginModal, setOpenAppLoginModal] = useState(false); // change to false
  const [dropDownShown, setdropDown] = useState(false);

  // note: to set default on page load ls is required
  const ls = JSON.parse(localStorage.getItem("userData")) || {};

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
    updateUserData("theme", "");
  }, []);

  useEffect(() => {
    updateUserData("theme", appData.webTheme);
    updateUserData("type", !ls.type ? "public" : ls.type);
  }, [appData]);

  useEffect(() => {
    console.log("bbb", userData);
  }, [userData]);

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
      }}
    >
      <ToastContainer className='bniToaster' />
      {Object.keys(userData).length > 0 && props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
