import React from "react";
import MainApp from "../mainApp/MainApp";
import UserContextProvider from "../../contexts/UserContext";
import LocaleContextProvider from "../../contexts/LocaleContext";
import GlobalContextProvider from "../../contexts/GlobalContext";
import ClientHydrationContextProvider from "../../contexts/ClientHydrationContext";

function Root() {
  return (
    <GlobalContextProvider>
      <LocaleContextProvider>
        <UserContextProvider>
          <ClientHydrationContextProvider>
            <MainApp />
          </ClientHydrationContextProvider>
        </UserContextProvider>
      </LocaleContextProvider>
    </GlobalContextProvider>
  );
}

export default Root;
