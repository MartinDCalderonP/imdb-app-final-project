import RenderWithRouter from '../utils/Wrapper';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';

// test('should filter by NC-17 certification', async () => {
// 	const { findByText } = RenderWithRouter(<Home />);
// 	const filters = await findByText('FILTERS');
// 	expect(filters).toBeInTheDocument();
// 	userEvent.click(filters);
// 	const nc17Filter = await findByText('NC-17');
// 	userEvent.click(nc17Filter);
// 	const ava = await findByText('Ava');
// 	expect(ava).toBeInTheDocument();
// });

test('should filter by History genre', async () => {
	const { findByText } = RenderWithRouter(<Home />);
	const filters = await findByText('FILTERS');
	expect(filters).toBeInTheDocument();
	userEvent.click(filters);
	const historyFilter = await findByText('History');
	userEvent.click(historyFilter);
	const amina = await findByText('Amina');
	expect(amina).toBeInTheDocument();
});

// test('should filter by years range between 2000 and 2001', async () => {
// 	const { findByText, findByLabelText } = RenderWithRouter(<Home />);
// 	const filters = await findByText('FILTERS');
// 	expect(filters).toBeInTheDocument();
// 	userEvent.click(filters);
// 	const minInput = await findByLabelText('From');
// 	const maxInput = await findByLabelText('To');
// 	userEvent.type(minInput, '2000');
// 	userEvent.type(maxInput, '2001');
// 	const scary = await findByText('Scary Movie');
// 	expect(scary).toBeInTheDocument();
// });
