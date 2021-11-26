import React from 'react';
import styles from '../styles/Filters.module.scss';
import { capitalizeWord } from '../common/Helpers';
import { IFiltersProps } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

const filters = ['popular', 'certification', 'genre', 'year'];

export default function Filters({ current, setCurrent }: IFiltersProps) {
	const filterStyle = (filter: string): string => {
		return `${styles.filter} ${current === filter ? styles.activeFilter : ''}`;
	};

	return (
		<div className={styles.container}>
			<FontAwesomeIcon className={styles.filterIcon} icon={faSlidersH} />
			Filters:
			<ul className={styles.filtersList}>
				{filters.map((filter, index) => (
					<li
						key={`filter${index}`}
						className={filterStyle(filter)}
						onClick={() => setCurrent(filter)}
					>
						{capitalizeWord(filter)}
					</li>
				))}
			</ul>
		</div>
	);
}
