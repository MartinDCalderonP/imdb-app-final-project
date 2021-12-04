import { IProfileData } from '../common/Interfaces';
import { Action, State } from '../common/Types';

export const initialState = {
	user: {
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
	ADD_USER: 'ADD_USER',
	REMOVE_USER: 'REMOVE_USER',
};

export default function reducer(state: State, action: Action): State {
	switch (action.type) {
		case actionTypes.ADD_USER:
			return {
				...state,
				user: action.payload,
			};

		case actionTypes.REMOVE_USER:
			return {
				...state,
				user: action.payload,
			};

		default:
			return initialState;
	}
}
