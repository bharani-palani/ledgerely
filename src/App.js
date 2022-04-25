/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './components/mainApp/ErrorBoundary';
import logo from './images/animateLoaderGlobe.svg';
const Root = lazy(() => import('./components/mainApp/Root'));

// const Root = lazy(() => {
//   return new Promise(resolve => setTimeout(resolve, 2000)).then(() =>
//     import('./components/mainApp/Root')
//   );
// });

const AppLoader = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '95vh',
    }}
  >
    <div
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        height: '500px',
        width: '500px',
      }}
    ></div>
  </div>
);

// todo:
// 1. fetch JWT token and store in local storage on any case (may or may not app installed or configured)
// 2. if app connected show root page, but installation not done, show installation page. Configure parameters in DB accordingly

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AppLoader />}>
        <Root />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
