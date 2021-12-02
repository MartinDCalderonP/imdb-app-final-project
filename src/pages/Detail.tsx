import React from 'react';
import styles from '../styles/Detail.module.scss';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { IDetailProps } from '../common/Interfaces';
import { detailFetchUrl, detailImageUrl } from '../common/Helpers';
import { PossibleDetailPost } from '../common/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import RatingStars from '../components/RatingStars';
import Carousel from '../components/Carousel';
import Credits from '../components/Credits';
import Section from '../components/Section';
import Reviews from '../components/Reviews';

export default function Detail({ type }: IDetailProps) {
	const { id } = useParams();
	const fetchUrl = detailFetchUrl(id!, type);
	const { data, loading, error } = useFetch<PossibleDetailPost>(fetchUrl);

	const currentTitle =
		data && 'original_title' in data
			? data?.original_title
			: data?.original_name;

	const currentImage = detailImageUrl(data?.poster_path);

	return (
		<Layout>
			<div className={styles.detail}>
				{loading && <Spinner />}

				{!loading && data && (
					<>
						<h1 className={styles.title}>{currentTitle}</h1>
						<div className={styles.row}>
							<div className={styles.leftColumn}>
								<div className={styles.image}>
									<img src={currentImage} alt={currentTitle} />
								</div>
							</div>

							<div className={styles.dividerColumn} />

							<div className={styles.rightColumn}>
								<RatingStars rating={data?.vote_average} />

								<div className={styles.dividerRow} />

								{data?.overview && (
									<div className={styles.overview}>
										<p>{data.overview}</p>
									</div>
								)}

								<div className={styles.information}>
									<h3>Information</h3>

									<p>
										<b>Name: </b>
										{currentTitle}
									</p>

									<p>
										<b>Genres: </b>
										{data?.genres?.map((genre) => genre.name).join(', ')}
									</p>

									<a className={styles.website} href={data?.homepage}>
										Official website
										<FontAwesomeIcon icon={faExternalLinkAlt} />
									</a>
								</div>
							</div>
						</div>

						<Carousel id={id} type={type} />

						<Credits id={id} type={type} />

						<Section id={id} type={type} />

						<Reviews id={id} type={type} />
					</>
				)}
			</div>
		</Layout>
	);
}
