import React from 'react';
import styles from '../styles/Filters.module.scss';
import { filtersFetchUrl } from '../common/Helpers';
import { IFiltersProps } from '../common/Interfaces';
import useFetch from '../hooks/useFetch';
import Spinner from './Spinner';

export default function Filters({
	current,
	setCurrent,
	category,
	type,
}: IFiltersProps) {
	const fetchUrl = filtersFetchUrl(category, type);
	const { data, loading, error } = useFetch<any>(fetchUrl);

	const filterStyle = (filter: string): string => {
		return (
			styles.filterButton +
			(current === filter ? ` ${styles.activeFilter}` : '')
		);
	};

	const sortedCertifications =
		category === 'certification' &&
		data?.certifications?.US?.sort((a: any, b: any) => {
			return a.order - b.order;
		});

	const firstGenres = category === 'genre' && data?.genres?.slice(0, 10);

	const lastGenres = category === 'genre' && data?.genres?.slice(10);

	return (
		<>
			<ul className={styles.filtersList}>
				{loading && <Spinner />}

				{!loading &&
					category === 'certification' &&
					sortedCertifications.map((certification: any) => (
						<li
							key={`certification${certification.order}`}
							className={styles.filtersListItem}
						>
							<button
								className={filterStyle(certification.certification)}
								onClick={() => setCurrent(certification.certification)}
								disabled={current === certification}
							>
								{certification.certification}
							</button>
						</li>
					))}

				{!loading &&
					category === 'genre' &&
					firstGenres.map((genre: any) => (
						<li key={`genre${genre.id}`} className={styles.filtersListItem}>
							<button
								className={filterStyle(genre.name)}
								onClick={() => setCurrent(genre.name)}
								disabled={current === genre}
							>
								{genre.name}
							</button>
						</li>
					))}
			</ul>

			{!loading && category === 'genre' && (
				<ul className={styles.filtersList}>
					{lastGenres.map((genre: any) => (
						<li key={`genre${genre.id}`} className={styles.filtersListItem}>
							<button
								className={filterStyle(genre.name)}
								onClick={() => setCurrent(genre.name)}
								disabled={current === genre}
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
