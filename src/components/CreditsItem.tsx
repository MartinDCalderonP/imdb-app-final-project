import React from 'react';
import styles from '../styles/CreditsItem.module.scss';
import { Link } from 'react-router-dom';
import { creditImageUrl, creditsItemNavigationUrl } from '../common/Helpers';
import { ICreditsItemProps } from '../common/Interfaces';
import Avatar from './Avatar';

export default function CreditsItem({ cast }: ICreditsItemProps) {
	const { id, profile_path, name, character } = cast;

	const navigationUrl = creditsItemNavigationUrl(id);

	return (
		<Link to={navigationUrl} className={styles.creditsItem}>
			{profile_path ? (
				<img
					className={styles.image}
					src={creditImageUrl(profile_path)}
					alt={name}
				/>
			) : (
				<div className={styles.avatar}>
					<Avatar />
				</div>
			)}

			<div className={styles.text}>
				<p>{name}</p>
				<p className={styles.secondaryText}>as {character}</p>
			</div>
		</Link>
	);
}
