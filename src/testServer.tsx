import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { API } from './common/Enums';
import { API_KEY } from './Keys';
import popularMovies from './jsons/popularMovies.json';
import popularTvShows from './jsons/popularTvShows.json';
import spiderSearchResults from './jsons/spiderSearchResults.json';

const server = setupServer(
	rest.get(`${API.base}${API.movies}${API.popular}`, (req, res, ctx) => {
		const page = req.url.searchParams.get('page');
		const api_key = req.url.searchParams.get('api_key');
		const language = req.url.searchParams.get('language');

		if (api_key === API_KEY && page === '1' && language === 'en-US') {
			return res(ctx.json(popularMovies));
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${API.base}${API.tvShows}${API.popular}`, (req, res, ctx) => {
		const page = req.url.searchParams.get('page');
		const api_key = req.url.searchParams.get('api_key');
		const language = req.url.searchParams.get('language');

		if (api_key === API_KEY && page === '1' && language === 'en-US') {
			return res(ctx.json(popularTvShows));
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${API.base}${API.search}`, (req, res, ctx) => {
		const query = req.url.searchParams.get('query');
		const page = req.url.searchParams.get('page');
		const api_key = req.url.searchParams.get('api_key');
		const language = req.url.searchParams.get('language');

		if (
			query === 'Spider' &&
			api_key === API_KEY &&
			page === '1' &&
			language === 'en-US'
		) {
			return res(ctx.json(spiderSearchResults));
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get('*', (req, res, ctx) => {
		console.error('Please add request handler for', req.url.toString());
		return res(
			ctx.status(500),
			ctx.json({
				error: 'Please add request handler for ' + req.url.toString(),
			})
		);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, rest };
