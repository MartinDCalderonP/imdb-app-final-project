import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import SearchInput from './SearchInput';
import SignButtons from './SignButtons';

export default function Navbar() {
	const location = useLocation();
	const approvedRequestToken =
		location.search && location.search.split('=')[1].split('&')[0];

	const [authType, setAuthType] = useState('requestToken');
	const [fetchParam, setFetchParam] = useState<string>();
	const { requestToken, sessionId, sessionDeleted, error } = useAuth(
		authType,
		fetchParam
	);

	useEffect(() => {
		if (approvedRequestToken) {
			setAuthType('getSessionId');
			setFetchParam(approvedRequestToken);
		}
	}, [approvedRequestToken]);

	const handleSignOut = () => {
		setAuthType('deleteSession');
		setFetchParam(sessionId);
	};

	return (
		<nav className={styles.navbar}>
			<NavLink
				to="/"
				className={({ isActive }) => (isActive ? styles.active : '')}
			>
				<FontAwesomeIcon className={styles.anchorIcon} icon={faHome} />
				Home
			</NavLink>

			<SearchInput />

			<SignButtons
				requestToken={requestToken}
				sessionId={sessionId}
				handleSignOut={handleSignOut}
			/>
		</nav>
	);
}
