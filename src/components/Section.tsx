import React, { useState } from 'react';
import styles from '../styles/Section.module.scss';
import useFetch from '../hooks/useFetch';
import { sectionFetchUrl } from '../common/Helpers';
import { ISectionProps } from '../common/Interfaces';
import { PossibleData } from '../common/Types';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import Filters from './Filters';

export default function Section({ type }: ISectionProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentFilter, setCurrentFilter] = useState<string>('popular');
	const fetchUrl = sectionFetchUrl(currentPage, currentFilter, type);
	const { data, loading, error } = useFetch<PossibleData>(fetchUrl);

	const handleFilterChange = (filter: string) => {
		setCurrentFilter(filter);
	};

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1 className={styles.sectionTitle}>
						{currentFilter.toUpperCase()} TV SHOWS
					</h1>

					<Filters current={currentFilter} setCurrent={handleFilterChange} />

					<CardsContainer
						loading={loading}
						posts={data?.results}
						type="movies"
					/>
				</>
			)}
		</>
	);
}
