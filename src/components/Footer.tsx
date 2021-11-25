import React from 'react';
import styles from '../styles/Footer.module.scss';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			© Martín Calderón {new Date().getFullYear()} - All rights reserved
		</footer>
	);
}
