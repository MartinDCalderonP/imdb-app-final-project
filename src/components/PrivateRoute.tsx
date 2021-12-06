import React from 'react';
import { Navigate } from 'react-router';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialState } from '../context/Reducer';
import { IPrivateRouteProps } from '../common/Interfaces';

export default function PrivateRoute({
	children,
	redirectTo,
}: IPrivateRouteProps) {
	const [profile, setProfile] = useLocalStorage(
		'profile',
		initialState.profile
	);

	const isAuthenticated = profile.id === 0 ? false : true;

	return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
