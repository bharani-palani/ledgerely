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
        className={`samplePromptWrapper p-1 overflow-auto ${userContext?.userConfig?.webMenuType} border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-5 rounded-top-0 rounded-bottom`}
      >
        <ul className='list-group'>
          {samplePromptList.length > 0 &&
            samplePromptList.map((list, i) => (
              <li
                key={i}
                onClick={() => setPrompt(list.prompt)}
                className={`d-flex justify-content-between align-items-start gap-1 list-group-item border-0 shadow-${userContext?.userData?.theme} m-2 rounded cursor-pointer ${userContext?.userData?.theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"}`}
              >
                <div>{list.prompt}</div>
                {list.icon.map((iconClass, index) => (
                  <i key={index} className={`icon-bni ${iconClass}`} />
                ))}
              </li>
            ))}
        </ul>
        <div className={`px-2 text-end text-break small shadow-${userContext?.userData?.theme} mx-2 pull-right rounded`}>
          <FormattedMessage id='developPrompts' defaultMessage='developPrompts' />
        </div>
      </div>
    </>
  );
};

export default SamplePrompts;
