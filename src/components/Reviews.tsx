import React, { useState } from 'react';
import styles from '../styles/Reviews.module.scss';
import useFetch from '../hooks/useFetch';
import { timeAgo, reviewsFetchUrl } from '../common/Helpers';
import {
	IReviewsData,
	IReviewsProps,
	ReviewsResult,
} from '../common/Interfaces';
import Spinner from './Spinner';

export default function Reviews({ id, type }: IReviewsProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const fetchUrl = reviewsFetchUrl(id, type, currentPage);
	const { data, loading, error } = useFetch<IReviewsData>(fetchUrl);

	const reviews = data && data?.results;

	return (
		<div className={styles.reviews}>
			{loading && <Spinner />}

			{!loading && data && (
				<>
					<h3>Reviews:</h3>

					{loading && <Spinner />}

					{!loading &&
						reviews?.map((review: ReviewsResult) => (
							<div key={`review${review.id}`}>
								<p>
									{review.author}
									<span>{timeAgo(review.created_at)}</span>
								</p>
								<p>{review.content}</p>
							</div>
						))}

					{!loading && reviews && reviews?.length === 0 && (
						<h3>There are no reviews yet.</h3>
					)}
				</>
			)}
		</div>
	);
}
