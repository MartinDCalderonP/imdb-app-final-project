import { useState, useEffect } from 'react';
import { IUseFetch } from '../common/Interfaces';
import { API_KEY } from '../Keys';

export default function useFetch<T>(
	fetchUrl: string,
	type?: string
): IUseFetch<T> {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();

	const language = type !== 'images' ? '&language=en-US' : '';

	const url = fetchUrl && `${fetchUrl}&api_key=${API_KEY}${language}`;

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			setLoading(true);

			if (url) {
				fetch(url, { signal })
					.then((res) => res.json())
					.then((result) => {
						if (result) {
							setData(result);
							setLoading(false);
						}
					})
					.catch((err) => {
						if (err.name === 'AbortError') return;
						setError(`${err}. Try again later.`);
						setLoading(false);
					});
			}
		};

		fetchData();

		return () => abortController.abort();
	}, [url]);

	return { data, loading, error };
}
