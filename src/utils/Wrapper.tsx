import { FunctionComponent, ReactElement, ReactNode } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { render } from '@testing-library/react';
import { StateProvider } from '../context/Context';

interface IWrapperProps {
	children: ReactNode;
}

function LocationDisplay() {
	const location = useLocation();
	return <div data-testid="location-display">{location.pathname}</div>;
}

function Wrapper({ children }: IWrapperProps) {
	return (
		<StateProvider>
			<BrowserRouter>
				{children}
				<LocationDisplay />
			</BrowserRouter>
		</StateProvider>
	);
}

export default function RenderWithRouter(ui: ReactElement, route = '/') {
	window.history.pushState({}, 'Test Page', route);
	return render(ui, { wrapper: Wrapper as FunctionComponent });
}
