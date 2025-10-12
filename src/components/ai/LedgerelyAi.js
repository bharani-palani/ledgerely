import React, { lazy, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { useIntl, FormattedMessage } from "react-intl";
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
      <div className={`workbook container-fluid small`}>
        <VerticalPanes
          theme={userContext.userData.theme}
          className={`${userContext?.userConfig?.webMenuType} row px-1`}
        >
          <Pane className='overflow-y-auto col-lg-3 p-1 d-none d-lg-block'>
            <HistoryPrompts />
          </Pane>
          <Pane
            className={`col-xs-12 col-lg-6 d-flex flex-column justify-content-end p-1`}
          >
            <AiResponse />
            <Prompter />
          </Pane>
          <Pane className='overflow-y-auto col-lg-3 p-1 d-none d-lg-block'>
            <SamplePrompts />
          </Pane>
        </VerticalPanes>
      </div>
    </LedgerelyAiContextProvider>
  );
};

export default LedgerelyAi;
