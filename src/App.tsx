import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { paths } from './common/Enums';
import Home from './pages/Home';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={paths.home} element={<Home />} />
				<Route path="*" element={<Navigate replace to={paths.home} />} />
			</Routes>
		</BrowserRouter>
	);
}
