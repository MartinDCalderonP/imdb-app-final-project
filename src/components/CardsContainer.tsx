import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import {
	cardsContainerNames,
	cardsContainerImages,
	episodesCount,
	seasonNumber,
	currentType,
	cardsContainerRanking,
} from '../common/Helpers';
import { ICardsContainerProps } from '../common/Interfaces';
import { PossibleSectionPost } from '../common/Types';
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
				posts?.map((post: PossibleSectionPost) => (
					<Card
						key={`${type}${post.id}`}
						type={currentType(post, type)}
						id={post.id}
						ranking={cardsContainerRanking(post)}
						name={cardsContainerNames(post)}
						image={cardsContainerImages(post)}
						seasonNumber={seasonNumber(post)}
						episodesCount={episodesCount(post)}
					/>
				))}
		</div>
	);
}
