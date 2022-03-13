import React, { Suspense } from 'react';
import Loader from 'react-loader-spinner';
import ErrorBoundary from './components/mainApp/ErrorBoundary';

const Root = React.lazy(() => import('./components/mainApp/Root'));

const AppLoader = () => (
	<div className="spinner">
		<Loader type={`ThreeDots`} color={`#c2d82e`} height={100} width={100} />
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
