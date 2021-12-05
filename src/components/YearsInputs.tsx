import React, { useState, ChangeEvent, MouseEvent } from 'react';
import styles from '../styles/YearsInputs.module.scss';
import { useNavigate } from 'react-router';
import { IYearsInputsProps } from '../common/Interfaces';
import { validateYearFormat, yearsNavigationUrl } from '../common/Helpers';

export default function YearsInputs({ current, type }: IYearsInputsProps) {
	const navigate = useNavigate();

	const years = current?.slice(5).split('&to=');
	const actualYear = new Date().getFullYear().toString();
	const [minYear, setMinYear] = useState((years && years[0]) || '1874');
	const [maxYear, setMaxYear] = useState((years && years[0]) || actualYear);

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
			const navigationUrl = yearsNavigationUrl(minYear, maxYear, type);

			navigate(navigationUrl);
		}
	};

	return (
		<>
			<form className={styles.inputsContainer}>
				<label className={styles.inputsLabels}>
					From
					<input
						className={styles.input}
						name="min"
						maxLength={4}
						value={minYear}
						onChange={handleMinYearChange}
					/>
				</label>

				<label className={styles.inputsLabels}>
					To
					<input
						className={styles.input}
						name="max"
						maxLength={4}
						value={maxYear}
						onChange={handleMaxYearChange}
					/>
				</label>

				<i className={styles.formatText}>Format: YYYY</i>

				<button className={styles.yearsButton} onClick={handleSubmitYearRange}>
					Filter by Year Range
				</button>
			</form>
		</>
	);
}
