import { API } from '../common/Enums';

export const homeFetchUrl = (
	currentPage: number,
	filter: string,
	type: string
): string => {
	const paginationParams = `?page=${currentPage}`;

	return type === 'movies'
		? `${API.base}${API.movies}${filter}${paginationParams}`
		: `${API.base}${API.tvShows}${filter}${paginationParams}`;
};
