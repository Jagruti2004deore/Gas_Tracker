import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("🧨 Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
    // You can also log error info to a service like Sentry here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger text-center">
            ⚠️ <strong>Something went wrong.</strong>
            <br />
            Please reload the page or try again later.
          </div>
          {/* Optional debug info during development */}
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <pre className="bg-light text-dark p-3 rounded mt-3">
              {this.state.errorInfo.componentStack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
