import { API, Paths } from '../common/Enums';
import {
	capitalizeWord,
	createSignInUrl,
	profileFetchUrl,
	sectionFetchUrl,
} from '../common/Helpers';

test('should capitalize word', () => {
	expect(capitalizeWord('test')).toBe('Test');
});

test('should return sign in url', () => {
	expect(createSignInUrl('testRT')).toBe(
		`${API.authenticate}testRT${API.redirect}`
	);
});

test('should return profile fetch url', () => {
	expect(profileFetchUrl('testSI')).toBe(
		`${API.base}${API.account}?${API.sessionId}testSI`
	);
});

// test('should return section fetch url', () => {
// 	expect(
// 		sectionFetchUrl(
// 			666,
// 			'testFilter',
// 			'testCategory',
// 			'testType',
// 			'testId',
// 			'testSessionId',
// 			999
// 		)
// 	).toBe(`${API.base}${API.account}?${API.sessionId}mSI69`);
// });
