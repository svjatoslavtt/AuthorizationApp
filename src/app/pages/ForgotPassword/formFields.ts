import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object().shape({
	email: Yup.string()
		.min(8, 'Too short!')
		.required('Field is empty!')
		.email('Wrong type is email!'),
});

export const fieldForForgotPassword = [
	{
		id: '1',
		label: 'Email',
		type: 'email',
		name: 'email',
	},
];
