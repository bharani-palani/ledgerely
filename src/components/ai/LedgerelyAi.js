import React, { lazy, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import LedgerelyAiContextProvider from "../../contexts/LedgerelyAiContext";
import SamplePrompts from "./SamplePrompts";
import HistoryPrompts from "./HistoryPrompts";
import Prompter from "./Prompter";
import AiResponse from "./AiResponse";

const VerticalPanes = lazy(() =>
  import("../workbook/VerticalPane").then(module => ({
    default: module["VerticalPanes"],
  })),
);

const Pane = lazy(() =>
  import("../workbook/VerticalPane").then(module => ({
    default: module["Pane"],
  })),
);

const LedgerelyAi = () => {
  const userContext = useContext(UserContext);

  return (
    <LedgerelyAiContextProvider>
      <div className={`container-fluid small p-3`}>
        <VerticalPanes theme={userContext.userData.theme} className={`${userContext?.userConfig?.webMenuType} row`}>
          <Pane className='overflow-y-auto col-lg-3 p-0 d-none d-lg-block'>
            <HistoryPrompts />
          </Pane>
          <Pane className={`col-xs-12 col-lg-6 d-flex flex-column p-1 py-0`}>
            <AiResponse />
            <Prompter />
          </Pane>
          <Pane className='overflow-y-auto col-lg-3 p-0 d-none d-lg-block'>
            <SamplePrompts />
          </Pane>
        </VerticalPanes>
      </div>
    </LedgerelyAiContextProvider>
  );
};

export default LedgerelyAi;
