import React from 'react';
import styles from '../styles/Filters.module.scss';
import { useNavigate } from 'react-router';
import useFetch from '../hooks/useFetch';
import { filterNavigationUrl, filtersFetchUrl } from '../common/Helpers';
import { Certification, Genre, IFiltersProps } from '../common/Interfaces';
import { PossibleFilterData } from '../common/Types';
import Spinner from './Spinner';

export default function Filters({ current, category, type }: IFiltersProps) {
	const navigate = useNavigate();
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

	const handleFilterClick = (filter: string) => {
		const navigationUrl = filterNavigationUrl(filter, category, type);

		navigate(navigationUrl);
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
								onClick={() => handleFilterClick(certification.certification)}
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
								onClick={() => handleFilterClick(genre.id.toString())}
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
									onClick={() => handleFilterClick(genre.id.toString())}
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
