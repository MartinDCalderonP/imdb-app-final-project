import React, { useEffect, useState, useCallback } from 'react';
import styles from '../styles/Carousel.module.scss';
import _ from 'lodash';
import useFetch from '../hooks/useFetch';
import { carouselFetchUrl, carouselImageUrl } from '../common/Helpers';
import { ICarouselProps, IDetailImages } from '../common/Interfaces';
import Spinner from './Spinner';
import Chevron from './Chevron';

export default function Carousel({ id, type }: ICarouselProps) {
	const fetchUrl = carouselFetchUrl(id, type);
	const { data, loading, error } = useFetch<IDetailImages>(fetchUrl);
	const [currentSlide, setCurrentSlide] = useState(0);

	const backdrops = data && 'backdrops' in data && data.backdrops;

	useEffect(() => {
		let interval: NodeJS.Timer;

		if (backdrops) {
			interval = setInterval(() => {
				setCurrentSlide((current) =>
					current === backdrops?.length - 1 ? 0 : current + 1
				);
			}, 5000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [backdrops]);

	const throttledPreviousClick = useCallback(
		_.throttle(() => {
			if (backdrops) {
				setCurrentSlide((current) =>
					current === 0 ? backdrops?.length - 1 : current - 1
				);
			}
		}, 1000),
		[setCurrentSlide, backdrops]
	);

	const handlePreviousClick = () => {
		throttledPreviousClick();
	};

	const throttledNextClick = useCallback(
		_.throttle(() => {
			if (backdrops) {
				setCurrentSlide((current) =>
					current === backdrops?.length - 1 ? 0 : current + 1
				);
			}
		}, 1000),
		[setCurrentSlide, backdrops]
	);

	const handleNextClick = () => {
		throttledNextClick();
	};

	const handleDotClick = (carouselStep: number) => {
		setCurrentSlide(carouselStep);
	};

	return (
		<>
			{loading && <Spinner />}

			{!loading && backdrops && backdrops.length > 0 && (
				<div className={styles.carousel}>
					<Chevron
						className={styles.previous}
						onClick={handlePreviousClick}
						orientation="left"
					/>

					<div className={`${styles.carouselItem} ${styles.fade}`}>
						<img
							src={carouselImageUrl(backdrops[currentSlide]?.file_path)}
							alt={backdrops[currentSlide]?.file_path}
						/>
					</div>

					<Chevron
						className={styles.next}
						onClick={handleNextClick}
						orientation="right"
					/>

					<div className={styles.dotsContainer}>
						{backdrops?.map((_: any, i: number) => (
							<span
								className={
									styles.dot + (currentSlide === i ? ` ${styles.active}` : '')
								}
								key={`dot${i}`}
								onClick={() => handleDotClick(i)}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
}
