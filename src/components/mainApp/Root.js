import React, { useState } from "react";
import MainApp from "../mainApp/MainApp";
import UserContextProvider from "../../contexts/UserContext";
import GlobalHeader from "../GlobalHeader";
import LocaleContextProvider from "../../contexts/LocaleContext";
import GlobalContextProvider from "../../contexts/GlobalContext";

function Root(props) {
  const [, setLogger] = useState(
    JSON.parse(localStorage.getItem("userData")) || {},
  );

  return (
    <GlobalContextProvider>
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
    </GlobalContextProvider>
  );
}

export default Root;
