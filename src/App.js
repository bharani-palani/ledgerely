import React, { Suspense, lazy } from "react";
import ErrorBoundary from "./components/mainApp/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./components/configuration/backend/backendUpdate.scss";
const Root = lazy(() => import("./components/mainApp/Root"));
import logo from "./images/logo/greenWhiteIcon.svg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CacheBuster from "react-cache-buster";
import packageInfo from "../package.json";
import "./index.scss";
// const Root = lazy(() => {
//   return new Promise(resolve => setTimeout(resolve, 2000)).then(() =>
//     import('./components/mainApp/Root')
//   );
// });

const AppLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "95vh",
    }}
  >
    <div
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        height: "500px",
        width: "500px",
      }}
    ></div>
  </div>
);

const Loading = () => <h1>Refreshing new code</h1>;

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AppLoader />}>
        <BrowserRouter basename={`/${process.env.REACT_APP_SUBFOLDER}`}>
          <CacheBuster
            currentVersion={packageInfo.version}
            isEnabled={true}
            isVerboseMode={false}
            loadingComponent={<Loading />}
            metaFileDirectory={"."}
          >
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <Root />
            </GoogleOAuthProvider>
          </CacheBuster>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
