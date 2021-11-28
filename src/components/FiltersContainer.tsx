import React, { useState, MouseEvent } from 'react';
import styles from '../styles/FiltersContainer.module.scss';
import { capitalizeWord } from '../common/Helpers';
import { IFiltersContainerProps } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import Filters from './Filters';

const categories = ['certification', 'genre', 'year'];

export default function FiltersContainer({
	current,
	setCurrent,
	type,
}: IFiltersContainerProps) {
	const [showFilters, setShowFilters] = useState(false);

	const filterButtonStyle =
		styles.filtersButton + (showFilters ? ` ${styles.activeButton}` : '');

	const handleFiltersButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setShowFilters(!showFilters);
	};

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
									<Filters
										current={current}
										setCurrent={setCurrent}
										category={category}
										type={type}
									/>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
