import React from 'react';
import styles from '../styles/Seasons.module.scss';
import { ISeasonsProps } from '../common/Interfaces';
import { seasonImageUrl } from '../common/Helpers';
import imageNotFound from '../images/imageNotFound.png';

export default function Seasons({ posts }: ISeasonsProps) {
	const seasonStyle = `${styles.season} ${styles.appearCard}`;
	return (
		<div className={styles.seasons}>
			{posts?.map((post, index) => (
				<div key={index} className={seasonStyle}>
					<div className={styles.image}>
						<img
							src={seasonImageUrl(post.poster_path) || imageNotFound}
							alt={post.name}
						/>
					</div>
					<div className={styles.information}>
						<h3>{post.name}</h3>
						<h4>{`Episodes: ${post.episode_count}`}</h4>
					</div>
				</div>
			))}
		</div>
	);
}
