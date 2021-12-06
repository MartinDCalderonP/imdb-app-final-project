import React, { useState } from 'react';
import styles from '../styles/FavoriteButton.module.scss';
import { useContextState } from '../context/Context';
import useFetch from '../hooks/useFetch';
import { accountStateFetchUrl, postFavoriteFunction } from '../common/Helpers';
import { IFavoriteButtonProps, IAccountState } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlinedHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

export default function FavoriteButton({ mediaId, type }: IFavoriteButtonProps) {
	const { state } = useContextState();

	const isAuthenticated = state.profile.id === 0 ? false : true;

	if (!isAuthenticated) {
		return null;
	}

	const fetchUrl = accountStateFetchUrl(mediaId, state.sessionId, type);
	const { data, loading, error } = useFetch<IAccountState>(fetchUrl);

	const [isFavorite, setIsFavorite] = useState(data?.favorite);

	const handleAddFavorite = async () => {
		const response = await postFavoriteFunction(
			state.profile.id,
			state.sessionId,
			mediaId,
			type,
			'add'
		);

		if (response && response.success) {
			console.log('Added favorite');
			setIsFavorite(true);
		} else {
			console.log('Failed to add favorite');
		}
	};

	const handleRemoveFavorite = async () => {
		const response = await postFavoriteFunction(
			state.profile.id,
			state.sessionId,
			mediaId,
			type,
			'remove'
		);

		if (response && response.success) {
			console.log('Removed favorite');
			setIsFavorite(false);
		} else {
			console.log('Failed to remove favorite');
		}
	};

	return (
		<>
			{!loading && data && !isFavorite && (
				<button className={styles.button} onClick={handleAddFavorite}>
					<FontAwesomeIcon className={styles.icon} icon={outlinedHeart} />
				</button>
			)}

			{!loading && data && isFavorite && (
				<button className={styles.button} onClick={handleRemoveFavorite}>
					<FontAwesomeIcon className={styles.icon} icon={solidHeart} />
				</button>
			)}
		</>
	);
}
