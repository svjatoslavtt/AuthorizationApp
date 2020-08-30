import * as Yup from 'yup';

export const ConfirmCodeSchema = Yup.object().shape({
	code: Yup.string()
		.min(8, 'Too short!')
		.max(8, 'Too long!')
		.required('Field is empty!'),
});

export const fieldForConfirmCode = [
	{
		id: '1',
		label: 'Enter Code From Email',
		type: 'text',
		name: 'code',
	},
];
