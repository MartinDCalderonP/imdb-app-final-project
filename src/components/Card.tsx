import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { cardNavigationUrl } from '../common/Helpers';
import { ICardProps } from '../common/Interfaces';

export default function Card({ id, name, thumbnail, type }: ICardProps) {
	const cardStyle = `${styles.card} ${styles.appearCard}`;

	const navigationUrl = cardNavigationUrl(id, type);

	return (
		<div className={cardStyle}>
			<Link className={styles.cardLink} to={navigationUrl}>
				<div className={styles.cardImage}>
					<img src={thumbnail} alt={name} />
				</div>

				<p>{name}</p>
			</Link>
		</div>
	);
}
