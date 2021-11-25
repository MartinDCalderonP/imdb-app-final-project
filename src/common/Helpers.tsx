import { Paths, API } from '../common/Enums';
import { IObjects } from './Interfaces';

export const homeFetchUrl = (
	currentPage: number,
	filter: string,
	type: string
): string => {
	const paginationParams = `?page=${currentPage}`;

	const fetchUrls: IObjects = {
		movies: `${API.base}${API.movies}${filter}${paginationParams}`,
		tvShows: `${API.base}${API.tvShows}${filter}${paginationParams}`,
	};

	return fetchUrls[type];
};

export const cardNavigationUrl = (id: number, type: string): string => {
	const navigationUrls: IObjects = {
		movies: `${Paths.movies}/${id}`,
		tvShows: `${Paths.tvShows}/${id}`,
	};

	return navigationUrls[type];
};
