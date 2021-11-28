import {
	IMoviesData,
	ITvShowsData,
	MovieResult,
	TvShowResult,
} from './Interfaces';

export type PossibleSectionData = IMoviesData | ITvShowsData;

export type PossibleSectionPost = MovieResult | TvShowResult;
