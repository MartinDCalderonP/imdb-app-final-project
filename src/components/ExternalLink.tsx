import React from 'react';
import styles from '../styles/ExternalLink.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { IExternalLinkProps } from '../common/Interfaces';

export default function ExternalLink({ url }: IExternalLinkProps) {
	return (
		<a className={styles.externalLink} href={url}>
			Official website
			<FontAwesomeIcon icon={faExternalLinkAlt} />
		</a>
	);
}
