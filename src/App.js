import React, { Suspense, lazy } from "react";
import ErrorBoundary from "./components/mainApp/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./components/configuration/backend/backendUpdate.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.scss";
import Loader from "./components/resuable/Loader";
import VersionToaster from "./components/Timers/VersionToaster";

const Root = lazy(() => import("./components/mainApp/Root"));

const AppLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    {/* <div
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "500px",
        width: "500px",
      }}
    ></div> */}
    <Loader />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AppLoader />}>
        <BrowserRouter basename={`/${process.env.REACT_APP_SUBFOLDER}`}>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <VersionToaster />
            <Root />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
