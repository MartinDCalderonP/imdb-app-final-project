import { Paths, API } from './Enums';
import { IObjects } from './Interfaces';
import { PossiblePost } from './Types';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const sectionFetchUrl = (
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

export const cardsContainerNames = (post: PossiblePost): string => {
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
