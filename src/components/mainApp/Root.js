import React from "react";
import MainApp from "../mainApp/MainApp";
import UserContextProvider from "../../contexts/UserContext";
import GlobalHeader from "../GlobalHeader";
import LocaleContextProvider from "../../contexts/LocaleContext";
import GlobalContextProvider from "../../contexts/GlobalContext";

function Root(props) {
  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <LocaleContextProvider>
          <GlobalHeader>
            <MainApp />
          </GlobalHeader>
        </LocaleContextProvider>
      </UserContextProvider>
    </GlobalContextProvider>
  );
}

export default Root;
