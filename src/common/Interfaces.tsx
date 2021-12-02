import { ReactNode, MouseEventHandler } from 'react';

export interface ILayoutProps {
	children: ReactNode;
	footer?: boolean;
}

export interface IUseFetch<T> {
	data: T | undefined;
	loading: boolean;
	error: string | undefined;
}

export interface IMoviesData {
	page: number;
	results: MovieResult[];
	total_pages: number;
	total_results: number;
}

export interface MovieResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: OriginalLanguage;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: Date;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export enum OriginalLanguage {
	En = 'en',
	Pt = 'pt',
}

export interface ITvShowsData {
	page: number;
	results: TvShowResult[];
	total_pages: number;
	total_results: number;
}

export interface TvShowResult {
	backdrop_path: null | string;
	first_air_date: Date;
	genre_ids: number[];
	id: number;
	name: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: null | string;
	vote_average: number;
	vote_count: number;
}

export interface IObjects {
	[key: string]: string;
}

export interface ICardProps {
	id: number;
	name: string;
	image: null | string;
	type: string;
	seasonNumber?: number;
	episodesCount?: number;
}

export interface ICardsContainerProps {
	loading: boolean;
	posts: MovieResult[] | TvShowResult[] | SearchResult[] | Season[];
	type: string;
}

export interface ISectionProps {
	type: string;
	id?: string | undefined;
}

export interface IFiltersContainerProps {
	current: string;
	setCurrent: (current: string) => void;
	setFilterCategory: (current: string) => void;
	type: string;
}

export interface IFiltersProps {
	current: string;
	setCurrent: (current: string) => void;
	category: string;
	setFilterCategory: (current: string) => void;
	type: string;
}

export interface IYearsInputsProps {
	current: string;
	setCurrent: (current: string) => void;
	setFilterCategory: (current: string) => void;
}

export interface ISearchResults {
	page: number;
	results: SearchResult[];
	total_pages: number;
	total_results: number;
}

export interface SearchResult {
	adult?: boolean;
	backdrop_path?: null | string;
	genre_ids?: number[];
	id: number;
	media_type: MediaType;
	original_language?: OriginalLanguage;
	original_title?: string;
	overview?: string;
	popularity?: number;
	poster_path?: string;
	release_date?: Date;
	title: string;
	video?: boolean;
	vote_average?: number;
	vote_count?: number;
	first_air_date?: Date;
	name: string;
	origin_country?: string[];
	original_name?: string;
	gender?: number;
	known_for?: SearchResult[];
	known_for_department?: string;
	profile_path?: string;
}

export enum MediaType {
	Movie = 'movie',
	Person = 'person',
	Tv = 'tv',
}

export interface IDetailProps {
	type: string;
}

export interface IDetailMovie {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: BelongsToCollection;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: Date;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface BelongsToCollection {
	id: number;
	name: string;
	poster_path: string;
	backdrop_path: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface IDetailTvShow {
	backdrop_path: string;
	created_by: CreatedBy[];
	episode_run_time: number[];
	first_air_date: Date;
	genres: Genre[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: Date;
	last_episode_to_air: TEpisodeToAir;
	name: string;
	next_episode_to_air: TEpisodeToAir;
	networks: Network[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Network[];
	production_countries: ProductionCountry[];
	seasons: Season[];
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}

export interface CreatedBy {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string;
}

export interface TEpisodeToAir {
	air_date: Date;
	episode_number: number;
	id: number;
	name: string;
	overview: string;
	production_code: string;
	season_number: number;
	still_path: null;
	vote_average: number;
	vote_count: number;
}

export interface Network {
	name: string;
	id: number;
	logo_path: string;
	origin_country: string;
}

export interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface Season {
	air_date: Date;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
}

export interface IRatingStarsProps {
	rating: number | undefined;
}

export interface IChevronProps {
	className: string;
	onClick: MouseEventHandler;
	orientation: string;
}

export interface ICarouselProps {
	id: string | undefined;
	type: string;
}

export interface IDetailImages {
	backdrops: Backdrop[];
	id: number;
	logos: Backdrop[];
	posters: Backdrop[];
}

export interface Backdrop {
	aspect_ratio: number;
	height: number;
	iso_639_1: null | string;
	file_path: string;
	vote_average: number;
	vote_count: number;
	width: number;
}

export interface IReviewsProps {
	id: string | undefined;
	type: string;
}

export interface IReviewsData {
	id: number;
	page: number;
	results: ReviewsResult[];
	total_pages: number;
	total_results: number;
}

export interface ReviewsResult {
	author: string;
	author_details: AuthorDetails;
	content: string;
	created_at: Date;
	id: string;
	updated_at: Date;
	url: string;
}

export interface AuthorDetails {
	name: string;
	username: string;
	avatar_path: null | string;
	rating: number | null;
}

export interface ICreditsProps {
	id: string | undefined;
	type: string;
}

export interface ICreditsData {
	id: number;
	cast: Cast[];
	crew: Cast[];
}

export interface Cast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: Department;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id?: number;
	character?: string;
	credit_id: string;
	order?: number;
	department?: Department;
	job?: string;
}

export enum Department {
	Acting = 'Acting',
	Art = 'Art',
	Camera = 'Camera',
	CostumeMakeUp = 'Costume & Make-Up',
	Crew = 'Crew',
	Directing = 'Directing',
	Editing = 'Editing',
	Production = 'Production',
	Sound = 'Sound',
	VisualEffects = 'Visual Effects',
	Writing = 'Writing',
}

export interface ISeasonDetail {
	_id: string;
	air_date: Date;
	episodes: Episode[];
	name: string;
	overview: string;
	id: number;
	poster_path: string;
	season_number: number;
}

export interface Episode {
	air_date: Date;
	episode_number: number;
	crew: Crew[];
	guest_stars: Crew[];
	id: number;
	name: string;
	overview: string;
	production_code: string;
	season_number: number;
	still_path: null;
	vote_average: number;
	vote_count: number;
}

export interface Crew {
	department?: Department;
	job?: Job;
	credit_id: string;
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: Department;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: null | string;
	character?: string;
	order?: number;
}

export enum Job {
	Director = 'Director',
	Writer = 'Writer',
}

export interface ISeasonsListProps {
	id: number;
	title: string;
	seasons: Season[];
}

export interface IEpisodesProps {
	id: number;
	season: number;
}
