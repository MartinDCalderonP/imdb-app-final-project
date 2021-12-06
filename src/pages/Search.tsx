import React, { useState } from 'react';
import styles from '../styles/Search.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { searchFetchUrl, searchPaginationUrl } from '../common/Helpers';
import { ISearchResults } from '../common/Interfaces';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import PaginationButtons from '../components/PaginationButtons';

export default function Search() {
	const { query } = useParams();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const fetchUrl = searchFetchUrl(query, currentPage);
	const { data, loading, error } = useFetch<ISearchResults>(fetchUrl);

	const queryToText = query?.replaceAll('+', ' ');

	const dataLength = data !== undefined && data?.results?.length;

	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);

		const newUrl = searchPaginationUrl(query, pageNumber);

		navigate(newUrl);
	};

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
							type="search"
						/>

						<PaginationButtons
							totalPosts={data?.total_results}
							postsPerPage={20}
							paginate={handlePaginate}
							currentPage={currentPage}
							type={'search'}
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
