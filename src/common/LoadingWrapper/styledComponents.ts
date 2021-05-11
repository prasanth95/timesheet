import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const Loader = styled.span``;

export const FailureView = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const FailureText = styled.span`
	padding: 10px 0;
`;

export const RetryButton = styled.button``;
