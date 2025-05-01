import React, { useState, createContext, useEffect } from "react";
import useAxios from "../services/apiServices";
export const GlobalContext = createContext([{}, () => {}]);

const GlobalContextProvider = props => {
  const { apiInstance, setToken, token } = useAxios();
  const fetchToken = () => {
    const formdata = new FormData();
    const userData = JSON.parse(localStorage.getItem("userData"));
    formdata.append("username", userData ? userData?.name : null);
    return apiInstance.post("/getTokens", formdata);
  };
  const [globalSettings, setGlobalSettings] = useState({});

  useEffect(() => {
    fetchToken().then(async res => {
      const token = res.data.response;
      setToken(token);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(token).length > 0) {
      console.log("bbb", token);
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
    }
  }, [token]);

  return (
    Object.keys(globalSettings).length > 0 && (
      <GlobalContext.Provider value={{ ...globalSettings }}>
        {props.children}
      </GlobalContext.Provider>
    )
  );
};
export default GlobalContextProvider;
