import { App } from "@capacitor/app";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DEEP_LINK_ROUTES = {
  "/app/dashboard": "/dashboard",
  "/app/categories": "/category",
  "/app/bank": "/bank",
  "/app/creditCard": "/creditCard",
  "/app/schedules": "/schedules",
  "/app/moneyPlanner": "/moneyPlanner",
  "/app/ledgerelyAi": "/ledgerelyAi",
  "/app/workbook": "/workbook",
  "/app/billing": "/billing",
  "/app/settings": "/settings",
};

const DeepLinkHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    let listener;

    const navigateFromUrl = url => {
      if (!active || typeof url !== "string") {
        return;
      }

      let parsedUrl;
      try {
        parsedUrl = new URL(url);
      } catch {
        return;
      }

      if (parsedUrl.protocol !== "https:" || parsedUrl.hostname !== "ledgerely.com" || parsedUrl.port) {
        return;
      }

      const route = DEEP_LINK_ROUTES[parsedUrl.pathname];
      if (route) {
        navigate(route, { replace: true });
      }
    };

    const registerListener = async () => {
      const appUrlListener = await App.addListener("appUrlOpen", ({ url }) => navigateFromUrl(url));

      if (!active) {
        await appUrlListener.remove();
        return;
      }

      listener = appUrlListener;
      const launch = await App.getLaunchUrl();
      navigateFromUrl(launch?.url);
    };

    registerListener().catch(error => {
      console.error("Unable to initialize app deep-link handling.", error);
    });

    return () => {
      active = false;
      listener?.remove().catch(error => {
        console.error("Unable to remove the app deep-link listener.", error);
      });
    };
  }, [navigate]);

  return null;
};

export default DeepLinkHandler;
