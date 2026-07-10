import React from "react";
import ErrorCatch from "./errorCatch";
import OfflinePage from "./OfflinePage";

// Note: Error bounday should only be class component. Please dont change.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  checkNetwork = () => {
    return window.navigator.onLine || false;
  };

  componentDidMount() {
    // this.interval = setInterval(() => this.setState({ isOnline: this.checkNetwork() }), 5000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error?.message?.includes("Failed to fetch dynamically imported module")) {
      return <OfflinePage />;
    }
    if (this.state.errorInfo) {
      return <ErrorCatch error={this.state.error} errorInfo={this.state.errorInfo} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
