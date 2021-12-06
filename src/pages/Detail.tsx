import React, { useEffect } from 'react';
import styles from '../styles/Detail.module.scss';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { detailFetchUrl } from '../common/Helpers';
import { PossibleDetailPost } from '../common/Types';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import Media from '../components/Media';
import Person from '../components/Person';
import SeasonsList from '../components/SeasonsList';

export default function Detail() {
	const { typeInParams, id, seasonNumber } = useParams();
	const fetchUrl = detailFetchUrl(id, typeInParams);
	const { data, loading, error } = useFetch<PossibleDetailPost>(fetchUrl);

	const isMovieOrTvShowData = data && 'backdrop_path' in data && data;

	const isTVShowData = data && 'first_air_date' in data && data;

	const isPerson = data && 'biography' in data && data;

	return (
		<Layout>
			<div className={styles.detail}>
				{loading && <Spinner />}

				{!loading && data && (
					<>
						{(typeInParams === 'movies' ||
							(typeInParams === 'tvShows' && !seasonNumber)) &&
							isMovieOrTvShowData && (
								<Media id={id} type={typeInParams} data={isMovieOrTvShowData} />
							)}

						{typeInParams === 'person' && isPerson && <Person data={data} />}

						{typeInParams === 'tvShows' && seasonNumber && isTVShowData && (
							<SeasonsList id={data.id} data={isTVShowData} />
						)}
					</>
				)}
			</div>
		</Layout>
	);
}
