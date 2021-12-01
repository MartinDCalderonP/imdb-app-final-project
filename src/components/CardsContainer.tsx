import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import { cardsContainerNames, cardsContainerImages } from '../common/Helpers';
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
						type={type}
						id={post.id}
						name={cardsContainerNames(post)}
						image={cardsContainerImages(post)}
					/>
				))}
		</div>
	);
}
