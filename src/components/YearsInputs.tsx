import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/YearsInputs.module.scss';
import { IYearsInputsProps } from '../common/Interfaces';
import { validateYearFormat } from '../common/Helpers';

export default function YearsInputs({
	current,
	setCurrent,
}: IYearsInputsProps) {
	const [minYear, setMinYear] = useState('');
	const [maxYear, setMaxYear] = useState('');

	const handleMinYearChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMinYear(e.target.value);
	};

	const handleMaxYearChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMaxYear(e.target.value);
	};

	const handleSubmitYearRange = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (minYear === '' || maxYear === '') {
			return;
		}

		if (validateYearFormat(minYear) && validateYearFormat(maxYear)) {
			setCurrent(minYear + '-' + maxYear);
		}
	};

	return (
		<>
			<div className={styles.inputsContainer}>
				<label className={styles.inputsLabels}>
					From
					<input
						className={styles.input}
						name="min"
						maxLength={10}
						value={minYear}
						onChange={handleMinYearChange}
					/>
				</label>

				<label className={styles.inputsLabels}>
					To
					<input
						className={styles.input}
						name="max"
						maxLength={10}
						value={maxYear}
						onChange={handleMaxYearChange}
					/>
				</label>

				<i className={styles.formatText}>
					Format: YYYY-MM-DD, YYYY-MM, or YYYY
				</i>

				<button className={styles.yearsButton} onClick={handleSubmitYearRange}>
					Filter by Year Range
				</button>
			</div>
		</>
	);
}
