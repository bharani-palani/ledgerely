import React, { useState, createContext, useEffect } from "react";
import apiInstance from "../services/apiServices";
export const GlobalContext = createContext([{}, () => {}]);

export const fetchToken = () => {
  const formdata = new FormData();
  const userData = JSON.parse(localStorage.getItem("userData"));
  formdata.append("username", userData ? userData.name : null);
  return apiInstance.post("/getToken", formdata);
};

const GlobalContextProvider = props => {
  const [globalSettings, setGlobalSettings] = useState({});

  useEffect(() => {
    fetchToken().then(res => {
      const token = res.data.response;
      localStorage.setItem("ledgerely-token", token);
      apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
    });
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
