import {
	IMoviesData,
	ITvShowsData,
	MovieResult,
	TvShowResult,
	SearchResult,
} from './Interfaces';

export type PossibleSectionData = IMoviesData | ITvShowsData;

export type PossiblePost = MovieResult | TvShowResult | SearchResult;
