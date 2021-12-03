import React from 'react';
import styles from '../styles/Person.module.css';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import { personFetchUrl } from '../common/Helpers';

export default function Person() {
	const { id } = useParams();
	const fetchUrl = personFetchUrl(id);
	const { data, loading, error } = useFetch(fetchUrl);
	console.log(data);
	return (
		<div>
			<h1>Person</h1>
		</div>
	);
}
