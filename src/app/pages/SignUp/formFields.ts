import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
	fullName: Yup.string().min(3, 'Too short!').required('Field is empty!'),
	email: Yup.string()
		.min(8, 'Too short!')
		.required('Field is empty!')
		.email('Wrong type is email!'),
	phone: Yup.string().min(10, 'Too short!').required('Field is empty!'),
	countryCode: Yup.string().min(3, 'Too short!').required('Field is empty!'),
	password: Yup.string().min(9, 'Too short!').required('Field is empty!'),
	isAgreeWithPrivacyPolicyAndTermOfUse: Yup.boolean().required(
		'Need to choose!'
	),
	notifications: Yup.boolean(),
});

export const fieldForSignUp = [
	{
		id: '1',
		label: 'Full Name',
		type: 'text',
		name: 'fullName',
	},
	{
		id: '2',
		label: 'Email',
		type: 'email',
		name: 'email',
	},
	{
		id: '3',
		label: 'Phone',
		type: 'text',
		name: 'phone',
	},
	{
		id: '4',
		label: 'Country Code',
		type: 'text',
		name: 'countryCode',
	},
	{
		id: '5',
		label: 'Password',
		type: 'password',
		name: 'password',
	},
	{
		id: '6',
		label: 'Privacy Policy',
		type: 'checkbox',
		name: 'isAgreeWithPrivacyPolicyAndTermOfUse',
	},
	{
		id: '7',
		label: 'Notifications',
		type: 'checkbox',
		name: 'notifications',
	},
];
