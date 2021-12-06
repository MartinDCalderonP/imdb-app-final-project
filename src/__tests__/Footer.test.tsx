import { render } from '@testing-library/react';
import Footer from '../components/Footer';

test('should be rendered', () => {
	const { getByText } = render(<Footer />);
	const textElement = getByText(/All rights reserved/i);
	expect(textElement).toBeInTheDocument();
});
