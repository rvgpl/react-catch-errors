import * as React from "react";

interface ErrorBoundaryProps {
  handleError: Function;
  handleUnhandledRejection: Function;
  handleComponentError: Function;
  renderErrorUI: Function;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidMount() {
    //Listen to errors originated outside react
    window.addEventListener("error", this.logError);
    // Listen to uncaught promises rejections
    window.addEventListener("unhandledrejection", this.logUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener("error", this.logError);
    window.removeEventListener("unhandledrejection", this.logUnhandledRejection);
  }

  componentDidCatch(error: Error, info: Object) {
    this.logComponentError(error, info);
  }

  logError(event: Event | Error) {
    this.props.handleError(event);
  }

  logUnhandledRejection(event: Event) {
    const { handleUnhandledRejection } = this.props;
    handleUnhandledRejection ? handleUnhandledRejection(event) : this.logError(event);
  }

  logComponentError(error: Error, info: Object) {
    const { handleComponentError } = this.props;
    handleComponentError ? handleComponentError(error, info) : this.logError(error);
  }

  render() {
    if (this.state.error) {
      return (error: Error) => this.props.renderErrorUI(error);
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
