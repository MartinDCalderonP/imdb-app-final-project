import { API } from '../common/Enums';

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
};
