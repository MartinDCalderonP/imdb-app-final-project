import { useState, useEffect } from 'react';
import { API } from '../common/Enums';
import { IObjects } from '../common/Interfaces';
import { API_KEY } from '../Keys';

export default function useAuth(type: string, fetchParam?: string) {
	const [requestToken, setRequestToken] = useState<string>();
	const [sessionId, setSessionId] = useState<string>();
	const [sessionDeleted, setSessionDeleted] = useState<string>();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();

	const APIparams = `?api_key=${API_KEY}`;
	const signInParams =
		type === 'getSessionId' && `&request_token=${fetchParam}`;
	const deleteSessionParams =
		type === 'deleteSession' && `&session_id=${fetchParam}`;

	const fetchUrls: IObjects = {
		requestToken: `${API.base}${API.requestToken}${APIparams}`,
		getSessionId: `${API.base}${API.authenticateWithToken}${APIparams}${signInParams}`,
		deleteSession: `${API.base}${API.deleteSession}${APIparams}${deleteSessionParams}`,
	};

	const method =
		type === 'getSessionId'
			? 'POST'
			: type === 'deleteSession'
			? 'DELETE'
			: 'GET';

	const headers = {
		method: method,
		'Content-Type': 'application/json',
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			fetch(fetchUrls[type], headers)
				.then((res) => res.json())
				.then((result) => {
					if (type === 'requestToken') {
						setRequestToken(result.request_token);
						setLoading(false);
					} else if (type === 'getSessionId') {
						setSessionId(result.session_id);
						setLoading(false);
					} else if (type === 'deleteSession') {
						setSessionDeleted(result.success);
						setSessionId('');
						setLoading(false);
					}
				})
				.catch((err) => {
					if (err.name === 'AbortError') return;
					setError(`${err}. Try again later.`);
					setLoading(false);
				});
		};

		fetchData();
	}, [type]);

	return { requestToken, sessionId, sessionDeleted, loading, error };
}
