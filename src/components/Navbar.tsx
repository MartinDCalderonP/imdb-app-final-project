import React from 'react';
import styles from '../styles/Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import SearchInput from './SearchInput';
import SignButtons from './SignButtons';

export default function Navbar() {
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

			<SignButtons />
		</nav>
	);
}
