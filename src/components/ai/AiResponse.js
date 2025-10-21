import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";
import brandLogo from "../../images/logo/greenIconNoBackground.png";
import { FormattedMessage } from "react-intl";

const AiResponse = () => {
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { responses } = legerelyContext;

  return (
    <div
      className={`overflow-auto border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-3 rounded mb-2`}
      style={{ height: "calc(100% - 60px)", maxHeight: "calc(100% - 60px)" }}
    >
      <div className='bni-bg text-black p-2 rounded-top text-truncate'>
        <FormattedMessage id='ledgerelyAi' defaultMessage='ledgerelyAi' />
      </div>
      <div
        className='p-1'
        style={{
          height: "calc(100vh - 260px)",
          maxHeight: "calc(100vh - 260px)",
          overflowY: "auto",
        }}
      >
        {responses &&
          responses?.length > 0 &&
          responses.map((res, i) => (
            <div className='d-flex flex-column gap-3 mb-3' key={res?.data.id} id={res?.data.id}>
              <div
                className={`chat-left-bubble ${userContext?.userData?.theme} d-flex gap-2 align-items-start align-self-start text-start p-2 rounded-1 text-wrap text-break text-bg-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}
              >
                <div className='bni-bg text-dark rounded-circle d-flex align-items-center justify-content-center'>
                  {userContext.userData.imageUrl ? (
                    <img
                      className='rounded-circle'
                      alt='userImage'
                      style={{ height: "30px", width: "30px" }}
                      src={`data:image/png;base64,${userContext.userData.imageUrl}`}
                    />
                  ) : (
                    <div style={{ width: "30px" }}>
                      {userContext?.userData?.name[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div>{res?.prompt}</div>
              </div>
              <div
                className={`chat-right-bubble ${userContext?.userData?.theme} align-self-end text-end p-2 rounded-1 text-wrap text-break text-bg-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}
              >
                <div className='d-flex gap-2 align-items-start'>
                  <div>
                    {res?.data.choices[0]?.message?.functionCall?.arguments}
                  </div>
                  <img
                    className='p-1 rounded-circle bni-border bni-border-all bni-border-all-1'
                    src={brandLogo}
                    style={{ width: "30px", height: "30px" }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AiResponse;
