import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from '../styles/Toast.module.scss';
import { IToastProps } from '../common/Interfaces';
import CloseIcon from './CloseIcon';

export default function Toast({ message, closeToast }: IToastProps) {
	useEffect(() => {
		let timeOut = setTimeout(() => {
			closeToast(true);
		}, 5000);

		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	const handleCloseIconClick = () => {
		closeToast(true);
	};

	return createPortal(
		<div className={`${styles.toast} ${styles.appearToast}`}>
			<p>{message}</p>

			<CloseIcon className={styles.closeIcon} onClick={handleCloseIconClick} />
		</div>,
		document.getElementById('portal')!
	);
}
