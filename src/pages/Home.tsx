import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';
import useFetch from '../hooks/useFetch';
import { IMoviesData, ITvShowsData } from '../common/Interfaces';
import { homeFetchUrl } from '../common/Helpers';

export default function Home() {
	const [currentMoviesPage, setCurrentMoviesPage] = useState(1);
	const [currentTvShowsPage, setCurrentTvShowsPage] = useState(1);
	const [filter, setFilter] = useState('popular');
	const moviesFetchUrl = homeFetchUrl(currentMoviesPage, filter, 'movies');
	const tvShowsFetchUrl = homeFetchUrl(currentTvShowsPage, filter, 'tvShows');
	// const movies = useFetch<IMoviesData>(moviesFetchUrl);
	// const tvShows = useFetch<ITvShowsData>(tvShowsFetchUrl);

	return (
		<Layout>
			<div className={styles.home}>XX</div>
		</Layout>
	);
}
