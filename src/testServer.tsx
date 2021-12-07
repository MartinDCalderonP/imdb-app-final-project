import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { API } from './common/Enums';
import { API_KEY } from './Keys';
import popularMovies from './jsons/popularMovies.json';
import popularTvShows from './jsons/popularTvShows.json';
import spiderSearchResults from './jsons/spiderSearchResults.json';
import moviesCertifications from './jsons/moviesCertifications.json';
import moviesByNC17Certification from './jsons/moviesByNC17Certification.json';
import moviesGenres from './jsons/moviesGenres.json';
import moviesByHistoryGenre from './jsons/moviesByHistoryGenre.json';
import movieDetail from './jsons/movieDetail.json';

const server = setupServer(
	rest.get(`${API.base}${API.requestToken}`, (req, res, ctx) => {
		const api_key = req.url.searchParams.get('api_key');

		return res(
			ctx.json({
				success: true,
			})
		);
	}),

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

	rest.get(
		`${API.base}${API.certification}${API.movies}list`,
		(req, res, ctx) => {
			const api_key = req.url.searchParams.get('api_key');
			const language = req.url.searchParams.get('language');

			if (api_key === API_KEY && language === 'en-US') {
				return res(ctx.json(moviesCertifications));
			} else {
				return res(ctx.status(404));
			}
		}
	),

	rest.get(`${API.base}${API.discover}${API.movies}`, (req, res, ctx) => {
		const sort_by = req.url.searchParams.get('sort_by');
		const certification_country = req.url.searchParams.get(
			'certification_country'
		);
		const certification = req.url.searchParams.get('certification');
		const page = req.url.searchParams.get('page');
		const api_key = req.url.searchParams.get('api_key');
		const language = req.url.searchParams.get('language');

		if (
			sort_by === 'popularity.desc' &&
			certification_country === 'US' &&
			certification === 'NC-17' &&
			page === '1' &&
			api_key === API_KEY &&
			language === 'en-US'
		) {
			return res(ctx.json(moviesByNC17Certification));
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${API.base}${API.genre}${API.movies}list`, (req, res, ctx) => {
		const api_key = req.url.searchParams.get('api_key');
		const language = req.url.searchParams.get('language');

		if (api_key === API_KEY && language === 'en-US') {
			return res(ctx.json(moviesGenres));
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${API.base}${API.discover}${API.movies}`, (req, res, ctx) => {
		const sort_by = req.url.searchParams.get('sort_by');
		const with_genres = req.url.searchParams.get('with_genres');
		const page = req.url.searchParams.get('page');
		const api_key = req.url.searchParams.get('api_key');
		const language = req.url.searchParams.get('language');

		if (
			sort_by === 'popularity.desc' &&
			with_genres === '36' &&
			page === '1' &&
			api_key === API_KEY &&
			language === 'en-US'
		) {
			return res(ctx.json(moviesByHistoryGenre));
		} else {
			return res(ctx.status(404));
		}
	}),

	rest.get(`${API.base}${API.movies}580489`, (req, res, ctx) => {
		const api_key = req.url.searchParams.get('api_key');
		const language = req.url.searchParams.get('language');

		if (api_key === API_KEY && language === 'en-US') {
			return res(ctx.json(movieDetail));
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
