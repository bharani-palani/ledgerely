import React, { useContext, useEffect, useRef } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";
import useAxios from "../../services/apiServices";

const Prompter = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { prompt, setPrompt, setTitle, loading, setLoading, setResponses } =
    legerelyContext;
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, [prompt]);

  const getPromptInstance = () => {
    const formdata = new FormData();
    formdata.append("prompt", prompt);
    formdata.append("appId", userContext.userConfig.appId);
    return apiInstance.post("/ledgerelyAi/runPrompt", formdata);
  };

  const onEnter = e => {
    if ((e.which === 13 || e.keyCode === 13) && prompt && prompt.length > 0) {
      // API call here
      setLoading(true);
      getPromptInstance()
        .then(res => {
          const data = res.data.response;
          setResponses(prevArray => [...prevArray, data]);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setPrompt(prompt);
          setTitle(prompt);
          setLoading(false);
        });
    }
  };

  return (
    <div className='input-group position-relative'>
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
      {loading ? (
        <button
          className={`rounded-start-0 btn bg-white text-dark px-4`}
          type='button'
        >
          <i className='fa fa-circle-o-notch fa-spin fa-fw' />
        </button>
      ) : (
        <button
          className={`rounded-start-0 btn bg-white text-dark px-4`}
          type='button'
        >
          <i className='fa fa-microphone fa-2x' />
        </button>
      )}
    </div>
  );
};
export default Prompter;
