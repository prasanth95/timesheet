export const API_INITIAL = 0;

export const API_FETCHING = 100;

export const API_SUCCESS = 200;

export const API_FAILURE = 400;

export type APIStatus =
	| typeof API_INITIAL
	| typeof API_FETCHING
	| typeof API_SUCCESS
	| typeof API_FAILURE;
