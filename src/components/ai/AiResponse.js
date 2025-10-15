import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LegerelyContext } from "../../contexts/LedgerelyAiContext";

const AiResponse = () => {
  const userContext = useContext(UserContext);
  const legerelyContext = useContext(LegerelyContext);
  const { title, responses } = legerelyContext;

  return (
    <div
      className={`overflow-auto border border-${userContext?.userData?.theme === "dark" ? "secondary" : "1"} rounded-3 rounded mb-2`}
      style={{ height: "calc(100% - 60px)", maxHeight: "calc(100% - 60px)" }}
    >
      <div
        className='bni-bg text-black p-2 rounded-top text-truncate'
        title={title}
      >
        {title}
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
            <div className='d-flex flex-column gap-2 pb-2' key={res?.data.id}>
              <div
                className={`align-self-start text-start p-2 rounded-1 text-wrap text-break text-bg-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}
              >
                {res?.prompt}
              </div>
              <div
                className={`align-self-end text-end p-2 rounded-1 text-wrap text-break text-bg-${userContext?.userData?.theme === "dark" ? "secondary" : "light"}`}
              >
                {res?.data.choices[0]?.message?.functionCall?.arguments}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AiResponse;
