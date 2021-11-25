import React from 'react';
import styles from '../styles/Layout.module.scss';
import { ILayoutProps } from '../common/Interfaces';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, footer = true }: ILayoutProps) {
	return (
		<>
			<Navbar />
			<main className={styles.mainContainer}>{children}</main>
			{footer && <Footer />}
		</>
	);
}
