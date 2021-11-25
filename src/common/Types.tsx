import {
	IMoviesData,
	ITvShowsData,
	MovieResult,
	TvShowResult,
} from './Interfaces';

export type PossibleData = IMoviesData | ITvShowsData;

export type PossiblePost = MovieResult | TvShowResult;
