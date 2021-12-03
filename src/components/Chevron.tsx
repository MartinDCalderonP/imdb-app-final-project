import React from 'react';
import styles from '../styles/Chevron.module.scss';
import { IChevronProps } from '../common/Interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	IconDefinition,
	faChevronUp,
	faChevronRight,
	faChevronDown,
	faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

export default function Chevron({
	className,
	onClick,
	orientation,
}: IChevronProps) {
	interface IIcons {
		[key: string]: IconDefinition;
	}

	const Icons: IIcons = {
		top: faChevronUp,
		right: faChevronRight,
		down: faChevronDown,
		left: faChevronLeft,
	};

	return (
		<div
			className={styles[orientation] + (className ? ` ${className}` : '')}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={Icons[orientation]} />
		</div>
	);
}
