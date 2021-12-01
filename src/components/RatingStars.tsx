import React from 'react';
import styles from '../styles/RatingStars.module.scss';
import { IRatingStarsProps } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';

export default function RatingStars({ rating }: IRatingStarsProps) {
	let ratingStars = [];

	const roundedRating = rating && Math.round(rating);

	for (let i = 0; i < 10; i++) {
		if (roundedRating && i < roundedRating) {
			ratingStars.push(<FontAwesomeIcon key={`star${i}`} icon={solidStar} />);
		} else {
			ratingStars.push(<FontAwesomeIcon key={`star${i}`} icon={outlineStar} />);
		}
	}

	return (
		<>
			{roundedRating && (
				<div className={styles.rating}>
					<h2>{rating}</h2>
					<div className={styles.stars}>{ratingStars}</div>
				</div>
			)}
		</>
	);
}
