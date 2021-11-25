import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { cardNavigationUrl } from '../common/Helpers';
import { ICardProps } from '../common/Interfaces';

export default function Card({ type, id, name, image }: ICardProps) {
	const cardStyle = `${styles.card} ${styles.appearCard}`;

	const navigationUrl = cardNavigationUrl(type, id);

	return (
		<div className={cardStyle}>
			<Link className={styles.cardLink} to={navigationUrl}>
				{image && (
					<div className={styles.cardImage}>
						<img src={image} alt={name} />
					</div>
				)}

				<p>{name}</p>
			</Link>
		</div>
	);
}
