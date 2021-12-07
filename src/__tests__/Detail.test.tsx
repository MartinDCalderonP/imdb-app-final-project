import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('should be rendered Detail Page', async () => {
	const { findByRole, findByText } = render(<App />);
	const cardAnchor = await findByRole('link', { name: /Venom/i });
	expect(cardAnchor).toHaveAttribute('href', '/movies/580489');
	fireEvent.click(cardAnchor, { click: 0 });
	const detailPage = await findByText(/Eddie Brock/i);
	expect(detailPage).toBeInTheDocument();
});
