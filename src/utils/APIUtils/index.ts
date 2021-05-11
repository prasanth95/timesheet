export function networkCall(
	url: RequestInfo,
	options?: RequestInit | undefined
) {
	return fetch(url, options)
		.then((response) => response.json())
		.then((json) => json);
}

export function resolveWithTimeout<T>(response: T): Promise<T> {
	const timeOut = 2000;
	return new Promise((resolve) => {
		setTimeout(() => resolve(response), timeOut);
	});
}
