import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Actions } from '../../../redux/auth/actions';
import {
	getAuthCode,
	getAuthStateErrors,
	getIsAuthLoading,
} from '../../../redux/auth/selectors';
import { ChangePasswordState } from '../../../shared/interfaces/changePassword.interface';

import ButtonComponent from '../../components/buttons/ButtonComponent/ButtonComponent';
import {
	ButtonColorsEnum,
	ButtonTypesEnum,
} from '../../components/buttons/buttonComponentEnum';
import CommonContainer from '../../components/CommonContainer/CommonContainer';
import ErrorText from '../../components/ErrorText/ErrorText';
import FormikField from '../../components/FormikField/FormikField';
import FormSubmit from '../../components/TitleContainer/TitleContainer';

import { fieldsForChangePassword } from './formFields';
import { ChangePasswordSchema } from './formFields';

const ChangePassword: React.FC = () => {
	const dispatch = useDispatch();

	const initialValues: ChangePasswordState = {
		password: '',
		confirmPassword: '',
	};

	const [validPassword, setValidPassword] = useState('');

	const isLoading = useSelector(getIsAuthLoading);
	const errors = useSelector(getAuthStateErrors);
	const code = useSelector(getAuthCode);

	const handlerSubmit = (data: ChangePasswordState) => {
		const changePasswordData = {
			code,
			password: data.password,
		};

		if (data.password !== data.confirmPassword) {
			return setValidPassword('* Password mismatch');
		} else {
			dispatch(Actions.changePassword(changePasswordData));
		}
	};

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
			<FormSubmit title='Change Password'>
				<Formik
					initialValues={initialValues}
					validationSchema={ChangePasswordSchema}
					onSubmit={handlerSubmit}
				>
					{({ dirty, isValid }) => {
						return (
							<Form>
								{fieldsForChangePassword.map(({ id, ...props }) => {
									return <FormikField key={id} id={id} {...props} />;
								})}

								<ErrorText>{errorMessages || validPassword}</ErrorText>

								<ButtonComponent
									center={true}
									disabled={isLoading || !dirty || !isValid}
									color={ButtonColorsEnum.primary}
									text={isLoading ? 'Loading...' : 'Change password'}
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

export default ChangePassword;
