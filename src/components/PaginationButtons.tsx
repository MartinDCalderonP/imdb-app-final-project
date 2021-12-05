import React, { useMemo } from 'react';
import styles from '../styles/PaginationButtons.module.scss';
import { IPaginationButtons } from '../common/Interfaces';
import Chevron from './Chevron';

export default function PaginationButtons({
	totalPosts,
	postsPerPage,
	paginate,
	currentPage,
	type,
}: IPaginationButtons) {
	const pagesNumbers = useMemo(() => {
		return Array.from(
			{ length: Math.ceil(totalPosts / postsPerPage) },
			(_, i) => 1 + i
		);
	}, [totalPosts, postsPerPage]);

	const firstNumbers = useMemo(() => {
		return pagesNumbers.slice(0, 2);
	}, [pagesNumbers]);

	const middleNumbers = useMemo(() => {
		if (pagesNumbers.length <= 3) {
			return pagesNumbers;
		}

		if (currentPage <= 3) {
			return pagesNumbers.slice(0, 3);
		}

		if (currentPage >= pagesNumbers.length - 2) {
			return pagesNumbers.slice(pagesNumbers.length - 3);
		}

		return pagesNumbers.slice(currentPage - 2, currentPage + 1);
	}, [pagesNumbers, currentPage]);

	const lastNumbers = useMemo(() => {
		return pagesNumbers.slice(pagesNumbers.length - 2);
	}, [pagesNumbers]);

	const renderPageNumbers = useMemo(() => {
		if (pagesNumbers.length <= 3) {
			return pagesNumbers;
		}

		if (currentPage <= 3) {
			return [...middleNumbers, '...', ...lastNumbers];
		}

		if (currentPage >= pagesNumbers.length - 2) {
			return ['...', ...lastNumbers];
		}

		return [...firstNumbers, '...', ...middleNumbers, '...', ...lastNumbers];
	}, [pagesNumbers, currentPage, firstNumbers, lastNumbers, middleNumbers]);

	return (
		<div className={styles.buttonsContainer}>
			<Chevron
				className={styles.chevronButton}
				onClick={() => paginate(currentPage - 1)}
				orientation="left"
			/>

			{renderPageNumbers?.map((pageNumber: number | string) => {
				if (typeof pageNumber === 'string') {
					return pageNumber;
				} else {
					return (
						<button
							key={`${type}paginationButton${pageNumber}`}
							className={
								styles.pageButton +
								(currentPage === pageNumber ? ` ${styles.active}` : '')
							}
							onClick={() => paginate(pageNumber)}
						>
							{pageNumber}
						</button>
					);
				}
			})}

			<Chevron
				className={styles.chevronButton}
				onClick={() => paginate(currentPage + 1)}
				orientation="right"
			/>
		</div>
	);
}
