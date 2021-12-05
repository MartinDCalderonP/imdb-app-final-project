import React, { useState, useEffect } from 'react';
import styles from '../styles/Section.module.scss';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { sectionFetchUrl, sectionTitle } from '../common/Helpers';
import { ISectionProps } from '../common/Interfaces';
import { PossibleSectionData } from '../common/Types';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import FiltersContainer from './FiltersContainer';
import PaginationButtons from './PaginationButtons';

export default function Section({
	type,
	id,
	sessionId,
	accountId,
}: ISectionProps) {
	const { page, typeInParams, filter, category } = useParams();
	const [currentPage, setCurrentPage] = useState<number>(
		page ? parseInt(page) : 1
	);
	const [currentFilter, setCurrentFilter] = useState<string>();
	const [currentCategory, setCurrentCategory] = useState<string>();
	const fetchUrl = sectionFetchUrl(
		currentPage,
		currentFilter,
		currentCategory,
		type,
		id,
		sessionId,
		accountId
	);
	const { data, loading, error } = useFetch<PossibleSectionData>(fetchUrl);

	const currentTitle = sectionTitle(type, id);

	const handlePaginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);

		// const newUrl = sectionPaginationUrl(
		// 	pageNumber,
		// 	query,
		// 	comic,
		// 	story,
		// 	format,
		// 	type
		// );

		// history.push(newUrl);
	};

	useEffect(() => {
		if (typeInParams === type) {
			setCurrentFilter(filter);
			setCurrentCategory(category);
		}
	}, [typeInParams, type, filter]);

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1 className={styles.sectionTitle}>{currentTitle}</h1>

					{!id && !accountId && (
						<FiltersContainer current={currentFilter} type={type} />
					)}

					<CardsContainer loading={loading} posts={data?.results} type={type} />

					<PaginationButtons
						totalPosts={data?.total_results}
						postsPerPage={20}
						paginate={handlePaginate}
						currentPage={currentPage}
					/>
				</>
			)}

			{!loading && data?.results?.length === 0 && (
				<div>
					<h2 className={styles.noResults}>No results found</h2>
				</div>
			)}
		</>
	);
}
