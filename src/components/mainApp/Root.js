import React, { useState, useEffect } from "react";
import MainApp from "../mainApp/MainApp";
import AppContext from "../../contexts/AppContext";
import UserContextProvider from "../../contexts/UserContext";
import apiInstance from "../../services/apiServices";
import GlobalHeader from "../GlobalHeader";
import LocaleContextProvider from "../../contexts/LocaleContext";
import GlobalContextProvider from "../../contexts/GlobalContext";

function Root(props) {
  const [master, setMaster] = useState({});
  const [, setLogger] = useState(
    JSON.parse(localStorage.getItem("userData")) || {},
  );

  const getData = async () => {
    const formdata = new FormData();
    formdata.append("appId", 100000);
    await apiInstance
      .post("/getUserConfig", formdata)
      .then(response => {
        const data = response.data.response[0];
        setMaster(data);
      })
      .catch(error => false)
      .finally(error => false);
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
