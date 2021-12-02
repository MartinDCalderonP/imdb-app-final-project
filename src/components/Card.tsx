import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { cardImageUrl, cardNavigationUrl } from '../common/Helpers';
import { ICardProps } from '../common/Interfaces';
import imageNotFound from '../images/imageNotFound.png';

export default function Card({ type, id, name, image }: ICardProps) {
	const cardStyle = `${styles.card} ${styles.appearCard}`;

	const navigationUrl = cardNavigationUrl(type, id);

	const cardImageStyle = `${styles.cardImage} ${
		!image ? styles.defaultImage : ''
	}`;

	const cardImage = image ? cardImageUrl(image) : imageNotFound;

	return (
		<div className={cardStyle}>
			<Link className={styles.cardLink} to={navigationUrl}>
				<div className={cardImageStyle}>
					<img src={cardImage} alt={name} />
				</div>

				<p>{name}</p>
			</Link>
		</div>
	);
}
