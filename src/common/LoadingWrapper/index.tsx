import React, { Component } from "react";
import { observer } from "mobx-react";

import {
	APIStatus,
	API_FETCHING,
	API_SUCCESS,
	API_FAILURE,
} from "../../constants/APIConstants";

import {
	Container,
	Loader,
	FailureView,
	FailureText,
	RetryButton,
} from "./styledComponents";

interface Props {
	apiStatus: APIStatus;
	onRetry: any;
	apiError: Error;
	containerStyle: Record<string, any>;
	containerClassName: string;
}

@observer
class LoadingWrapper extends Component<Props> {
	static defaultProps = {
		onRetry: (): void => {},
		containerClassName: "",
		containerStyle: {},
	};

	renderFailureView = () => {
		const { onRetry } = this.props;
		return (
			<FailureView>
				<FailureText>Something went wrong. Please try again</FailureText>
				<RetryButton onClick={onRetry}>Retry</RetryButton>
			</FailureView>
		);
	};

	renderLoadingView = () => {
		return <Loader>Loading...</Loader>;
	};

	renderChildrenWithContainer = (children: any): React.ReactNode => {
		const { containerClassName, containerStyle } = this.props;

		return (
			<Container style={containerStyle} className={containerClassName}>
				{children}
			</Container>
		);
	};

	renderContent = (): React.ReactNode => {
		const { apiStatus } = this.props;

		switch (apiStatus) {
			case API_FETCHING:
				return this.renderChildrenWithContainer(this.renderLoadingView());
			case API_SUCCESS:
				return this.props.children;
			case API_FAILURE:
				return this.renderChildrenWithContainer(this.renderFailureView());
			default:
				return this.renderChildrenWithContainer(this.renderLoadingView());
		}
	};

	render(): React.ReactNode {
		return <>{this.renderContent()}</>;
	}
}
export default LoadingWrapper;
