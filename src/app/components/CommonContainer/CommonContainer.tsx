import { Container } from '@material-ui/core';
import React from 'react'

import styles from './CommonContainer.module.scss';

interface CommonContainer {
	center?: boolean;
}

const CommonContainer: React.FC<CommonContainer> = ({ center, children }) => (
	<Container maxWidth='md'>
		<div
			className={styles.Wrapper}
			style={center ? { height: '100vh' } : undefined}
		>
			{children}
		</div>
	</Container>
);

export default CommonContainer;
