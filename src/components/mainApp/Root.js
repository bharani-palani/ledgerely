import React from "react";
import MainApp from "../mainApp/MainApp";
import UserContextProvider from "../../contexts/UserContext";
import LocaleContextProvider from "../../contexts/LocaleContext";
import GlobalContextProvider from "../../contexts/GlobalContext";

function Root(props) {
  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <LocaleContextProvider>
          <MainApp />
        </LocaleContextProvider>
      </UserContextProvider>
    </GlobalContextProvider>
  );
}

export default Root;
