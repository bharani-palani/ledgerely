import React, { Suspense } from 'react';
import ErrorBoundary from './components/mainApp/ErrorBoundary';
import './index.scss';

const Root = React.lazy(() => import('./components/mainApp/Root'));

const AppLoader = () => (
	<div className="spinner">
		<i style={{zoom: 1.5}} className="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
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
