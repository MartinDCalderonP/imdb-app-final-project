import { Action, State } from '../common/Types';

export const initialState = {
	sessionId: '',
	profile: {
		avatar: {
			gravatar: { hash: '' },
			tmdb: { avatar_path: '' },
		},
		id: 0,
		iso_639_1: '',
		iso_3166_1: '',
		name: '',
		include_adult: false,
		username: '',
	},
};

export default function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SET_PROFILE':
			return {
				...state,
				sessionId: action.payload.sessionId,
				profile: action.payload.profile,
			};

		default:
			return initialState;
	}
}
