import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import useFetch from '../hooks/useFetch';
import { homeFetchUrl } from '../common/Helpers';
import { IMoviesData, ITvShowsData } from '../common/Interfaces';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';

export default function Home() {
	const [currentMoviesPage, setCurrentMoviesPage] = useState(1);
	const [currentTvShowsPage, setCurrentTvShowsPage] = useState(1);
	const [filter, setFilter] = useState('popular');
	const moviesFetchUrl = homeFetchUrl(currentMoviesPage, filter, 'movies');
	const tvShowsFetchUrl = homeFetchUrl(currentTvShowsPage, filter, 'tvShows');
	const movies = useFetch<IMoviesData>(moviesFetchUrl);
	const tvShows = useFetch<ITvShowsData>(tvShowsFetchUrl);

	return (
		<Layout>
			<div className={styles.home}>
				{movies.loading && tvShows.loading && <Spinner />}

				{!movies.loading && movies?.data && (
					<CardsContainer
						loading={movies?.loading}
						posts={movies?.data?.results}
						type="movies"
					/>
				)}

				{!tvShows.loading && tvShows?.data && (
					<CardsContainer
						loading={tvShows?.loading}
						posts={tvShows?.data?.results}
						type="tvShows"
					/>
				)}
			</div>
		</Layout>
	);
}
