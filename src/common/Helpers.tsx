import { Paths, API } from './Enums';
import { Cast, IObjects } from './Interfaces';
import { PossibleDetailPost, PossibleSectionPost } from './Types';

export const capitalizeWord = (word: string) => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

export const createSignInUrl = (requestToken: string | undefined): string => {
	return `${API.authenticate}${requestToken}${API.redirect}`;
};

export const profileFetchUrl = (sessionId: string | undefined): string => {
	return `${API.base}${API.account}?session_id=${sessionId}`;
};

export const sectionFetchUrl = (
	currentPage: number,
	currentFilter: string,
	filterCategory: string,
	type: string,
	id?: string
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
		default: `${API.base}${API.movies}${API.popular}?${paginationParams}`,
		certification: `${API.base}${API.discover}${API.movies}?${API.byCertification}${currentFilter}&${paginationParams}`,
		genre: `${API.base}${API.discover}${API.movies}?${API.byGenre}${currentFilter}&${paginationParams}`,
		year: `${API.base}${API.discover}${API.movies}?${moviesYearParams}&${paginationParams}`,
		similar: `${API.base}${API.movies}${id}${API.similar}?${paginationParams}`,
	};

	const tvShowsFetchUrls: IObjects = {
		default: `${API.base}${API.tvShows}${API.popular}?${paginationParams}`,
		certification: `${API.base}${API.discover}${API.tvShows}?${API.byCertification}${currentFilter}&${paginationParams}`,
		genre: `${API.base}${API.discover}${API.tvShows}?${API.byGenre}${currentFilter}&${paginationParams}`,
		year: `${API.base}${API.discover}${API.tvShows}?${tvShowsYearParams}&${paginationParams}`,
		similar: `${API.base}${API.tvShows}${id}${API.similar}?${paginationParams}`,
	};

	return type === 'movies'
		? filterCategory
			? moviesFetchUrls[filterCategory]
			: id
			? moviesFetchUrls.similar
			: moviesFetchUrls.default
		: filterCategory
		? tvShowsFetchUrls[filterCategory]
		: id
		? tvShowsFetchUrls.similar
		: tvShowsFetchUrls.default;
};

export const sectionTitle = (type: string, id?: string): string => {
	const moviesTitles: IObjects = {
		default: 'Popular Movies',
		similar: 'Similar Movies',
	};

	const tvShowsTitles: IObjects = {
		default: 'Popular TV Shows',
		similar: 'Similar TV Shows',
	};

	return type === 'movies'
		? id
			? moviesTitles.similar
			: moviesTitles.default
		: id
		? tvShowsTitles.similar
		: tvShowsTitles.default;
};

export const cardsContainerNames = (post: PossibleSectionPost): string => {
	return 'title' in post
		? post.title
		: 'name' in post
		? post.name
		: 'Unknown Name or Title';
};

export const cardsContainerImages = (post: PossibleSectionPost): string => {
	if ('poster_path' in post && post.poster_path) {
		return post.poster_path;
	}

	if ('profile_path' in post && post.profile_path) {
		return post.profile_path;
	}

	return '';
};

export const seasonNumber = (post: PossibleSectionPost) => {
	if ('season_number' in post && post.season_number) {
		return post.season_number;
	}
};

export const episodesCount = (post: PossibleSectionPost) => {
	if ('episode_count' in post && post.episode_count) {
		return post.episode_count;
	}
};

export const currentType = (post: PossibleSectionPost, type: string) => {
	if (type !== 'search') {
		return type;
	}

	if ('media_type' in post && post.media_type === 'tv') {
		return 'tvShows';
	}

	if ('media_type' in post && post.media_type === 'movie') {
		return 'movies';
	}

	if ('media_type' in post && post.media_type === 'person') {
		return 'person';
	}

	return '';
};

export const cardNavigationUrl = (
	type: string,
	id: number,
	currentPath?: string,
	seasonNumber?: number
): string => {
	const navigationUrls: IObjects = {
		movies: `${Paths.movies}/${id}`,
		tvShows: `${Paths.tvShows}/${id}`,
		person: `${Paths.person}/${id}`,
		seasons: `${currentPath}${Paths.season}/${seasonNumber}`,
	};

	return type ? navigationUrls[type] : navigationUrls.person;
};

export const imageW200Url = (image: string): string => {
	return `${API.images}${API.imageWidth200}${image}`;
};

export const imageW300Url = (image: string | undefined): string => {
	return `${API.images}${API.imageWidth300}${image}`;
};

export const imageOriginalUrl = (image: string | undefined): string => {
	return `${API.images}${API.imageOriginal}${image}`;
};

export const filtersFetchUrl = (category: string, type: string): string => {
	const moviesFiltersFetchUrls: IObjects = {
		certification: `${API.base}${API.certification}${API.movies}${API.list}?`,
		genre: `${API.base}${API.genre}${API.movies}${API.list}?`,
	};

	const tvShowsFiltersFetchUrls: IObjects = {
		certification: `${API.base}${API.certification}${API.tvShows}${API.list}?`,
		genre: `${API.base}${API.genre}${API.tvShows}${API.list}?`,
	};

	return type === 'movies'
		? moviesFiltersFetchUrls[category]
		: tvShowsFiltersFetchUrls[category];
};

export const validateYearFormat = (date: string) => {
	const regex = /^\d{4}$/;
	return date.match(regex) ? true : false;
};

export const searchNavigationUrl = (query: string): string => {
	const queryToPath = query.replaceAll(' ', '+');

	return `${Paths.search}${queryToPath}${Paths.page}1`;
};

export const searchFetchUrl = (
	query: string | undefined,
	currentPage: number
): string => {
	return query
		? `${API.base}${API.search}?&query=${query}&page=${currentPage}`
		: '';
};

export const detailFetchUrl = (
	id: string | undefined,
	type: string
): string => {
	const detailFetchUrls: IObjects = {
		movies: `${API.base}${API.movies}${id}?`,
		tvShows: `${API.base}${API.tvShows}${id}?`,
		seasons: `${API.base}${API.tvShows}${id}?`,
		person: `${API.base}${API.person}${id}?`,
	};

	return detailFetchUrls[type];
};

export const carouselFetchUrl = (
	id: string | undefined,
	type: string
): string => {
	const carouselFetchUrls: IObjects = {
		movies: `${API.base}${API.movies}${id}${API.imagesInEnglish}`,
		tvShows: `${API.base}${API.tvShows}${id}${API.imagesInEnglish}`,
	};

	return carouselFetchUrls[type];
};

export const reviewsFetchUrl = (
	id: string | undefined,
	type: string,
	currentPage: number
): string => {
	const paginationParams = `?page=${currentPage}`;

	const reviewsFetchUrls: IObjects = {
		movies: `${API.base}${API.movies}${id}${API.reviews}${paginationParams}`,
		tvShows: `${API.base}${API.tvShows}${id}${API.reviews}${paginationParams}`,
	};

	return reviewsFetchUrls[type];
};

export const timeAgo = (date: Date) => {
	date = new Date(date);
	const nowDate = Date.now();
	const timeDifference = Math.abs(nowDate - date.getTime());

	const differences = {
		minutes: Math.ceil(timeDifference / (1000 * 60)),
		hours: Math.ceil(timeDifference / (1000 * 60 * 60)),
		days: Math.ceil(timeDifference / (1000 * 60 * 60 * 24)),
		months: Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 30)),
	};

	return differences['minutes'] < 61
		? `${differences['minutes']} minutes ago`
		: differences['hours'] < 25
		? `${differences['hours']} hours ago`
		: differences['days'] < 32
		? `${differences['days']} days ago`
		: `${differences['months']} months ago`;
};

export const creditsFetchUrl = (
	id: string | undefined,
	type: string
): string => {
	const creditsFetchUrls: IObjects = {
		movies: `${API.base}${API.movies}${id}${API.credits}?`,
		tvShows: `${API.base}${API.tvShows}${id}${API.credits}?`,
	};

	return creditsFetchUrls[type];
};

export const creditImageUrl = (image: string): string => {
	return `${API.images}${API.imageWidth200}${image}`;
};

export const episodesFetchUrl = (
	id: number,
	season: string | undefined
): string => {
	return `${API.base}${API.tvShows}${id}${API.season}/${season}?`;
};

export const seasonsListTitleUrl = (id: number): string => {
	return `${Paths.tvShows}/${id}`;
};

export const seasonsNavigationUrl = (
	id: number,
	seasonNumber: number
): string => {
	return `${Paths.tvShows}/${id}${Paths.season}/${seasonNumber}`;
};

export const currentTitle = (data: PossibleDetailPost): string => {
	return 'original_title' in data
		? data?.original_title
		: data && 'original_name' in data
		? data?.original_name
		: data?.name;
};

export const currentSeasons = (data: PossibleDetailPost) => {
	return 'seasons' in data
		? data?.seasons?.filter((season) => season.episode_count > 0)
		: undefined;
};

export const mmddyyyDate = (date: Date): string => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const dateToString = date.toString();
	const splittedDate = dateToString.split('-');
	const day = splittedDate[2];
	const month = months[+splittedDate[1] - 1];
	const year = splittedDate[0];

	return `${month} ${day}, ${year}`;
};

export const formatGender = (gender: number): string => {
	if (gender === 1) {
		return 'Female';
	}

	if (gender === 2) {
		return 'Male';
	}

	if (gender === 3) {
		return 'Transgender';
	}

	return 'Other';
};

export const creditsItemNavigationUrl = (id: number): string => {
	return `${Paths.person}/${id}`;
};
