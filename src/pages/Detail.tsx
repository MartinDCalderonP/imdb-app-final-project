import React from 'react';
import styles from '../styles/Detail.module.scss';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { IDetailProps } from '../common/Interfaces';
import { detailFetchUrl, imageW300Url } from '../common/Helpers';
import { PossibleDetailPost } from '../common/Types';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Media from '../components/Media';
import Person from '../components/Person';
import SeasonsList from '../components/SeasonsList';

export default function Detail({ type }: IDetailProps) {
	const { id } = useParams();
	const fetchUrl = detailFetchUrl(id, type);
	const { data, loading, error } = useFetch<PossibleDetailPost>(fetchUrl);

	const isMovieOrTvShowData = data && 'backdrop_path' in data && data;

	const isTVShowData = data && 'first_air_date' in data && data;

	const isPerson = data && 'biography' in data && data;

	console.log(data);

	return (
		<Layout>
			<div className={styles.detail}>
				{loading && <Spinner />}

				{!loading && data && (
					<>
						{(type === 'movies' || type === 'tvShows') &&
							isMovieOrTvShowData && (
								<Media id={id} type={type} data={isMovieOrTvShowData} />
							)}

						{type === 'person' && isPerson && <Person data={data} />}

						{type === 'seasons' && isTVShowData && (
							<SeasonsList id={data.id} data={isTVShowData} />
						)}
					</>
				)}
			</div>
		</Layout>
	);
}
