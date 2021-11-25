import React from 'react';
import styles from '../styles/CardsContainer.module.scss';
import { ICardsContainerProps } from '../common/Interfaces';
import { PossiblePost } from '../common/Types';
import Spinner from './Spinner';
import Card from './Card';

export default function CardsContainer({
	loading,
	posts,
	type,
}: ICardsContainerProps) {
	const cardName = (post: PossiblePost) => {
		if ('title' in post) {
			return post.title;
		} else if ('name' in post) {
			return post.name;
		} else {
			return 'Unknown Name or Title';
		}
	};

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
						name={cardName(post)}
						image={post.poster_path}
					/>
				))}
		</div>
	);
}
