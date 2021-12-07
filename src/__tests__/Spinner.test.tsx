import { render } from '@testing-library/react';
import Spinner from '../components/Spinner';

test('should be rendered', () => {
	const { getByAltText } = render(<Spinner />);
	const textElement = getByAltText(/Loading/i);
	expect(textElement).toBeInTheDocument();
});
