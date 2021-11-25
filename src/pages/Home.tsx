import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';
import useFetch from '../hooks/useFetch';
import { API } from '../common/Enums';
import { IMoviesData, ITvShowsData } from '../common/Interfaces';

export default function Home() {
	const [currentMoviesPage, setCurrentMoviesPage] = useState(1);
	const [currentTvShowsPage, setCurrentTvShowsPage] = useState(1);
	const moviesFetchUrl = `${API.base}${API.movies}${API.popular}?page=${currentMoviesPage}`;
	const tvShowsFetchUrl = `${API.base}${API.tvShows}${API.popular}?page=${currentTvShowsPage}`;
	// const movies = useFetch<IMoviesData>(moviesFetchUrl);
	// const tvShows = useFetch<ITvShowsData>(tvShowsFetchUrl);

	return (
		<Layout>
			<div className={styles.home}>XX</div>
		</Layout>
	);
}
