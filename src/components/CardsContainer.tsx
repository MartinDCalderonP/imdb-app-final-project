import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import { cardsContainerNames } from '../common/Helpers';
import { ICardsContainerProps } from '../common/Interfaces';
import { PossiblePost } from '../common/Types';
import Spinner from './Spinner';
import Card from './Card';

export default function CardsContainer({
	loading,
	posts,
	type,
}: ICardsContainerProps) {
	return (
		<div className={styles.cardsContainer}>
			{loading && <Spinner />}

			{!loading &&
				posts?.length > 0 &&
				posts?.map((post: PossiblePost) => (
					<Card
						key={`${type}${post.id}`}
						type={type}
						id={post.id}
						name={cardsContainerNames(post)}
						image={post.poster_path}
					/>
				))}
		</div>
	);
}
