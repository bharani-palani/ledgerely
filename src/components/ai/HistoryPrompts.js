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
      <div className='bni-bg text-center text-black p-2 rounded-top'>
        <FormattedMessage id='history' defaultMessage='history' />
      </div>
      <div
        className={`border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-5 rounded-top-0 rounded-bottom`}
        style={{
          height: "calc(100vh - 190px)",
        }}
      >
        <ul
          className='list-group list-group-flush overflow-auto overflow-y'
          style={{
            height: "calc(100vh - 195px)",
          }}
        >
          {responses &&
            responses.length > 0 &&
            responses.map((list, i) => (
              <li
                key={i}
                onClick={() => scrollToElement(list.data.id)}
                className={`list-group-item cursor-pointer border-0 shadow-${userContext?.userData?.theme} mx-2 my-1 rounded-1 ${userContext?.userData?.theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`}
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
