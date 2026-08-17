import React, { useContext, useEffect, useRef, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";
import useAxios from "../../services/apiServices";
import { v4 as uuidv4 } from "uuid";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { db } from "../../services/indexedDb";
import moment from "moment";

const Prompter = () => {
  const { apiInstance } = useAxios();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const intl = useIntl();
  const userContext = useContext(UserContext);
  const tenantId = userContext.userConfig.tenantId;
  const legerelyContext = useContext(LegerelyContext);
  const { prompt, setPrompt, setLoading, setResponses } = legerelyContext;
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
    formdata.append("tenantId", userContext.userConfig.tenantId);
    return apiInstance.post("/ai/ledgerelyAi/runPrompt", formdata);
  };

  const onEnter = useCallback(
    (e, source) => {
      if (
        // e.which === 13 || e.keyCode === 13 ||
        ["button", "mic"].includes(source) &&
        prompt &&
        prompt.length > 0
      ) {
        setLoading(true);
        getPromptInstance()
          .then(async res => {
            const data = res.data.response;
            setResponses(prevArray => [...prevArray, { data, prompt }]);
            const now = moment().format("YYYY-MM-DD HH:mm:ss");
            await db.aiChatTable.add({
              prompt,
              data: res.data.response,
              createdAt: now,
              tenantId,
            });
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
      <button
        className={`rounded-start-0 btn btn-default bni-bg px-4 border-0 border-end border-${userContext.userData.theme === "dark" ? "dark" : "1"}`}
        type='button'
        onClick={e => onEnter(e, "button")}
        style={{ margin: "0 1px 0 0" }}
      >
        <i className='fa fa-paper-plane text-dark' />
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
    </div>
  );
};
export default Prompter;
