import React from 'react';

import styles from './TitleContainer.module.scss';

interface FormProps {
	title: string;
}

const TitleContainer: React.FC<FormProps> = ({ title, children }) => {
	return (
		<div className={styles.Form}>
			<h1>{title}</h1>
			{children}
		</div>
	);
};

export default TitleContainer;
