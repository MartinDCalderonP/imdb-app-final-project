import React, { useState, useEffect } from 'react';
import styles from '../styles/SignButtons.module.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContextState } from '../context/Context';
import { initialState, actionTypes } from '../context/Reducer';
import { Paths } from '../common/Enums';
import {
	profileFetchUrl,
	createSignInUrl,
	getRequestToken,
} from '../common/Helpers';
import { IProfileData } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSignInAlt,
	faSignOutAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Toast from './Toast';

export default function SignButtons() {
	const { state, dispatch } = useContextState();
	const [profile, setProfile] = useLocalStorage<IProfileData>(
		'profile',
		initialState.profile
	);
	const [sessionId, setSessionId] = useLocalStorage<string>(
		'sessionId',
		initialState.sessionId
	);

	useEffect(() => {
		if (profile.id) {
			dispatch({
				type: actionTypes.SET_PROFILE,
				payload: { sessionId: sessionId, profile: profile },
			});
		}
	}, [profile]);

	const location = useLocation();
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [approvedRequestToken, setApprovedRequestToken] = useState<string>(
		getRequestToken(location)
	);

	const [toDeleteSessionId, setToDeleteSessionId] = useState<string>('');
	const [authType, setAuthType] = useState<string>('');
	const { requestToken, newSessionId, sessionDeleted, authError } = useAuth(
		authType,
		approvedRequestToken,
		toDeleteSessionId
	);

	const handleSignIn = () => {
		setAuthType('getRequestToken');
	};

	useEffect(() => {
		if (requestToken) {
			const signInUrl = createSignInUrl(requestToken);
			window.location.href = signInUrl;
		}
	}, [requestToken]);

	useEffect(() => {
		if (approvedRequestToken) {
			setAuthType('getSessionId');
		}
	}, [approvedRequestToken]);

	const [fetchUrl, setFetchUrl] = useState<string>('');
	const { data, loading, error } = useFetch<IProfileData>(fetchUrl);

	useEffect(() => {
		if (newSessionId) {
			setFetchUrl(profileFetchUrl(newSessionId));
		}
	}, [newSessionId]);

	useEffect(() => {
		if (data && data.id && newSessionId) {
			setProfile(data);
			setSessionId(newSessionId);
			dispatch({
				type: actionTypes.SET_PROFILE,
				payload: { sessionId: newSessionId, profile: data },
			});
			setShowToast(true);
			setToastMessage('Signed in successfully');
		}
	}, [data]);

	const handleSignOut = () => {
		setAuthType('deleteSession');

		if (sessionId) {
			setToDeleteSessionId(sessionId);
		}
	};

	useEffect(() => {
		if (sessionDeleted) {
			setProfile(initialState.profile);
			dispatch({
				type: actionTypes.SET_PROFILE,
				payload: { sessionId: '', profile: initialState.profile },
			});
			setShowToast(true);
			setToastMessage('Signed out successfully');
		}
	}, [sessionDeleted]);

	const handleCloseToast = () => {
		setShowToast(false);
	};

	return (
		<>
			{profile?.id === 0 && (
				<button className={styles.signButton} onClick={handleSignIn}>
					Sign In
					<FontAwesomeIcon className={styles.anchorIcon} icon={faSignInAlt} />
				</button>
			)}

			{profile?.id > 0 && (
				<>
					<Link to={Paths.profile} className={styles.profileButton}>
						{profile?.username}

						<FontAwesomeIcon
							className={styles.anchorIcon}
							icon={faUserCircle}
						/>
					</Link>

					<button className={styles.signButton} onClick={handleSignOut}>
						<FontAwesomeIcon
							className={styles.anchorIcon}
							icon={faSignOutAlt}
						/>
					</button>
				</>
			)}

			{showToast && (
				<Toast message={toastMessage} closeToast={handleCloseToast} />
			)}
		</>
	);
}
