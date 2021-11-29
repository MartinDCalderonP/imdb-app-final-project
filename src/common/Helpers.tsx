import { Paths, API } from './Enums';
import { IObjects } from './Interfaces';
import { PossibleSectionPost } from './Types';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const sectionFetchUrl = (
	currentPage: number,
	currentFilter: string,
	filterCategory: string,
	type: string
): string => {
	const paginationParams = `page=${currentPage}`;

	const years = filterCategory === 'year' && currentFilter.split('-');
	const moviesYearParams =
		years && years.length === 2
			? `${API.moviesMinYear}${years[0]}${API.moviesMaxYear}${years[1]}`
			: '';

	const tvShowsYearParams =
		years && years.length === 2
			? `${API.tvShowsMinYear}${years[0]}${API.tvShowsMaxYear}${years[1]}`
			: '';

	const moviesFetchUrls: IObjects = {
		default: `${API.base}${API.popularMovies}?${paginationParams}`,
		certification: `${API.base}${API.moviesDiscover}?${API.byCertification}${currentFilter}&${paginationParams}`,
		genre: `${API.base}${API.moviesDiscover}?${API.byGenre}${currentFilter}&${paginationParams}`,
		year: `${API.base}${API.moviesDiscover}?${moviesYearParams}&${paginationParams}`,
	};

	const tvShowsFetchUrls: IObjects = {
		default: `${API.base}${API.popularTvShows}?${paginationParams}`,
		certification: `${API.base}${API.tvShowsDiscover}?${API.byCertification}${currentFilter}&${paginationParams}`,
		genre: `${API.base}${API.tvShowsDiscover}?${API.byGenre}${currentFilter}&${paginationParams}`,
		year: `${API.base}${API.tvShowsDiscover}?${tvShowsYearParams}&${paginationParams}`,
	};

	return type === 'movies'
		? filterCategory
			? moviesFetchUrls[filterCategory]
			: moviesFetchUrls.default
		: filterCategory
		? tvShowsFetchUrls[filterCategory]
		: tvShowsFetchUrls.default;
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
