import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  const [userData, setUserData] = useState(props.userData);

  const updateUserData = response => {
    setUserData({ ...response });
  };
  const removeUserData = () => {
    setUserData({});
  };

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
