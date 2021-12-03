import React from 'react';
import styles from '../styles/Person.module.scss';
import { mmddyyyDate, imageW200Url, formatGender } from '../common/Helpers';
import { IPersonProps } from '../common/Interfaces';
import ExternalLink from './ExternalLink';

export default function Person({ data }: IPersonProps) {
	const {
		name,
		also_known_as,
		birthday,
		deathday,
		biography,
		gender,
		place_of_birth,
		profile_path,
		homepage,
	} = data;

	const formattedBirthday = mmddyyyDate(birthday);
	const formattedDeathday = deathday && mmddyyyDate(deathday);
	const image = imageW200Url(profile_path);
	const formattedGender = formatGender(gender);

	return (
		<>
			<h1>{name}</h1>
			<p className={styles.dates}>
				{formattedBirthday && formattedBirthday}
				{formattedDeathday && ` - ${formattedDeathday}`}
			</p>
			<div className={styles.row}>
				<div className={styles.leftColumn}>
					<img src={image} alt={name} />
					<h2 className={styles.subtitle}>Also known as</h2>
					<ul className={styles.akaList}>
						{also_known_as?.map((translatedName, index) => (
							<li key={index}>{translatedName}</li>
						))}
					</ul>
				</div>

				<div className={styles.dividerColumn} />

				<div className={styles.rightColumn}>
					<p className={styles.description}>{biography}</p>

					<div className={styles.information}>
						<h3>Information</h3>
						{place_of_birth && (
							<p>
								<b>Place of birth:</b> {place_of_birth}
							</p>
						)}

						<p>
							<b>Gender:</b> {formattedGender}
						</p>

						{homepage && <ExternalLink url={homepage} />}
					</div>
				</div>
			</div>
		</>
	);
}
