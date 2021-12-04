import { useState, useEffect } from 'react';
import { API } from '../common/Enums';
import { IObjects } from '../common/Interfaces';
import { API_KEY } from '../Keys';

export default function useAuth(type: string, fetchParam?: string) {
	const [requestToken, setRequestToken] = useState<string>();
	const [sessionId, setSessionId] = useState<string>();
	const [sessionDeleted, setSessionDeleted] = useState<string>();
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
			fetch(fetchUrls[type], headers)
				.then((res) => res.json())
				.then((result) => {
					if (type === 'requestToken') {
						setRequestToken(result.request_token);
					} else if (type === 'getSessionId') {
						setSessionId(result.session_id);
					} else if (type === 'deleteSession') {
						setSessionDeleted(result.success);
						setSessionId('');
					}
				})
				.catch((err) => {
					if (err.name === 'AbortError') return;
					setError(`${err}. Try again later.`);
				});
		};

		if (type === 'requestToken' && !fetchParam) {
			fetchData();
		}

		if (type === 'getSessionId' && fetchParam) {
			fetchData();
		}

		if (type === 'deleteSession' && fetchParam) {
			fetchData();
		}
	}, [type]);

	return { requestToken, sessionId, sessionDeleted, error };
}
