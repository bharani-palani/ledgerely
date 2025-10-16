import React, { useState, createContext, useEffect, useContext } from "react";
import _ from "lodash";

export const LegerelyContext = createContext([{}, () => {}]);

const LedgerelyAiContextProvider = props => {
  const [title, setTitle] = useState("Topic");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const samplePromptList = [
    {
      id: 1,
      prompt: "Get this month's total bank transactions",
    },
    {
      id: 2,
      prompt: "Get this month's total credit card transactions",
    },
    {
      id: 3,
      prompt: "Get recent top 50 bank transactions for this month",
    },
    {
      id: 4,
      prompt: "Get recent top 50 credit card transactions for this month",
    },
  ];
  const [responses, setResponses] = useState([]);

  return (
    <LegerelyContext.Provider
      value={{
        samplePromptList,
        prompt,
        setPrompt,
        loading,
        setLoading,
        responses,
        setResponses,
      }}
    >
      {props.children}
    </LegerelyContext.Provider>
  );
};
export default LedgerelyAiContextProvider;
