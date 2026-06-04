import React from "react";
import MainApp from "../mainApp/MainApp";
import UserContextProvider from "../../contexts/UserContext";
import LocaleContextProvider from "../../contexts/LocaleContext";
import GlobalContextProvider from "../../contexts/GlobalContext";

function Root() {
  return (
    <GlobalContextProvider>
      <LocaleContextProvider>
        <UserContextProvider>
          <MainApp />
        </UserContextProvider>
      </LocaleContextProvider>
    </GlobalContextProvider>
  );
}

export default Root;
