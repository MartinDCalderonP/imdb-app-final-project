import React, { useMemo } from 'react';
import styles from '../styles/PaginationButtons.module.scss';
import { IPaginationButtons } from '../common/Interfaces';

export default function PaginationButtons({
	totalPosts,
	postsPerPage,
	paginate,
	currentPage,
}: IPaginationButtons) {
	const pagesNumbers = useMemo(() => {
		return Array.from(
			{ length: Math.ceil(totalPosts / postsPerPage) },
			(_, i) => 1 + i
		);
	}, [totalPosts, postsPerPage]);

	const handlePageButtonClick = (pageNumber: number) => {
		paginate(pageNumber);
	};

	return (
		<div className={styles.buttonsContainer}>
			{pagesNumbers?.map((pageNumber: number) => (
				<button
					key={`paginationButton${pageNumber}`}
					className={
						styles.pageButton +
						(currentPage === pageNumber ? ` ${styles.active}` : '')
					}
					onClick={() => handlePageButtonClick(pageNumber)}
				>
					{pageNumber}
				</button>
			))}
		</div>
	);
}
