import React, { useState } from 'react';
import styles from '../styles/Section.module.scss';
import useFetch from '../hooks/useFetch';
import { sectionFetchUrl } from '../common/Helpers';
import { ISectionProps } from '../common/Interfaces';
import { PossibleData } from '../common/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import CardsContainer from '../components/CardsContainer';

export default function Section({ type }: ISectionProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [filter, setFilter] = useState('popular');
	const fetchUrl = sectionFetchUrl(currentPage, filter, type);
	const { data, loading, error } = useFetch<PossibleData>(fetchUrl);

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1 className={styles.sectionTitle}>
						{filter.toUpperCase()} TV SHOWS
					</h1>

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
