import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout';
import useFetch from '../hooks/useFetch';
import { API } from '../common/Enums';
import { IPopularMovies, IPopularTvShows } from '../common/Interfaces';

export default function Home() {
	const [currentMoviesPage, setCurrentMoviesPage] = useState(1);
	const [currentTvShowsPage, setCurrentTvShowsPage] = useState(1);
	const popularMoviesFetchUrl = `${API.base}${API.popularMovies}?page=${currentMoviesPage}`;
	const popularTvShowsFetchUrl = `${API.base}${API.popularTvShows}?page=${currentTvShowsPage}`;
	// const movies = useFetch<IPopularMovies>(popularMoviesFetchUrl);
	// const tvShows = useFetch<IPopularTvShows>(popularTvShowsFetchUrl);

	return (
		<Layout>
			<div className={styles.home}>XX</div>
		</Layout>
	);
}
