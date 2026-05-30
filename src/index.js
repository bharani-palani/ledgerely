import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Register custom service worker for PWA
import * as serviceWorkerRegistration from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
