import React, { useState, MouseEvent } from 'react';
import styles from '../styles/FiltersContainer.module.scss';
import { capitalizeWord } from '../common/Helpers';
import { IFiltersContainerProps } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Filters from './Filters';
import YearsInputs from './YearsInputs';

export default function FiltersContainer({
	current,
	type,
}: IFiltersContainerProps) {
	const [showFilters, setShowFilters] = useState(false);

	const filterButtonStyle =
		styles.filtersButton + (showFilters ? ` ${styles.activeButton}` : '');

	const handleFiltersButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShowFilters(!showFilters);
	};

	const categories =
		type === 'movies' ? ['certification', 'genre', 'year'] : ['genre', 'year'];

	return (
		<div className={styles.filtersContainer}>
			<button className={filterButtonStyle} onClick={handleFiltersButtonClick}>
				<FontAwesomeIcon className={styles.filterIcon} icon={faSlidersH} />
				FILTERS
			</button>

			{showFilters && (
				<div className={styles.categoriesContainer}>
					<ul className={styles.categories}>
						{categories.map((category, index) => (
							<li key={`category${index}`} className={styles.category}>
								<p className={styles.categoryName}>
									{capitalizeWord(category)}
								</p>

								<div className={styles.listsContainer}>
									{category !== 'year' && (
										<Filters
											current={current}
											category={category}
											type={type}
										/>
									)}

									{category === 'year' && (
										<YearsInputs current={current} type={type} />
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
