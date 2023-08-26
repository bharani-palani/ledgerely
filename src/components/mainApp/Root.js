import React, { useState, useEffect } from "react";
import MainApp from "../mainApp/MainApp";
import AppContext from "../../contexts/AppContext";
import UserContextProvider from "../../contexts/UserContext";
import apiInstance from "../../services/apiServices";
import GlobalHeader from "../GlobalHeader";
import LocaleContextProvider from "../../contexts/LocaleContext";
import GlobalContextProvider from "../../contexts/GlobalContext";
import { FactoryMap } from "../configuration/Gallery/FactoryMap";
import { getServiceProvider } from "../configuration/Gallery/SignedUrl";

function Root(props) {
  const [master, setMaster] = useState({});
  const [, setLogger] = useState(
    JSON.parse(localStorage.getItem("userData")) || {},
  );

  const getData = async () => {
    const formdata = new FormData();
    formdata.append("configId", 100000);
    await apiInstance
      .post("/getUserConfig", formdata)
      .then(response => {
        const data = response.data.response[0];
        setMaster(data);
        favIconSetter(data);
        document.documentElement.style.setProperty(
          "--app-theme-color",
          data.webThemeColor,
        );
        document.documentElement.style.setProperty(
          "--app-theme-bg-color",
          data.webThemeBackground,
        );
      })
      .catch(error => false)
      .finally(error => false);
  };

  const favIconSetter = data => {
    const ele = document.querySelector("#favIcon");
    const sp = getServiceProvider(data.favIconImg);
    FactoryMap(sp, data)
      .library.getSignedUrl(data.favIconImg)
      .then(data => {
        ele.href = data.url || "";
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <GlobalContextProvider>
      <AppContext.Provider value={[master, setMaster]}>
        <UserContextProvider>
          <LocaleContextProvider>
            <GlobalHeader
              onLogAction={b => {
                setLogger(b);
              }}
            >
              <MainApp />
            </GlobalHeader>
          </LocaleContextProvider>
        </UserContextProvider>
      </AppContext.Provider>
    </GlobalContextProvider>
  );
}

export default Root;
