import { Checkbox, TextField } from '@material-ui/core';
import { ErrorMessage, Field } from 'formik';
import React from 'react';

import styles from './FormikField.module.scss';

interface FormikFieldProps {
	label: string;
	type: string;
	name: string;
	id: string;
}

const FormikField: React.FC<FormikFieldProps> = ({ label, type, name, id }) => {
	return (
		<div className={styles.FormikField}>
			{type !== 'checkbox' ? (
				<Field
					required={true}
					fullWidth={true}
					as={TextField}
					autoComplete='off'
					label={label}
					type={type}
					name={name}
					helperText={<ErrorMessage className={styles.test} name={name} />}
				/>
			) : (
				<div className={styles.formGroupCheckbox}>
					<Field
						required={name === 'privacy'}
						as={Checkbox}
						label={label}
						type={type}
						name={name}
						id={id}
					/>
					<label htmlFor={id}>{label}</label>
				</div>
			)}
		</div>
	);
};

export default FormikField;
