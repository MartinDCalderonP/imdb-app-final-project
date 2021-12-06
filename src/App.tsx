import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Paths } from './common/Enums';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Search from './pages/Search';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={Paths.home} element={<Home />} />

				<Route path={Paths.approved} element={<Home />} />

				<Route path={`/:typeInParams${Paths.page}:page`} element={<Home />} />

				<Route
					path={`/:typeInParams/:category/:filter${Paths.page}:page`}
					element={<Home />}
				/>

				<Route
					path={`${Paths.search}:query${Paths.page}:page`}
					element={<Search />}
				/>

				<Route path={`:typeInParams/:id`} element={<Detail />} />

				<Route
					path={`:typeInParams/:id${Paths.season}/:seasonNumber`}
					element={<Detail />}
				/>

				<Route
					path={`/:typeInParams/:id${Paths.similar}${Paths.page}:page`}
					element={<Detail />}
				/>

				<Route
					path={Paths.profile}
					element={
						<PrivateRoute redirectTo={Paths.home}>
							<Profile />
						</PrivateRoute>
					}
				/>

				<Route path="*" element={<Navigate replace to={Paths.home} />} />
			</Routes>
		</BrowserRouter>
	);
}
