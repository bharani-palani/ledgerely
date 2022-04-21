import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext([{}, () => {}]);

function UserContextProvider(props) {
  const { config } = props;
  const [userData, setUserData] = useState({});
  // note: to set default on page load ls is required
  const ls = JSON.parse(localStorage.getItem('userData')) || {};

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
    addUserData(JSON.parse(localStorage.getItem('userData')));
    updateUserData('theme', '');
  }, []);

  useEffect(() => {
    updateUserData('theme', config.webTheme);
    updateUserData('type', !ls.type ? 'public' : ls.type);
  }, [config]);

  const renderToast = ({
    autoClose = 5000,
    type = 'success',
    icon = 'fa fa-check-circle',
    message,
  }) =>
    toast[type](
      <div>
        <span>
          <i className={icon} />{' '}
          <span dangerouslySetInnerHTML={{ __html: message }} />
        </span>
      </div>,
      {
        autoClose,
      }
    );

  return (
    <UserContext.Provider
      value={{
        userData,
        addUserData,
        updateUserData,
        removeUserData,
        renderToast,
      }}
    >
      <ToastContainer className="bniToaster" />
      {Object.keys(userData).length > 0 && props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
