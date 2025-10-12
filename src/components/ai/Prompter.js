import React, { useContext, useEffect, useRef } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";

const Prompter = () => {
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { prompt, setPrompt, setTitle } = legerelyContext;
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [prompt]);

  const onEnter = e => {
    if ((e.which === 13 || e.keyCode === 13) && prompt && prompt.length > 0) {
      // API call here
      setPrompt(prompt);
      setTitle(prompt);
    }
  };

  return (
    <div className='input-group'>
      <input
        ref={ref}
        type='text'
        className='form-control rounded-end-0 small p-3 shadow-none'
        placeholder={`${intl.formatMessage({
          id: "ledgerelyAi",
          defaultMessage: "ledgerelyAi",
        })} ${intl.formatMessage({
          id: "relevantSearch",
          defaultMessage: "relevantSearch",
        })}`}
        aria-label={intl.formatMessage({
          id: "relevantSearch",
          defaultMessage: "relevantSearch",
        })}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        onKeyDown={e => onEnter(e)}
      />
      <button className={`rounded-start-0 btn btn-bni px-4`} type='button'>
        <i className='fa fa-microphone fa-2x' />
      </button>
    </div>
  );
};
export default Prompter;
