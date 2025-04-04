import React, { useState, createContext, useEffect } from "react";
import apiInstance from "../services/apiServices";
export const GlobalContext = createContext([{}, () => {}]);

const GlobalContextProvider = props => {
  const [globalSettings, setGlobalSettings] = useState({});

  useEffect(() => {
    apiInstance
      .get("/")
      .then(res => {
        const data = res.data.response[0];
        document.documentElement.style.setProperty(
          "--app-theme-color",
          data.webThemeColor,
        );
        document.documentElement.style.setProperty(
          "--app-theme-bg-color",
          data.webThemeBackground,
        );
        setGlobalSettings(data);
      })
      .catch(error => console.error(error))
      .finally(() => false);
  }, []);

  return (
    Object.keys(globalSettings).length > 0 && (
      <GlobalContext.Provider value={{ ...globalSettings }}>
        {props.children}
      </GlobalContext.Provider>
    )
  );
};
export default GlobalContextProvider;
