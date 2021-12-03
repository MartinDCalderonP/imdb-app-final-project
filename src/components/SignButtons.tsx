import React from 'react';
import styles from '../styles/SignButtons.module.scss';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { profileFetchUrl, createSignInUrl } from '../common/Helpers';
import { IProfileData, ISignButtonsProps } from '../common/Interfaces';
import { Paths } from '../common/Enums';
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

	const { data, loading, error } = useFetch<IProfileData>(fetchUrl);

	return (
		<>
			{!sessionId && (
				<a href={signInUrl}>
					Sign In
					<FontAwesomeIcon className={styles.anchorIcon} icon={faSignInAlt} />
				</a>
			)}

			{sessionId && !loading && data && (
				<>
					<Link to={Paths.profile}>
						{data?.username}

						<FontAwesomeIcon
							className={styles.anchorIcon}
							icon={faUserCircle}
						/>
					</Link>

					<button className={styles.signOut} onClick={handleSignOut}>
						<FontAwesomeIcon
							className={styles.anchorIcon}
							icon={faSignOutAlt}
						/>
					</button>
				</>
			)}
		</>
	);
}
