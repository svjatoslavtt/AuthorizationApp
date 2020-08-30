import React from 'react';

import styles from './ErrorText.module.scss';

const ErrorText: React.FC = ({ children }) => (
	<div className={styles.errorText}>
		<ul>{children}</ul>
	</div>
);

export default ErrorText;
