import reducer, { initialState, actionTypes } from '../context/Reducer';

test('should return the initial state', () => {
	expect(
		reducer(initialState, {
			type: 'TEST',
			payload: {
				sessionId: 'TEST',
				profile: initialState.profile,
			},
		})
	).toEqual(initialState);
});

test('should add Session Id and Profile to state', () => {
	const newState = {
		sessionId: 'newSessionId',
		profile: {
			avatar: {
				gravatar: { hash: '5e84c9e6dbde9e86178fbb2203ad33d6' },
				tmdb: { avatar_path: null },
			},
			id: 11480685,
			iso_639_1: 'es',
			iso_3166_1: 'AR',
			name: '',
			include_adult: false,
			username: 'MartínDCalderónP',
		},
	};

	const action = {
		type: actionTypes.SET_PROFILE,
		payload: newState,
	};

	const reducerState = reducer(initialState, action);

	expect(reducerState).toEqual(newState);
});
