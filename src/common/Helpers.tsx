import { Paths, API } from './Enums';
import { IObjects } from './Interfaces';
import { PossibleSectionPost } from './Types';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const sectionFetchUrl = (currentPage: number, type: string): string => {
	const paginationParams = `?page=${currentPage}`;

	const fetchUrls: IObjects = {
		movies: `${API.base}${API.popularMovies}${paginationParams}`,
		tvShows: `${API.base}${API.popularTvShows}${paginationParams}`,
	};

	return fetchUrls[type];
};

export const cardsContainerNames = (post: PossibleSectionPost): string => {
	return 'title' in post
		? post.title
		: 'name' in post
		? post.name
		: 'Unknown Name or Title';
};

export const cardNavigationUrl = (type: string, id: number): string => {
	const navigationUrls: IObjects = {
		movies: `${Paths.movies}/${id}`,
		tvShows: `${Paths.tvShows}/${id}`,
	};

	return navigationUrls[type];
};

export const cardImageUrl = (image: string): string => {
	return `${API.images}${API.imageWidth200}${image}`;
};

export const filtersFetchUrl = (category: string, type: string): string => {
	const moviesFiltersFetchUrls: IObjects = {
		certification: `${API.base}${API.moviesCertifications}?`,
		genre: `${API.base}${API.moviesGenres}?`,
	};

	const tvShowsFiltersFetchUrls: IObjects = {
		certification: `${API.base}${API.tvShowsCertifications}?`,
		genre: `${API.base}${API.tvShowsGenres}?`,
	};

	return type === 'movies'
		? moviesFiltersFetchUrls[category]
		: tvShowsFiltersFetchUrls[category];
};

export const validateYearFormat = (date: string) => {
	const regex = /^\d{4}$/;
	return date.match(regex) ? true : false;
};
