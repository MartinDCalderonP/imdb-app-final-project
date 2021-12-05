import { useState, useEffect } from 'react';
import { API } from '../common/Enums';
import { IObjects } from '../common/Interfaces';
import { API_KEY } from '../Keys';

export default function useAuth(
	type: string,
	approvedRequestToken: string,
	toDeleteSessionId: string
) {
	const [requestToken, setRequestToken] = useState<string>();
	const [newSessionId, setNewSessionId] = useState<string>();
	const [sessionDeleted, setSessionDeleted] = useState<string>();
	const [authError, setAuthError] = useState<string>();

	const APIparams = `?api_key=${API_KEY}`;
	const signInParams =
		type === 'getSessionId' && `&request_token=${approvedRequestToken}`;
	const deleteSessionParams =
		type === 'deleteSession' && `&session_id=${toDeleteSessionId}`;

	const fetchUrls: IObjects = {
		getRequestToken: `${API.base}${API.requestToken}${APIparams}`,
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
					if (type === 'getRequestToken') {
						setRequestToken(result.request_token);
					} else if (type === 'getSessionId') {
						setNewSessionId(result.session_id);
					} else if (type === 'deleteSession') {
						setSessionDeleted(result.success);
						setNewSessionId('');
					}
				})
				.catch((err) => {
					if (err.name === 'AbortError') return;
					setAuthError(`${err}. Try again later.`);
				});
		};

		if (type === 'getRequestToken') {
			fetchData();
		}

		if (type === 'getSessionId' && approvedRequestToken) {
			fetchData();
		}

		if (type === 'deleteSession' && toDeleteSessionId) {
			fetchData();
		}
	}, [type]);

	return { requestToken, newSessionId, sessionDeleted, authError };
}
