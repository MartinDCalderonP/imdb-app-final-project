import React from 'react';
import useFetch from '../hooks/useFetch';
import 'whatwg-fetch';
import { renderHook, act } from '@testing-library/react-hooks';
import { sectionFetchUrl } from '../common/Helpers';
import { PossibleSectionData } from '../common/Types';
import popularMovies from '../jsons/popularMovies.json';

test('should return fetched data', async () => {
	const { result, waitForNextUpdate } = renderHook(() =>
		useFetch<PossibleSectionData>(sectionFetchUrl(1, '', '', 'movies'))
	);

	await waitForNextUpdate();

	expect(result.current.data).toEqual(popularMovies);
});
