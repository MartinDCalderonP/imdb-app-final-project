import { useState, useEffect } from 'react';
import { API } from '../common/Enums';
import { API_KEY } from '../Keys';

export default function useAuth() {
	const [requestToken, setRequestToken] = useState<string>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();
	const fetchUrl = `${API.base}${API.requestToken}?api_key=${API_KEY}`;

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			if (fetchUrl) {
				fetch(fetchUrl)
					.then((res) => res.json())
					.then((result) => {
						if (result.success) {
							setRequestToken(result.request_token);
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
	}, [fetchUrl]);

	return { requestToken, loading, error };
}
