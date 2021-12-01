import { ReactNode } from 'react';

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
}

export interface ICardsContainerProps {
	loading: boolean;
	posts: MovieResult[] | TvShowResult[] | SearchResult[];
	type: string;
}

export interface ISectionProps {
	type: string;
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
