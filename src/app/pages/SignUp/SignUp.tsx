import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Actions } from '../../../redux/auth/actions';
import {
	getAuthStateErrors,
	getIsAuthLoading,
} from '../../../redux/auth/selectors';
import { SignUpFormValues } from '../../../shared/interfaces/signup.interface';

import ButtonComponent from '../../components/buttons/ButtonComponent/ButtonComponent';
import {
	ButtonColorsEnum,
	ButtonTypesEnum,
} from '../../components/buttons/buttonComponentEnum';
import CommonContainer from '../../components/CommonContainer/CommonContainer';
import ErrorText from '../../components/ErrorText/ErrorText';
import FormikField from '../../components/FormikField/FormikField';
import FormSubmit from '../../components/TitleContainer/TitleContainer';

import { fieldForSignUp } from './formFields';
import { SignUpSchema } from './formFields';
import styles from './SignUp.module.scss';

const SignIn: React.FC = () => {
	const dispatch = useDispatch();

	const initialValues: SignUpFormValues = {
		fullName: '',
		email: '',
		phone: '',
		countryCode: '',
		password: '',
		isAgreeWithPrivacyPolicyAndTermOfUse: false,
		notifications: false,
	};

	const handlerSubmit = (data: SignUpFormValues) => {
		dispatch(Actions.signUp(data));
	};

	const handlerAlreadyHave = () => {
		dispatch(Actions.setSignUpErrors());
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
			<FormSubmit title='Sign Up'>
				<Formik
					initialValues={initialValues}
					validationSchema={SignUpSchema}
					onSubmit={handlerSubmit}
				>
					{({ dirty, isValid, isSubmitting }) => {
						return (
							<Form>
								{fieldForSignUp.map(({ id, ...props }) => {
									return <FormikField key={id} id={id} {...props} />;
								})}

								<ErrorText>{errorMessages}</ErrorText>

								<ButtonComponent
									center={true}
									disabled={
										isLoading ||
										!dirty ||
										!isValid ||
										(isSubmitting && !errorMessages)
									}
									color={ButtonColorsEnum.primary}
									text={`${isLoading ? 'Loading...' : 'Sign Up'}`}
									type={ButtonTypesEnum.submit}
								/>

								<div className={styles.forgotPassword}>
									<Link onClick={handlerAlreadyHave} to='/sign-in'>
										<span>* Already have an account?</span>
									</Link>
								</div>
							</Form>
						);
					}}
				</Formik>
			</FormSubmit>
		</CommonContainer>
	);
};

export default SignIn;
