import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
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
          height: "calc(100vh - 190px)",
        }}
      >
        <ul
          className='list-group overflow-auto'
          style={{
            height: "calc(100vh - 195px)",
          }}
        >
          {samplePromptList.length > 0 &&
            samplePromptList.map((list, i) => (
              <li
                key={i}
                onClick={() => setPrompt(list.prompt)}
                className={`list-group-item px-2 border-0 shadow-${userContext?.userData?.theme} m-2 rounded cursor-pointer ${userContext?.userData?.theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`}
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
