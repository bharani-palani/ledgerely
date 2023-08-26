import React, { useState, createContext, useEffect } from "react";
import apiInstance from "../services/apiServices";

export const GlobalContext = createContext([{}, () => {}]);

const GlobalContextProvider = props => {
  const [globalSettings, setGlobalSettings] = useState({});

  useEffect(() => {
    apiInstance
      .get("/")
      .then(res => {
        setGlobalSettings(res.data.response[0]);
      })
      .catch(error => console.error(error))
      .finally(error => false);
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
