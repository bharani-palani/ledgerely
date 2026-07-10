import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  const navigatorSupport = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined" || typeof navigator.onLine !== "boolean") {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { isOnline, isNavigatorSupport: navigatorSupport() };
}
