import React from 'react';
import styles from '../styles/SignButtons.module.scss';
import useFetch from '../hooks/useFetch';
import { profileFetchUrl, createSignInUrl } from '../common/Helpers';
import { ISignButtonsProps } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSignInAlt,
	faSignOutAlt,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

export default function SignButtons({
	requestToken,
	sessionId,
	handleSignOut,
}: ISignButtonsProps) {
	const signInUrl = createSignInUrl(requestToken);

	const fetchUrl = profileFetchUrl(sessionId);

	const profile = sessionId && useFetch(fetchUrl);

	return (
		<>
			{!sessionId && (
				<a href={signInUrl}>
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
		</>
	);
}
