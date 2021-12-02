import {
	IMoviesData,
	ITvShowsData,
	MovieResult,
	TvShowResult,
	SearchResult,
	IDetailMovie,
	IDetailTvShow,
	Season,
} from './Interfaces';

export type PossibleSectionData = IMoviesData | ITvShowsData;

export type PossibleSectionPost =
	| MovieResult
	| TvShowResult
	| SearchResult
	| Season;

export type PossibleDetailPost = IDetailMovie | IDetailTvShow;
