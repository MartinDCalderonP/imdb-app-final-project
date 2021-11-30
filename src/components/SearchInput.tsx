import React, { useState, ChangeEvent, MouseEvent, useCallback } from 'react';
import styles from '../styles/SearchInput.module.scss';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { searchNavigationUrl } from '../common/Helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchInput() {
	const [query, setQuery] = useState<string>('');
	let navigate = useNavigate();

	const searchQuery = (query: string) => {
		if (query !== '') {
			const navigationUrl = searchNavigationUrl(query);

			navigate(navigationUrl);
		}
	};

	const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		debounceQuery(e.target.value);
	};

	const debounceQuery = useCallback(
		debounce((query) => {
			searchQuery(query);
		}, 500),
		[searchQuery]
	);

	const handleSearchButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		searchQuery(query);
	};

	return (
		<form className={styles.searchForm} autoComplete="off">
			<div className={styles.searchInput}>
				<input
					value={query}
					onChange={handleQueryChange}
					type="text"
					name="search"
					placeholder="Search"
				/>

				<button
					className={styles.searchButton}
					onClick={handleSearchButtonClick}
				>
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</div>
		</form>
	);
}
