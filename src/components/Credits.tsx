import React from 'react';
import styles from '../styles/Credits.module.scss';
import { ICreditsProps, ICreditsData, Cast } from '../common/Interfaces';
import { creditsFetchUrl } from '../common/Helpers';
import useFetch from '../hooks/useFetch';
import Spinner from './Spinner';
import CreditsItem from './CreditsItem';

export default function Credits({ id, type }: ICreditsProps) {
	const fetchUrl = creditsFetchUrl(id, type);
	const { data, loading, error } = useFetch<ICreditsData>(fetchUrl);

	const castList = data && data?.cast;
	const crewList = data && data?.crew;

	const filteredCrewList = crewList?.filter((crew: Cast) =>
		castList?.every((cast: Cast) => cast.id !== crew.id)
	);

	const credits = castList && filteredCrewList && [castList, filteredCrewList];

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1 className={styles.title}>{`Cast & Crew`}</h1>
					<div className={styles.credits}>
						{credits?.map((credit: Cast[], index) => (
							<div key={index} className={styles.list}>
								{credit?.map((cast: Cast, index: number) => (
									<CreditsItem key={index} cast={cast} />
								))}
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}
