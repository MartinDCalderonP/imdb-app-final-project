import React from 'react';
import styles from '../styles/Credits.module.scss';
import { ICreditsProps, ICreditsData, Cast } from '../common/Interfaces';
import { creditImageUrl, creditsFetchUrl } from '../common/Helpers';
import useFetch from '../hooks/useFetch';
import Spinner from './Spinner';
import Avatar from './Avatar';

export default function Credits({ id, type }: ICreditsProps) {
	const fetchUrl = creditsFetchUrl(id, type);
	const { data, loading, error } = useFetch<ICreditsData>(fetchUrl);

	const castList = data && data?.cast;
	const crewList = data && data?.crew;

	const filteredCrewList = crewList?.filter((crew: Cast) =>
		castList?.every((cast: Cast) => cast.id !== crew.id)
	);

	return (
		<>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h1 className={styles.title}>{`Cast & Crew`}</h1>
					<div className={styles.credits}>
						<ul className={styles.list}>
							{castList?.map((cast: Cast) => (
								<li className={styles.listItem} key={cast.id}>
									{cast.profile_path ? (
										<img
											className={styles.image}
											src={creditImageUrl(cast.profile_path)}
											alt={cast.name}
										/>
									) : (
										<div className={styles.avatar}>
											<Avatar />
										</div>
									)}

									<div className={styles.text}>
										<p>{cast.name}</p>
										<p className={styles.secondaryText}>as {cast.character}</p>
									</div>
								</li>
							))}
						</ul>

						<ul className={styles.list}>
							{filteredCrewList?.map((cast: Cast) => (
								<li className={styles.listItem} key={cast.id}>
									{cast.profile_path ? (
										<img
											className={styles.image}
											src={creditImageUrl(cast.profile_path)}
											alt={cast.name}
										/>
									) : (
										<div className={styles.avatar}>
											<Avatar />
										</div>
									)}

									<div className={styles.text}>
										<p>{cast.name}</p>
										<p className={styles.secondaryText}>as {cast.job}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</>
	);
}
