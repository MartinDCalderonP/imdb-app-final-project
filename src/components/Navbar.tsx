import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { API } from '../common/Enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHome,
	faSignInAlt,
	faSignOutAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
	const location = useLocation();
	const approvedRequestToken =
		location.search && location.search.split('=')[1].split('&')[0];

	const [authType, setAuthType] = useState('requestToken');
	const [fetchParam, setFetchParam] = useState<string>();
	const { requestToken, sessionId, sessionDeleted, loading, error } = useAuth(
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

			{!sessionId && requestToken && (
				<a href={`${API.authenticate}${requestToken}${API.redirect}`}>
					Sign In
					<FontAwesomeIcon className={styles.anchorIcon} icon={faSignInAlt} />
				</a>
			)}

			{sessionId && (
				<button className={styles.signOut} onClick={handleSignOut}>
					Sign Out
					<FontAwesomeIcon className={styles.anchorIcon} icon={faSignOutAlt} />
				</button>
			)}
		</nav>
	);
}
