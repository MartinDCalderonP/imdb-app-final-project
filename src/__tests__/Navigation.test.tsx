import { fireEvent, screen, waitFor } from '@testing-library/dom';
import RenderWithRouter from '../utils/Wrapper';
import { Paths } from '../common/Enums';
import Home from '../pages/Home';

test('should be in Home page', () => {
	RenderWithRouter(<Home />);
	const locationDiv = screen.getByTestId('location-display');
	expect(locationDiv).toHaveTextContent(Paths.home);
});

// test('should go to Detail Movie page', async () => {
// 	const { findByRole } = RenderWithRouter(<Home />);
// 	const anchor = await findByRole('link', { name: /Venom/i });
// 	expect(anchor).toHaveAttribute('href', '/movies/580489');
// 	fireEvent.click(anchor, { click: 0 });
// 	expect(screen.getByTestId('location-display')).toHaveTextContent(
// 		'/movies/580489'
// 	);
// });

// test('should go to Detail TV Show page', async () => {
// 	const { findByRole } = RenderWithRouter(<Home />);
// 	const anchor = await findByRole('link', { name: /Hawkeye/i });
// 	expect(anchor).toHaveAttribute('href', '/tvShows/88329');
// 	fireEvent.click(anchor, { click: 0 });
// 	expect(screen.getByTestId('location-display')).toHaveTextContent(
// 		'/tvShows/88329'
// 	);
// });

// test('should go to Seasons page', async () => {
// 	const { findByRole } = RenderWithRouter(<Home />);
// 	const cardAnchor = await findByRole('link', { name: /Hawkeye/i });
// 	expect(cardAnchor).toHaveAttribute('href', '/tvShows/88329');
// 	fireEvent.click(cardAnchor, { click: 0 });
// 	expect(screen.getByTestId('location-display')).toHaveTextContent(
// 		'/tvShows/88329'
// 	);
// 	const seasonAnchor = await findByRole('link', { name: /Season 1/i });
// 	fireEvent.click(seasonAnchor, { click: 0 });
// 	expect(screen.getByTestId('location-display')).toHaveTextContent(
// 		`${Paths.tvShows}/88329${Paths.season}/1`
// 	);
// });
