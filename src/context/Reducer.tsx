import { IProfileData } from '../common/Interfaces';
import { Action, State } from '../common/Types';

export const initialState = {
	profile: {
		avatar: {
			gravatar: { hash: '' },
			tmdb: { avatar_path: '' },
		},
		id: 0,
		iso_639_1: 'string',
		iso_3166_1: 'string',
		name: 'string',
		include_adult: false,
		username: 'string',
	},
};

export const actionTypes = {
	ADD_PROFILE: 'ADD_PROFILE',
	REMOVE_PROFILE: 'REMOVE_PROFILE',
};

export default function reducer(state: State, action: Action): State {
	switch (action.type) {
		case actionTypes.ADD_PROFILE:
			return {
				...state,
				profile: action.payload,
			};

		case actionTypes.REMOVE_PROFILE:
			return {
				...state,
				profile: action.payload,
			};

		default:
			return initialState;
	}
}
