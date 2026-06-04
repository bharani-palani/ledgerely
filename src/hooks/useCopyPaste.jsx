import { useState, useEffect, useCallback } from "react";

const useCopyPaste = obj => {
  const [copied, setCopied] = useState(null);
  const [pasted, setPasted] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  if (!(typeof obj === "object" && obj !== null && !Array.isArray(obj))) {
    throw new Error("useCopyPaste expects only objects as input");
  }

  const handleCopy = useCallback(async () => {
    setCopied(obj);
    setPasted(null);
    setLastAction("copy");
  }, [obj]);

  const handlePaste = useCallback(async () => {
    setPasted(copied);
    setLastAction("paste");
  }, [copied]);

  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        handleCopy();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        handlePaste();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleCopy, handlePaste, obj]);

  return {
    copied,
    pasted,
    lastAction,
    handleCopy,
    handlePaste,
  };
};

export default useCopyPaste;
