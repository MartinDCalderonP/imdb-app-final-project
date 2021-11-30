import React, { useState } from 'react';
import styles from '../styles/Search.module.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { searchFetchUrl } from '../common/Helpers';
import { ISearchResults } from '../common/Interfaces';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';

export default function Search() {
	const { query } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const fetchUrl = searchFetchUrl(query, currentPage);
	const { data, loading, error } = useFetch<ISearchResults>(fetchUrl);

	const queryToText = query?.replaceAll('+', ' ');

	const dataLength = data !== undefined && data?.results?.length;

	return (
		<Layout>
			<div className={styles.search}>
				{loading && <Spinner />}

				{!loading && data && dataLength > 0 && (
					<>
						<h1 className={styles.resultsTitle}>
							{`Results for "${queryToText}".`}
						</h1>

						<CardsContainer
							loading={loading}
							posts={data?.results}
							type="movies"
						/>
					</>
				)}

				{!loading && dataLength === 0 && (
					<h1 className={styles.noResultsTitle}>
						{`No results found for "${queryToText}".`}
					</h1>
				)}
			</div>
		</Layout>
	);
}
