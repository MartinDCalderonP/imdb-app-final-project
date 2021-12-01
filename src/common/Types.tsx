import {
	IMoviesData,
	ITvShowsData,
	MovieResult,
	TvShowResult,
	SearchResult,
	IDetailMovie,
	IDetailTvShow,
} from './Interfaces';

export type PossibleSectionData = IMoviesData | ITvShowsData;

export type PossibleSectionPost = MovieResult | TvShowResult | SearchResult;

export type PossibleDetailPost = IDetailMovie | IDetailTvShow;
