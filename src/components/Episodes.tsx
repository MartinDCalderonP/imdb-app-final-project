import React from 'react';
import styles from '../styles/Episodes.module.scss';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { Episode, IEpisodesProps, ISeasonDetail } from '../common/Interfaces';
import { episodesFetchUrl, imageW300Url } from '../common/Helpers';
import Spinner from './Spinner';
import imageNotFound from '../images/imageNotFound.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Episodes({ id }: IEpisodesProps) {
	const { seasonNumber } = useParams();
	const fetchUrl = episodesFetchUrl(id, seasonNumber);
	const { data, loading, error } = useFetch<ISeasonDetail>(fetchUrl);

	return (
		<div className={styles.episodes}>
			<h1 className={styles.title}>Episodes</h1>

			{loading && <Spinner />}

			{!loading && data && (
				<div className={styles.list}>
					{data?.episodes?.map((episode: Episode) => (
						<div key={`episode${episode.id}`} className={styles.listItem}>
							<div
								className={`${styles.image} ${
									!episode.still_path ? styles.defaultImage : ''
								}`}
							>
								<img
									src={
										episode.still_path
											? imageW300Url(episode.still_path)
											: imageNotFound
									}
									alt={`Episode ${episode.episode_number}`}
								/>
							</div>

							<div className={styles.information}>
								<h2 className={styles.episodeTitle}>
									Episode {episode.episode_number}
									<span>
										{episode.vote_average ? (
											<>
												{episode.vote_average}/10{' '}
												<FontAwesomeIcon
													icon={faStar}
													className={styles.starIcon}
												/>
											</>
										) : (
											'No rating'
										)}
									</span>
								</h2>
								<h3>{episode.name}</h3>
								{episode.overview ? (
									<p>{episode.overview}</p>
								) : (
									<p>No overview</p>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
