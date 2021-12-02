import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from './common/Enums';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Search from './pages/Search';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={Paths.home} element={<Home />} />

				<Route path={Paths.approved} element={<Home />} />

				<Route
					path={`${Paths.search}:query${Paths.page}:page`}
					element={<Search />}
				/>

				<Route
					path={`${Paths.movies}/:id`}
					element={<Detail type="movies" />}
				/>

				<Route
					path={`${Paths.tvShows}/:id`}
					element={<Detail type="tvShows" />}
				/>

				<Route path="*" element={<Navigate replace to={Paths.home} />} />
			</Routes>
		</BrowserRouter>
	);
}
