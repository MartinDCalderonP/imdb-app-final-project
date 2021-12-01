import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from './common/Enums';
import Home from './pages/Home';
import Search from './pages/Search';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={Paths.home} element={<Home />} />
				<Route path="*" element={<Navigate replace to={Paths.home} />} />
				<Route
					path={`${Paths.search}:query${Paths.page}:page`}
					element={<Search />}
				/>
			</Routes>
		</BrowserRouter>
	);
}
