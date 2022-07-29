import React, { Component, ErrorInfo, ReactNode } from "react";
import { Redirect } from "react-router-dom";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorHandler extends Component<Props, State> {
	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ hasError: true });
	}

	public render() {
		if (this.state.hasError) {
			return <><h1>Sorry.. there was an error</h1><Redirect to={`${process.env.PUBLIC_URL}/campaign`}>Home</Redirect></>

		}

		return this.props.children;
	}
}

export default ErrorHandler;
