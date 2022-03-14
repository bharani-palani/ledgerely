import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  const {config} = props;
  const [userData, setUserData] = useState({});

  const addUserData = response => {
    setUserData({ ...response, ...userData });
  };

  const updateUserData = (key, object) => {
    setUserData(prev => ({...prev, [key]: object}));
  };

  const removeUserData = () => {
    setUserData({});
  };

  useEffect(() => {
    addUserData(JSON.parse(localStorage.getItem("googleData")));
    updateUserData("theme", "");
  },[])

  useEffect(() => {
    updateUserData("theme", config.webTheme);
  },[config])

  const renderToast = ({ autoClose=5000, type="success", icon="fa fa-check-circle", message }) =>
    toast[type](
      (<div>
        <span>
          <i className={icon}></i> <span dangerouslySetInnerHTML={{__html: message}} />
        </span>
      </div>),{
        autoClose
      }
    );

  return (
    <UserContext.Provider
      value={{
        userData,
        addUserData,
        updateUserData,
        removeUserData,
        renderToast
      }}
    >
      <ToastContainer className="" />
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
