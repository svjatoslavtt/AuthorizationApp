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
import ResendCodeButton from '../../components/buttons/ButtonResendCode/ResendCodeButton';
import CommonContainer from '../../components/CommonContainer/CommonContainer';
import ErrorText from '../../components/ErrorText/ErrorText';
import FormikField from '../../components/FormikField/FormikField';
import FormSubmit from '../../components/TitleContainer/TitleContainer';

import styles from './ConfirmCode.module.scss';
import { fieldForConfirmCode } from './formFields';
import { ConfirmCodeSchema } from './formFields';

const ConfirmCode: React.FC = () => {
	const dispatch = useDispatch();

	const initialValues: {code: string} = {
		code: '',
	};

	const handlerSubmit = (data: {code: string}) => {
		dispatch(Actions.confirmCode(data.code));
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
			<FormSubmit title='Confirm code'>
				<Formik
					initialValues={initialValues}
					validationSchema={ConfirmCodeSchema}
					onSubmit={handlerSubmit}
				>
					{({ dirty, isValid }) => {
						return (
							<Form>
								{fieldForConfirmCode.map(({ id, ...props }) => {
									return <FormikField key={id} id={id} {...props} />;
								})}

								<ErrorText>{errorMessages}</ErrorText>

								<span className={styles.descriptionCode}>
									The verification code was sent to your account email address.
									Check your email inbox and enter the code to the field above.
								</span>

								<ButtonComponent
									center={true}
									disabled={isLoading || !dirty || !isValid}
									color={ButtonColorsEnum.primary}
									text={isLoading ? 'Loading...' : 'Confirm code'}
									type={ButtonTypesEnum.submit}
								/>

								<ResendCodeButton setErrors={errorMessages} />
							</Form>
						);
					}}
				</Formik>
			</FormSubmit>
		</CommonContainer>
	);
};

export default ConfirmCode;
