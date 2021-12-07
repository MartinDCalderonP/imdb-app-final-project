import {
	IMoviesData,
	ITvShowsData,
	MovieResult,
	TvShowResult,
	SearchResult,
	IDetailMovie,
	IDetailTvShow,
	IDetailPerson,
	Season,
	IProfileData,
	ICertificationsData,
	IGenresData,
} from './Interfaces';

export type PossibleSectionData = IMoviesData | ITvShowsData;

export type PossibleSectionPost =
	| MovieResult
	| TvShowResult
	| SearchResult
	| Season;

export type PossibleDetailPost = IDetailMovie | IDetailTvShow | IDetailPerson;

export type PossibleFilterData = ICertificationsData | IGenresData;

export type Action = {
	type: string;
	payload: { sessionId: string; profile: IProfileData };
};

export type Dispatch = (action: Action) => void;

export type State = { sessionId: string; profile: IProfileData };

export type Context = { state: State; dispatch: Dispatch };
