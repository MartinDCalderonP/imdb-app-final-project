import React, { useState } from 'react';
import styles from '../styles/Section.module.scss';
import useFetch from '../hooks/useFetch';
import { sectionFetchUrl } from '../common/Helpers';
import { ISectionProps } from '../common/Interfaces';
import { PossibleSectionData } from '../common/Types';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';
import FiltersContainer from './FiltersContainer';

export default function Section({ type }: ISectionProps) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentFilter, setCurrentFilter] = useState<string>('');
	const [filterCategory, setFilterCategory] = useState<string>('');
	const fetchUrl = sectionFetchUrl(
		currentPage,
		currentFilter,
		filterCategory,
		type
	);
	const { data, loading, error } = useFetch<PossibleSectionData>(fetchUrl);

	const sectionTitle = type === 'movies' ? 'MOVIES' : 'TV SHOWS';

	const handleFilterChange = (filter: string) => {
		setCurrentFilter(filter);
	};

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1 className={styles.sectionTitle}>{sectionTitle}</h1>

					<FiltersContainer
						current={currentFilter}
						setCurrent={handleFilterChange}
						setFilterCategory={setFilterCategory}
						type={type}
					/>

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