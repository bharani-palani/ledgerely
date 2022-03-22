import React, { Suspense } from 'react';
import ErrorBoundary from './components/mainApp/ErrorBoundary';
import './index.scss';

const Root = React.lazy(() => import('./components/mainApp/Root'));

const AppLoader = () => (
	<div className="spinner">
		<div
	        style={{
	          backgroundImage: `url(${require('./images/animateLoaderGlobe.svg')})`,
	          backgroundRepeat: 'no-repeat',
	          backgroundPosition: 'center',
	          backgroundSize: 'contain',
	          height: '500px',
	          width: '500px'
	        }}
	      >
	      </div>
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
