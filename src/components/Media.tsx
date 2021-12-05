import React from 'react';
import styles from '../styles/Media.module.scss';
import { currentSeasons, currentTitle, imageW300Url } from '../common/Helpers';
import { IMediaProps } from '../common/Interfaces';
import RatingStars from '../components/RatingStars';
import CardsContainer from '../components/CardsContainer';
import Carousel from '../components/Carousel';
import Credits from './Credits';
import Section from '../components/Section';
import Reviews from '../components/Reviews';
import ExternalLink from './ExternalLink';

export default function Media({ id, type, data }: IMediaProps) {
	const title = currentTitle(data);
	const image = imageW300Url(data?.poster_path);
	const seasons = currentSeasons(data);

	return (
		<>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.row}>
				<div className={styles.leftColumn}>
					<div className={styles.image}>
						<img src={image} alt={title} />
					</div>
				</div>

				<div className={styles.dividerColumn} />

				<div className={styles.rightColumn}>
					{data?.vote_average ? (
						<>
							<RatingStars rating={data?.vote_average} />

							<div className={styles.dividerRow} />
						</>
					) : (
						<></>
					)}

					{data?.overview && (
						<div className={styles.description}>
							<p>{data.overview}</p>
						</div>
					)}

					<div className={styles.information}>
						<h3>Information</h3>

						<p>
							<b>Name: </b>
							{title}
						</p>

						<p>
							<b>Genres: </b>
							{data?.genres?.map((genre) => genre.name).join(', ')}
						</p>

						{data?.homepage && <ExternalLink url={data?.homepage} />}
					</div>
				</div>
			</div>

			{type === 'tvShows' && seasons && (
				<>
					<h1 className={styles.seasonsTitle}>Seasons</h1>

					<CardsContainer loading={false} posts={seasons} type="seasons" />
				</>
			)}

			<Carousel id={id} type={type} />

			<Credits id={id} type={type} />

			<Section id={id} type={type} />

			<Reviews id={id} type={type} />
		</>
	);
}
