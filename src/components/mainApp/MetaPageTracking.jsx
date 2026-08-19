import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MetaPageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.VITE_ENV !== "local" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  return null;
};

export default MetaPageTracking;
