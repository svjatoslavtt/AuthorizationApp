import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.min(8, 'Too short!')
		.required('Field is empty!')
		.email('Wrong type is email!'),
	password: Yup.string().min(9, 'Too short!').required('Field is empty!'),
});

export const fieldForSignIn = [
	{
		id: '1',
		label: 'Email',
		type: 'email',
		name: 'email',
	},
	{
		id: '2',
		label: 'Password',
		type: 'password',
		name: 'password',
	},
];
