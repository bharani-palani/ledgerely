import React, { useContext, useEffect, useRef, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";
import useAxios from "../../services/apiServices";
import { v4 as uuidv4 } from "uuid";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Prompter = () => {
  const { apiInstance } = useAxios();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const intl = useIntl();
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { prompt, setPrompt, loading, setLoading, setResponses } = legerelyContext;
  const ref = useRef(null);
  const [insertMode, setInsertMode] = useState(null);

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

  const cancel = () => {
    console.log("bbb", "todo cancel api");
  };

  const onEnter = useCallback(
    (e, source) => {
      if ((e.which === 13 || e.keyCode === 13 || ["button", "mic"].includes(source)) && prompt && prompt.length > 0) {
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
            resetTranscript();
            setInsertMode(null);
          });
      }
    },
    [prompt],
  );

  useEffect(() => {
    if (listening) {
      setPrompt(transcript);
      setInsertMode("mic");
    }
    if (!listening && prompt && insertMode === "mic") {
      onEnter({}, "mic");
    }
  }, [listening, transcript, prompt, insertMode]);

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
        onChange={e => {
          setInsertMode("key");
          setPrompt(e.target.value);
        }}
        onKeyDown={e => onEnter(e, "key")}
      ></textarea>
      {loading ? (
        <button onClick={cancel} className={`rounded-start-0 btn bg-white text-dark px-4 border border-start-0`} type='button'>
          <i className='fa fa-circle-o-notch fa-spin fa-2x text-secondary' />
        </button>
      ) : (
        <>
          <button className={`rounded-start-0 btn btn-secondary icon-bni px-4`} type='button' onClick={e => onEnter(e, "button")}>
            <i className='fa fa-paper-plane' />
          </button>
          {browserSupportsSpeechRecognition && (
            <>
              {listening ? (
                <button onClick={() => SpeechRecognition.stopListening()} className={`rounded-start-0 btn btn-danger px-4`} type='button'>
                  <i className={`fa fa-stop`} />
                </button>
              ) : (
                <button
                  onClick={() => SpeechRecognition.startListening({ continuous: true })}
                  className={`rounded-start-0 btn btn-bni px-4`}
                  type='button'
                >
                  <i className={`fa fa-microphone`} />
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Prompter;
