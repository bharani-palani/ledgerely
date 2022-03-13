import React from 'react';
import ErrorService from './errorService';

// Note: Error bounday should only be class component. Please dont change.
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null, isOnline: true };
	}

	checkNetwork = () => {
		return window.navigator.onLine || false;
	};

	componentDidMount() {
		this.interval = setInterval(() => this.setState({ isOnline: this.checkNetwork() }), 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo
		});
	}

	render() {
		if (this.state.errorInfo || !this.state.isOnline) {
			return <ErrorService />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
