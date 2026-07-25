import React, { useState, createContext, useEffect, useContext } from "react";
import promptList from "../components/ai/promptList";
import { db } from "../services/indexedDb";
import { UserContext } from "../contexts/UserContext";
import Dexie from "dexie";

export const LegerelyContext = createContext([{}, () => {}]);

const LedgerelyAiContextProvider = props => {
  const userContext = useContext(UserContext);
  const tenantId = userContext.userConfig.tenantId;
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const samplePromptList = promptList;
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchAiSearches = async () => {
      const list = await db.aiChatTable
        .where("[tenantId+createdAt]")
        .between([tenantId, Dexie.minKey], [tenantId, Dexie.maxKey])
        .limit(100)
        .toArray();
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
