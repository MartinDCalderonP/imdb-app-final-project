import React, { useState } from 'react';
import styles from '../styles/SeasonsList.module.scss';
import { Link } from 'react-router-dom';
import { ISeasonsListProps } from '../common/Interfaces';
import {
	imageW200Url,
	seasonsListTitleUrl,
	seasonsNavigationUrl,
} from '../common/Helpers';
import Episodes from './Episodes';

export default function SeasonsList({ id, title, seasons }: ISeasonsListProps) {
	const titleUrl = seasonsListTitleUrl(id);

	return (
		<>
			<a href={titleUrl} className={styles.title}>
				<h1>{title}</h1>
			</a>

			<div className={styles.row}>
				<div className={styles.list}>
					{seasons.map((season) => (
						<Link
							key={`season${season.season_number}`}
							className={styles.listItem}
							to={seasonsNavigationUrl(id, season.season_number)}
						>
							<div className={styles.image}>
								<img
									src={imageW200Url(season.poster_path)}
									alt={`Season ${season.season_number}`}
								/>
							</div>

							<div className={styles.information}>
								<p>{season.name}</p>
								<p>Episodes: {season.episode_count}</p>
							</div>
						</Link>
					))}
				</div>

				<div className={styles.divider} />

				<Episodes id={id} />
			</div>
		</>
	);
}
