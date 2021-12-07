import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('should render ', () => {
	render(<App />);
	expect(screen.getAllByPlaceholderText(/search/i)[0]).toBeInTheDocument();
});

test('user should navigate to Search page', async () => {
	const { findByText } = render(<App />);
	userEvent.type(screen.getAllByPlaceholderText('Search')[0], 'Spider');
	userEvent.click(screen.getAllByRole('button')[0]);
	const homecoming = await findByText(/Homecoming/i);
	expect(homecoming).toBeInTheDocument();
});
