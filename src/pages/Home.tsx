import React from 'react';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';
import Section from '../components/Section';

export default function Home() {
	return (
		<Layout>
			<div className={styles.home}>
				<Section type="movies" />

				<Section type="tvShows" />
			</div>
		</Layout>
	);
}
