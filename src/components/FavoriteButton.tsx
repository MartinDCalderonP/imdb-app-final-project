import React, { useState } from 'react';
import styles from '../styles/FavoriteButton.module.scss';
import { useContextState } from '../context/Context';
import useFetch from '../hooks/useFetch';
import { accountStateFetchUrl, postFavoriteFunction } from '../common/Helpers';
import { IFavoriteButtonProps, IAccountState } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as outlinedHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import Toast from '../components/Toast';

export default function FavoriteButton({
	mediaId,
	type,
}: IFavoriteButtonProps) {
	const { state } = useContextState();

	const isAuthenticated = state.profile.id === 0 ? false : true;

	if (!isAuthenticated) {
		return null;
	}

	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
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
			setToastMessage('Added favorite');
			setShowToast(true);
			setIsFavorite(true);
		} else {
			setToastMessage('Failed to add favorite');
			setShowToast(true);
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
			setToastMessage('Removed favorite');
			setShowToast(true);
			setIsFavorite(false);
		} else {
			setToastMessage('Failed to remove favorite');
			setShowToast(true);
		}
	};

	const handleCloseToast = () => {
		setShowToast(false);
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

			{showToast && (
				<Toast message={toastMessage} closeToast={handleCloseToast} />
			)}
		</>
	);
}
