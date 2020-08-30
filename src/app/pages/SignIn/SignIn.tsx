import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Actions } from '../../../redux/auth/actions';
import {
	getAuthStateErrors,
	getIsAuthLoading,
} from '../../../redux/auth/selectors';
import { SignInFormValues } from '../../../shared/interfaces/signin.interface';

import ButtonComponent from '../../components/buttons/ButtonComponent/ButtonComponent';
import {
	ButtonColorsEnum,
	ButtonTypesEnum,
} from '../../components/buttons/buttonComponentEnum';
import CommonContainer from '../../components/CommonContainer/CommonContainer';
import ErrorText from '../../components/ErrorText/ErrorText';
import FormikField from '../../components/FormikField/FormikField';
import FormSubmit from '../../components/TitleContainer/TitleContainer';

import { fieldForSignIn } from './formFields';
import { SignInSchema } from './formFields';
import styles from './SignIn.module.scss';

const SignIn: React.FC = () => {
	const dispatch = useDispatch();

	const initialValues: SignInFormValues = {
		email: '',
		password: '',
	};

	const handlerSubmit = (data: SignInFormValues) => {
		dispatch(Actions.login(data));
	};

	const handlerCreateAccount = () => {
		dispatch(Actions.setLoginErrors());
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
			<FormSubmit title='Sign In'>
				<Formik
					initialValues={initialValues}
					validationSchema={SignInSchema}
					onSubmit={handlerSubmit}
				>
					{({ dirty, isValid, isSubmitting }) => {
						return (
							<Form>
								{fieldForSignIn.map(({ id, ...props }) => {
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
									text={`${isLoading ? 'Loading...' : 'Sign In'}`}
									type={ButtonTypesEnum.submit}
								/>
							</Form>
						);
					}}
				</Formik>

				<div onClick={handlerCreateAccount} className={styles.forgotPassword}>
					<Link to='/sign-up'>
						<span>* Create an account</span>
					</Link>

					<Link to='/forgot-password'>
						<span>* Forgot password?</span>
					</Link>
				</div>
			</FormSubmit>
		</CommonContainer>
	);
};

export default SignIn;
