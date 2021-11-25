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

export interface IPopularMovies {
	page: number;
	results: PopularMoviesResult[];
	total_pages: number;
	total_results: number;
}

export interface PopularMoviesResult {
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

export interface IPopularTvShows {
	page: number;
	results: PopularTvShowsResult[];
	total_pages: number;
	total_results: number;
}

export interface PopularTvShowsResult {
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
