import React, { useState, createContext, useEffect } from "react";
import promptList from "../components/ai/promptList";
export const LegerelyContext = createContext([{}, () => {}]);
import { db } from "../services/indexedDb";

const LedgerelyAiContextProvider = props => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const samplePromptList = promptList;
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchAiSearches = async () => {
      const list = await db.aiChatTable.orderBy("createdAt").limit(100).toArray();
      setResponses(list);
    };
    fetchAiSearches();
  }, []);

  const scrollToElement = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        scrollToElement,
      }}
    >
      {props.children}
    </LegerelyContext.Provider>
  );
};
export default LedgerelyAiContextProvider;
