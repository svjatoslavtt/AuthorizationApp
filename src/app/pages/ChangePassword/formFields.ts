import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
	password: Yup.string().min(8, 'Too short!').required('Field is empty!'),
	confirmPassword: Yup.string()
		.min(8, 'Too short!')
		.required('Field is empty!'),
});

export const fieldsForChangePassword = [
	{
		id: '1',
		label: 'Password',
		type: 'password',
		name: 'password',
	},
	{
		id: '2',
		label: 'Confirm password',
		type: 'password',
		name: 'confirmPassword',
	},
];
