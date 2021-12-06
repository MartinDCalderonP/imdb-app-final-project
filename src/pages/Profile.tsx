import React from 'react';
import styles from '../styles/Profile.module.scss';
import { useContextState } from '../context/Context';
import Layout from '../components/Layout';
import Section from '../components/Section';

export default function Profile() {
	const { state } = useContextState();

	return (
		<Layout>
			<div className={styles.profile}>
				<h1>{state.profile.name || state.profile.username}</h1>

				<Section
					sessionId={state.sessionId}
					accountId={state?.profile?.id}
					type="movies"
				/>

				<Section
					sessionId={state.sessionId}
					accountId={state?.profile?.id}
					type="tvShows"
				/>
			</div>
		</Layout>
	);
}
