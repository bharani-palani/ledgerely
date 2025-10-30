import React, { useContext, useEffect, useRef, useCallback } from "react";
import { useIntl } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";
import useAxios from "../../services/apiServices";
import { v4 as uuidv4 } from "uuid";

const Prompter = () => {
  const { apiInstance } = useAxios();
  const intl = useIntl();
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { prompt, setPrompt, loading, setLoading, setResponses } = legerelyContext;
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
    return apiInstance.post("/ai/ledgerelyAi/runPrompt", formdata);
  };

  const onEnter = useCallback(
    (e, source) => {
      if ((e.which === 13 || e.keyCode === 13 || ["button"].includes(source)) && prompt && prompt.length > 0) {
        setLoading(true);
        getPromptInstance()
          .then(res => {
            const data = res.data.response;
            setResponses(prevArray => [...prevArray, { data, prompt }]);
          })
          .catch(err => {
            let data = {};
            const status = err.response.status;
            if (status === 400) {
              data = err.response.data.response;
            }
            if (status === 404 || status === 500) {
              const uuid = uuidv4();
              data = {
                id: uuid,
                error: intl.formatMessage({
                  id: "unableToReachServer",
                  defaultMessage: "unableToReachServer",
                }),
              };
            }
            setResponses(prevArray => [...prevArray, { data, prompt }]);
          })
          .finally(() => {
            setPrompt("");
            setLoading(false);
          });
      }
    },
    [prompt],
  );

  return (
    <div className={`input-group position-relative`}>
      <textarea
        style={{ resize: "none" }}
        rows={2}
        ref={ref}
        type='text'
        className={`form-control rounded-end-0 small shadow-none`}
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
        onKeyDown={e => onEnter(e, "key")}
      ></textarea>
      {loading ? (
        <button onClick={false} className={`rounded-start-0 btn bg-white text-dark px-4 border border-start-0`} type='button'>
          <i className='fa fa-stop-circle fa-2x' />
        </button>
      ) : (
        <>
          <button className={`rounded-start-0 btn btn-secondary icon-bni px-4`} type='button' onClick={e => onEnter(e, "button")}>
            <i className='fa fa-paper-plane' />
          </button>
          <button className={`rounded-start-0 btn btn-bni px-4`} type='button'>
            <i className='fa fa-microphone' />
          </button>
        </>
      )}
    </div>
  );
};
export default Prompter;
