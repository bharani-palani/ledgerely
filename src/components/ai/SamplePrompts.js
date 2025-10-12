import React, { useContext } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";

const SamplePrompts = () => {
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { samplePromptList, setPrompt } = legerelyContext;
  return (
    <>
      <div className='bni-bg text-center text-black p-2 rounded-top'>
        <FormattedMessage id='action' defaultMessage='action' />
      </div>
      <div
        className={`border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-5 rounded-top-0 rounded-bottom`}
        style={{
          height: "calc(100vh - 260px)",
        }}
      >
        <ul
          className='list-group list-group-flush overflow-auto overflow-y'
          style={{
            height: "calc(100vh - 265px)",
          }}
        >
          {samplePromptList.length > 0 &&
            samplePromptList.map((list, i) => (
              <li
                key={i}
                onClick={() => setPrompt(list.prompt)}
                className={`list-group-item cursor-pointer border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} border-bottom ${userContext?.userData?.theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`}
              >
                {list.prompt}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default SamplePrompts;
