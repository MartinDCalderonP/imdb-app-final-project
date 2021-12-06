import React from 'react';
import styles from '../styles/Layout.module.scss';
import { ILayoutProps } from '../common/Interfaces';
import Navbar from './Navbar';
import SearchInput from './SearchInput';
import Footer from './Footer';

export default function Layout({ children, footer = true }: ILayoutProps) {
	return (
		<>
			<Navbar />
			<div className={styles.searchContainer}>
				<SearchInput />
			</div>
			<main className={styles.mainContainer}>{children}</main>
			{footer && <Footer />}
		</>
	);
}
