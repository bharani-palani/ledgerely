import React, { useState, createContext, useEffect } from "react";
import useAxios, { requestTokens, useToken } from "../services/apiServices";
export const GlobalContext = createContext([{}, () => {}]);

const GlobalContextProvider = props => {
  const { apiInstance, setToken } = useAxios();
  const token = useToken();
  const fetchToken = requestTokens;
  const [globalSettings, setGlobalSettings] = useState({});

  useEffect(() => {
    fetchToken()
      .then(async res => {
        const token = res.data.response;
        setToken(token);
      })
      .catch(() => {
        setToken(null);
      });
  }, []);

  useEffect(() => {
    if (token && Object.keys(token).length > 0) {
      apiInstance
        .get("/")
        .then(res => {
          const data = res.data.response;
          setGlobalSettings(data);
        })
        .catch(error => console.error(error))
        .finally(() => false);
    }
  }, [token]);

  return <GlobalContext.Provider value={{ ...globalSettings }}>{props.children}</GlobalContext.Provider>;
};
export default GlobalContextProvider;
