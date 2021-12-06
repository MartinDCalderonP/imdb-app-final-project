import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { API } from './common/Enums';

const server = setupServer(
	// rest.get(`${API.characters}`, (req, res, ctx) => {
	// 	return res(ctx.status(200), ctx.json(characters));
	// }),

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
