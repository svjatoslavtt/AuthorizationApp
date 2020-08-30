import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '../../../redux/auth/actions';
import {
	getAuthStateErrors,
	getIsAuthLoading,
} from '../../../redux/auth/selectors';

import ButtonComponent from '../../components/buttons/ButtonComponent/ButtonComponent';
import {
	ButtonColorsEnum,
	ButtonTypesEnum,
} from '../../components/buttons/buttonComponentEnum';
import CommonContainer from '../../components/CommonContainer/CommonContainer';
import ErrorText from '../../components/ErrorText/ErrorText';
import FormikField from '../../components/FormikField/FormikField';
import FormSubmit from '../../components/TitleContainer/TitleContainer';

import { fieldForForgotPassword } from './formFields';
import { ForgotPasswordSchema } from './formFields';

const ForgotPassword: React.FC = () => {
	const dispatch = useDispatch();

	const initialValues: {email: string} = {
		email: '',
	};

	const handlerSubmit = (data: {email: string}) => {
		dispatch(Actions.forgotPassword(data.email));
	};

	const isLoading = useSelector(getIsAuthLoading);
	const errors = useSelector(getAuthStateErrors);

	let errorMessages: any;

	(() => {
		if (typeof errors === 'string') {
			return (errorMessages = errors);
		} else {
			return (errorMessages =
				errors &&
				errors.map((item: any, index: number) => {
					return <li key={index}>{item}</li>;
				}));
		}
	})();

	return (
		<CommonContainer center={true}>
			<FormSubmit title='Forgot password'>
				<Formik
					initialValues={initialValues}
					validationSchema={ForgotPasswordSchema}
					onSubmit={handlerSubmit}
				>
					{({ dirty, isValid }) => {
						return (
							<Form>
								{fieldForForgotPassword.map(({ id, ...props }) => {
									return <FormikField key={id} id={id} {...props} />;
								})}

								<ErrorText>{errorMessages}</ErrorText>

								<ButtonComponent
									center={true}
									disabled={isLoading || !dirty || (!isValid && !errorMessages)}
									color={ButtonColorsEnum.primary}
									text={isLoading ? 'Loading...' : 'Confirm email'}
									type={ButtonTypesEnum.submit}
								/>
							</Form>
						);
					}}
				</Formik>
			</FormSubmit>
		</CommonContainer>
	);
};

export default ForgotPassword;
