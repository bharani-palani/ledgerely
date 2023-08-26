import React, { useState, createContext, useEffect } from "react";
import apiInstance from "../services/apiServices";
import { FactoryMap } from "../components/configuration/Gallery/FactoryMap";
import { getServiceProvider } from "../components/configuration/Gallery/SignedUrl";

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
        favIconSetter(data);
      })
      .catch(error => console.error(error))
      .finally(error => false);
  }, []);

  const favIconSetter = data => {
    const ele = document.querySelector("#favIcon");
    const sp = getServiceProvider(data.favIconImg);
    FactoryMap(sp, data)
      .library.getSignedUrl(data.favIconImg)
      .then(data => {
        ele.href = data.url || "";
      });
  };

  return (
    Object.keys(globalSettings).length > 0 && (
      <GlobalContext.Provider value={{ ...globalSettings }}>
        {props.children}
      </GlobalContext.Provider>
    )
  );
};
export default GlobalContextProvider;
