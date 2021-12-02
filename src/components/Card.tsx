import React from 'react';
import styles from '../styles/Card.module.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { cardImageUrl, cardNavigationUrl } from '../common/Helpers';
import { ICardProps } from '../common/Interfaces';
import imageNotFound from '../images/imageNotFound.png';

export default function Card({
	type,
	id,
	name,
	image,
	seasonNumber,
	episodesCount,
}: ICardProps) {
	seasonNumber = seasonNumber || 0;

	const location = useLocation();

	const navigationUrl = cardNavigationUrl(
		type,
		id,
		location.pathname,
		seasonNumber
	);

	const cardStyle = `${styles.card} ${styles.appearCard} ${
		type === 'seasons' ? styles.horizontal : ''
	}`;

	const cardLinkStyle = `${styles.cardLink} ${
		type === 'seasons' ? styles.horizontal : ''
	}`;

	const cardImageStyle = `${styles.cardImage} ${
		!image ? styles.defaultImage : ''
	} ${type === 'seasons' ? styles.horizontal : ''}`;

	const cardImage = image ? cardImageUrl(image) : imageNotFound;

	const cardInformationStlye = `${styles.information} ${
		type === 'seasons' ? styles.horizontal : ''
	}`;

	return (
		<div className={cardStyle}>
			{type.length > 0 && (
				<Link className={cardLinkStyle} to={navigationUrl}>
					<div className={cardImageStyle}>
						<img src={cardImage} alt={name} />
					</div>

					<div className={cardInformationStlye}>
						<p>{name}</p>
						{type === 'seasons' && <p>Episodes: {episodesCount}</p>}
					</div>
				</Link>
			)}
		</div>
	);
}
