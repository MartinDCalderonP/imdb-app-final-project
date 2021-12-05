import React from 'react';
import styles from '../styles/Filters.module.scss';
import { filtersFetchUrl } from '../common/Helpers';
import { Certification, Genre, IFiltersProps } from '../common/Interfaces';
import useFetch from '../hooks/useFetch';
import Spinner from './Spinner';
import { PossibleFilterData } from '../common/Types';

export default function Filters({
	current,
	setCurrent,
	category,
	setFilterCategory,
	type,
}: IFiltersProps) {
	const fetchUrl = filtersFetchUrl(category, type);
	const { data, loading, error } = useFetch<PossibleFilterData>(fetchUrl);

	const filterStyle = (filter: string): string => {
		return (
			styles.filterButton +
			(current === filter ? ` ${styles.activeFilter}` : '')
		);
	};

	const sortedCertifications =
		category === 'certification' &&
		data &&
		'certifications' in data &&
		data?.certifications?.US?.sort((a: Certification, b: Certification) => {
			return a.order - b.order;
		});

	const firstGenres =
		category === 'genre' &&
		data &&
		'genres' in data &&
		data?.genres?.slice(0, 10);
	const lastGenres =
		category === 'genre' && data && 'genres' in data && data?.genres?.slice(10);

	const handleFilterButtonClick = (filter: string) => {
		setCurrent(filter);
		setFilterCategory(category);
	};

	return (
		<>
			<ul className={styles.filtersList}>
				{loading && <Spinner />}

				{!loading &&
					category === 'certification' &&
					sortedCertifications &&
					sortedCertifications.map((certification: Certification) => (
						<li
							key={`certification${certification.order}`}
							className={styles.filtersListItem}
						>
							<button
								className={filterStyle(certification.certification)}
								onClick={() =>
									handleFilterButtonClick(certification.certification)
								}
							>
								{certification.certification}
							</button>
						</li>
					))}

				{!loading &&
					category === 'genre' &&
					firstGenres &&
					firstGenres.map((genre: Genre) => (
						<li key={`genre${genre.id}`} className={styles.filtersListItem}>
							<button
								className={filterStyle(genre.id.toString())}
								onClick={() => handleFilterButtonClick(genre.id.toString())}
							>
								{genre.name}
							</button>
						</li>
					))}
			</ul>

			{!loading && category === 'genre' && (
				<ul className={styles.filtersList}>
					{lastGenres &&
						lastGenres.map((genre: Genre) => (
							<li key={`genre${genre.id}`} className={styles.filtersListItem}>
								<button
									className={filterStyle(genre.id.toString())}
									onClick={() => handleFilterButtonClick(genre.id.toString())}
								>
									{genre.name}
								</button>
							</li>
						))}
				</ul>
			)}
		</>
	);
}
