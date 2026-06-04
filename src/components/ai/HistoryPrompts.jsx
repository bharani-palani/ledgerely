import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";

const HistoryPrompts = () => {
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { responses, scrollToElement } = legerelyContext;

  return (
    <>
      <div className='d-flex justify-content-between align-items-center bni-bg text-center text-black p-2 rounded-top'>
        <FormattedMessage id='history' defaultMessage='history' />
        {legerelyContext.responses.length > 0 && (
          <button type='button' className='btn btn-sm btn-outline-danger px-2 py-0 rounded-2' onClick={() => legerelyContext.setResponses([])}>
            <FormattedMessage id='delete' defaultMessage='delete' />
            <i className='fa fa-times-circle ms-1' />
          </button>
        )}
      </div>
      <div
        className={`historyWrapper ${userContext?.userConfig?.webMenuType} border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-5 rounded-top-0 rounded-bottom overflow-auto`}
      >
        {responses && responses?.length === 0 && (
          <div
            className='d-flex justify-content-center align-items-center'
            style={{
              height: "calc(100vh - 270px)",
              maxHeight: "calc(100vh - 270px)",
            }}
          >
            <div
              className={`shadow-${userContext?.userData?.theme} p-3 rounded-2 text-center text-${userContext?.userData?.theme === "dark" ? "light" : "dark"}`}
            >
              <FormattedMessage id='noRecordsGenerated' defaultMessage='noRecordsGenerated' />
            </div>
          </div>
        )}
        <ul className='list-group list-group-flush overflow-auto overflow-y'>
          {responses &&
            responses.length > 0 &&
            responses.map((list, i) => (
              <li
                key={i}
                onClick={() => scrollToElement(list.data.id)}
                title={list.prompt}
                className={`list-group-item cursor-pointer text-truncate border-0 shadow-${userContext?.userData?.theme} mx-2 my-1 rounded-1 ${userContext?.userData?.theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`}
              >
                {list.prompt}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default HistoryPrompts;
