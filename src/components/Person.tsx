import React from 'react';
import { IPersonProps } from '../common/Interfaces';

export default function Person({ data }: IPersonProps) {
	return (
		<div>
			<h1>{data.name}</h1>
		</div>
	);
}
