import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { registerSW } from "virtual:pwa-register";

const isCapacitor = import.meta.env.MODE === "capacitor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  import.meta.env.MODE === "development" ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ),
);

serviceWorker.unregister();
!isCapacitor && registerSW({ immediate: true });
